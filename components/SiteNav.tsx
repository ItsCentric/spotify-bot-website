import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import LoginButton from "./LoginButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import styles from '../styles/Profile.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function SiteNav() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <Image
            src='/../public/favicon.ico'
            width={40}
            height={40}
          ></Image>
          <Navbar.Brand href="/" className='ms-2'>Music Wizard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/#about">About</Nav.Link>
              <Nav.Link href="#help">Help</Nav.Link>
              <Nav.Link href='/profile'>Profile</Nav.Link>
            </Nav>
            <ButtonToolbar className={styles.buttons}>
              <ButtonGroup className="me-2">
                <Button
                  className={`justify-content-end d-inline-block align-middle`}
                  href="https://discord.com/api/oauth2/authorize?client_id=931765113327874058&permissions=2150656000&scope=applications.commands%20bot"
                  target="_blank"
                  variant="primary"
                >
                  Add to Discord
                </Button>{" "}
              </ButtonGroup>
              <ButtonGroup>
                <LoginButton></LoginButton>
              </ButtonGroup>
            </ButtonToolbar>
          </Navbar.Collapse>
          <span className="d-none d-md-inline align-middle"><Image src={session.user.image} alt='User profile image' width="64" height="64" className="rounded-circle"></Image></span>
        </Container>
      </Navbar>
    );
  }
  else {
    return (
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container>
          <Image
            src='/../public/favicon.ico'
            width={40}
            height={40}
          ></Image>
          <Navbar.Brand href="/" className='ms-2'>Music Wizard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/#about">About</Nav.Link>
              <Nav.Link href="#help">Help</Nav.Link>
            </Nav>
            <ButtonToolbar className={styles.buttons}>
              <ButtonGroup className="me-2">
                <Button
                  className={`justify-content-end d-inline-block align-middle`}
                  href="https://discord.com/api/oauth2/authorize?client_id=931765113327874058&permissions=2150656000&scope=applications.commands%20bot"
                  target="_blank"
                  variant="primary"
                >
                  Add to Discord
                </Button>{" "}
              </ButtonGroup>
              <ButtonGroup>
                <LoginButton></LoginButton>
              </ButtonGroup>
            </ButtonToolbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
