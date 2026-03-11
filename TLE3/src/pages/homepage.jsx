import React, { useState, useEffect } from 'react';
import { Send, ChevronRight, MapPin, Loader2 } from 'lucide-react';
import FooterIngelogd from "../components/FooterIngelogd.jsx";

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data van de backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // We gebruiken de route die je stuurde
                const response = await fetch('http://145.24.237.215:8000/api/categories');
                if (!response.ok) throw new Error('Netwerk respons was niet oké');
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error("Fout bij ophalen:", err);
                setError("Kon de diensten niet laden.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Filter logica op basis van de API data
    const filteredItems = categories.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FFFFFF] font-['Arial',_sans-serif] text-[#1B1B1B] m-0 p-0">

            {/* --- HERO SECTION --- */}
            <section className="bg-[#F5F5F5] border-b border-[#E0E0E0] py-20 px-6 mt-0">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#000000] mb-8">
                        Waarmee kunnen we u helpen?
                    </h1>

                    <div className="relative group max-w-2xl mx-auto">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Zoek een categorie (bijv. Afval, Parkeren...)"
                            className="w-full h-16 pl-6 pr-16 bg-[#FFFFFF] border-2 border-[#E0E0E0] focus:border-[#008100] outline-none transition-all text-[18px] shadow-sm"
                        />
                        <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#000000] hover:bg-[#008100] text-[#FFFFFF] transition-all flex items-center justify-center">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </section>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-6xl mx-auto py-16 px-6">

                {/* Status meldingen */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-[#008100]" size={40} />
                    </div>
                )}

                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && !error && (
                    <>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-1.5 h-8 bg-[#008100]"></div>
                            <h2 className="text-[24px] font-bold text-[#000000]">
                                {searchTerm ? `Zoekresultaten (${filteredItems.length})` : "Categorieën"}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredItems.map((category) => (
                                <a
                                    key={category._id}
                                    href={`/category/${category._id}`}
                                    className="flex flex-col justify-between p-6 border border-[#E0E0E0] hover:border-[#008100] bg-white transition-all group min-h-[120px]"
                                >
                                    <span className="text-[#008100] font-bold text-[16px] leading-tight group-hover:text-[#000000] transition-colors">
                                        {category.name}
                                    </span>
                                    <div className="flex justify-end">
                                        <ChevronRight size={18} className="text-[#E0E0E0] group-hover:text-[#008100] transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <p className="text-[#6B6B6B] text-center py-10">Geen categorieën gevonden die voldoen aan uw zoekterm.</p>
                        )}
                    </>
                )}

                {/* Kaart Sectie */}
                <div className="mt-20 overflow-hidden rounded-[5px] border border-[#E0E0E0]">
                    <div className="bg-[#F5F5F5] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full shadow-sm">
                                <MapPin size={24} className="text-[#008100]" />
                            </div>
                            <div>
                                <h3 className="text-[20px] font-bold text-[#000000] mb-1">In uw buurt</h3>
                                <p className="text-[16px] text-[#6B6B6B]">Bekijk meldingen en werkzaamheden bij u in de straat.</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto bg-[#000000] text-white px-10 py-4 font-bold hover:bg-[#008100] transition-all">
                            Bekijk de kaart
                        </button>
                    </div>
                </div>
            </main>
            <FooterIngelogd />

        </div>

    );
};

export default Homepage;