import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AanvraagForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        type: "",
        omschrijving: "",
    });

    const [errors, setErrors] = useState({});

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

        navigate("/aanvraag/stap-2", {
            state: formData,
        });
    }

    // Dynamische informatie per aanvraagtype
    const typeInfo = {
        rijbewijs: (
            <p className="text-[#1B1B1B] leading-relaxed">
                Voor een rijbewijs moet u uw <strong>gezondheidsverklaring</strong> meenemen en
                aantonen dat u <strong>theorie</strong> en <strong>praktijk</strong> heeft gehaald.
            </p>
        ),
        paspoort: (
            <p className="text-[#1B1B1B] leading-relaxed">
                Neem uw <strong>oude paspoort</strong> mee. Zorg dat u een recente
                <strong> pasfoto</strong> heeft die voldoet aan de eisen.
            </p>
        ),
        id: (
            <p className="text-[#1B1B1B] leading-relaxed">
                Neem uw <strong>oude identiteitsbewijs</strong> mee. Een recente pasfoto is verplicht.
            </p>
        ),
        verblijfsvergunning: (
            <p className="text-[#1B1B1B] leading-relaxed">
                Neem uw <strong>identiteitsdocument</strong> mee en alle documenten die uw aanvraag ondersteunen.
            </p>
        ),
        melding: (
            <p className="text-[#1B1B1B] leading-relaxed">
                Voor een melding hoeft u <strong>niet te betalen</strong>. U kunt kiezen of u een afspraak wilt maken.
            </p>
        ),
    };

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">

            {/* TITEL */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                    Aanvraagformulier
                </h1>
                <p className="text-lg leading-relaxed">
                    Vul het onderstaande formulier in om uw aanvraag te starten.
                </p>
            </section>

            {/* FORM */}
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
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
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
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
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
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
                        >
                            <option value="">Selecteer een optie…</option>
                            <option value="rijbewijs">Rijbewijs aanvragen</option>
                            <option value="paspoort">Paspoort aanvragen</option>
                            <option value="id">Identiteitsbewijs aanvragen</option>
                            <option value="verblijfsvergunning">Verblijfsvergunning aanvragen</option>
                            <option value="melding">Melding doen</option>
                        </select>
                        {errors.type && <p className="text-[#B00020] text-sm">{errors.type}</p>}
                    </div>

                    {/* DYNAMISCHE INFO */}
                    {formData.type && (
                        <div className="p-4 bg-white border border-[#E0E0E0]">
                            {typeInfo[formData.type]}
                        </div>
                    )}

                    {/* OMSCHRIJVING */}
                    <div>
                        <label className="block font-bold text-black mb-1">Omschrijving</label>
                        <textarea
                            name="omschrijving"
                            rows="5"
                            value={formData.omschrijving}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.omschrijving && <p className="text-[#B00020] text-sm">{errors.omschrijving}</p>}
                    </div>

                    {/* KNOP */}
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black focus:ring-2 focus:ring-black"
                    >
                        Verder naar stap 2
                    </button>
                </form>
            </section>
        </main>
    );
}