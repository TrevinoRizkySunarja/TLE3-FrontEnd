import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, CreditCard, Users, ArrowLeft, IdCard, Car, Leaf, Ticket, Recycle } from 'lucide-react';
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";
import FooterIngelogd from "../components/FooterIngelogd.jsx";

const defaultUserData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    birth_date: '',
    bsn: '',
    gender: '',
    passport_expiry: '',
    drivers_license_expiry: '',
    greenpass_expiry: '',
    parking_permit_expiry: '',
    milieupas_expiry: '',
};

const Profile_User = () => {
    const navigate = useNavigate();

    let userData = defaultUserData;
    try {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            userData = { ...defaultUserData, ...JSON.parse(storedUser) };
        }
    } catch {
        userData = defaultUserData;
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Niet beschikbaar';
        const parsedDate = new Date(dateString);
        if (Number.isNaN(parsedDate.getTime())) return dateString;
        return parsedDate.toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatGender = (gender) => {
        const genderMap = {
            'man': 'Man',
            'vrouw': 'Vrouw',
            'anders': 'Anders',
            'zeg_ik_liever_niet': 'Zeg ik liever niet'
        };
        return genderMap[gender] || gender;
    };

    return (
        <div className="bg-[#FFFFFF] min-h-screen font-sans text-[#1B1B1B]">
            <NavbarIngelogd />
            <main className="max-w-4xl mx-auto p-4 md:p-8" id="main-content">
                {/* Page header */}
                <header className="mb-8">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#000000] leading-tight mb-2">
                        Mijn Gegevens
                    </h1>
                    <p className="text-[16px] text-[#4B4B4B] mb-4">
                        Hier kunt u uw persoonlijke gegevens bekijken.
                    </p>
                    <div className="h-px bg-[#E0E0E0] w-full" aria-hidden="true" />
                </header>

                {/* Profile card */}
                <section className="bg-[#F9F9FF] border border-[#E0E0E0] rounded-[5px] p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="text-[24px] font-bold text-[#000000] mb-6 flex items-center gap-2">
                        <User size={24} className="text-[#008100]" aria-hidden="true" />
                        Persoonlijke Informatie
                    </h2>

                    <div className="space-y-6">
                        {/* Name */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <User size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Volledige naam:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B] font-medium">
                                {userData.first_name} {userData.last_name}
                            </span>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <Mail size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">E-mailadres:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{userData.email}</span>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <Phone size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Telefoonnummer:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{userData.phone_number}</span>
                        </div>

                        {/* Birth date */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <Calendar size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Geboortedatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">
                                {formatDate(userData.birth_date)}
                            </span>
                        </div>

                        {/* BSN */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-48">
                                <CreditCard size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">BSN:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B] font-mono">{userData.bsn}</span>
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-2 md:w-48">
                                <Users size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Geslacht:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">
                                {formatGender(userData.gender)}
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
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.passport_expiry)}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Car size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Rijbewijs verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.drivers_license_expiry)}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Leaf size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Groenpas verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.greenpass_expiry)}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Leaf size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Milieupas verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.milieupas_expiry)}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-2 md:w-64">
                                <Ticket size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Parkeervergunning verloopdatum:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.parking_permit_expiry)}</span>
                        </div>
                    </div>
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
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.greenpass_expiry)}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-[#E0E0E0]">
                            <div className="flex items-center gap-2 md:w-64">
                                <Recycle size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Milieupas geldig tot:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.milieupas_expiry)}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-2 md:w-64">
                                <Ticket size={18} className="text-[#4B4B4B]" aria-hidden="true" />
                                <span className="text-[14px] font-bold text-[#4B4B4B]">Parkeervergunning geldig tot:</span>
                            </div>
                            <span className="text-[16px] text-[#1B1B1B]">{formatDate(userData.parking_permit_expiry)}</span>
                        </div>
                    </div>
                </section>

                {/* Action buttons */}
                <section className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F5F5F5] text-[#1B1B1B] font-bold rounded-[5px] hover:bg-[#E0E0E0] focus:ring-2 focus:ring-[#4B4B4B] focus:ring-offset-2 transition-colors outline-none border border-[#E0E0E0]"
                        onClick={() => navigate('/fyp')}
                    >
                        <ArrowLeft size={18} aria-hidden="true" />
                        Terug naar overzicht
                    </button>
                </section>

                {/* Privacy notice */}
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

