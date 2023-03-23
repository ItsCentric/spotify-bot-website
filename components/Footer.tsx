import Link from 'next/link';

export default function Footer() {
  return (
    <div className={`pt-2 bg-black h-20`}>
      <Link href='#' className='text-decoration-none font-semibold'>
        <p className='text-center'>Back up</p>
      </Link>
      <p className={`text-center mb-0`}>© 2022 All Rights Reserved.</p>
    </div>
  );
}
