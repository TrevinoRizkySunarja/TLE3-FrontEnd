import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronRight, MapPin, Loader2, Search, X } from 'lucide-react';
import { Button } from "../components/Button.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";
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
                const res = await fetch('http://145.24.237.215:8000/api/v2/categories');
                if (!res.ok) throw new Error('Data failed');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setError("Kon de diensten niet laden.");
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    const filteredItems = categories.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /**
     * getCategoryUrl*/
    const getCategoryUrl = (name) => {
        const lowerName = name.toLowerCase();

        // Eigen aanvraagformulier voor paspoort zaken
        if (lowerName.includes("paspoort") || lowerName.includes("id")) {
            return "/aanvraagform1";
        }

        // Mapping naar werkende URL's van de gemeente
        const links = {
            "wonen": "https://www.rotterdam.nl/wonen-wijken",
            "bouwen": "https://www.rotterdam.nl/bouwen-verbouwen",
            "afval": "https://www.rotterdam.nl/afval-aanbieden",
            "parkeren": "https://www.rotterdam.nl/parkeren",
            "belastingen": "https.www.rotterdam.nl/gemeentelijke-belastingen",
            "onderwijs": "https://www.rotterdam.nl/onderwijs-kinderopvang",
            "werk": "https://www.rotterdam.nl/werk-inkomen",
            "melding": "https://www.rotterdam.nl/melding-doen",
            "zorg": "https://www.rotterdam.nl/zorg-ondersteuning",
            "verhuizing": "https://www.rotterdam.nl/verhuizing-doorgeven",
            "rijbewijs": "https://www.rotterdam.nl/rijbewijs-aanvragen"
        };

        // Zoek naar een match in de sleutelwoorden
        const foundKey = Object.keys(links).find(key => lowerName.includes(key));

        // Als er een match is, gebruik die URL. Anders gebruik de zoekfunctie als fallback.
        return foundKey ? links[foundKey] : `https://www.rotterdam.nl/zoeken?q=${encodeURIComponent(name)}`;
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#1B1B1B]">
            <style>
                {`
                    input[type="search"]::-webkit-search-decoration,
                    input[type="search"]::-webkit-search-cancel-button,
                    input[type="search"]::-webkit-search-results-button,
                    input[type="search"]::-webkit-search-results-decoration {
                        -webkit-appearance: none;
                    }
                `}
            </style>
            {/* WCAG Skip Link */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#008100] text-white p-4 z-50">
                Skip naar hoofdinhoud
            </a>

            <NavbarUit />

            <header className="bg-[#F5F5F5] border-b border-[#E0E0E0] pt-36 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        Waarmee kunnen we u helpen?
                    </h1>

                    <form
                        role="search"
                        aria-label="Zoek op de website van de gemeente Rotterdam"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (searchTerm.trim()) {
                                window.location.href = `https://www.rotterdam.nl/zoeken?q=${encodeURIComponent(searchTerm)}`;
                            }
                        }}
                        className="relative max-w-xl mx-auto"
                    >
                        <label htmlFor="category-search" className="sr-only">Zoek op rotterdam.nl</label>
                        <Search className="absolute left-4 top-4 text-[#767676]" size={24} aria-hidden="true" />
                        <input
                            id="category-search"
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Zoek naar bijv. afval, parkeren of verhuizen..."
                            className="w-full h-14 pl-12 pr-32 bg-white border-2 border-[#767676] focus:border-[#008100] outline-none transition-all text-lg shadow-sm placeholder:text-[#555]"
                        />
                        <div className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center">
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className={`text-[#767676] hover:text-black p-2 mr-1 ${!searchTerm ? 'invisible' : ''}`}
                                aria-label="Zoekopdracht wissen"
                            >
                                <X size={20} />
                            </button>
                            <Button type="submit" aria-label="Zoekopdracht uitvoeren" className="px-5 py-0 h-full">
                                <Send size={18} aria-hidden="true" />
                            </Button>
                        </div>
                    </form>
                </div>
            </header>

            <main id="main-content" className="max-w-6xl mx-auto py-12 px-6">
                {/* Screenreader feedback voor zoekopdrachten */}
                <div aria-live="polite" className="sr-only">
                    {searchTerm && `${filteredItems.length} categorieën gevonden voor ${searchTerm}`}
                </div>

                {loading ? (
                    <div role="status" className="flex justify-center items-center py-20 gap-4">
                        <Loader2 className="animate-spin text-[#008100]" size={40} aria-hidden="true" />
                        <span className="sr-only">Inhoud laden...</span>
                    </div>
                ) : error ? (
                    <div role="alert" className="text-red-600 font-bold text-center p-4">
                        {error}
                    </div>
                ) : (
                    <section aria-labelledby="cat-title">
                        <div className="flex items-center gap-3 mb-8 min-h-[1.75rem]">
                            <div className="w-1 h-6 bg-[#008100]" aria-hidden="true" />
                            <h2 id="cat-title" className="text-xl font-bold text-black uppercase tracking-wide">
                                {searchTerm ? `Zoekresultaten` : `Veelgezochte onderwerpen`}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {filteredItems.map((cat) => {
                                const url = getCategoryUrl(cat.name);
                                const isExternal = url.startsWith('http');

                                return (
                                    <a
                                        key={cat._id}
                                        href={url}
                                        target={isExternal ? "_blank" : "_self"}
                                        rel={isExternal ? "noopener noreferrer" : ""}
                                        className="flex items-center justify-between p-4 border border-[#D1D1D1] hover:border-[#008100] focus:ring-2 focus:ring-[#008100] bg-white transition-all group no-underline"
                                    >
                                        <span className="text-[#007000] font-semibold text-[15px] group-hover:text-black transition-colors">
                                            {cat.name}
                                            {isExternal && <span className="sr-only">(opent in een nieuw tabblad)</span>}
                                        </span>
                                        <ChevronRight size={16} className="text-[#767676] group-hover:text-[#008100] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </a>
                                );
                            })}
                        </div>

                        {!loading && filteredItems.length === 0 && (
                            <p className="text-center py-10 text-gray-500">Geen categorieën gevonden die voldoen aan uw zoekopdracht.</p>
                        )}
                    </section>
                )}

                {/* Map Section */}
                <section className="mt-16 border-t border-[#E0E0E0] pt-12">
                    <div className="bg-[#F9F9F9] p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-[#E0E0E0]">
                        <div className="flex items-center gap-4">
                            <MapPin size={22} className="text-[#008100]" aria-hidden="true" />
                            <div>
                                <h3 className="font-bold text-black text-lg">In uw buurt</h3>
                                <p className="text-sm text-[#555]">Bekijk meldingen en werkzaamheden op de kaart van Rotterdam.</p>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => window.open('https://www.rotterdam.nl/kaarten/meldingen-buitenruimte/', '_blank')}
                            className="text-sm px-8"
                            aria-label="Open kaart met meldingen en werkzaamheden in uw buurt"
                        >
                            Open kaart
                        </Button>
                    </div>
                </section>
            </main>

            <FooterIngelogd />
        </div>
    );
};

export default Homepage;
