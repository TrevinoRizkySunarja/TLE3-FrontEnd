import React from 'react';

export const Button = ({
                           children,
                           onClick,
                           variant = 'primary',
                           className = "",
                           type = "button",
                           ...props
                       }) => {
    // Styleguide kleuren
    const variants = {
        // Primary: Groen naar Zwart hover
        primary: "bg-[#008100] text-white hover:bg-black",
        // Secondary: Wit naar Groen hover (border aangepast naar #767676 voor WCAG contrast)
        secondary: "bg-white text-black border border-[#767676] hover:bg-[#008100] hover:text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${variants[variant]} font-bold py-3 px-6 rounded-[5px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008100] ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};