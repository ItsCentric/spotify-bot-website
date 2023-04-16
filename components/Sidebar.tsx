import { useContext, useState } from 'react';
import { IoDiscSharp } from 'react-icons/io5';
import { BsFillPersonFill, BsFillPlayFill, BsPersonFillGear } from 'react-icons/bs';
import { GoGraph } from 'react-icons/go';
import { FaSignOutAlt } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import Image from 'next/image';
import { ModalContext, SessionContext, UserDataContext } from '../pages/profile';
import { signOut } from 'next-auth/react';
import Tooltip from './Tooltip';

export default function Sidebar(props: { setStatType: Function }) {
  const session = useContext(SessionContext);
  const spotifyData = useContext(UserDataContext).spotifyData;
  const modal = useContext(ModalContext);
  const userInfo = spotifyData.userInfo;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={'p-4 bg-[#2F2538] drop-shadow-2xl rounded-lg max-h-fit flex flex-col mb-4 lg:m-0'}>
      <div className='flex justify-between lg:justify-start'>
        <div>
          <Image
            src={session ? session.user.image : ''}
            alt='user profile picture'
            width={48}
            height={48}
            className={'rounded-full aspect-square inline-block align-middle'}
          />
          <div className='ml-3 inline-block align-middle max-w-[100px]'>
            <a
              href={spotifyData.userInfo.external_urls.spotify}
              className='text-xl font-medium hover:text-green-light transition-colors'>
              {session ? session.user.name : ''}
            </a>
            <p className='text-white/80'>{userInfo.followers.total + ' Followers'}</p>
          </div>
        </div>
        <button
          className='lg:hidden'
          onClick={() =>
            setOpen((previousOpen) => {
              return !previousOpen;
            })
          }>
          <BiMenu className='h-8 w-8' />
        </button>
      </div>
      <div
        className={
          'lg:flex-1 lg:flex lg:flex-col justify-center my-4 lg:m-0 ' + (open ? 'block' : 'hidden')
        }>
        <ul className='flex flex-col lg:items-center divide-y-2 divide-white/80'>
          <li className='hover:text-white/80 transition-colors'>
            <button className='w-full h-full pb-2' onClick={() => props.setStatType(0)}>
              <GoGraph className='inline-block mr-2 align-middle' />
              <p className='inline-block align-middle'>Dashboard</p>
            </button>
          </li>
          <li className='hover:text-white/80 transition-colors'>
            <button className='w-full h-full py-2' onClick={() => props.setStatType(1)}>
              <IoDiscSharp className='inline-block mr-2 align-middle' />
              <p className='inline-block align-middle'>Top 10 Tracks</p>
            </button>
          </li>
          <li className='hover:text-white/80 transition-colors'>
            <button className='w-full h-full py-2' onClick={() => props.setStatType(2)}>
              <BsFillPersonFill className='inline-block mr-2 align-middle' />
              <p className='inline-block align-middle'>Top 10 Artists</p>
            </button>
          </li>
          <li className='pt-2 text-red-400 group relative'>
            <div className='flex items-center cursor-default'>
              <BsFillPlayFill className='mr-2' />
              <p>Music Player</p>
              <Tooltip position='top' alignment='left'>
                This feature is a work in progress!
              </Tooltip>
            </div>
          </li>
        </ul>
      </div>
      <div className={'justify-between ' + (open ? 'flex' : 'hidden lg:flex')}>
        <button className='hover:text-white/80' onClick={() => modal.setValue(0)}>
          <BsPersonFillGear className='h-6 w-6' />
        </button>
        <button className='hover:text-white/80' onClick={() => signOut({ callbackUrl: '/' })}>
          <FaSignOutAlt className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
}
