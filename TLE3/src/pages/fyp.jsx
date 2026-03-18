
import React, { useState, useEffect } from 'react';
import { AnimatePresence, useReducedMotion, motion } from 'framer-motion';
import { Loader2, Search, Send } from 'lucide-react'; // Send toegevoegd voor de knop
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth/AuthContext.jsx";

// Componenten
import { AICard } from "../components/AICard.jsx";
import { XAIExplanation } from "../components/XAIExplanation.jsx";
import { Button } from "../components/Button.jsx"; // Button import hersteld
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";

const FYP = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [feedItems, setFeedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showTransparency, setShowTransparency] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token, user: authUser } = useAuth();

    const API_BASE_URL = "http://145.24.237.215:8000/v2/api";
    const API_KEY = "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f";

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        } else if (authUser) {
            setUser(authUser);
        } else {
            setLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            setLoading(true);
            const userId = user._id || user.id;

            try {
                const recRes = await fetch(`${API_BASE_URL}/recommendations/user/${userId}?limit=4`, {
                    method: "GET",
                    headers: {
                        "x-api-key": API_KEY,
                        "Accept": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!recRes.ok) throw new Error("API Fout");
                const recData = await recRes.json();

                if (recData.items) {
                    setFeedItems(recData.items.map(item => ({
                        id: item.content._id || item.content.id,
                        title: item.content.title,
                        body: item.content.body || item.content.description,
                        isUrgent: item.content.is_urgent,
                        url: `/aanvraag/stap-1?id=${item.content._id || item.content.id}&title=${encodeURIComponent(item.content.title)}`,
                        reason: `Deze suggestie wordt getoond omdat u in uw gegevens heeft gekozen voor filters die aansluiten bij dit onderwerp.`,
                        matchScore: (item.score * 100).toFixed(0)
                    })));
                }
            } catch (err) {
                console.error("Fout bij laden AI feed:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, token]);

    const removeItem = (id) => setFeedItems(prev => prev.filter(i => i.id !== id));

    // Live filter voor de kaarten
    const filteredItems = feedItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen text-[#1B1B1B]">
            <NavbarIngelogd />

            <header className="bg-[#F5F5F5] pt-20 pb-12 px-6 mt-[-60px]">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">Persoonlijk overzicht voor {user?.first_name || "u"}</h1>
                    <p className="text-gray-600 mb-8">Geselecteerd op basis van de filters in uw profielgegevens.</p>

                    {/* Zoekfunctie van Homepage.jsx toegepast op FYP */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (searchTerm.trim()) {
                                window.location.href = `https://www.rotterdam.nl/zoeken?q=${encodeURIComponent(searchTerm)}`;
                            }
                        }}
                        className="relative max-w-xl mx-auto"
                    >
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Zoek in uw aanbevelingen..."
                            className="w-full h-14 pl-5 pr-16 bg-white border-2 border-[#767676] focus:border-[#008100] outline-none text-lg transition-all"
                        />
                        <div className="absolute right-1.5 top-1.5 bottom-1.5">
                            <Button type="submit" className="px-5 h-full">
                                <Send size={18} />
                            </Button>
                        </div>
                    </form>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                <section className="mb-12">
                    <h2 className="text-xl font-bold uppercase tracking-wide mb-6">
                        {searchTerm ? `Zoekresultaten voor "${searchTerm}"` : "Speciaal voor u"}
                    </h2>

                    {loading ? (
                        <div className="flex flex-col items-center py-20">
                            <Loader2 className="animate-spin text-[#008100] mb-4" size={48} />
                            <p className="text-gray-500 font-medium">Uw selectie wordt opgehaald...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map(item => (
                                        <AICard
                                            key={item.id}
                                            item={item}
                                            onRemove={removeItem}
                                            onNavigate={() => navigate(item.url)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-gray-50 rounded border-2 border-dashed border-gray-200">
                                        <p className="text-gray-500">Geen suggesties gevonden die voldoen aan uw zoekopdracht.</p>
                                    </div>
                                )}
                            </AnimatePresence>

                            {filteredItems.length > 0 && (
                                <XAIExplanation
                                    isOpen={showTransparency}
                                    onToggle={() => setShowTransparency(!showTransparency)}
                                    items={filteredItems}
                                />
                            )}
                        </div>
                    )}
                </section>
            </main>

            <FooterIngelogd />
        </div>
    );
};

export default FYP;