import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { signIn } from 'next-auth/react';

function Header() {
  return (
    <div>
      <div className='flex flex-row bg-white justify-between items-center p-5'>
        <Image
          src={'https://www.gpfwjammu.edu.in/images/name.png'}
          width={1100}
          height={10}
          alt='logo'
        />

        <Button
          variant="link"
          className='rounded-full p-5 bg-[#015091] text-white font-sans text-lg px-7'
          onClick={() => signIn('google')} // Trigger Google sign-in
        >
          Sign in with Google
        </Button>
      </div>
      <div className='bg-[#015091] text-white font-serif text-[40px] flex items-center justify-center'>
        <span>Hostel Mess Management System</span>
      </div>
    </div>
  );
}

export default Header;
