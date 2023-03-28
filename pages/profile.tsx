import Head from 'next/head';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import { authOptions, refreshAccessToken } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';
import decryption from '../lib/decryption';
import encryption from '../lib/encryption';
import SpotifyStatsSection from '../components/SpotifyStatsSection';
import { createContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import Account from '../models/Account';
import connection from '../lib/mongooseConnect';
import type {
  AccessToken,
  EncryptedContent,
  RecentTracksData,
  SpotifyData,
  TopItems,
  TrackMood,
} from '../types/types';

export const SessionContext = createContext<Session>(null);
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.time('getServerSideProps');
  const session: Session = await unstable_getServerSession(context.req, context.res, authOptions);
  let accessToken = session.accessToken;
  const userInfo = await fetchSpotifyUser(accessToken);
  await connection();

  if (new Date().toISOString() > new Date(session.accessTokenExpires).toISOString()) {
    const account = await Account.findOne({ access_token: accessToken });
    const encryptedRefreshToken = account.refresh_token;
    const newAccessToken = await refreshAccessToken(
      decryption(
        encryptedRefreshToken.encryptedData,
        encryptedRefreshToken.iv,
        encryptedRefreshToken.authTag
      )
    );
    accessToken = newAccessToken.accessToken;
    session.accessTokenExpires = newAccessToken.accessTokenExpires;
    await persistRefreshToken(newAccessToken.refreshToken, accessToken);
  }

  if (session.error) throw new Error(session.error);

  const shortTerm = await fetchTopSpotifyItems(accessToken, 'short_term');
  const mediumTerm = await fetchTopSpotifyItems(accessToken, 'medium_term');
  const longTerm = await fetchTopSpotifyItems(accessToken, 'long_term');
  const recentTracksData = await getRecentTracks(accessToken);
  const trackFeatures = await getTracksFeatures(recentTracksData.items, accessToken);
  const tracksMood = recentTracksMood(trackFeatures.audio_features);
  const recentTracks: RecentTracksData = {
    tracks: recentTracksData.items,
    trackFeatures,
    tracksMood,
  };

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  //* turn undefined into JSON serializable value
  if (session.error === undefined) session.error = null;

  if (!userInfo) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const topItems: TopItems = {
    shortTerm,
    mediumTerm,
    longTerm,
  };
  console.timeEnd('getServerSideProps');

  return {
    props: {
      spotifyData: {
        userInfo,
        topItems,
        recentTracks,
      },
    },
  };
};

export const SpotifyDataContext = createContext<SpotifyData>(null);
export default function Profile(props: { spotifyData: SpotifyData }) {
  /* 
    0: top 3 tracks and top 3 artists
    1: top 10 tracks
    2: top 10 artists
  */
  const [statType, setStatType] = useState(0);
  const topItems = props.spotifyData.topItems;
  const userInfo = props.spotifyData.userInfo;
  const [session, setSession] = useState<Session>(null);
  const [spotifyData, setSpotifyData] = useState<{
    topItems: TopItems;
    userInfo: SpotifyApi.CurrentUsersProfileResponse;
    recentTracks: RecentTracksData;
  }>(null);

  useEffect(() => {
    if (!session) {
      getSession().then((sessionRes) => setSession(sessionRes));
    }

    if (!spotifyData) {
      setSpotifyData({
        topItems: topItems,
        userInfo: userInfo,
        recentTracks: props.spotifyData.recentTracks,
      });
    }
  });
  if (!session || !spotifyData) return <div></div>;
  else {
    return (
      <div>
        <Head>
          <title>Music Wizard | Profile</title>
          <meta name='robots' content='noindex' key='robots' />
          <link rel='icon' href='public\favicon.ico' type='image/icon type'></link>
          <link rel='canonical' href='https://musicwizard.vercel.app/' key='canonical' />
        </Head>

        <div className='lg:min-h-screen flex flex-col'>
          <SiteNav></SiteNav>
          <SessionContext.Provider value={session}>
            <SpotifyDataContext.Provider value={spotifyData}>
              <div className='p-4 block lg:grid lg:grid-cols-[auto,_3fr] lg:gap-12 lg:flex-1'>
                <Sidebar setStatType={setStatType} />
                <SpotifyStatsSection statType={statType} />
              </div>
              <div></div>
            </SpotifyDataContext.Provider>
          </SessionContext.Provider>
        </div>

        <div className='flex items-center justify-center mb-4'>
          <p className='m-0 mr-3 font-medium text-2xl'>Powered by</p>
          <Image
            src={require('../public/greenspotifylogo.png')}
            width={200}
            height={60}
            alt='spotify logo'></Image>
        </div>
      </div>
    );
  }
}

