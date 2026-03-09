import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = "" }) => {
    // Strikte hover-regels en omlijning toegevoegd:
    // Primary: Groen met een subtiele donkere rand voor diepte.
    // Secondary: Wit met de standaard #E0E0E0 rand uit de styleguide.
    const variants = {
        primary: "bg-[#008100] text-[#FFFFFF] border-2 border-[#006400] hover:bg-[#000000] hover:border-[#000000]",
        secondary: "bg-[#FFFFFF] text-[#000000] border-2 border-[#E0E0E0] hover:bg-[#008100] hover:text-[#FFFFFF] hover:border-[#008100]"
    };

    return (
        <button
            onClick={onClick}
            className={`${variants[variant]} font-bold py-3 px-6 rounded-[10px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008100] flex items-center justify-center gap-2 ${className}`}
        >
            {children}
        </button>
    );
};