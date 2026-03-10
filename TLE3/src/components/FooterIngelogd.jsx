import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Globe, LifeBuoy, ExternalLink, Settings, Inbox, Cpu } from 'lucide-react';

export default function FooterIngelogd() {
    // === Styleguide & WCAG AA Klassen ===
    // Wit op Groen (#008100) voor optimaal contrast (7.7:1).
    const footerContainerStyle = "bg-[#008100] text-[#FFFFFF] font-['Arial',sans-serif] mt-12 py-12 px-4";
    const borderTopStyle = "border-t border-[#FFFFFF] mb-10";
    const sectionTitleStyle = "text-[20px] font-bold mb-6 text-[#FFFFFF]";
    const textStyle = "text-[16px] leading-[1.6] text-[#FFFFFF]";

    const linkStyle = "flex items-center gap-2.5 text-[#FFFFFF] hover:underline focus:ring-2 focus:ring-[#FFFFFF] focus:outline-none rounded-[4px] py-1 transition-all duration-150";
    const iconStyle = "w-[20px] h-[20px] flex-shrink-0 text-[#FFFFFF]";

    return (
        <footer className={footerContainerStyle} aria-label="Onderkant van de pagina">
            <div className="max-w-7xl mx-auto">

                {/* Witte lijn conform de stijlgids */}
                <div className={borderTopStyle} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

                    {/* KOLOM 1: Mijn Zaken (Acties voor de burger) */}
                    <nav aria-label="Mijn zaken en meldingen">
                        <h2 className={sectionTitleStyle}>Mijn zaken</h2>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link to="/artikel" className={linkStyle}>
                                    <FileText className={iconStyle} aria-hidden="true" />
                                    <span>Iets melden aan de gemeente</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/belasting" className={linkStyle}>
                                    <Inbox className={iconStyle} aria-hidden="true" />
                                    <span>Mijn belastingen bekijken</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/ai-transparantie" className={linkStyle}>
                                    <Cpu className={iconStyle} aria-hidden="true" />
                                    <span>Uitleg over slimme systemen</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* KOLOM 2: Zelf regelen */}
                    <nav aria-label="Instellingen en website">
                        <h2 className={sectionTitleStyle}>Zelf regelen</h2>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link to="/settings" className={linkStyle}>
                                    <Settings className={iconStyle} aria-hidden="true" />
                                    <span>Mijn gegevens aanpassen</span>
                                </Link>
                            </li>
                            <li>
                                <a href="https://www.rotterdam.nl" target="_blank" rel="noreferrer" className={linkStyle}>
                                    <Globe className={iconStyle} aria-hidden="true" />
                                    <span>Naar de officiele gemeente website</span>
                                    <ExternalLink size={14} aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* KOLOM 3: Hulp nodig? */}
                    <section aria-label="Hulp en contact">
                        <h2 className={sectionTitleStyle}>Hulp nodig?</h2>
                        <div className="flex flex-col gap-5">
                            <p className={textStyle}>
                                <span className="font-bold">Hulp bij het portaal:</span><br />
                                Heeft u een vraag over deze website of werkt er iets niet?
                            </p>
                            <a href="mailto:hulp@gemeentecmgt.nl" className={linkStyle}>
                                <LifeBuoy className={iconStyle} aria-hidden="true" />
                                <span>Een probleem doorgeven</span>
                            </a>
                        </div>
                    </section>
                </div>

                {/* BOTTOM BAR: Copyright en Logo */}
                <div className="border-t border-[#FFFFFF] pt-8 flex flex-col md:flex-row justify-between items-end gap-6">

                    {/* Linkerkant: Jaartal */}
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <p className="text-[14px] text-[#FFFFFF]">
                            &copy; {new Date().getFullYear()} — Gemeente CMGT
                        </p>
                    </div>

                    {/* Rechterkant: Naam en Logo */}
                    <div className="flex items-center gap-4">
                        <span className="text-[18px] font-bold text-[#FFFFFF] leading-none">
                            Gemeente CMGT
                        </span>
                        <img
                            src="/images/logo.jpg"
                            alt=""
                            className="h-12 w-auto rounded-[5px] object-contain shadow-sm"
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}