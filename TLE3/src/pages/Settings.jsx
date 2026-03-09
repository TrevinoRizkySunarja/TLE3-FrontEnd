import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Settings() {
    return (
        <div style={{ padding: 24 }}>
            <h1 className="text-2xl font-bold">Instellingen</h1>

            <nav aria-label="Instellingen navigatie" className="mt-4 mb-4">
                <ul className="flex gap-4">
                    <li>
                        <Link to="ai-transparantie" className="text-[#000] font-semibold">AI Transparantie</Link>
                    </li>
                    {/* Add other setting links here */}
                </ul>
            </nav>

            <hr />

            {/* Nested routes render below */}
            <div className="mt-4">
                <Outlet />
            </div>
        </div>
    );
}

