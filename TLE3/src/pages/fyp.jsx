import React, { useState } from 'react';
// Zorg dat deze import matcht met je Button file in de components folder
import { Button } from '../components/Button';

const FYP = () => {
    // Data gebaseerd op je database termen uit de afbeeldingen
    const [feedItems] = useState([
        {
            id: 1,
            title: 'Paspoort',
            body: 'Uw paspoort verloopt binnenkort, verleng hem nu!',
            actionText: 'Paspoort verlengen',
            type: 'document' // Matcht 'documents' tabel
        },
        {
            id: 2,
            title: 'Subsidie',
            body: 'Gefeliciteerd met uw nieuwe woning. Check of u recht heeft op een subsidie.',
            actionText: 'Subsidie bekijken',
            reason: 'Op basis van uw recente adreswijziging.' // Matcht 'recommendation_items'
        },
        {
            id: 3,
            title: 'Parkeervergunning',
            body: 'Gefeliciteerd met uw nieuwe auto, check hier de parkeervergunning mogelijkheden.',
            actionText: 'Parkeervergunning aanvragen',
            reason: 'Gekoppeld aan uw nieuwe voertuigregistratie.'
        }
    ]);

    const [showTransparency, setShowTransparency] = useState(false);

    return (
        <div className="bg-[#FFFFFF] min-h-screen font-sans text-[#1B1B1B]">
            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <header className="mb-8">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#000000] leading-tight mb-2">
                        Welkom Gebruiker
                    </h1>
                    <div className="h-px bg-[#E0E0E0] w-full" />
                </header>

                {/* De Feed Sectie */}
                <section className="space-y-6">
                    {feedItems.map((item) => (
                        <article
                            key={item.id}
                            className="bg-[#F5F5F5] p-6 border border-[#E0E0E0]"
                        >
                            <h2 className="text-[24px] md:text-[28px] font-bold text-[#000000] mb-2">
                                {item.title}
                            </h2>
                            <p className="text-[16px] leading-[1.6] mb-4">
                                {item.body}
                            </p>
                            {/* Gebruik de Button component die we eerder maakten */}
                            <Button
                                variant="secondary"
                                onClick={() => console.log('Navigeer naar:', item.actionText)}
                            >
                                ➔ {item.actionText}
                            </Button>
                        </article>
                    ))}
                </section>

                {/* AI Transparantie Sectie - WCAG AA compliant */}
                <section className="mt-12 pt-8 border-t border-[#E0E0E0]">
                    <button
                        onClick={() => setShowTransparency(!showTransparency)}
                        className="w-full bg-[#F5F5F5] p-4 flex justify-between items-center text-left hover:bg-[#E0E0E0] transition-colors"
                        aria-expanded={showTransparency}
                    >
                        <h3 className="text-[18px] font-bold">Waarom krijg ik dit aanbevolen?</h3>
                        <span className={`transition-transform ${showTransparency ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>

                    {showTransparency && (
                        <div className="bg-[#F5F5F5] p-6 border-x border-b border-[#E0E0E0]">
                            <p className="text-[14px] mb-4">
                                Deze suggesties zijn gebaseerd op uw profiel en officiële data uit de gemeentelijke database.
                            </p>
                            <ul className="space-y-2">
                                {feedItems.filter(i => i.reason).map(i => (
                                    <li key={i.id} className="text-[14px]">
                                        <strong>{i.title}:</strong> {i.reason}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default FYP;