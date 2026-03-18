// // import React, { useState, useEffect } from "react";
// // import {Link, Outlet, useParams} from 'react-router';
// // // import { useState } from "react";
// // import { BellIcon } from "@heroicons/react/24/outline";
// // import Footer from "../components/Footer.jsx";
// // import {Inbox} from "lucide-react";
// // import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
// // import Navbar from "../components/Navbar.jsx";
// // import {useLocation} from "react-router-dom";
// //
// //     function Dashboard() {
// //
// //         const location = useLocation();
// //         const user = location.state?.user;
// //
// //         const notifications = [
// //             {id: 1, sender: "Mw. de Wit", message: "Afspraak zometeen..", time: "2m ago"},
// //             {id: 2, sender: "Mr. heineken", message: "Dankjewel voor je feedback!", time: "10m ago"},
// //             {id: 3, sender: "mw. Slager", message: "Dat is dan afgesproken", time: "1h ago"},
// //         ];
// //
// //         return (
// //             <div className="min-h-screen bg-slate-50">
// //                 <Navbar/>
// //
// //                 <main>
// //                     <div
// //                         id="container"
// //                         className="mx-auto w-full max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8"
// //                     >
// //                         <h1 className="pb-6 text-2xl font-bold sm:text-3xl lg:text-4xl">
// //                             welkom bij de dashboard {user?.first_name} {user?.last_name} !
// //                         </h1>
// //
// //                         <div
// //                             className="mx-auto mb-6 w-full max-w-3xl rounded-md border-2 border-black bg-neutral-100 p-5 text-center sm:p-6 lg:p-7">
// //                             <h2 className="border-b-2 border-black pb-2 font-bold">Agenda</h2>
// //
// //                             <h3 className="mt-4 font-bold">Tijd</h3>
// //                             <p>09:00 - 12:00</p>
// //
// //                             <div className="mt-4">
// //                                 <h3 className="font-bold">Onderwerp</h3>
// //                                 <p>Job coach gesprek Dhr. Maas</p>
// //
// //                                 <h3 className="mt-3 font-bold">Locatie</h3>
// //                                 <div className="mt-2 space-y-1">
// //                                     <p>Rivierweg 111, 2903 AR Capelle aan den IJssel</p>
// //                                     <p>2e etage kamer 100</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //
// //                         <div
// //                             className="mx-auto mb-6 w-full max-w-3xl rounded-md border-2 border-black bg-neutral-100 p-5 sm:p-6 lg:p-7">
// //                             <div className="mx-auto max-w-2xl">
// //                                 <div className="flex flex-col items-center gap-4 text-center">
// //                                     <h2 className="text-xl font-bold text-black sm:text-2xl">Post</h2>
// //
// //                                     <Link
// //                                         to="/post"
// //                                         className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-neutral-100"
// //                                     >
// //                                         Maak een post
// //                                     </Link>
// //                                 </div>
// //
// //                                 <form className="mt-8" role="search">
// //                                     <div className="mx-auto w-full max-w-lg text-left">
// //                                         <label
// //                                             htmlFor="search"
// //                                             className="mb-2 block text-base font-medium text-black"
// //                                         >
// //                                             Zoeken
// //                                         </label>
// //
// //                                         <input
// //                                             id="search"
// //                                             name="search"
// //                                             type="text"
// //                                             placeholder="Zoeken..."
// //                                             className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
// //                                         />
// //                                     </div>
// //                                 </form>
// //
// //                                 <div className="mt-8 space-y-3 text-center">
// //                                     <p className="text-base text-black">tags</p>
// //                                     <h3 className="text-lg font-bold text-black">Resultaten</h3>
// //                                 </div>
// //                             </div>
// //                         </div>
// //
// //                         <div
// //                             className="mx-auto mb-6 w-full max-w-3xl rounded-md border-2 border-black bg-neutral-100 p-5 text-center sm:p-6 lg:p-7">
// //                             <h2 className="font-bold">Meldingen</h2>
// //
// //                             <div className="relative mt-4 inline-block text-left">
// //                                 <button
// //                                     onClick={() => setOpen(!open)}
// //                                     className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-neutral-100"
// //                                 >
// //                                     3 Mededelingen
// //                                 </button>
// //
// //                                 {open && (
// //                                     <div
// //                                         className="absolute right-0 z-10 mt-2 w-64 rounded-lg bg-white text-left shadow-lg ring-1 ring-black ring-opacity-5 sm:w-72">
// //                                         <div className="border-b p-4 font-semibold">Meldingen</div>
// //
// //                                         <ul className="max-h-60 overflow-y-auto">
// //                                             {notifications.length > 0 ? (
// //                                                 notifications.map((n) => (
// //                                                     <li
// //                                                         key={n.id}
// //                                                         className="cursor-pointer px-4 py-3 hover:bg-gray-50"
// //                                                     >
// //                                                         <p className="text-sm font-medium">{n.sender}</p>
// //                                                         <p className="text-xs text-gray-500">{n.message}</p>
// //                                                         <span className="text-xs text-gray-400">{n.time}</span>
// //                                                     </li>
// //                                                 ))
// //                                             ) : (
// //                                                 <li className="px-4 py-3 text-sm text-gray-500">
// //                                                     Geen Meldingen
// //                                                 </li>
// //                                             )}
// //                                         </ul>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </main>
// //
// //                 <Footer/>
// //             </div>
// //         )
// //     };
// //
// // export default Dashboard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";
import { Send } from "lucide-react";
import { Button } from "../components/Button.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext.jsx";

