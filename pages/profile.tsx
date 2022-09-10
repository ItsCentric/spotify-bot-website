import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import SiteNav from "../components/SiteNav";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from 'react-bootstrap/ListGroup';
import Link from "next/link";
import { GetServerSideProps } from 'next';
import { convertDuration } from "../lib/utils";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Profile.module.css";
import type { Session } from "next-auth"

export const getServerSideProps: GetServerSideProps = async (context) => {
  let SESSION = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const SPOTIFYDATA = await fetchSpotifyData(SESSION.accessToken);
    
  if (!SESSION) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  SESSION.error = null;

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
      SESSION,
      SPOTIFYDATA,
    },
  };
}

export default function Profile(props) {
  const SPOTIFYDATA = props.SPOTIFYDATA;
  const SESSION: Session = props.SESSION;
  const FORMATTER = new Intl.NumberFormat("en-US");

  return (
    <div className="text-bg-dark">
      <Head>
        <title>Spotify Bot | Profile</title>
      </Head>
      <SiteNav></SiteNav>

      <Container className={`d-flex p-0`} fluid>
        {/* USER INFORMATION */}
        <Container className={`ms-0 text-bg-light ${styles.userInfoContainer}`}>
          <Container className={`${styles.userProfilePicture} mt-3 p-0 position-relative top-0 start-50 translate-middle-x`}>
            <Image
              src={SESSION.user.image}
              width="270"
              height="270"
              className="rounded-circle border border-dark border-4"
            ></Image>
          </Container>
          <Link href={SPOTIFYDATA.userInfo.external_urls.spotify}><h1 className="text-center">{SESSION.user.name}</h1></Link>
          <Container className={`p-0 d-flex ${styles.userInfoTextContainer}`}>
            <p className="d-inline-block fw-semibold text-center"><span className="fw-bold fs-4">Country:</span> {'\n'}{SPOTIFYDATA.userInfo.country}</p>
            <p className="d-inline-block fw-semibold text-center"><span className="fw-bold fs-4">Followers:</span> {'\n'}{SPOTIFYDATA.userInfo.followers.total}</p>
            <p className="d-inline-block fw-semibold text-center"><span className="fw-bold fs-4">Plan:</span> {'\n'}{SPOTIFYDATA.userInfo.product == "open" ? "free" : "premium"}</p>
          </Container>
          <Container className={`p-0 d-flex ${styles.userInfoTextContainer}`}>
          </Container>
        </Container>

        {/* USER STATS */}
        <Container className={`px-5 d-flex flex-column ${styles.userStatsContainer} mb-5`}>
          {/* TOP TRACKS */}
          <Container>
            <h1 className={`d-inline-block ${styles.userStatsFlex}`}>Top 3 Tracks</h1>
            <p className="d-inline-block fw-light ms-2 text-white-50">{`(Last 6 months)`}</p>
            <CardGroup>
              <Card className={styles.statCard}>
                <Card.Img variant="top" src={SPOTIFYDATA.topTracks.items[0].album.images[0].url}></Card.Img>
                <Card.Title className="text-dark ms-2 mt-1 mb-1">{SPOTIFYDATA.topTracks.items[0].name}</Card.Title>
                <Card.Subtitle className="text-dark ms-2">{SPOTIFYDATA.topTracks.items[0].artists[0].name}</Card.Subtitle>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item><span className="fw-bold">Released:</span> {SPOTIFYDATA.topTracks.items[0].album.release_date}</ListGroup.Item>
                  <ListGroup.Item><span className="fw-bold">Duration:</span> {convertDuration(SPOTIFYDATA.topTracks.items[0].duration_ms)}</ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className={styles.statCard}>
                <Card.Img variant="top" src={SPOTIFYDATA.topTracks.items[1].album.images[0].url}></Card.Img>
                <Card.Title className="text-dark ms-2 mt-1 mb-1">{SPOTIFYDATA.topTracks.items[1].name}</Card.Title>
                <Card.Subtitle className="text-dark ms-2">{SPOTIFYDATA.topTracks.items[1].artists[0].name}</Card.Subtitle>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item><span className="fw-bold">Released:</span> {SPOTIFYDATA.topTracks.items[1].album.release_date}</ListGroup.Item>
                  <ListGroup.Item><span className="fw-bold">Duration:</span> {convertDuration(SPOTIFYDATA.topTracks.items[1].duration_ms)}</ListGroup.Item>
                </ListGroup>
              </Card>
              <Card className={styles.statCard}>
                <Card.Img variant="top" src={SPOTIFYDATA.topTracks.items[2].album.images[0].url}></Card.Img>
                <Card.Title className="text-dark ms-2 mt-1 mb-1">{SPOTIFYDATA.topTracks.items[2].name}</Card.Title>
                <Card.Subtitle className="text-dark ms-2">{SPOTIFYDATA.topTracks.items[2].artists[0].name}</Card.Subtitle>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item><span className="fw-bold">Released:</span> {SPOTIFYDATA.topTracks.items[2].album.release_date}</ListGroup.Item>
                  <ListGroup.Item><span className="fw-bold">Duration:</span> {convertDuration(SPOTIFYDATA.topTracks.items[2].duration_ms)}</ListGroup.Item>
                </ListGroup>
              </Card>
            </CardGroup>
          </Container>

          {/* TOP ARTISTS */}
          <Container>
            <h1 className={`d-inline-block ${styles.userStatsFlex}`}>Top 3 Artists</h1>
            <p className="d-inline-block fw-light ms-2 text-white-50">{`(Last 6 months)`}</p>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={SPOTIFYDATA.topArtists.items[0].images[0].url}></Card.Img>
                <Card.Title className="text-dark ms-2 mt-1 mb-1">{SPOTIFYDATA.topArtists.items[0].name}</Card.Title>
                <Card.Subtitle className="text-dark ms-2">{SPOTIFYDATA.topArtists.items[0].genres[0]}</Card.Subtitle>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item><span className="fw-bold">Followers:</span> {FORMATTER.format(SPOTIFYDATA.topArtists.items[0].followers.total)}</ListGroup.Item>
                  <ListGroup.Item><span className="fw-bold">Popularity:</span> {SPOTIFYDATA.topArtists.items[0].popularity}</ListGroup.Item>
                </ListGroup>
              </Card>
              <Card>
                <Card.Img variant="top" src={SPOTIFYDATA.topArtists.items[1].images[0].url}></Card.Img>
                <Card.Title className="text-dark ms-2 mt-1 mb-1">{SPOTIFYDATA.topArtists.items[1].name}</Card.Title>
                <Card.Subtitle className="text-dark ms-2">{SPOTIFYDATA.topArtists.items[1].genres[0]}</Card.Subtitle>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item><span className="fw-bold">Followers:</span> {FORMATTER.format(SPOTIFYDATA.topArtists.items[1].followers.total)}</ListGroup.Item>
                  <ListGroup.Item><span className="fw-bold">Popularity:</span> {SPOTIFYDATA.topArtists.items[1].popularity}</ListGroup.Item>
                </ListGroup>
              </Card>
              <Card>
                <Card.Img variant="top" src={SPOTIFYDATA.topArtists.items[2].images[0].url}></Card.Img>
                <Card.Title className="text-dark ms-2 mt-1 mb-1">{SPOTIFYDATA.topArtists.items[2].name}</Card.Title>
                <Card.Subtitle className="text-dark ms-2">{SPOTIFYDATA.topArtists.items[2].genres[0]}</Card.Subtitle>
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item><span className="fw-bold">Followers:</span> {FORMATTER.format(SPOTIFYDATA.topArtists.items[2].followers.total)}</ListGroup.Item>
                  <ListGroup.Item><span className="fw-bold">Popularity:</span> {SPOTIFYDATA.topArtists.items[2].popularity}</ListGroup.Item>
                </ListGroup>
              </Card>
            </CardGroup>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

async function fetchSpotifyData(token: unknown) {
  interface SpotifyData {
    userInfo: object,
    topTracks: object,
    topArtists: object,
  }
  let userInfo: object, topTracks: object, topArtists: object;
  let spotifyData: SpotifyData = { userInfo, topTracks, topArtists };

  await axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => (spotifyData.userInfo = res.data))
    .catch((err) => console.log(err));

  await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 3
    }
  })
  .then(res => spotifyData.topTracks = res.data)
  .catch(err => console.log(err))
  
  await axios.get("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: 3
    }
  })
  .then(res => spotifyData.topArtists = res.data)
  .catch(err => console.log(err))

  return spotifyData;
}
