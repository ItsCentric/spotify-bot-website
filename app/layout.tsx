import { Session } from 'next-auth';
import '../styles/globals.css';
import SessionComponent from './SessionComponent';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang='en' className={rubik.variable}>
      <SessionComponent session={session}>
        <body className='font-sans'>{children}</body>
      </SessionComponent>
    </html>
  );
}

export const metadata = {
  title: 'Music Wizard',
  description: 'Modern web application for everything music.',
};
