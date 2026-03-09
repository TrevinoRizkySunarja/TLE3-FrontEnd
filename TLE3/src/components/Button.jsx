import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = "" }) => {
    // Strikte hover-regels vanuit de styleguide:
    // Primary: Achtergrond groen (#008100) -> Hover zwart (#000000)
    // Secondary: Achtergrond wit (#FFFFFF) -> Hover groen (#008100)
    const variants = {
        primary: "bg-[#008100] text-[#FFFFFF] hover:bg-[#000000]",
        secondary: "bg-[#FFFFFF] text-[#000000] border border-[#E0E0E0] hover:bg-[#008100] hover:text-[#FFFFFF]"
    };

    return (
        <button
            onClick={onClick}
            className={`${variants[variant]} font-bold py-3 px-6 rounded-[5px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008100] ${className}`}
        >
            {children}
        </button>
    );
};