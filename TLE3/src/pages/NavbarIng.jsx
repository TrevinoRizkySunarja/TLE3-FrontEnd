import NavbarIngelogd from '../components/NavbarIngelogd';
import Footer from '../components/Footer';
import React from "react";
import FooterIngelogd from "../components/FooterIngelogd.jsx";

function NavbarIng() {
    return (
        <div>
            <NavbarIngelogd />
            {/* Voeg top padding toe zodat de vaste navbar de inhoud niet overlapt */}
            <main className="pt-28 px-6 min-h-screen">
                <h1>Testpagina voor Navbar</h1>
                <p>Gebruik de links in de    navbar hierboven om te navigeren en te controleren of ze werken.</p>
                <p>
                    Interne testlink naar Home: <a href="/">Home</a>
                </p>
            </main>
            <FooterIngelogd />
        </div>
    );
}

export default NavbarIng;
