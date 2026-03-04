import React from 'react';
import Navbar from '../components/Navbar';

export default function TestNavbar() {
    return (
        <div>
            <Navbar />
            <div style={{padding: 24}}>
                <h1>Testpagina voor Navbar</h1>
                <p>Gebruik de links in de navbar hierboven om te navigeren en te controleren of ze werken.</p>
                <p>
                    Interne testlink naar Home: <a href="/">Home</a>
                </p>
            </div>
        </div>
    );
}

