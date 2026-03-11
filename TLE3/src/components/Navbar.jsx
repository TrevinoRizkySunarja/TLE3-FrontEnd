import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Inbox, PlusSquare, Settings, LogOut, Cpu, Menu, X } from 'lucide-react';

export default function Navbar() {
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-[#000000] text-[#FFFFFF] hover:bg-[#008100] focus:ring-2 focus:ring-[#008100] outline-none`;

    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Blokkeer scrollen op de body
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileOpen]);

    return (
        <>
            {/* 1. DE GRIJZE OVERLAY (Buiten de nav, maar over de hele pagina behalve de top) */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[40] transition-opacity duration-300"
                    onClick={() => setMobileOpen(false)}
                    style={{ top: '80px' }} // Zorgt dat de overlay pas onder de navbar begint
                />
            )}

            {/* 2. DE NAVBAR (Hogere z-index zodat deze boven de overlay blijft) */}
            <nav role="navigation" className="fixed top-0 left-0 right-0 z-[50] bg-[#FFFFFF] border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-['Arial',sans-serif]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* LOGO */}
                    <div className="flex items-center">
                        <Link to="/" onClick={() => setMobileOpen(false)}>
                            <div className="h-16 w-48 flex items-center">
                                <img
                                    src="/images/logo.jpg"
                                    alt="Logo"
                                    className="rounded-[5px]"
                                    style={{ height: '64px', width: 'auto', transform: 'scale(1.6)', transformOrigin: 'left center' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden md:flex flex-wrap gap-2">
                        <Link to="/" className={blackBtnStyle}><Home size={20} /><span>Home</span></Link>
                        <Link to="/belasting" className={blackBtnStyle}><Inbox size={20} /><span>Inbox</span></Link>
                        <Link to="/artikel" className={blackBtnStyle}><PlusSquare size={20} /><span>Artikel</span></Link>
                        <Link to="/ai-transparantie" className={blackBtnStyle}><Cpu size={20} /><span>AI</span></Link>
                        <Link to="/settings" className={blackBtnStyle}><Settings size={20} /><span>Instellingen</span></Link>
                        <Link to="/logout" className={blackBtnStyle}><LogOut size={20} /><span>Uitloggen</span></Link>
                    </div>

                    {/* MOBILE BUTTON */}
                    <div className="md:hidden">
                        <button
                            ref={buttonRef}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-md focus:outline-none text-black"
                        >
                            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* 3. HET DROPDOWN MENU (Zit in de nav, dus erft de hoge z-index) */}
                {mobileOpen && (
                    <div
                        ref={menuRef}
                        className="absolute left-0 top-full w-full bg-white border-b border-gray-200 shadow-2xl md:hidden animate-in slide-in-from-top-1 duration-200"
                    >
                        <div className="flex flex-col p-4 gap-3 bg-white">
                            <Link to="/" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <Home size={20} /><span>Home</span>
                            </Link>
                            <Link to="/belasting" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <Inbox size={20} /><span>Inbox</span>
                            </Link>
                            <Link to="/artikel" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <PlusSquare size={20} /><span>Artikel Creëren</span>
                            </Link>
                            <Link to="/ai-transparantie" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <Cpu size={20} /><span>AI Transparantie</span>
                            </Link>
                            <Link to="/settings" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <Settings size={20} /><span>Instellingen</span>
                            </Link>
                            <Link to="/loguit" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <LogOut size={20} /><span>Uitloggen</span>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}