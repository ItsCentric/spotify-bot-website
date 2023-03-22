import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Link from "next/link";

export default function LoginButton() {
    const { data: session } = useSession();

    if (session) {
      return (
        <Link href='/profile' className='bg-green-dark hover:bg-green-dark/80 p-2 rounded-lg transition-colors'>Dashboard</Link>
      )
    }
    return (
        <button className='bg-green-dark hover:bg-green-dark/80 p-2 rounded-lg transition-colors' onClick={() => signIn('spotify')}>Login</button>
    )
  }