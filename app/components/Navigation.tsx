'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className='bg-gray-900 text-white'>
            <nav className='flex items-center justify-between p-4'>
                <div className='flex items-center'>
                    <h1 className='text-xl font-bold'>
                        <Link href="/">MyApp</Link>
                    </h1>
                </div>
                <div className='lg:hidden'>
                    <button onClick={toggleMenu} className='text-white'>
                        {isOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
                    </button>
                </div>
                <div className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link href="/" className={`block py-2 px-4 ${pathname === '/' ? 'bg-gray-700' : ''}`}>Home</Link>
                    <Link href="/dashboard" className={`block py-2 px-4 ${pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>Dashboard</Link>
                    <Link href="/governance" className={`block py-2 px-4 ${pathname === '/governance' ? 'bg-gray-700' : ''}`}>Governance</Link>
                    <Link href="/profile" className={`block py-2 px-4 ${pathname === '/profile' ? 'bg-gray-700' : ''}`}>Profile</Link>
                    <Link href="/submission" className={`block py-2 px-4 ${pathname === '/submission' ? 'bg-gray-700' : ''}`}>Submission</Link>
                    <Link href="/repositories" className={`block py-2 px-4 ${pathname === '/repositories' ? 'bg-gray-700' : ''}`}>Repositories</Link>
                </div>
            </nav>
            <div className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 ${isOpen ? 'block' : 'hidden'}`} onClick={toggleMenu}></div>
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden bg-gray-900 text-white w-64 transition-transform duration-300`}>
                <nav className='p-4'>
                    <h2 className='text-2xl font-bold mb-4'>Menu</h2>
                    <Link href="/" className={`block py-2 px-4 ${pathname === '/' ? 'bg-gray-700' : ''}`}>Home</Link>
                    <Link href="/about" className={`block py-2 px-4 ${pathname === '/about' ? 'bg-gray-700' : ''}`}>About</Link>
                    <Link href="/repositories" className={`block py-2 px-4 ${pathname === '/repositories' ? 'bg-gray-700' : ''}`}>Repositories</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;
