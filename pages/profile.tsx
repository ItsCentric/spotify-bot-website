import Head from 'next/head';
import Image from 'next/image';
import SiteNav from '../components/SiteNav';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';
import SpotifyStatsSection from '../components/SpotifyStatsSection';
import { createContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import connection from '../lib/mongooseConnect';
import type { RecentTracksData, SpotifyData, TopItems, TrackMood } from '../types/types';
import SettingsModal from '../components/SettingsModal';
import User, { Preferences } from '../models/User';
import { getCacheItem, setCacheItem } from '../lib/redisClient';
import { ObjectId } from 'mongodb';

export const SessionContext = createContext<Session>(null);
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.time('getServerSideProps');
  const session: Session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let accessToken = session.accessToken;
  const userId = session.user.id;
  await connection();

  if (session.error) throw new Error(session.error);

  const userInfo = await getUserInfo(accessToken, userId);
  const preferences = await getPreferences(userId);

  const topItems = await getTopItems(accessToken, userId);
  const recentTracksData = await getRecentTracks(accessToken);
  const trackFeatures = await getTracksFeatures(recentTracksData.items, accessToken);
  const tracksMood = recentTracksMood(trackFeatures.audio_features);
  const recentTracks: RecentTracksData = {
    tracks: recentTracksData.items,
    trackFeatures,
    tracksMood,
  };

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

  console.timeEnd('getServerSideProps');

  return {
    props: {
      userData: {
        spotifyData: {
          userInfo,
          topItems,
          recentTracks,
        },
        preferences: { ...JSON.parse(JSON.stringify(preferences)) },
      },
    },
  };
};

export const UserDataContext = createContext<{
  spotifyData: SpotifyData;
  preferences: Preferences;
}>(null);
export const ModalContext = createContext<{ value: number; setValue: Function } | null>(null);
export default function Profile(props: {
  userData: { spotifyData: SpotifyData; preferences: Preferences };
}) {
  /* 
    0: top 3 tracks and top 3 artists
    1: top 10 tracks
    2: top 10 artists
  */
  const [statType, setStatType] = useState(0);
  const [modal, setModal] = useState<number>(null);
  const topItems = props.userData.spotifyData.topItems;
  const userInfo = props.userData.spotifyData.userInfo;
  const [session, setSession] = useState<Session>(null);
  const [userData, setUserData] = useState<{ spotifyData: SpotifyData; preferences: Preferences }>(
    null
  );

  useEffect(() => {
    if (!session) {
      getSession().then((sessionRes) => setSession(sessionRes));
    }

    if (!userData) {
      setUserData({
        spotifyData: {
          topItems: topItems,
          userInfo: userInfo,
          recentTracks: props.userData.spotifyData.recentTracks,
        },
        preferences: props.userData.preferences,
      });
    }
  });
  if (!session || !userData) return <div></div>;
  else {
    return (
      <>
        <Head>
          <title>Music Wizard | Profile</title>
          <meta name='robots' content='noindex' key='robots' />
          <link rel='icon' href='public\favicon.ico' type='image/icon type'></link>
          <link rel='canonical' href='https://musicwizard.vercel.app/' key='canonical' />
        </Head>

        <UserDataContext.Provider value={userData}>
          <ModalContext.Provider value={{ value: modal, setValue: setModal }}>
            <SettingsModal />
            <div className='lg:min-h-screen flex flex-col'>
              <SiteNav></SiteNav>
              <SessionContext.Provider value={session}>
                <div className='p-4 block lg:grid lg:grid-cols-[auto,_3fr] lg:gap-12 lg:flex-1'>
                  <Sidebar setStatType={setStatType} />
                  <SpotifyStatsSection statType={statType} />
                </div>
              </SessionContext.Provider>
            </div>
          </ModalContext.Provider>
        </UserDataContext.Provider>

        <div className='flex items-center justify-center mb-4'>
          <p className='m-0 mr-3 font-medium text-2xl'>Powered by</p>
          <Image
            src={require('../public/greenspotifylogo.png')}
            width={200}
            height={60}
            alt='spotify logo'></Image>
        </div>
      </>
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

async function getPreferences(userId: ObjectId) {
  const cachedPreferences: Preferences = await getCacheItem('preferences', userId);
  if (cachedPreferences) return cachedPreferences;
  else {
    const user = await User.findOne({ userId });
    await setCacheItem('preferences', user.preferences, userId);
    return user.preferences;
  }
}

async function getTopItems(accessToken: string, userId: ObjectId) {
  const cachedTopItems: TopItems = await getCacheItem('topItems', userId);
  if (cachedTopItems) return cachedTopItems;
  else {
    const shortTerm = await fetchTopSpotifyItems(accessToken, 'short_term');
    const mediumTerm = await fetchTopSpotifyItems(accessToken, 'medium_term');
    const longTerm = await fetchTopSpotifyItems(accessToken, 'long_term');
    const topItems = { shortTerm, mediumTerm, longTerm };
    await setCacheItem('topItems', topItems, userId);
    return topItems;
  }
}

async function getUserInfo(accessToken: string, userId: ObjectId) {
  const cachedUserInfo = await getCacheItem('userInfo', userId);
  if (cachedUserInfo) return cachedUserInfo.spotify;
  else {
    const userInfo = await fetchSpotifyUser(accessToken);
    await setCacheItem('userInfo', { spotify: userInfo }, userId);

    return userInfo;
  }
}
