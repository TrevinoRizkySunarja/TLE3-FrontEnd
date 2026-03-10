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
            <h1> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, id itaque iusto magnam nobis perferendis placeat quam totam ullam vero. Corporis incidunt laboriosam maiores nobis provident quod recusandae rem unde.</h1>
            <main className="pt-20 md:pt-24">
                <Outlet />
            </main>
        </div>
    );
}