function Dashboard() {
    const [user, setUser] = useState(null);
    const { token, user: authUser } = useAuth();
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showTransparency, setShowTransparency] = useState(false);
    const [feedItems, setFeedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_KEY = "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f";

    const notifications = [
        { id: 1, sender: "Mw. de Wit", message: "Afspraak zometeen..", time: "2m ago" },
        { id: 2, sender: "Mr. Heineken", message: "Dankjewel voor je feedback!", time: "10m ago" },
        { id: 3, sender: "Mw. Slager", message: "Dat is dan afgesproken", time: "1h ago" },
    ];

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
            setError(null);

            const userId = user._id || user.id;

            try {
                const recRes = await fetch(`${API_BASE_URL}recommendations/user/${userId}?limit=4`, {
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
                    setFeedItems(
                        recData.items.map(item => ({
                            id: item.content?._id || item.content?.id,
                            title: item.content?.title || "Zonder titel",
                            body: item.content?.body || item.content?.description || "",
                            isUrgent: item.content?.is_urgent || false,
                            url: `/aanvraag/stap-1?id=${item.content?._id || item.content?.id}&title=${encodeURIComponent(item.content?.title || "Zonder titel")}`,
                            reason: "Deze suggestie wordt getoond omdat u in uw gegevens heeft gekozen voor filters die aansluiten bij dit onderwerp.",
                            matchScore: item.score ? (item.score * 100).toFixed(0) : "0"
                        }))
                    );
                } else {
                    setFeedItems([]);
                }
            } catch (err) {
                console.error("Fout bij laden AI feed:", err);
                setError("Er ging iets mis bij het ophalen van de aanbevelingen.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, token, API_BASE_URL]);

    const filteredItems = feedItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen text-[#1B1B1B]">
            <NavbarIngelogd />

            <header className="bg-[#F5F5F5] pt-20 pb-12 px-6 mt-[-60px]">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        Welkom bij uw dashboard{user ? `, ${user.first_name}` : ""}
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Bekijk hier uw agenda, posts en meldingen.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-8">
                <section className="space-y-6">
                    <div className="border border-[#C8E6C9] bg-[#F9FAFB] p-6">
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-4">Agenda</h2>

                        <div className="space-y-4 text-left">
                            <div>
                                <h3 className="font-semibold text-[#008100]">Tijd</h3>
                                <p>09:00 - 12:00</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-[#008100]">Onderwerp</h3>
                                <p>Job coach gesprek Dhr. Maas</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-[#008100]">Locatie</h3>
                                <p>Rivierweg 111, 2903 AR Capelle aan den IJssel</p>
                                <p>2e etage kamer 100</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-[#C8E6C9] bg-[#F9FAFB] p-6">
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-4">Post</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <p className="text-gray-600">
                                    Maak een nieuwe post of zoek door bestaande berichten.
                                </p>

                                <Link
                                    to="/post"
                                    className="inline-flex items-center justify-center bg-[#008100] text-white px-5 py-3 font-medium hover:opacity-90 transition"
                                >
                                    Maak een post
                                </Link>
                            </div>

                            <div>
                                <label htmlFor="dashboard-search" className="block mb-2 font-medium">
                                    Zoeken
                                </label>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (searchTerm.trim()) {
                                            window.location.href = `https://www.rotterdam.nl/zoeken?q=${encodeURIComponent(searchTerm)}`;
                                        }
                                    }}
                                    className="relative max-w-xxl mx-auto"
                                >
                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Zoeken..."
                                        className="w-full h-14 pl-5 pr-16 bg-white border-2 border-[#767676] focus:border-[#008100] outline-none text-lg transition-all"
                                    />
                                    <div className="absolute right-1.5 top-1.5 bottom-1.5">
                                        <Button type="submit" className="px-5 h-full">
                                            <Send size={18} />
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="pt-2">
                                <p className="text-sm text-gray-500">Tags</p>
                                <h3 className="text-lg font-semibold">Resultaten</h3>

                                {loading ? (
                                    <div className="text-center py-10 bg-gray-50 rounded border-2 border-dashed border-gray-200">
                                        <p className="text-gray-500">Suggesties laden...</p>
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-10 bg-gray-50 rounded border-2 border-dashed border-gray-200">
                                        <p className="text-red-500">{error}</p>
                                    </div>
                                ) : (
                                    <>
                                        <AnimatePresence mode="popLayout">
                                            {filteredItems.length > 0 ? (
                                                <div className="flex flex-wrap gap-3 mt-4">
                                                    {filteredItems.map((item) => (
                                                        <motion.div
                                                            key={item.id}
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <Link
                                                                to={item.url}
                                                                className="inline-flex items-center rounded-full border border-[#008100] bg-white px-4 py-2 text-sm font-medium text-[#008100] transition hover:bg-[#008100] hover:text-white"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-10 bg-gray-50 rounded border-2 border-dashed border-gray-200">
                                                    <p className="text-gray-500">
                                                        Geen suggesties gevonden die voldoen aan uw zoekopdracht.
                                                    </p>
                                                </div>
                                            )}
                                        </AnimatePresence>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border border-[#C8E6C9] bg-[#F9FAFB] p-6 relative">
                        <h2 className="text-xl font-bold uppercase tracking-wide mb-4">Meldingen</h2>

                        <button
                            onClick={() => setOpen(!open)}
                            className="inline-flex items-center justify-center bg-[#008100] text-white px-5 py-3 font-medium hover:opacity-90 transition"
                        >
                            {notifications.length} mededelingen
                        </button>

                        {open && (
                            <div className="mt-4 border border-gray-200 bg-white shadow-sm">
                                <div className="border-b px-4 py-3 font-semibold">Meldingen</div>

                                <ul className="max-h-72 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((n) => (
                                            <li
                                                key={n.id}
                                                className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
                                            >
                                                <p className="font-medium">{n.sender}</p>
                                                <p className="text-sm text-gray-600">{n.message}</p>
                                                <span className="text-xs text-gray-400">{n.time}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-3 text-sm text-gray-500">
                                            Geen meldingen
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <FooterIngelogd />
        </div>
    );
}

export default Dashboard;