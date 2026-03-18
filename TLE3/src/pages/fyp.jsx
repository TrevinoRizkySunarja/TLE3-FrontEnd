import React, { useState, useEffect } from 'react';
import { AnimatePresence, useReducedMotion, motion } from 'framer-motion';
import { Search, Loader2, CheckCircle, X, Send } from 'lucide-react';
import { Button } from "../components/Button.jsx";
import { AICard } from "../components/AICard.jsx";
import { XAIExplanation } from "../components/XAIExplanation.jsx";
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";
import { useNavigate } from 'react-router-dom';
import {RecommendationList} from "../components/RecommendationList.jsx"
import {useAuth} from "../auth/AuthContext.jsx";


const FYP = () => {
    const navigate = useNavigate();
    const shouldReduceMotion = useReducedMotion();

    // MATCH met je Vite config proxy: /v2/api
    const API_BASE_URL = "http://145.24.237.215:8000/v2/api";
    const API_KEY = "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f";

    const [user, setUser] = useState(null);
    const [feedItems, setFeedItems] = useState([]);
    const [showTransparency, setShowTransparency] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user: authUser } = useAuth();
    const userId = authUser?.id;



    // 1. Haal de user direct op bij mount
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsedUser = JSON.parse(stored);
            console.log("User gevonden:", parsedUser);
            setUser(parsedUser);
        } else {
            console.warn("Geen authUser gevonden in localStorage");
            setLoading(false); // Stop laden als er geen user is
        }
    }, []);

    // 2. Start data fetch zodra de user bekend is
    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            setLoading(true);
            const userId = user._id || user.id;
            console.log("Start laden voor userId:", userId);

            try {
                console.log(userId)
                // Let op: We voegen de x-api-key overal toe voor de zekerheid
                const [catRes, recRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/categories`, {  method: "GET", headers: { "x-api-key": API_KEY, "Accept": "application/json" }}),
                    fetch(`${API_BASE_URL}/recommendations/user/${userId}?limit=4`, {
                        method: "GET",
                        headers: {
                            "x-api-key": API_KEY,
                            "Accept": "application/json",
                            Authorization: `Bearer ${token}`

                        }
                    })
                ]);



                console.log("Response statussen:", catRes.status, recRes.status);

                if (!catRes.ok || !recRes.ok) throw new Error("API reageert niet goed");

                const catData = await catRes.json();
                const recData = await recRes.json();

                setCategories(catData || []);

                // Verwerk de aanbevelingen uit 'items'
                if (recData.items && recData.items.length > 0) {
                    setFeedItems(recData.items.map(item => ({
                        id: item.content._id || item.content.id,
                        title: item.content.title,
                        body: item.content.body || item.content.description,
                        isUrgent: item.content.is_urgent,
                        url: item.content.url, // URL toevoegen
                        reason: item.reason?.rule_boost > 0
                            ? "Hoge prioriteit op basis van uw BRP-gegevens."
                            : "Aanbevolen op basis van uw interesses."
                    })));
                } else {
                    setFeedItems(getFallbackFeed());
                }
            } catch (err) {
                console.error("Fout in fetch:", err);
                setFeedItems(getFallbackFeed());
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user]);

    // const getFallbackFeed = () => [
    //     { id: 'f1', title: 'Paspoort verlengen', body: 'Uw paspoort verloopt binnenkort.', isUrgent: true, reason: 'Verloopdatum match.', url: '/paspoort-verlengen' },
    //     { id: 'f2', title: 'Afvalwijzer', body: 'Bekijk wanneer uw containers buiten moeten.', isUrgent: false, reason: 'Adres match.', url: '/afvalwijzer' }
    // ];

    const removeItem = (id) => setFeedItems(prev => prev.filter(i => i.id !== id));

    return (
        <div className="bg-white min-h-screen text-[#1B1B1B]">
            <NavbarIngelogd />
            <header className="bg-[#F5F5F5] pt-20 pb-12 px-6 mt-[-60px]">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-6">Welkom {user?.first_name || "Gebruiker"}</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                <section className="mb-12">
                    <h2 className="text-xl font-bold uppercase mb-6">Speciaal voor u</h2>
                    {loading ? (
                        <div className="flex flex-col items-center py-10">
                            <Loader2 className="animate-spin text-[#008100] mb-4" size={40} />
                            <p className="text-gray-500">Uw persoonlijke feed wordt samengesteld...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {feedItems.map(item => (
                                    <AICard
                                        key={item.id}
                                        item={item}
                                        onRemove={removeItem}
                                        onNavigate={() => navigate(item.url || '/aanvraag/stap-1')}
                                    />
                                ))}
                            </AnimatePresence>
                            <XAIExplanation isOpen={showTransparency} onToggle={() => setShowTransparency(!showTransparency)} items={feedItems} />
                        </div>
                    )}
                </section>
                <section className="mb-12">
                    <h2 className="text-xl font-bold uppercase mb-6">Andere aanbevelingen</h2>
                    <RecommendationList />
                </section>
            </main>
            <FooterIngelogd />
        </div>
    );
};

export default FYP;
