import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const Header = () => {
    return (
        <div className='flex justify-between p-5 shadow-md bg-black'>
        
            {/* <Image src={'/logo.png'} width={100} height={100} alt='Logo'/> */}
            <h1 className='bg-gradient-to-r from-blue-200 to-indigo-500 inline-block text-transparent bg-clip-text font-bold text-3xl '>Brain AI</h1>
           
           <Button>Get Started</Button>
        </div>
    );
}

export default Header;
