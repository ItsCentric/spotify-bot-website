import Image from 'next/image';
import Link from 'next/link';

export default function ProfileSideBar(props: { profileData: any }) {
  const profileData = props.profileData;
  return (
    <div className='flex flex-col gap-6 col-start-1'>
      <div className='flex flex-col py-4 px-6 gap-2 bg-white text-blackRaspberry rounded-md flex-1'>
        <div className='mx-auto p-0 relative w-auto'>
          <Image
            src={profileData.images[0].url}
            className='rounded-full border-4 border-blackRaspberry'
            alt='user spotify profile image'
            width={270}
            height={270}
          />
        </div>
        <span className='text-center text-3xl font-medium'>
          <Link
            href={profileData.external_urls.spotify}
            className='hover:text-green-dark transition-colors'>
            {profileData.display_name}
          </Link>
        </span>
        <div className='flex justify-center gap-4'>
          <p className='inline-block font-medium text-center w-full h-full'>
            <span className='font-bold text-xl'>Country:</span>
            <br />
            {profileData.country}
          </p>
          <p className='inline-block font-medium text-center w-full h-full'>
            <span className='font-bold text-xl'>Followers:</span>
            <br />
            {profileData.followers.total}
          </p>
          <p className='inline-block font-medium text-center w-full h-full'>
            <span className='font-bold text-xl'>Plan:</span>
            <br />
            {profileData.product == 'open' ? 'Free' : 'Premium'}
          </p>
        </div>
      </div>
    </div>
  );
}
