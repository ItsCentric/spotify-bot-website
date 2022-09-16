import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "react-bootstrap/Container";
import SiteNav from "../components/SiteNav";
import Footer from '../components/Footer';
import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="text-bg-dark">
      <Head>
        <title>Music Wizard</title>
        <meta name='description' content='A Discord bot that intergrates features from Spotify.' key='desc' />
        <meta property='og:title' content='Spotify Discord Bot'  />
        <meta property='og:description' content='A Discord bot that intergrates features from Spotify. See your top songs and artists, recent songs, your friends top songs and artists, what theyre listening to, and more!' />
        <meta property='og:image' content='public\spotify-logo.png' />
        <link rel='canonical' href='https://spotify-bot.vercel.app/' key='canonical'/>
      </Head>
      <SiteNav></SiteNav>

      <Container fluid className={`${styles.heroContainer} position-relative`} id='#'>
        <h1 className={`text-center ${styles.heroText}`}>
          The New Kid in Town.
        </h1>
        <p className={`text-center fw-light text-white-50 ${styles.heroText}`}>
          Written and developed by Centric.
        </p>
        <Image
          src={require("../public/herobanner.svg")}
          alt=''
          layout="fill"
          objectFit="cover"
          priority
        ></Image>
      </Container>

      <Container id="about">
        <Container className={`my-5 mx-auto`}>
          <h1 className={`text-center fw-bold`}>
            What is <span className={styles.textHighlight}>Music Wizard</span>?
          </h1>
          <p className={`text-center fw-semibold`}>
            Music Wizard is a feature rich Discord bot for... well... Discord.
            You can do a multituide of things, ranging from queuing songs,
            finding information about songs and albums, searching for lyrics,
            and much more! Read more about it below.
          </p>
        </Container>
        <Container className={`d-flex flex-column`}>
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
              <h3 className={`d-inline-block ms-2 mb-0 align-middle`}>Lyrics</h3>
              <p className={`mt-1`}>
                Search up lyrics for the current song you&apos;re listening to using
                Genius!
              </p>
            </Container>
            <Container>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
              </svg>
              <h3 className={`d-inline-block ms-2 mb-0 align-middle`}>User Commands</h3>
              <p className={`mt-1`}>
                If you&apos;re logged in, get Spotify stats about you! You can query your top songs and artists, your recently played songs, and more! It doesnt stop there, you can also check your friends stats if they&apos;re logged in. Invite them to join the fun!
              </p>
            </Container>
          </Container>
          <Container className={`mt-2 d-md-flex`}>
            <Container>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-disc-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z"/>
              </svg>
              <h3 className={`d-inline-block ms-2 mb-0 align-middle`}>Song Information</h3>
              <p className={`mt-1`}>
                Get information about your favorite songs, albums, and even playlists: all from Discord.
              </p>
            </Container>
            <Container>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
              </svg>
              <h3 className={`d-inline-block ms-2 mb-0 align-middle`}>Coming Soon</h3>
              <p className={`mt-1`}>
                This bot is still actively in development, so its not feature complete. Expect more features to come combined with these awesome features to give you an amazing user experience!
              </p>
            </Container>
          </Container>
        </Container>
      </Container>
      <Container className={`mx-auto`} id='help'>
        <Container className='my-5 mx-auto'>
          <h1 className={`text-center fw-bold`}>How do I use it?</h1>
          <p className='text-center fw-semibold'>Getting started with Music Wizard is easy! All it takes is <span className={styles.textHighlight}>four simple steps.</span></p>
          <Container className={`d-flex flex-column justify-content-center`}>
            <Container className={`d-flex mb-4`}>
              <p className={`fs-1 d-inline-block me-2 text-center m-0`}>1.</p>
              <p className={`border-start border-3 px-3 d-inline-block m-0 align-middle pt-3 ${styles.bordercolor}`}>Click the &quot;log in&quot; button in the bar at the top of the page to log in using your Spotify account.</p>
            </Container>
            <Container className={`d-flex mb-4`}>
              <p className={`fs-1 d-inline-block me-2 text-center m-0`}>2.</p>
              <p className={`border-start border-3 px-3 d-inline-block m-0 align-middle ${styles.bordercolor} pt-2`}>Add the bot to your Discord server by clicking the &quot;Add to Discord&quot; button in the same bar at the top. Make sure you have an admin role or are owner of the server.</p>
            </Container>
            <Container className={`d-flex mb-4`}>
              <p className={`fs-1 d-inline-block me-2 text-center m-0`}>3.</p>
              <p className={`border-start border-3 px-3 d-inline-block m-0 align-middle ${styles.bordercolor} pt-3`}>Once the bot is in your server, use the &quot;/user setemail&quot; command to set your email used with your Spotify account.</p>
            </Container>
            <Container className={`d-flex mb-4`}>
              <p className={`fs-1 d-inline-block me-2 text-center m-0`}>4.</p>
              <p className={`border-start border-3 px-3 d-inline-block m-0 align-middle ${styles.bordercolor} pt-3`}>And you&apos;re done! You may use any of the Spotify intergration commands to your hearts content!</p>
            </Container>
          </Container>
        </Container>
        <Container className={`${styles.form} p-3 pb-5 rounded mb-5`}>
          <h1 className={`text-center fw-bold`}>Any Questions?</h1>
          <p className={`fw-semibold text-center`}>Shoot me a message and I&apos;ll be happy to respond.</p>
          <Form action="https://formsubmit.co/640770cec818db0d008a2cf188ab23c9" method="POST">
            <Form.Group className='mb-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' placeholder='John Doe' required></Form.Control>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' placeholder='example@domain.org' required></Form.Control>
              <Form.Text>The email you want to send your message from.</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control type='text' name='message' placeholder='You did such an awesome job on the bot! We love you!' required></Form.Control>
            </Form.Group>
            <Button type='submit' className='mt-3'>Send</Button>
          </Form>
        </Container>
      </Container>
      <Footer></Footer>
    </div>
  );
}
