import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TestNavbar() {
    return (
        <div>
            <Navbar />
            {/* Voeg top padding toe zodat de vaste navbar de inhoud niet overlapt */}
            <main className="pt-28 px-6 min-h-screen">
                <h1>Testpagina voor Navbar</h1>
                <p>Gebruik de links in de navbar hierboven om te navigeren en te controleren of ze werken.</p>
                <p>
                    Interne testlink naar Home: <a href="/">Home</a>
                </p>
            </main>

            <Footer />
        </div>
    );
}
