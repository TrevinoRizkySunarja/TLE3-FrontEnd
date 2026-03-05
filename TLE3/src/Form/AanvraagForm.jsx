import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

export default function AanvraagForm() {
    // const { user } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        type: "",
        omschrijving: "",
    });

    const [errors, setErrors] = useState({});

    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {};

        if (!formData.naam.trim()) newErrors.naam = "Vul uw naam in.";
        if (!formData.email.trim()) newErrors.email = "Vul uw e-mailadres in.";
        if (!formData.type.trim()) newErrors.type = "Selecteer een aanvraagtype.";
        if (!formData.omschrijving.trim()) newErrors.omschrijving = "Beschrijf uw aanvraag.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        navigate("/aanvraag/stap-2", { state: formData });
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            {/* TITELBLOK */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                    Aanvraagformulier
                </h1>
                <p className="text-lg leading-relaxed">
                    Vul het onderstaande formulier in om uw aanvraag in te dienen.
                    Alle velden zijn verplicht en worden gecontroleerd op juistheid.
                </p>
            </section>

            {/* FORMULIER */}
            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h2 className="text-2xl font-bold text-black mb-6 leading-snug">
                    Stap 1 — Gegevens invullen
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md
                        hover:bg-black hover:text-white transition-colors
                        focus:outline-none focus:ring-2 focus:ring-black"

                    >
                        Verder naar stap 2
                    </button>
                </form>
            </section>
        </main>
    );
}