import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, LogIn, User, X, Menu, Info } from 'lucide-react';

export default function Navbar() {
    // WCAG AA: Contrastratio min. 4.5:1. Focus-ring voor toetsenbord-gebruikers.
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-black text-white hover:bg-[#007000] focus:ring-4 focus:ring-[#007000]/40 outline-none border-none`;

    const [mobileOpen, setMobileOpen] = useState(false);
    // Dummy state voor inlogstatus (zou uit een AuthContext komen)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Toegankelijkheid: Voorkomt scrollen op achtergrond als menu open is.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileOpen]);

    // WCAG eis: Overlays moeten met de 'Escape' toets gesloten kunnen worden.
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-[2px] md:hidden"
                    style={{ top: '104px' }}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            <nav role="navigation" aria-label="Hoofdnavigatie" className="fixed top-0 left-0 right-0 z-[50] bg-white border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-sans">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" aria-label="Naar de startpagina">
                            <div className="h-16 w-48 flex items-center">
                                <img
                                    src="/images/logo.jpg"
                                    alt="Logo Gemeente Rotterdam"
                                    className="rounded-[5px]"
                                    style={{ height: '64px', width: 'auto', transform: 'scale(1.6)', transformOrigin: 'left center' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu: Alleen AI en Inloggen */}
                    <div className="hidden md:flex gap-4">
                        <Link to="/ai-transparantie" className={blackBtnStyle} aria-label="Informatie over AI & Algoritmes">
                            <Cpu size={20} aria-hidden="true" /><span>AI & Algoritmes</span>
                        </Link>
                        <Link to="/informatie" className={blackBtnStyle} aria-label="Over ons">
                            <Info size={20} aria-hidden="true" /><span>Over ons</span>
                        </Link>

                        {isLoggedIn ? (
                            <Link to="/login" className={blackBtnStyle} aria-label="Mijn Account">
                                <User size={20} aria-hidden="true" /><span>Mijn Account</span>
                            </Link>
                        ) : (
                            <Link to="/login" className={blackBtnStyle} aria-label="Inloggen bij Mijn Rotterdam">
                                <LogIn size={20} aria-hidden="true" /><span>Inloggen</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobiel Menu Knop */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
                            className="p-2 relative z-[60] rounded-md focus:ring-4 focus:ring-[#007000]/30 text-black"
                        >
                            {mobileOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>

                        {mobileOpen && (
                            <div id="mobile-menu" className="absolute left-0 top-full w-full bg-white border-b border-[#E0E0E0] shadow-xl z-[50]">
                                <div className="flex flex-col p-4 pb-12 gap-3">
                                    <Link to="/ai-transparantie" onClick={() => setMobileOpen(false)} className={blackBtnStyle}>
                                        <Cpu size={20} aria-hidden="true" /><span>AI & Algoritmes</span>
                                    </Link>
                                    <Link to="/informatie" onClick={() => setMobileOpen(false)} className={blackBtnStyle}>
                                        <Info size={20} aria-hidden="true" /><span>Over ons</span>
                                    </Link>
                                    <Link to={isLoggedIn ? "/settings" : "/login"} onClick={() => setMobileOpen(false)} className={blackBtnStyle}>
                                        {isLoggedIn ? <User size={20} aria-hidden="true" /> : <LogIn size={20} aria-hidden="true" />}
                                        <span>{isLoggedIn ? "Mijn Account" : "Inloggen"}</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="h-30px]" aria-hidden="true"></div>
        </>
    );
}