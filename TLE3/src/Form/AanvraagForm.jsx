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

                    {/* NAAM */}
                    <div>
                        <label className="block font-bold text-black mb-1">Naam</label>
                        <input
                            name="naam"
                            type="text"
                            value={formData.naam}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white"
                        />
                        {errors.naam && <p className="text-[#B00020] text-sm">{errors.naam}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block font-bold text-black mb-1">E-mailadres</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white"
                        />
                        {errors.email && <p className="text-[#B00020] text-sm">{errors.email}</p>}
                    </div>

                    {/* TYPE */}
                    <div>
                        <label className="block font-bold text-black mb-1">Type aanvraag</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white"
                        >
                            <option value="">Selecteer een optie…</option>
                            <option value="document">Document verlengen</option>
                            <option value="vergunning">Vergunning aanvragen</option>
                            <option value="melding">Melding doen</option>
                        </select>
                        {errors.type && <p className="text-[#B00020] text-sm">{errors.type}</p>}
                    </div>

                    {/* OMSCHRIJVING */}
                    <div>
                        <label className="block font-bold text-black mb-1">Omschrijving</label>
                        <textarea
                            name="omschrijving"
                            value={formData.omschrijving}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-3 border border-[#E0E0E0] bg-white"
                        />
                        {errors.omschrijving && <p className="text-[#B00020] text-sm">{errors.omschrijving}</p>}
                    </div>

                    {/* KNOP */}
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black"
                    >
                        Verder naar stap 2
                    </button>
                </form>
            </section>
        </main>
    );
}