import Head from "next/head";
import Image from "next/image";
import SiteNav from "../components/SiteNav";
import { authOptions, refreshAccessToken } from "./api/auth/[...nextauth]";
import { unstable_getServerSession} from "next-auth/next";
import axios from "axios";
import { GetServerSideProps } from 'next';
import type { Session } from "next-auth"
import { encryption, decryption } from "../lib/utils";
import SpotifyStatsSection from "../components/SpotifyStatsSection";
import ProfileSideBar from "../components/ProfileSideBar";
import connectionPromise from '../lib/mongodb';
import type { AccessToken, EncryptedContent } from '../types/types'
import { Artist, Track, User } from "../types/spotify-types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let SESSION: Session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (new Date().toISOString() > new Date(SESSION.accessTokenExpires).toISOString()) {
    const connection = await connectionPromise;
    const accounts = connection.db('test').collection('accounts');
    let encryptedRefreshToken: EncryptedContent;
    let newAccessToken: AccessToken;
  
    await accounts.findOne({ access_token: SESSION.accessToken })
      .then(res => encryptedRefreshToken = res.refresh_token)
      .catch(err => console.log(err));
    newAccessToken = await refreshAccessToken(decryption(encryptedRefreshToken));
    console.log(newAccessToken);
    SESSION.accessToken = newAccessToken.accessToken;
    SESSION.accessTokenExpires = newAccessToken.accessTokenExpires;
    await persistRefreshToken(newAccessToken.refreshToken, SESSION.accessToken);
  }

  if (SESSION.error) throw new Error(SESSION.error);

  const SPOTIFYDATA = await fetchSpotifyData(SESSION.accessToken);
    
  if (!SESSION) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //* turn undefined into JSON serializable value
  if (SESSION.error === undefined) SESSION.error = null;

  if (!SPOTIFYDATA.userInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      SPOTIFYDATA,
    },
  };
}

export default function Profile(props: { SPOTIFYDATA: any; }) {
  const spotifyData = props.SPOTIFYDATA;

  return (
    <div>
      <Head>
        <title>Music Wizard | Profile</title>
        <meta name='robots' content='noindex' key='robots' />
        <link rel="icon" href="public\favicon.ico" type="image/icon type"></link>
        <link rel='canonical' href='https://musicwizard.vercel.app/' key='canonical'/>
      </Head>
      <SiteNav></SiteNav>

      <div className='p-4 block lg:grid lg:grid-cols-[1fr,_3fr] lg:gap-12'>
        <ProfileSideBar profileData={spotifyData.userInfo} />
        <SpotifyStatsSection data={spotifyData} />
      </div>

      <div className='flex items-center justify-center mb-4'>
        <p className='m-0 mr-3 font-medium text-2xl'>Powered by</p>
        <Image
          src={require('../public/greenspotifylogo.png')}
          width={200}
          height={60}
          alt='spotify logo'
        ></Image>
      </div>
    </div>
  );
}

async function fetchSpotifyData(token: string) {
  type SpotifyData = {
    userInfo: User,
    topTracks: Track[],
    topArtists: Artist[],
  }
  let userInfo: User, topTracks: Track[], topArtists: Artist[];
  let spotifyData: SpotifyData = { userInfo, topTracks, topArtists };

  await axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => (spotifyData.userInfo = res.data))
    .catch((err) => console.log(err.message));

  await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 3
    }
  })
  .then(res => spotifyData.topTracks = res.data)
  .catch(err => console.log(err.message))
  
  await axios.get("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 3
    }
  })
  .then(res => spotifyData.topArtists = res.data)
  .catch(err => console.log(err.message))

  return spotifyData;
}

async function persistRefreshToken(refreshToken: string, accessToken: string) {
  const encryptedRefreshToken = encryption(refreshToken);
  const connection = await connectionPromise;
  const accounts = connection.db('test').collection('accounts');

  accounts.updateOne({ accessToken: accessToken }, { $set: { refreshToken: encryptedRefreshToken }})
}