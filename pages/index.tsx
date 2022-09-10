import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "react-bootstrap/Container";
import SiteNav from "../components/SiteNav";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="text-bg-dark">
      <Head>
        <title>Spotify Bot | Home</title>
      </Head>
      <SiteNav></SiteNav>

      <Container fluid className={`${styles.heroContainer} position-relative`}>
        <h1 className={`text-center ${styles.heroText}`}>
          The New Kid in Town.
        </h1>
        <p className={`text-center fw-light text-white-50 ${styles.heroText}`}>
          Written and developed by Centric.
        </p>
        <Image
          src={require("../assets/herobanner.svg")}
          alt=''
          layout="fill"
          priority
        ></Image>
      </Container>

      <Container id="about">
        <Container className={`my-5 mx-auto`}>
          <h1 className={`text-center fw-bold`}>
            What is <span className={styles.spotifyColor}>Spotify Bot</span>?
          </h1>
          <p className={`text-center`}>
            Spotify Bot is a feature rich Discord bot for... well... Discord.
            You can do a multituide of things, ranging from queuing songs,
            finding information about songs and albums, searching for lyrics,
            and much more! Read more about it below.
          </p>
        </Container>
        <Container className={`mt-2 d-md-flex`}>
          <Container>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className={`d-inline-block align-middle bi bi-music-note-beamed`}
              viewBox="0 0 16 16"
            >
              <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z" />
              <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" />
              <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z" />
            </svg>
            <h3 className={`d-inline-block ms-2 mb-0 align-middle`}>Music</h3>
            <p className={`mt-1`}>
              Well, whats a music bot without music? So of course, with Spotify
              Bot you can listen to your favorite songs in the highest quality.
            </p>
          </Container>
          <Container>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className={`d-inline-block align-middle bi bi-pencil-fill`}
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
            <h3 className={`d-inline-block ms-2 align-middle`}>Lyrics</h3>
            <p className={`mt-1`}>
              Search up lyrics for the current song you&apos;re listening to using
              Genius!
            </p>
          </Container>
          <Container>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className={`d-inline-block align-middle bi bi-bar-chart-line-fill`}
              viewBox="0 0 16 16"
            >
              <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
            </svg>
            <h3 className={`d-inline-block ms-2 align-middle`}>
              Spotify Integration
            </h3>
            <p className={`mt-1`}>
              Get info about your favorite songs and albums, directly from the
              bot using Spotify! Log in using your Spotify account to get more
              personal and detailed statistics.
            </p>
          </Container>
        </Container>
      </Container>
    </div>
  );
}
