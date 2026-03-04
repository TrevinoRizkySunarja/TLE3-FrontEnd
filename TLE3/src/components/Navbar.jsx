import React from 'react';
import { Link } from 'react-router';
import { Home, Inbox, PlusSquare, Settings, LogOut } from 'lucide-react';

export default function Navbar() {
    // Styleguide regels
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-[#000000] text-[#FFFFFF] hover:bg-[#008100] focus:ring-2 focus:ring-[#008100] outline-none`;

    return (
        /* pb-10 zorgt ervoor dat de border-b (het streepje) lager komt te staan */
        <nav className="bg-[#FFFFFF] border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-['Arial',sans-serif]" aria-label="Hoofdnavigatie">
            <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">

                {/* LOGO SECTIE */}
                <div className="flex items-center">
                    <Link to="/" aria-label="Ga naar de hoofdpagina">
                        {/* Container groot genoeg maken voor het geschaalde logo */}
                        <div className="h-16 w-48 flex items-center">
                            <img
                                src="/images/logo.jpg"
                                alt="Logo"
                                className="rounded-[5px]"
                                style={{
                                    height: '64px',
                                    width: 'auto',
                                    transform: 'scale(1.6)',
                                    transformOrigin: 'left center',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </Link>
                </div>

                {/* NAVIGATIE LINKS */}
                <div className="flex flex-wrap gap-2">
                    <Link to="/" className={blackBtnStyle}>
                        <Home size={20} aria-hidden="true" />
                        <span>Home</span>
                    </Link>

                    <Link to="/belasting" className={blackBtnStyle}>
                        <Inbox size={20} aria-hidden="true" />
                        <span>Inbox</span>
                    </Link>

                    <Link to="/artikel" className={blackBtnStyle}>
                        <PlusSquare size={20} aria-hidden="true" />
                        <span>Artikel Creëren</span>
                    </Link>

                    <Link to="/settings" className={blackBtnStyle}>
                        <Settings size={20} aria-hidden="true" />
                        <span>Instellingen</span>
                    </Link>

                    <Link to="/loguit" className={blackBtnStyle}>
                        <LogOut size={20} aria-hidden="true" />
                        <span>Uitloggen</span>
                    </Link>
                </div>

            </div>
        </nav>
    );
}