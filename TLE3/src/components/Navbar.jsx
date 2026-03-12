import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Inbox, PlusSquare, Settings, LogOut, Cpu, Menu, X } from 'lucide-react';

export default function Navbar() {
    // Styling: Hoog contrast (zwart op wit) en duidelijke focus-ringen voor WCAG AA.
    const navBtnStyle = "flex items-center gap-2 px-4 py-2 text-[16px] font-bold transition-all duration-200 rounded-[4px] md:rounded-[8px]";
    const blackBtnStyle = `${navBtnStyle} bg-[#000000] text-[#FFFFFF] hover:bg-[#008100] focus:ring-2 focus:ring-[#008100] outline-none`;

    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Toegankelijkheid: Voorkomt scrollen op de achtergrond als menu open is.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileOpen]);

    return (
        <>
            {/* Overlay: Maakt de rest van de pagina donkerder bij mobiel menu. */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
                    onClick={() => setMobileOpen(false)}
                    style={{ top: '80px' }}
                />
            )}

            {/* Navbar: Altijd bovenop (z-50) met duidelijke rol-definitie. */}
            <nav role="navigation" className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b border-[#E0E0E0] pt-4 pb-6 px-4 font-['Arial',sans-serif]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo: Altijd terug naar home. */}
                    <div className="flex items-center">
                        <Link to="/" onClick={() => setMobileOpen(false)}>
                            <div className="h-16 w-48 flex items-center">
                                <img
                                    src="/images/logo.jpg"
                                    alt="Terug naar Home"
                                    className="rounded-[5px]"
                                    style={{ height: '64px', width: 'auto', transform: 'scale(1.6)', transformOrigin: 'left center' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu: Zichtbaar vanaf 'md' schermgrootte. */}
                    <div className="hidden md:flex flex-wrap gap-2">
                        <Link to="/" className={blackBtnStyle}><Home size={20} /><span>Home</span></Link>
                        <Link to="/belasting" className={blackBtnStyle}><Inbox size={20} /><span>Inbox</span></Link>
                        <Link to="/artikel" className={blackBtnStyle}><PlusSquare size={20} /><span>Artikel</span></Link>
                        <Link to="/settings" className={blackBtnStyle}><Settings size={20} /><span>Instellingen</span></Link>
                        <Link to="/logout" className={blackBtnStyle}><LogOut size={20} /><span>Uitloggen</span></Link>
                    </div>

                    {/* Mobiel Knop: Wisselt tussen Menu en Sluiten icoon. */}
                    <div className="md:hidden">
                        <button
                            ref={buttonRef}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
                            className="p-2 rounded-md focus:outline-none text-black"
                        >
                            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobiel Dropdown: Alleen zichtbaar op kleine schermen. */}
                {mobileOpen && (
                    <div
                        ref={menuRef}
                        className="absolute left-0 top-full w-full bg-white border-b border-gray-200 shadow-2xl md:hidden"
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
                            <Link to="/settings" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <Settings size={20} /><span>Instellingen</span>
                            </Link>
                            <Link to="/logout" onClick={() => setMobileOpen(false)} className={`${blackBtnStyle} w-full justify-start`}>
                                <LogOut size={20} /><span>Uitloggen</span>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}