async function fetchTopSpotifyItems(
  token: string,
  timeRange: 'short_term' | 'medium_term' | 'long_term'
) {
  let tracks: SpotifyApi.UsersTopTracksResponse;
  let artists: SpotifyApi.UsersTopArtistsResponse;

  await axios
    .get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
        time_range: timeRange,
      },
    })
    .then((res) => (tracks = res.data))
    .catch((err) => console.log(err.message));

  await axios
    .get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
        time_range: timeRange,
      },
    })
    .then((res) => (artists = res.data))
    .catch((err) => console.log(err.message));

  const topItems = {
    tracks,
    artists,
  };

  return topItems;
}

async function fetchSpotifyUser(token: string) {
  let userInfo: SpotifyApi.CurrentUsersProfileResponse;

  await axios
    .get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => (userInfo = res.data))
    .catch((err) => console.log(err.message));

  return userInfo;
}

async function persistRefreshToken(refreshToken: string, accessToken: string) {
  const encryptedRefreshToken = encryption(refreshToken);

  const accountToUpdate = await Account.findOne({ accessToken: accessToken });
  accountToUpdate.refresh_token = encryptedRefreshToken;
  accountToUpdate.save();
}

async function getRecentTracks(accessToken: string) {
  let recentTracksRes: SpotifyApi.UsersRecentlyPlayedTracksResponse;

  try {
    const res = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 50,
      },
    });
    recentTracksRes = await res.data;
  } catch (error) {
    console.log(error);
  }

  return recentTracksRes;
}

async function getTracksFeatures(
  tracks: { track: SpotifyApi.TrackObjectFull }[],
  accessToken: string
) {
  let tracksFeaturesRes: AxiosResponse;
  const trackIds = tracks.map((trackObject) => {
    return trackObject.track.id;
  });

  try {
    tracksFeaturesRes = await axios.get('https://api.spotify.com/v1/audio-features', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ids: trackIds.join(','),
      },
    });
  } catch (error) {
    console.log(error);
  }

  return await tracksFeaturesRes.data;
}

function recentTracksMood(tracks: SpotifyApi.AudioFeaturesObject[]) {
  const recentTrackFeatures: TrackMood = {
    danceability: 0,
    energy: 0,
    acousticness: 0,
    valence: 0,
    largest: {
      name: '',
      value: 0,
    },
    array: [1, 1, 1, 1],
    total: 0,
  };
  const filteredTracks = tracks.filter((track) => {
    if (track) return track;
  });

  filteredTracks.forEach((track) => {
    recentTrackFeatures[determineTrackMood(track)] += 1;
  });
  recentTrackFeatures.total = filteredTracks.length;
  recentTrackFeatures.array = [
    recentTrackFeatures.danceability,
    recentTrackFeatures.energy,
    recentTrackFeatures.acousticness,
    recentTrackFeatures.valence,
  ];
  let sortedArray = [...recentTrackFeatures.array];
  const largestValue = sortedArray.sort((a, b) => a - b)[sortedArray.length - 1];
  recentTrackFeatures.largest.name = Object.keys(recentTrackFeatures).find(
    (key) => recentTrackFeatures[key] === largestValue
  );
  recentTrackFeatures.largest.value = largestValue;

  return recentTrackFeatures;
}

function determineTrackMood(features: SpotifyApi.AudioFeaturesObject) {
  let largestFeature: 'danceability' | 'energy' | 'acousticness' | 'valence';

  features.danceability > features.energy
    ? (largestFeature = 'danceability')
    : (largestFeature = 'energy');
  features.acousticness > features[largestFeature] ? (largestFeature = 'acousticness') : null;
  features.valence > features[largestFeature] ? (largestFeature = 'valence') : null;

  return largestFeature;
}
