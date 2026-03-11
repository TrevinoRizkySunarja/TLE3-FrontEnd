import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Inbox, PlusSquare, Settings, LogOut, Cpu, Menu, X } from 'lucide-react';

export default function Navbar() {
    // WCAG AA: Contrastratio min. 4.5:1. Focus-ring voor toetsenbord-gebruikers.
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-black text-white hover:bg-[#007000] focus:ring-4 focus:ring-[#007000]/40 outline-none border-none`;

    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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
            {/* Overlay: Klikken naast het menu sluit het menu (gebruiksvriendelijkheid). */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-[2px] md:hidden"
                    style={{ top: '104px' }}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Navbar: Semantische 'nav' met aria-label voor screenreaders. */}
            <nav role="navigation" aria-label="Hoofdnavigatie" className="fixed top-0 left-0 right-0 z-[50] bg-white border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-sans">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo: aria-label vertelt screenreader waar de link naar toe gaat. */}
                    <div className="flex items-center">
                        <Link to="/fyp" aria-label="Naar Mijn Overzicht" onClick={() => setMobileOpen(false)}>
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

                    {/* Desktop Menu: Iconen zijn aria-hidden omdat tekst al aanwezig is. */}
                    <div className="hidden md:flex flex-wrap gap-2">
                        <Link to="/fyp" className={blackBtnStyle} aria-label="Mijn Overzicht">
                            <Home size={20} aria-hidden="true" /><span>Mijn Overzicht</span>
                        </Link>
                        <Link to="/belasting" className={blackBtnStyle} aria-label="Berichtenbox">
                            <Inbox size={20} aria-hidden="true" /><span>Berichtenbox</span>
                        </Link>
                        <Link to="/artikel" className={blackBtnStyle} aria-label="Melding Maken">
                            <PlusSquare size={20} aria-hidden="true" /><span>Melding Maken</span>
                        </Link>
                        <Link to="/ai-transparantie" className={blackBtnStyle} aria-label="AI & Algoritmes">
                            <Cpu size={20} aria-hidden="true" /><span>AI & Algoritmes</span>
                        </Link>
                        <Link to="/settings" className={blackBtnStyle} aria-label="Mijn Gegevens">
                            <Settings size={20} aria-hidden="true" /><span>Mijn Gegevens</span>
                        </Link>
                        <Link to="/loguit" className={blackBtnStyle} aria-label="Uitloggen">
                            <LogOut size={20} aria-hidden="true" /><span>Uitloggen</span>
                        </Link>
                    </div>

                    {/* Mobiel Menu Knop: aria-expanded geeft status door aan screenreader. */}
                    <div className="md:hidden">
                        <button
                            ref={buttonRef}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
                            className="p-2 relative z-[60] rounded-md focus:ring-4 focus:ring-[#007000]/30 text-black"
                        >
                            {mobileOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                        </button>

                        {/* Mobiele Dropdown: id matcht met aria-controls van de button. */}
                        {mobileOpen && (
                            <div
                                id="mobile-menu"
                                className="absolute left-0 top-full w-full bg-white border-b border-[#E0E0E0] shadow-xl z-[50]"
                            >
                                <div className="flex flex-col p-4 pb-12 gap-3">
                                    <Link to="/fyp" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full`}><Home size={20} aria-hidden="true" /><span>Mijn Overzicht</span></Link>
                                    <Link to="/belasting" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full`}><Inbox size={20} aria-hidden="true" /><span>Berichtenbox</span></Link>
                                    <Link to="/artikel" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full`}><PlusSquare size={20} aria-hidden="true" /><span>Melding Maken</span></Link>
                                    <Link to="/ai-transparantie" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full`}><Cpu size={20} aria-hidden="true" /><span>AI & Algoritmes</span></Link>
                                    <Link to="/settings" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full`}><Settings size={20} aria-hidden="true" /><span>Mijn Gegevens</span></Link>
                                    <Link to="/loguit" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full`}><LogOut size={20} aria-hidden="true" /><span>Uitloggen</span></Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {/* Spacer: Voorkomt dat pagina-content achter de navbar verdwijnt. */}
            <div className="h-[30px]" aria-hidden="true"></div>
        </>
    );
}