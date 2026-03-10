import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Inbox, PlusSquare, Settings, LogOut, Cpu, Menu, X } from 'lucide-react';

export default function Navbar() {
    // Styleguide regels
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-[#000000] text-[#FFFFFF] hover:bg-[#008100] focus:ring-2 focus:ring-[#008100] outline-none`;

    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // BEVRIES SCROLLEN
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileOpen]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    // Close when clicking outside the dropdown
    useEffect(() => {
        const onClick = (e) => {
            if (!mobileOpen) return;
            if (menuRef.current && !menuRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, [mobileOpen]);

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
            <nav role="navigation" className="fixed top-0 left-0 right-0 z-[50] bg-[#FFFFFF] border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-['Arial',sans-serif]" aria-label="Hoofdnavigatie">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* LOGO SECTIE - Nu naar /fyp */}
                    <div className="flex items-center">
                        <Link to="/fyp" aria-label="Ga naar het overzicht" onClick={() => setMobileOpen(false)}>
                            <div className="h-16 w-48 flex items-center">
                                <img
                                    src="/images/logo.jpg"
                                    alt="Logo Gemeente"
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

                    {/* DESKTOP NAVIGATIE LINKS - "Mijn Overzicht" naar /fyp */}
                    <div className="hidden md:flex flex-wrap gap-2">
                        <Link to="/fyp" className={blackBtnStyle}>
                            <Home size={20} aria-hidden="true" />
                            <span>Mijn Overzicht</span>
                        </Link>
                        <Link to="/belasting" className={blackBtnStyle}>
                            <Inbox size={20} aria-hidden="true" />
                            <span>Berichtenbox</span>
                        </Link>
                        <Link to="/artikel" className={blackBtnStyle}>
                            <PlusSquare size={20} aria-hidden="true" />
                            <span>Melding Maken</span>
                        </Link>
                        <Link to="/ai-transparantie" className={blackBtnStyle}>
                            <Cpu size={20} aria-hidden="true" />
                            <span>AI & Algoritmes</span>
                        </Link>
                        <Link to="/settings" className={blackBtnStyle}>
                            <Settings size={20} aria-hidden="true" />
                            <span>Mijn Gegevens</span>
                        </Link>
                        <Link to="/loguit" className={blackBtnStyle}>
                            <LogOut size={20} aria-hidden="true" />
                            <span>Uitloggen</span>
                        </Link>
                    </div>

                    {/* MOBILE: hamburger button */}
                    <div className="md:hidden">
                        <button
                            ref={buttonRef}
                            onClick={() => setMobileOpen((s) => !s)}
                            aria-expanded={mobileOpen}
                            className="p-2 relative z-[60] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008100]"
                        >
                            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        {/* Dropdown paneel */}
                        {mobileOpen && (
                            <div
                                ref={menuRef}
                                id="mobile-menu"
                                className="absolute left-0 top-full w-full bg-[#FFFFFF] border-b border-[#E0E0E0] shadow-xl z-[50]"
                            >
                                <div className="flex flex-col p-4 gap-3 max-w-7xl mx-auto">
                                    <Link to="/fyp" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                        <Home size={20} /><span>Mijn Overzicht</span>
                                    </Link>
                                    <Link to="/belasting" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                        <Inbox size={20} /><span>Berichtenbox</span>
                                    </Link>
                                    <Link to="/artikel" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                        <PlusSquare size={20} /><span>Melding Maken</span>
                                    </Link>
                                    <Link to="/ai-transparantie" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                        <Cpu size={20} /><span>AI & Algoritmes</span>
                                    </Link>
                                    <Link to="/settings" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                        <Settings size={20} /><span>Mijn Gegevens</span>
                                    </Link>
                                    <Link to="/loguit" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                        <LogOut size={20} /><span>Veilig Uitloggen</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}