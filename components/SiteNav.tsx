import LoginButton from './LoginButton';
import Link from 'next/link';
import Image from 'next/image';

export default function SiteNav() {
  return (
    <nav className='py-2 px-4 lg:px-28'>
      <div className='flex flex-col'>
        <div className='flex justify-between content-center items-center mx-2'>
          <div>
            <span className='inline-block align-middle'>
              <Image src='/favicon.ico' width={50} height={50} alt='music wizard logo'></Image>
            </span>
            <Link href='/' className='inline-block align-middle text-2xl'>
              Music Wizard
            </Link>
          </div>
          <div className='inline-block align-middle'>
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
