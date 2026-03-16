import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, X } from 'lucide-react';
import { Button } from './Button';

export const AICard = ({ item, onRemove, onNavigate, shouldReduceMotion }) => {
    return (
        <motion.article
            layout // Zorgt dat de lijst soepel aansluit als er een kaart weggaat
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}

            // Verandert de kleur: Rood voor spoed, Blauw/Groen voor een AI tip
            className={`p-6 border-2 relative rounded-[5px] transition-all focus-within:ring-4 focus-within:ring-[#008100]/40 ${
                item.isUrgent ? 'bg-[#FFF5F5] border-red-600' : 'bg-[#F9F9FF] border-[#008100]/20'
            }`}
        >
            <div className="flex items-center gap-2 mb-2">
                {/* Checkt of het item urgent is voor het juiste icoontje */}
                {item.isUrgent ? (
                    <AlertCircle size={16} className="text-red-700" aria-hidden="true" />
                ) : (
                    <Sparkles size={16} className="text-[#008100]" aria-hidden="true" />
                )}
                {/* Tekstlabel voor de gebruiker */}
                <span className={`text-[13px] font-bold uppercase tracking-widest ${item.isUrgent ? 'text-red-700' : 'text-[#008100]'}`}>
                    {item.isUrgent ? 'Urgent' : 'AI Suggestie'}
                </span>
            </div>

            {/* Kruisje rechtsboven om de kaart te verwijderen */}
            <button
                onClick={() => onRemove(item.id)}
                className="absolute top-4 right-4 p-2 hover:text-red-600 focus:ring-2 focus:ring-[#008100] outline-none rounded-full"
                aria-label={`Verwijder melding: ${item.title}`}
            >
                <X size={20} />
            </button>

            {/* Titel en de tekst van de melding */}
            <h3 className="text-[24px] font-bold text-black mb-2 pr-10">{item.title}</h3>
            <p className="text-[17px] leading-relaxed mb-6 text-[#333]">{item.body}</p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* De hoofdknop om naar de actie/het formulier te gaan */}
                <Button variant={item.isUrgent ? "primary" : "secondary"} onClick={onNavigate}>
                    ➔ {item.isUrgent ? 'Nu afhandelen' : 'Bekijken'}
                </Button>

                {/* Extra knop om de melding simpelweg weg te doen */}
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-[15px] font-bold underline hover:text-[#008100] focus:ring-2 focus:ring-[#008100] outline-none"
                >
                    Markeer als afgehandeld
                </button>
            </div>
        </motion.article>
    );
};