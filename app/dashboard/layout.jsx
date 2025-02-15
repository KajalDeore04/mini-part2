import React from 'react';
import Sidebar from './_components/Sidebar.jsx';
import Header from './_components/Header.jsx';

const DashboardLayout = ({children}) => {
    return (
        <div>
            <div className='md:w-64 hidden md:block'>
                <Sidebar />
            </div>
           <div className='md:ml-64'>
            <Header />
                {children}   
           </div>
        </div>
    );
}

export default DashboardLayout;
