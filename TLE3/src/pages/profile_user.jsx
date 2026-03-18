import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {

    User, Mail, Phone, Calendar, CreditCard, Users, ArrowLeft,

    IdCard, Car, Leaf, Ticket, Recycle

} from 'lucide-react';

import NavbarIngelogd from "../components/NavbarIngelogd.jsx";

import FooterIngelogd from "../components/FooterIngelogd.jsx";

import { useAuth } from "../auth/AuthContext.jsx";

const Profile_User = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const { token, user: authUser } = useAuth();

    const userId = authUser?.id;

    const currentUser = location.state?.user;

    const [user, setUser] = useState(null);

    const [categories, setCategories] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [savingInterests, setSavingInterests] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const API_KEY = "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f";

    async function fetchUserInfo() {

        const response = await fetch(`${API_BASE_URL}user/${userId}`, {

            method: "GET",

            headers: {

                "Content-Type": "application/json",

                "Accept": "application/json",

                "x-api-key": API_KEY,

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        console.log("user info:", data);

        setUser(data.user);

    }

    async function fetchCategories() {

        try {

            const response = await fetch(`${API_BASE_URL}categories`, {

                method: "GET",

                headers: {

                    "Accept": "application/json",

                    "x-api-key": API_KEY

                }

            });

            const data = await response.json();

            console.log("categories:", data);

            setCategories(data);

        } catch (error) {

            console.error("Fout bij ophalen categorieën:", error);

        }

    }

    async function fetchUserInterests() {

        try {

            const response = await fetch(`${API_BASE_URL}user-interests`, {

                method: "GET",

                headers: {

                    "Accept": "application/json",

                    "x-api-key": API_KEY,

                    "Authorization": `Bearer ${token}`

                }

            });

            const data = await response.json();

            console.log("user interests:", data);

            // verwacht array met objects waar category_id gepopulated kan zijn

            const ids = Array.isArray(data)

                ? data.map((item) =>

                    typeof item.category_id === "object"

                        ? item.category_id?.id || item.category_id?._id

                        : item.category_id

                ).filter(Boolean)

                : [];

            setSelectedCategories(ids);

        } catch (error) {

            console.error("Fout bij ophalen user interests:", error);

        }

    }

    async function saveUserInterests() {

        try {

            setSavingInterests(true);

            const response = await fetch(`${API_BASE_URL}user-interests/bulk`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Accept": "application/json",

                    "x-api-key": API_KEY,

                    "Authorization": `Bearer ${token}`

                },

                body: JSON.stringify({

                    category_ids: selectedCategories

                })

            });

            const data = await response.json();

            console.log("save interests:", data);

        } catch (error) {

            console.error("Fout bij opslaan interesses:", error);

        } finally {

            setSavingInterests(false);

        }

    }

    function handleCategoryToggle(categoryId) {

        setSelectedCategories((prev) =>

            prev.includes(categoryId)

                ? prev.filter((id) => id !== categoryId)

                : [...prev, categoryId]

        );

    }

    useEffect(() => {

        if (!userId || !token) return;

        fetchUserInfo();

        fetchCategories();

        fetchUserInterests();

    }, [userId, token]);

    return (
        <div className="bg-[#FFFFFF] min-h-screen font-sans text-[#1B1B1B]">
            <NavbarIngelogd />

            <main className="max-w-4xl mx-auto p-4 md:p-8" id="main-content">
                <header className="mb-8">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#000000] leading-tight mb-2">

                        Mijn Gegevens
                    </h1>
                    <p className="text-[16px] text-[#4B4B4B] mb-4">

                        Hier kunt u uw persoonlijke gegevens bekijken.
                    </p>
                    <div className="h-px bg-[#E0E0E0] w-full" aria-hidden="true" />
                </header>

                <section className="bg-[#F9F9FF] border border-[#E0E0E0] rounded-[5px] p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="text-[24px] font-bold text-[#000000] mb-6 flex items-center gap-2">
                        <User size={24} className="text-[#008100]" aria-hidden="true" />

                        Persoonlijke Informatie
                    </h2>

                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <User size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Volledige naam:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B] font-medium">

                                {user?.first_name} {user?.last_name}
</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <Mail size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">E-mailadres:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.email}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <Phone size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Telefoonnummer:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.phone_number}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <Calendar size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Geboortedatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">

                                {user?.birth_date}
</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <CreditCard size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">BSN:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B] font-mono">{user?.bsn}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-2 md:w-48">
                                <Users size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Geslacht:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">

                                {user?.gender}
</span>
                        </div>
                    </div>
                </section>

                <section className="bg-[#F9F9FF] border border-[#E0E0E0] rounded-[5px] p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="text-[24px] font-bold text-[#000000] mb-6 flex items-center gap-2">
                        <Calendar size={24} className="text-[#008100]" aria-hidden="true" />

                        Verloopdatums Documenten
                    </h2>

                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <IdCard size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Paspoort verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.passport_expiry}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Car size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Rijbewijs verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.drivers_license_expiry}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Leaf size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Groenpas verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.greenpass_expiry}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Leaf size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Milieupas verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.milieupas_expiry}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-2 md:w-64">
                                <Ticket size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Parkeervergunning verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.parking_permit_expiry}</span>
                        </div>
                    </div>
                </section>

                <section className="bg-[#F9F9FF] border border-[#E0E0E0] rounded-[5px] p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="text-[24px] font-bold text-[#000000] mb-6 flex items-center gap-2">
                        <Leaf size={24} className="text-[#008100]" aria-hidden="true" />

                        Mijn interesses
                    </h2>

                    <p className="text-[16px] text-[#4B4B4B] mb-6">

                        Kies de categorieën die u interessant vindt. Deze voorkeuren kunnen gebruikt worden voor gepersonaliseerde inhoud.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">

                        {categories.map((category) => (
                            <label

                                key={category.id}

                                className="flex items-center gap-3 border border-[#E0E0E0] bg-white px-4 py-3 rounded-[5px]"
                            >
                                <input

                                    type="checkbox"

                                    className="h-4 w-4"

                                    checked={selectedCategories.includes(category.id)}

                                    onChange={() => handleCategoryToggle(category.id)}

                                />
                                <span className="text-[16px] text-[#1B1B1B]">{category.name}</span>
                            </label>

                        ))}
                    </div>

                    <button

                        type="button"

                        onClick={saveUserInterests}

                        disabled={savingInterests}

                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-[5px] hover:bg-black transition-colors disabled:opacity-60"
                    >

                        {savingInterests ? "Opslaan..." : "Interesses opslaan"}
                    </button>
                </section>

                <section className="bg-[#F9F9FF] border border-[#E0E0E0] rounded-[5px] p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="text-[24px] font-bold text-[#000000] mb-6 flex items-center gap-2">
                        <Calendar size={24} className="text-[#008100]" aria-hidden="true" />

                        Toegangsbewijzen
                    </h2>

                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Leaf size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Groenpas geldig tot:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.greenpass_expiry}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Recycle size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Milieupas geldig tot:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.milieupas_expiry}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-2 md:w-64">
                                <Ticket size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Parkeervergunning geldig tot:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{user?.parking_permit_expiry}</span>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button

                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F5F5F5] text-[#1B1B1B] font-bold rounded-[5px] hover:bg-[#E0E0E0] focus:ring-2 focus:ring-[#4B4B4B] focus:ring-offset-2 transition-colors outline-none border border-[#E0E0E0]"

                        onClick={() => navigate('/fyp')}
                    >
                        <ArrowLeft size={18} aria-hidden="true" />

                        Terug naar overzicht
                    </button>
                </section>

                <section className="p-4 bg-[#F0F8F0] border border-[#008100]/30 rounded-[5px]">
                    <p className="text-[14px] text-[#1B1B1B] leading-relaxed">
                        <span className="font-bold text-[#008100]">🔒 Privacy:</span> Uw gegevens worden veilig bewaard en alleen gebruikt voor gemeentelijke dienstverlening.

                        Voor meer informatie, zie ons <a href="/privacy" className="underline text-[#008100] hover:text-[#006400] font-medium">privacybeleid</a>.
                    </p>
                </section>
            </main>

            <FooterIngelogd />
        </div>

    );

};

export default Profile_User;
