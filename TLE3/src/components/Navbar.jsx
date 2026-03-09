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
        /* pb-10 zorgt ervoor dat de border-b (het streepje) lager komt te staan */
        // Make the navbar fixed at the top of the viewport so it stays during scroll
        // We keep the same visual styles but add fixed positioning and a high z-index
        <nav role="navigation" className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-['Arial',sans-serif]" aria-label="Hoofdnavigatie">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

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

                {/* DESKTOP NAVIGATIE LINKS (hidden op mobiele) */}
                <div className="hidden md:flex flex-wrap gap-2">
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

                    <Link to="/ai-transparantie" className={blackBtnStyle} aria-label="AI Transparantie" title="AI Transparantie">
                        <Cpu size={20} aria-hidden="true" />
                        <span>AI Transparantie</span>
                    </Link>

                    <Link to="/settings" className={blackBtnStyle} aria-label="Instellingen" title="Instellingen">
                        <Settings size={20} aria-hidden="true" />
                        <span>Instellingen</span>
                    </Link>

                    <Link to="/loguit" className={blackBtnStyle}>
                        <LogOut size={20} aria-hidden="true" />
                        <span>Uitloggen</span>
                    </Link>
                </div>

                {/* MOBILE: hamburger button */}
                {/* LET OP: 'relative' is hier verwijderd zodat het menu zich over de hele breedte kan uitvouwen */}
                <div className="md:hidden">
                    <button
                        ref={buttonRef}
                        onClick={() => setMobileOpen((s) => !s)}
                        aria-controls="mobile-menu"
                        aria-expanded={mobileOpen}
                        aria-label={mobileOpen ? 'Sluit navigatie' : 'Open navigatie'}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008100]"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Fullscreen transparent overlay to disable background interactions */}
                    {mobileOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMobileOpen(false);
                            }}
                            aria-hidden="true"
                        />
                    )}

                    {/* Dropdown paneel (Volledige breedte onder de navbar) */}
                    {mobileOpen && (
                        <div
                            ref={menuRef}
                            id="mobile-menu"
                            role="menu"
                            aria-label="Mobiele navigatie"
                            /* AANGEPAST: absolute positionering op left-0, w-full, en shadow voor een mooie drop-down over de hele breedte */
                            className="absolute left-0 top-full w-full bg-[#FFFFFF] border-b border-[#E0E0E0] shadow-xl z-50"
                        >
                            <div className="flex flex-col p-4 gap-3 max-w-7xl mx-auto">
                                <Link to="/" role="menuitem" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                    <Home size={20} aria-hidden="true" />
                                    <span>Home</span>
                                </Link>

                                <Link to="/belasting" role="menuitem" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                    <Inbox size={20} aria-hidden="true" />
                                    <span>Inbox</span>
                                </Link>

                                <Link to="/artikel" role="menuitem" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                    <PlusSquare size={20} aria-hidden="true" />
                                    <span>Artikel Creëren</span>
                                </Link>

                                <Link to="/ai-transparantie" role="menuitem" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                    <Cpu size={20} aria-hidden="true" />
                                    <span>AI Transparantie</span>
                                </Link>

                                <Link to="/settings" role="menuitem" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                    <Settings size={20} aria-hidden="true" />
                                    <span>Instellingen</span>
                                </Link>

                                <Link to="/loguit" role="menuitem" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                    <LogOut size={20} aria-hidden="true" />
                                    <span>Uitloggen</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}