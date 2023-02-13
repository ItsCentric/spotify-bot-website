import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Link from "next/link";

export default function LoginButton() {
    const { data: session } = useSession();
    const [profileOptionsOpened, setProfileOptionsOpened] = useState(false); // false means closed, true means open

    if (session) {
      return (
        <>
          <button 
          onClick={async () => setProfileOptionsOpened(!profileOptionsOpened)} 
          className={`bg-slate-100 text-slate-800 font-semibold p-1 md:p-2 mx-2 relative rounded-lg ${profileOptionsOpened ? 'rounded-b-none' : ''}`}
          >
            <div className={`inline-block align-middle w-4 h-4 ${profileOptionsOpened ? 'rotate-180' : 'rotate-0'} transition-transform duration-200`}>
              <RiArrowDropDownLine />
            </div>
            <p className='inline-block mr-2'>{session.user.name}</p>
            <Image src={session.user.image} alt='user profile picture' width={32} height={32} className='rounded-full border-2 border-slate-800 hidden md:inline-block' />
            <div className={`${profileOptionsOpened ? 'block' : 'hidden'} absolute top-full left-0 z-10 w-full bg-slate-100 font-normal rounded-b-lg`}>
              <ul>
                <li className={`hover:bg-slate-200 transition-all duration-300 ${profileOptionsOpened ? 'opacity-100' : 'opacity-0'}`}><Link href='/profile' >Profile</Link></li>
                <li className={`hover:bg-slate-200 transition-all duration-300 ${profileOptionsOpened ? 'opacity-100' : 'opacity-0'}`}><Link href='/' >Settings</Link></li>
                <li className={`hover:bg-slate-200 transition-all duration-300 ${profileOptionsOpened ? 'opacity-100' : 'opacity-0'} rounded-b-lg pb-1`} onClick={() => signOut({redirect: false})}><Link href='/' >Sign Out</Link></li>
              </ul>
            </div>
          </button>
        </>
      )
    }
    return (
        <button className='bg-secondary mx-2 p-2 rounded-lg' onClick={() => signIn('spotify')}>Login</button>
    )
  }