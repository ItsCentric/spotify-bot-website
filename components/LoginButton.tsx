import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link
        href='/profile'
        className='bg-green-dark hover:bg-green-dark/80 p-2 rounded-lg transition-colors'>
        Dashboard
      </Link>
    );
  }
  return (
    <button
      className='bg-green-dark hover:bg-green-dark/80 p-2 rounded-lg transition-colors'
      onClick={() => signIn('spotify')}>
      Login
    </button>
  );
}
