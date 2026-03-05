import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Globe, LifeBuoy, ExternalLink, Settings } from 'lucide-react';

export default function Footer() {
    // === Styleguide & WCAG AA Klassen ===
    // Wit op Groen (#008100) voor optimaal contrast (7.7:1).
    const footerContainerStyle = "bg-[#008100] text-[#FFFFFF] font-['Arial',sans-serif] mt-12 py-12 px-4";
    const borderTopStyle = "border-t border-[#FFFFFF] mb-10";
    const sectionTitleStyle = "text-[20px] font-bold mb-6 text-[#FFFFFF]";
    const textStyle = "text-[16px] leading-[1.6] text-[#FFFFFF]";

    const linkStyle = "flex items-center gap-2.5 text-[#FFFFFF] hover:underline focus:ring-2 focus:ring-[#FFFFFF] focus:outline-none rounded-[4px] py-1 transition-all duration-150";
    const iconStyle = "w-[20px] h-[20px] flex-shrink-0 text-[#FFFFFF]";

    return (
        <footer className={footerContainerStyle} aria-label="Ambtenaars Portaal Footer">
            <div className="max-w-7xl mx-auto">

                {/* Witte lijn conform de stijlgids */}
                <div className={borderTopStyle} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* KOLOM 1: Content Beheer */}
                    <nav aria-label="Content beheer">
                        <h3 className={sectionTitleStyle}>Content Beheer</h3>
                        <ul className="flex flex-col gap-4">
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

                    {/* KOLOM 2: Interne Hulpmiddelen */}
                    <nav aria-label="Interne tools">
                        <h3 className={sectionTitleStyle}>Interne Tools</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a href="https://rotterdam.nl" target="_blank" rel="noreferrer" className={linkStyle}>
                                    <Globe className={iconStyle} aria-hidden="true" />
                                    <span>Bekijk Publieke Site</span>
                                    <ExternalLink size={14} aria-hidden="true" />
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

                    {/* KOLOM 3: Support */}
                    <section>
                        <h3 className={sectionTitleStyle}>Support</h3>
                        <div className="flex flex-col gap-5">
                            <p className={textStyle}>
                                <span className="font-bold">IT-Servicedesk CMS:</span><br />
                                Voor technische ondersteuning bij het publiceren.
                            </p>
                            <a href="mailto:support.beheer@rotterdam.nl" className={linkStyle}>
                                <LifeBuoy className={iconStyle} aria-hidden="true" />
                                <span>Technisch probleem melden</span>
                            </a>
                        </div>
                    </section>
                </div>

                {/* BOTTOM BAR: Tekst en Logo direct naast elkaar */}
                <div className="border-t border-[#FFFFFF] pt-8 flex flex-col md:flex-row justify-between items-end gap-6">

                    {/* Linkerkant: Copyright en Systeeminformatie */}
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <p className="text-[14px] text-[#FFFFFF]">
                            &copy; {new Date().getFullYear()} — Ambtenaars Portaal v2.4.1
                        </p>
                    </div>

                    {/* Rechterkant: Tekst en Logo direct naast elkaar */}
                    <div className="flex items-center gap-4">
                        <span className="text-[18px] font-bold text-[#FFFFFF] leading-none">
                            Gemeente Rotterdam
                        </span>
                        <img
                            src="/images/logo.jpg"
                            alt=""
                            className="h-12 w-auto rounded-[5px] object-contain" // h-12 is subtieler (48px)
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}