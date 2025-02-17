"use client";
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { HiOutlineHome, HiOutlinePower, HiOutlineShieldCheck, HiOutlineSquare3Stack3D } from 'react-icons/hi2';

const Sidebar = () => {

    const Menu = [
        
        {
            id:0,
            name:'Home',
            icon:<HiOutlineHome/>,
            path:'/dashboard'
        },
        {
            id:1,
            name:'Explore',
            icon:<HiOutlineSquare3Stack3D/>,
            path:'/dashboard/explore'
        },
        {
            id:2,
            name:'Upgrade',
            icon:<HiOutlineShieldCheck />,
            path:'/dashboard/upgrade'
        },
        {
            id:3,
            name:'Logout',
            icon:<HiOutlinePower />,
            path:'/dashboard/logout'
        },
        
    ]


    const path = usePathname();


    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <h1 className='bg-gradient-to-r from-blue-200 to-indigo-500 inline-block text-transparent bg-clip-text font-bold text-3xl '>Brain AI</h1>

            <hr className='my-5' />

            <ul> 
                {Menu.map((item,index) => (
                    <Link href={item.path}>
                    <div className={`items-center flex gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${item.path == path && 'bg-gray-100 text-black'}`} key={index}> 
                        <div className='text-2xl'> { item.icon }</div>
                        <h2>{item.name}</h2>
                    </div>
                    </Link>
                ))}
            </ul>

            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={33}/>
                <h2 className='text-sm my-2'> 3 Out of 5 Courses created</h2>
                <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generation</h2>
            </div>
        </div>
    );
}

export default Sidebar;
