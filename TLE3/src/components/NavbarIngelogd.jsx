import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Inbox, PlusSquare, Settings, LogOut, Cpu, Menu, X } from 'lucide-react';

export default function Navbar() {
    // WCAG AA FIX: Gebruik #007000 voor tekst/knoppen op wit voor 4.5:1 contrast
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-black text-white hover:bg-[#007000] focus:ring-4 focus:ring-[#007000]/40 outline-none border-none`;

    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // BEVRIES SCROLLEN
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileOpen]);

    // Close on Escape (WCAG eis voor overlays)
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {/* 1. GRIJZE OVERLAY */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-[2px] transition-opacity md:hidden"
                    style={{ top: '104px' }}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* 2. NAVBAR */}
            <nav role="navigation" aria-label="Hoofdnavigatie" className="fixed top-0 left-0 right-0 z-[50] bg-white border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-sans">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* LOGO */}
                    <div className="flex items-center">
                        <Link to="/fyp" aria-label="Mijn Overzicht" onClick={() => setMobileOpen(false)}>
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

                    {/* DESKTOP NAVIGATIE - Elke link heeft nu een aria-label die matcht met de tekst */}
                    <div className="hidden md:flex flex-wrap gap-2">
                        <Link to="/fyp" className={blackBtnStyle} aria-label="Mijn Overzicht">
                            <Home size={20} aria-hidden="true" />
                            <span>Mijn Overzicht</span>
                        </Link>
                        <Link to="/belasting" className={blackBtnStyle} aria-label="Berichtenbox">
                            <Inbox size={20} aria-hidden="true" />
                            <span>Berichtenbox</span>
                        </Link>
                        <Link to="/artikel" className={blackBtnStyle} aria-label="Melding Maken">
                            <PlusSquare size={20} aria-hidden="true" />
                            <span>Melding Maken</span>
                        </Link>
                        <Link to="/ai-transparantie" className={blackBtnStyle} aria-label="AI & Algoritmes">
                            <Cpu size={20} aria-hidden="true" />
                            <span>AI & Algoritmes</span>
                        </Link>
                        <Link to="/settings" className={blackBtnStyle} aria-label="Mijn Gegevens">
                            <Settings size={20} aria-hidden="true" />
                            <span>Mijn Gegevens</span>
                        </Link>
                        <Link to="/loguit" className={blackBtnStyle} aria-label="Uitloggen">
                            <LogOut size={20} aria-hidden="true" />
                            <span>Uitloggen</span>
                        </Link>
                    </div>

                    {/* MOBILE BUTTON */}
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

                        {/* Dropdown paneel */}
                        {mobileOpen && (
                            <div
                                ref={menuRef}
                                id="mobile-menu"
                                className="absolute left-0 top-full w-full bg-white border-b border-[#E0E0E0] shadow-xl z-[50]"
                            >
                                {/* pb-12 toegevoegd zodat het niet 'plakt' aan de onderkant op mobiel */}
                                <div className="flex flex-col p-4 pb-12 gap-3 max-w-7xl mx-auto">
                                    <Link to="/fyp" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`} aria-label="Mijn Overzicht">
                                        <Home size={20} aria-hidden="true" /><span>Mijn Overzicht</span>
                                    </Link>
                                    <Link to="/belasting" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`} aria-label="Berichtenbox">
                                        <Inbox size={20} aria-hidden="true" /><span>Berichtenbox</span>
                                    </Link>
                                    <Link to="/artikel" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`} aria-label="Melding Maken">
                                        <PlusSquare size={20} aria-hidden="true" /><span>Melding Maken</span>
                                    </Link>
                                    <Link to="/ai-transparantie" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`} aria-label="AI & Algoritmes">
                                        <Cpu size={20} aria-hidden="true" /><span>AI & Algoritmes</span>
                                    </Link>
                                    <Link to="/settings" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`} aria-label="Mijn Gegevens">
                                        <Settings size={20} aria-hidden="true" /><span>Mijn Gegevens</span>
                                    </Link>
                                    <Link to="/loguit" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`} aria-label="Veilig Uitloggen">
                                        <LogOut size={20} aria-hidden="true" /><span>Veilig Uitloggen</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {/* Spacer om te zorgen dat content niet onder de navbar begint */}
            <div className="h-[30px]" aria-hidden="true"></div>
        </>
    );
}