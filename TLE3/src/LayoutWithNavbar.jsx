import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

export default function LayoutWithNavbar() {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            {/* Add top padding so the fixed navbar doesn't overlap page content */}
            <main className="pt-20 md:pt-24">
                <Outlet />
            </main>
        </div>
    );
}
