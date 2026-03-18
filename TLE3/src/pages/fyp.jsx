import React, { useState, useEffect } from 'react';
import { AnimatePresence, useReducedMotion, motion } from 'framer-motion';
import { Search, ChevronRight, Loader2, Send, CheckCircle, X } from 'lucide-react';
import { Button } from "../components/Button.jsx";
import { AICard } from "../components/AICard.jsx";
import { XAIExplanation } from "../components/XAIExplanation.jsx";
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";
import {useLocation, useNavigate} from 'react-router-dom';

const FYP = () => {
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();

    const API_BASE_URL = "http://145.24.237.215:8000/api";
    const API_KEY = ""; // Vul je API key in zodra je die hebt

    // States

    const [feedItems, setFeedItems] = useState([]);
    const [showTransparency, setShowTransparency] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadData = async () => {
            setLoading(true);
            try {
                const [catRes, feedRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/categories`),
                    fetch(`${API_BASE_URL}/content-items`, {
                        headers: API_KEY ? { "x-api-key": API_KEY } : {}
                    })
                ]);

                const catData = await catRes.json();
                setCategories(catData);

                if (feedRes.ok) {
                    const feedData = await feedRes.json();
                    if (feedData && feedData.length > 0) {
                        setFeedItems(feedData.map(item => ({
                            id: item._id || item.id,
                            title: item.title,
                            body: item.body,
                            isUrgent: item.is_urgent,
                            reason: item.is_urgent
                                ? "Hoge prioriteit wegens een naderende deadline in uw persoonsgegevens (BRP)."
                                : `Aanbevolen op basis van uw interesse in ${item.content_type || 'diensten'}.`,
                        })));
                    } else {
                        setFeedItems(getFallbackFeed());
                    }
                } else {
                    setFeedItems(getFallbackFeed());
                }
            } catch (err) {
                setFeedItems(getFallbackFeed());
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getFallbackFeed = () => [
        { id: 'f1', title: 'Paspoort verlengen', body: 'Uw paspoort verloopt binnenkort. Maak nu een afspraak.', isUrgent: true, reason: 'Gebaseerd op de verloopdatum in de Basisregistratie Personen (BRP).' },
        { id: 'f2', title: 'Subsidie Verduurzaming', body: 'U komt mogelijk in aanmerking voor een subsidie voor uw woning.', isUrgent: false, reason: 'Gegenereerd op basis van uw recente adreswijziging in onze database.' }
    ];

    const removeItem = (id) => {
        setFeedItems(prev => prev.filter(item => item.id !== id));
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen font-sans text-[#1B1B1B]">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#008100] text-white p-4 z-50">
                Skip naar hoofdinhoud
            </a>

            <NavbarIngelogd />

            {/* Header met Navbar */}
            <header className="bg-[#F5F5F5] border-b border-[#E0E0E0] pt-20 pb-12 px-6 mt-[-60px]">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                        Welkom {user?.first_name}
                    </h1>
                    <form role="search" className="relative max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Waarmee kunnen we u helpen?"
                            className="w-full h-14 pl-12 pr-32 bg-white border-2 border-[#767676] focus:border-[#008100] outline-none text-lg shadow-sm appearance-none [&::-webkit-search-cancel-button]:appearance-none"
                        />
                        <Search className="absolute left-4 top-4 text-[#767676]" size={24} aria-hidden="true" />
                        
                        <div className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center gap-x-1">
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    className="flex items-center justify-center h-11 w-11 text-[#767676] hover:text-black"
                                    aria-label="Zoekopdracht wissen"
                                >
                                    <X size={20} />
                                </button>
                            )}
                            <Button type="submit" className="px-5 h-full" aria-label="Zoeken">
                                <Send size={18} />
                            </Button>
                        </div>
                    </form>
                </div>
            </header>

            <main id="main-content" className="max-w-4xl mx-auto p-4 md:p-8 outline-none">
                {!searchTerm && (
                    <section aria-labelledby="ai-title" className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-[#008100]" aria-hidden="true" />
                            <h2 id="ai-title" className="text-xl font-bold uppercase tracking-wide">Speciaal voor u</h2>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {feedItems.length > 0 ? (
                                <div className="space-y-6">
                                    {feedItems.map(item => (
                                        <AICard
                                            key={item.id}
                                            item={item}
                                            onRemove={removeItem}
                                            onNavigate={() => navigate('/aanvraag/stap-1')}
                                            shouldReduceMotion={shouldReduceMotion}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-16 text-center border-2 border-dashed border-[#CCCCCC] rounded-[5px] bg-[#F9F9F9]"
                                    role="status"
                                >
                                    <CheckCircle size={48} className="mx-auto text-[#008100] mb-4" />
                                    <h3 className="text-xl font-bold">U bent helemaal up-to-date!</h3>
                                    <p className="text-[#666]">Er zijn momenteel geen nieuwe suggesties voor u.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <XAIExplanation
                            isOpen={showTransparency}
                            onToggle={() => setShowTransparency(!showTransparency)}
                            items={feedItems}
                        />
                    </section>
                )}

                <section className="mt-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-[#008100]" aria-hidden="true" />
                        <h2 className="text-xl font-bold uppercase tracking-wide text-black">
                            {searchTerm ? `Resultaten voor "${searchTerm}"` : "Alle Diensten"}
                        </h2>
                    </div>
                    {loading ? (
                        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#008100]" size={40} /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCategories.map((cat) => (
                                <a key={cat._id} href="#" className="flex items-center justify-between p-5 border border-[#D1D1D1] hover:border-[#008100] bg-white group no-underline transition-all focus:ring-4 focus:ring-[#008100]/30 outline-none">
                                    <span className="text-[#007000] font-bold group-hover:text-black">{cat.name}</span>
                                    <ChevronRight size={18} className="text-[#767676] group-hover:translate-x-1 transition-transform" />
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <FooterIngelogd />
        </div>
    );
};

export default FYP;