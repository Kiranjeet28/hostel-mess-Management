import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
      <div className='flex flex-row bg-white justify-between items-center p-5'>
          <Image src={'https://www.gpfwjammu.edu.in/images/name.png'} width={1000} height={100} alt='logo' />
          <Button variant="link">Registor</Button>
          <Button variant="link">Login</Button>
    </div>
  )
}

export default Header