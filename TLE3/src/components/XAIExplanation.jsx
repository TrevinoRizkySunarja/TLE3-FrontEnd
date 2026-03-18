

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronDown } from 'lucide-react';

export const XAIExplanation = ({ isOpen, onToggle, items }) => {
    // Als er geen items zijn, laten we deze sectie niet zien
    if (!items || items.length === 0) return null;

    return (
        <section className="mt-12 pt-8 border-t border-[#E0E0E0]">
            {/* De klikbare balk om de uitleg te openen of te sluiten */}
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full bg-[#F5F5F5] p-5 flex justify-between items-center text-left hover:bg-[#E0E0E0] focus:ring-4 focus:ring-[#008100]/30 transition-all border border-[#D1D1D1] rounded-[5px] outline-none"
            >
                <div className="flex items-center gap-3">
                    <Info size={22} className="text-[#008100]" aria-hidden="true" />
                    <h3 className="text-[19px] font-bold">Hoe komt de AI bij deze keuzes?</h3>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={28} />
                </motion.div>
            </button>

            {/* Het uitklapbare gedeelte met de uitleg inclusief Match % */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#F9F9FF] border-x border-b border-[#008100]/30 rounded-b-[5px]"
                    >
                        <div className="p-6">
                            <p className="mb-4 font-bold text-[#008100]">Bronnen van uw suggesties:</p>
                            <ul className="space-y-4">
                                {items.map(i => (
                                    <li key={i.id} className="flex gap-3 border-l-4 border-[#008100] pl-4">
                                        <div>
                                            <span className="font-bold text-black">{i.title}:</span>
                                            <p className="text-[#4B4B4B]">
                                                {i.reason}
                                                {/* Hier wordt het percentage toegevoegd */}
                                                <span className="font-bold text-[#008100] ml-1">
                                                    (Match: {i.matchScore}%)
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};