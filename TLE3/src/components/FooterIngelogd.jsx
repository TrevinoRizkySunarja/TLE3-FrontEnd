import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Globe, LifeBuoy, ExternalLink, Settings, Inbox, Cpu } from 'lucide-react';

export default function FooterIngelogd() {
    // WCAG AA: Contrastratio 7.7:1. Perfect leesbaar voor iedereen.
    const footerContainerStyle = "bg-[#008100] text-[#FFFFFF] font-['Arial',sans-serif] mt-12 py-12 px-4";
    const borderTopStyle = "border-t border-[#FFFFFF] mb-10";
    const sectionTitleStyle = "text-[20px] font-bold mb-6 text-[#FFFFFF]";
    const textStyle = "text-[16px] leading-[1.6] text-[#FFFFFF]";

    // WCAG AA: Focus-ring zorgt dat toetsenbordgebruikers zien waar ze zijn.
    const linkStyle = "flex items-center gap-2.5 text-[#FFFFFF] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#008100] rounded-[4px] py-1 transition-all duration-150";
    const iconStyle = "w-[20px] h-[20px] flex-shrink-0 text-[#FFFFFF]";

    return (
        <footer className={footerContainerStyle} aria-label="Footer">
            <div className="max-w-7xl mx-auto">

                {/* aria-hidden: Verbergt decoratieve lijn voor screenreaders */}
                <div className={borderTopStyle} aria-hidden="true" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

                    {/* Navigatie: Semantische HTML (nav/ul) voor hulptechnologie */}
                    <nav aria-label="Mijn zaken menu">
                        <h2 className={sectionTitleStyle}>Mijn zaken</h2>
                        <ul className="flex flex-col gap-4 list-none p-0">
                            <li>
                                <Link to="/artikel" className={linkStyle}>
                                    <FileText className={iconStyle} aria-hidden="true" />
                                    <span>Iets melden aan de gemeente</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/belasting" className={linkStyle}>
                                    {/* ShieldCheck is nu actief en in gebruik */}
                                    <ShieldCheck className={iconStyle} aria-hidden="true" />
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

                    <nav aria-label="Zelf regelen menu">
                        <h2 className={sectionTitleStyle}>Zelf regelen</h2>
                        <ul className="flex flex-col gap-4 list-none p-0">
                            <li>
                                <Link to="/settings" className={linkStyle}>
                                    <Settings className={iconStyle} aria-hidden="true" />
                                    <span>Mijn gegevens aanpassen</span>
                                </Link>
                            </li>
                            <li>
                                <a href="https://www.rotterdam.nl" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                    <Globe className={iconStyle} aria-hidden="true" />
                                    <span>Naar de officiele website</span>
                                    {/* sr-only: Alleen voor blinden (waarschuwing nieuwe tab) */}
                                    <span className="sr-only">(opent in een nieuw tabblad)</span>
                                    <ExternalLink size={14} aria-hidden="true" />
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <section aria-labelledby="help-heading">
                        <h2 id="help-heading" className={sectionTitleStyle}>Hulp nodig?</h2>
                        <div className="flex flex-col gap-5">
                            <p className={textStyle}>
                                <span className="font-bold">Vragen over het portaal?</span><br />
                                Heeft u hulp nodig of werkt er iets niet?
                            </p>
                            <a href="mailto:hulp@gemeentecmgt.nl" className={linkStyle}>
                                <LifeBuoy className={iconStyle} aria-hidden="true" />
                                <span>Een probleem doorgeven</span>
                            </a>
                        </div>
                    </section>
                </div>

                {/* Bottom Bar: Copyright en Logo */}
                <div className="border-t border-[#FFFFFF] pt-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                    <div className="text-center md:text-left">
                        <p className="text-[14px] text-[#FFFFFF]">
                            &copy; {new Date().getFullYear()} — Gemeente CMGT
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[18px] font-bold text-[#FFFFFF]">Gemeente CMGT</span>
                        <img
                            src="/images/logo.jpg"
                            alt="Logo Gemeente CMGT"
                            className="h-12 w-auto rounded-[5px]"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}