import Container from "react-bootstrap/Container";
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <Container className={`${styles.footer} pt-2`} fluid>
            <Link href='#'>
                <a className='text-decoration-none text-light fw-semibold'><p className='text-center'>Back up</p></a>
            </Link>
            <p className={`text-center mb-0`}>© 2022 All Rights Reserved.</p>
        </Container>
    )
}