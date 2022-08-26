import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="vw-100 vh-100 text-bg-dark">
      <Head>
        <title>Spotify Bot | Home</title>
      </Head>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#">Spotify Bot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Help</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Container className={`${styles.hero}`}>
        <h1 className={`text-center ${styles.heroText}`}>Discord's #1 Music Bot.</h1>
        <p className={`text-center fw-light text-white-50 ${styles.heroText}`}>Written and developed by Centric.</p>
      </Container> */}
    </div>
  )
}