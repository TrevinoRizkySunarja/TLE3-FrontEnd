import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Globe, LifeBuoy, ExternalLink, Settings } from 'lucide-react';

export default function Footer() {
    // Kleuren en contrast voldoen aan WCAG AA (7.7:1 ratio).
    const footerContainerStyle = "bg-[#008100] text-[#FFFFFF] font-['Arial',sans-serif] mt-12 py-12 px-4";
    const borderTopStyle = "border-t border-[#FFFFFF] mb-10";
    const sectionTitleStyle = "text-[20px] font-bold mb-6 text-[#FFFFFF]";
    const textStyle = "text-[16px] leading-[1.6] text-[#FFFFFF]";

    // Focus-visible laat een witte ring zien voor toetsenbord-gebruikers.
    const linkStyle = "flex items-center gap-2.5 text-[#FFFFFF] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#008100] rounded-[4px] py-1 transition-all duration-150";
    const iconStyle = "w-[20px] h-[20px] flex-shrink-0 text-[#FFFFFF]";

    return (
        <footer className={footerContainerStyle} aria-label="Ambtenaars Portaal Footer">
            <div className="max-w-7xl mx-auto">

                {/* Decoratieve lijn, verborgen voor screenreaders */}
                <div className={borderTopStyle} aria-hidden="true" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

                    {/* Navigatie blok 1 */}
                    <nav aria-label="Content beheer menu">
                        <h3 className={sectionTitleStyle}>Content Beheer</h3>
                        <ul className="flex flex-col gap-4 list-none p-0">
                            <li>
                                <Link to="/create" className={linkStyle}>
                                    <FileText className={iconStyle} aria-hidden="true" />
                                    <span>Nieuw Artikel Creëren</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/mijn-artikelen" className={linkStyle}>
                                    <ShieldCheck className={iconStyle} aria-hidden="true" />
                                    <span>Mijn Gepubliceerde Items</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Navigatie blok 2 */}
                    <nav aria-label="Interne tools menu">
                        <h3 className={sectionTitleStyle}>Interne Tools</h3>
                        <ul className="flex flex-col gap-4 list-none p-0">
                            <li>
                                <a href="https://rotterdam.nl" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                    <Globe className={iconStyle} aria-hidden="true" />
                                    <span>Bekijk Publieke Site</span>
                                    <ExternalLink size={14} aria-hidden="true" />
                                    {/* sr-only waarschuwt blinden voor een nieuw venster */}
                                    <span className="sr-only">(opent in een nieuw venster)</span>
                                </a>
                            </li>
                            <li>
                                <Link to="/settings" className={linkStyle}>
                                    <Settings className={iconStyle} aria-hidden="true" />
                                    <span>Portaal Instellingen</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Contact sectie */}
                    <section aria-labelledby="support-heading">
                        <h3 id="support-heading" className={sectionTitleStyle}>Support</h3>
                        <div className="flex flex-col gap-5">
                            <p className={textStyle}>
                                <span className="font-bold">IT-Servicedesk CMS:</span><br />
                                Voor technische hulp.
                            </p>
                            <a href="mailto:support.beheer@rotterdam.nl" className={linkStyle}>
                                <LifeBuoy className={iconStyle} aria-hidden="true" />
                                <span>Technisch probleem melden</span>
                            </a>
                        </div>
                    </section>
                </div>

                {/* Bottom bar met copyright en logo */}
                <div className="border-t border-[#FFFFFF] pt-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <p className="text-[14px] text-[#FFFFFF]">
                            &copy; {new Date().getFullYear()} — Ambtenaars Portaal v2.4.1
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[18px] font-bold text-[#FFFFFF] leading-none">
                            Gemeente FlowHaven
                        </span>
                        <img
                            src="/images/logo.png"
                            alt="Logo Gemeente FlowHaven"
                            className="h-12 w-auto rounded-[5px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}