import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronRight, MapPin, Loader2 } from 'lucide-react';
import { Button } from "../components/Button.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import { fetchWithHeader } from "../utils/api";
import NavbarUit from "../components/NavbarUit.jsx";


const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                // We gebruiken de helper die de x-api-key header al bevat
                const res = await fetchWithHeader('categories/');

                if (!res.ok) throw new Error('Kon de categorieën niet laden.');

                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setError("Er ging iets mis bij het ophalen van de diensten.");
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    const filteredItems = categories.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryUrl = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes("paspoort") || lowerName.includes("id")) return "/aanvraagform1";

        const links = {
            "wonen": "https://www.rotterdam.nl/wonen-wijken",
            "bouwen": "https://www.rotterdam.nl/bouwen-verbouwen",
            "afval": "https://www.rotterdam.nl/afval-aanbieden",
            "parkeren": "https://www.rotterdam.nl/parkeren",
            "belastingen": "https://www.rotterdam.nl/gemeentelijke-belastingen",
            "onderwijs": "https://www.rotterdam.nl/onderwijs-kinderopvang",
            "werk": "https://www.rotterdam.nl/werk-inkomen",
            "melding": "https://www.rotterdam.nl/melding-doen",
            "zorg": "https://www.rotterdam.nl/zorg-ondersteuning",
            "verhuizing": "https://www.rotterdam.nl/verhuizing-doorgeven",
            "rijbewijs": "https://www.rotterdam.nl/rijbewijs-aanvragen"
        };

        const foundKey = Object.keys(links).find(key => lowerName.includes(key));
        return foundKey ? links[foundKey] : `https://www.rotterdam.nl/zoeken?q=${encodeURIComponent(name)}`;
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#1B1B1B]">
            <NavbarUit />

            <header className="bg-[#F5F5F5] border-b border-[#E0E0E0] py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">Waarmee kunnen we u helpen?</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (searchTerm.trim()) window.location.href = `https://www.rotterdam.nl/zoeken?q=${encodeURIComponent(searchTerm)}`;
                        }}
                        className="relative max-w-xl mx-auto"
                    >
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Zoek naar bijv. afval, parkeren of verhuizen..."
                            className="w-full h-14 pl-5 pr-16 bg-white border-2 border-[#767676] focus:border-[#008100] outline-none text-lg"
                        />
                        <div className="absolute right-1.5 top-1.5 bottom-1.5">
                            <Button type="submit" className="px-5 h-full"><Send size={18} /></Button>
                        </div>
                    </form>
                </div>
            </header>

            <main className="max-w-6xl mx-auto py-12 px-6">
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#008100]" size={40} /></div>
                ) : error ? (
                    <div className="text-red-600 text-center p-4">{error}</div>
                ) : (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-6 bg-[#008100]" />
                            <h2 className="text-xl font-bold uppercase tracking-wide">
                                {searchTerm ? `Zoekresultaten` : `Veelgezochte onderwerpen`}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <AnimatePresence mode='popLayout'>
                                {filteredItems.map((cat, index) => (
                                    <motion.a
                                        key={cat._id || index}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        href={getCategoryUrl(cat.name)}
                                        target={getCategoryUrl(cat.name).startsWith('http') ? "_blank" : "_self"}
                                        className="flex items-center justify-between p-4 border border-[#D1D1D1] hover:border-[#008100] bg-white transition-all group"
                                    >
                                        <span className="text-[#007000] font-semibold group-hover:text-black">{cat.name}</span>
                                        <ChevronRight size={16} className="text-[#767676] group-hover:text-[#008100] transition-transform group-hover:translate-x-1" />
                                    </motion.a>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>
                )}
            </main>
            <FooterIngelogd />
        </div>
    );
};

export default Homepage;