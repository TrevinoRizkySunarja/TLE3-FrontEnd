import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function LayoutWithNavbar() {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

