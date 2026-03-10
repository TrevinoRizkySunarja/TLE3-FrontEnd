import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Info, ChevronDown, X } from 'lucide-react';
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";

const FYP = () => {
    // Beheert de gebruikersnaam voor de persoonlijke begroeting.
    const [user, setUser] = useState({ name: 'Laden...' });

    // De lijst met actieve meldingen die getoond worden in de feed.
    const [feedItems, setFeedItems] = useState([
        {
            id: 1,
            title: 'Paspoort',
            body: 'Uw paspoort verloopt binnenkort, verleng hem nu!',
            actionText: 'Paspoort verlengen',
            type: 'ai-suggestion',
            reason: 'Gebaseerd op de verloopdatum in de Basisregistratie Personen (BRP).'
        },
        {
            id: 2,
            title: 'Subsidie',
            body: 'Gefeliciteerd met uw nieuwe woning. Check of u recht heeft op een subsidie.',
            actionText: 'Subsidie bekijken',
            type: 'ai-suggestion',
            reason: 'Gegenereerd op basis van uw recente adreswijziging in onze database.'
        },
        {
            id: 3,
            title: 'Parkeervergunning',
            body: 'Gefeliciteerd met uw nieuwe auto, check hier de parkeervergunning mogelijkheden.',
            actionText: 'Parkeervergunning aanvragen',
            type: 'ai-suggestion',
            reason: 'Gekoppeld aan de RDW-registratie van uw nieuwe voertuig.'
        }
    ]);

    // Toggle voor het tonen of verbergen van de AI-transparantie sectie.
    const [showTransparency, setShowTransparency] = useState(false);

    // Houdt rekening met gebruikers die minder animaties willen (WCAG toegankelijkheid).
    const shouldReduceMotion = useReducedMotion();

    // Haalt bij montage van de component de gebruikersgegevens op.
    useEffect(() => {
        const mockUser = { name: 'Jan Jansen' };
        setUser(mockUser);
    }, []);

    // Verwijdert een specifieke melding uit de lijst op basis van ID.
    const removeItem = (id) => {
        setFeedItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Definieert de animatie-instellingen voor het verschijnen en verdwijnen van kaarten.
    const cardAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: {
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 0.98,
            transition: { duration: 0.2, ease: "easeInOut" }
        }
    };

    return (
        <div className="bg-[#FFFFFF] min-h-screen font-sans text-[#1B1B1B]">
            <NavbarIngelogd />

            <main className="max-w-4xl mx-auto p-4 md:p-8" id="main-content">
                {/* Pagina-titel met persoonlijke begroeting */}
                <header className="mb-8">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#000000] leading-tight mb-2">
                        Welkom {user.name}
                    </h1>
                    <div className="h-px bg-[#E0E0E0] w-full" aria-hidden="true" />
                </header>

                {/* Overzicht van alle actuele meldingen met animaties */}
                <section className="space-y-6" aria-label="Persoonlijke feed">
                    <AnimatePresence mode="popLayout">
                        {feedItems.length > 0 ? (
                            feedItems.map((item) => (
                                <motion.article
                                    key={item.id}
                                    layout
                                    variants={cardAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className={`p-6 border relative rounded-[5px] focus-within:ring-4 focus-within:ring-[#008100]/30 ${
                                        item.type === 'ai-suggestion'
                                            ? 'bg-[#F9F9FF] border-[#008100]/30 shadow-sm'
                                            : 'bg-[#F5F5F5] border-[#E0E0E0]'
                                    }`}
                                >
                                    {/* Label voor AI-gegenereerde content met Sparkles icoon */}
                                    {item.type === 'ai-suggestion' && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles size={14} className="text-[#008100]" aria-hidden="true" />
                                            <span className="text-[12px] font-bold text-[#008100] uppercase tracking-widest">
                                                AI Suggestie
                                            </span>
                                        </div>
                                    )}

                                    {/* Knop om een melding direct te verwijderen */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-4 right-4 text-[#1B1B1B] hover:text-[#008100] focus:ring-2 focus:ring-[#008100] p-2 transition-colors rounded-full outline-none"
                                        aria-label={`Verwijder melding: ${item.title}`}
                                    >
                                        <X size={20} />
                                    </button>

                                    <h2 className="text-[24px] font-bold text-[#000000] mb-2 pr-8">{item.title}</h2>
                                    <p className="text-[16px] leading-[1.6] mb-6">{item.body}</p>

                                    {/* Actieknoppen voor de gebruiker per melding */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <Button variant="secondary" onClick={() => {}}>➔ {item.actionText}</Button>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-[14px] font-bold text-[#1B1B1B] underline hover:text-[#008100] focus:ring-2 focus:ring-[#008100] py-2 transition-colors rounded-[5px] outline-none"
                                        >
                                            Markeer als afgehandeld
                                        </button>
                                    </div>
                                </motion.article>
                            ))
                        ) : (
                            /* Lege staat wanneer er geen meldingen meer zijn */
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center border-2 border-dashed border-[#E0E0E0] rounded-[5px]"
                                role="status"
                            >
                                <p className="text-lg">U bent volledig bij met uw gemeentelijke zaken.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Sectie die uitlegt welke data de AI heeft gebruikt voor de suggesties */}
                <section className="mt-12 pt-8 border-t border-[#E0E0E0]">
                    <button
                        onClick={() => setShowTransparency(!showTransparency)}
                        className="w-full bg-[#F5F5F5] p-4 flex justify-between items-center text-left hover:bg-[#E0E0E0] focus:ring-2 focus:ring-[#008100] transition-colors border border-[#E0E0E0] rounded-[5px] outline-none"
                        aria-expanded={showTransparency}
                    >
                        <div className="flex items-center gap-3">
                            <Info size={20} className="text-[#008100]" aria-hidden="true" />
                            <h3 className="text-[18px] font-bold">Hoe komt de AI bij deze keuzes?</h3>
                        </div>
                        <motion.div
                            animate={{ rotate: showTransparency ? 180 : 0 }}
                            className="flex items-center justify-center"
                        >
                            <ChevronDown size={24} />
                        </motion.div>
                    </button>

                    {/* Uitklapbare lijst met bronvermelding per melding */}
                    <AnimatePresence>
                        {showTransparency && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-[#F9F9FF] border-x border-b border-[#008100]/20 rounded-b-[5px]"
                            >
                                <div className="p-6 text-[14px]">
                                    <p className="mb-4 font-bold text-[#008100]">Bronnen van uw suggesties:</p>
                                    <ul className="space-y-3">
                                        {feedItems.map(i => (
                                            <li key={i.id} className="flex gap-3 border-l-2 border-[#008100] pl-3">
                                                <div>
                                                    <span className="font-bold">{i.title}:</span>
                                                    <p className="text-[#4B4B4B]">{i.reason}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </main>
            <FooterIngelogd />
        </div>
    );
};

export default FYP;