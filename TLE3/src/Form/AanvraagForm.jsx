import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AanvraagForm() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        voornaam: "",
        achternaam: "",
        email: "",
        type: "",
        opmerking: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {};
        const nameRegex = /^[A-Za-zÀ-ÿ' -]+$/;

        if (!formData.voornaam.trim()) {
            newErrors.voornaam = "Vul uw voornaam in.";
        } else if (!nameRegex.test(formData.voornaam)) {
            newErrors.voornaam = "Voornaam mag geen cijfers bevatten.";
        }

        if (!formData.achternaam.trim()) {
            newErrors.achternaam = "Vul uw achternaam in.";
        } else if (!nameRegex.test(formData.achternaam)) {
            newErrors.achternaam = "Achternaam mag geen cijfers bevatten.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Vul uw e-mailadres in.";
        }

        if (!formData.type.trim()) {
            newErrors.type = "Selecteer een aanvraagtype.";
        }

        if (!formData.opmerking.trim()) {
            newErrors.opmerking = "Vul een opmerking in.";
        }

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
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                    Aanvraagformulier
                </h1>
                <p className="text-lg leading-relaxed">
                    Vul het onderstaande formulier in om uw aanvraag te starten.
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h2 className="text-2xl font-bold text-black mb-6 leading-snug">
                    Stap 1 — Gegevens invullen
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="voornaam" className="block font-bold text-black mb-1">
                            Voornaam
                        </label>
                        <input
                            id="voornaam"
                            name="voornaam"
                            type="text"
                            placeholder="Bijv. Jan"
                            value={formData.voornaam}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ' -]+$"
                            className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.voornaam && (
                            <p className="text-[#B00020] text-sm mt-1">{errors.voornaam}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="achternaam" className="block font-bold text-black mb-1">
                            Achternaam
                        </label>
                        <input
                            id="achternaam"
                            name="achternaam"
                            type="text"
                            placeholder="Bijv. Jansen"
                            value={formData.achternaam}
                            onChange={handleChange}
                            pattern="^[A-Za-zÀ-ÿ' -]+$"
                            className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.achternaam && (
                            <p className="text-[#B00020] text-sm mt-1">{errors.achternaam}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-bold text-black mb-1">
                            E-mailadres
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Bijv. voorbeeld@mail.nl"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.email && (
                            <p className="text-[#B00020] text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="type" className="block font-bold text-black mb-1">
                            Type aanvraag
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                        >
                            <option value="">Selecteer een optie…</option>
                            <option value="rijbewijs">Rijbewijs aanvragen</option>
                            <option value="paspoort">Paspoort aanvragen</option>
                            <option value="id">Identiteitsbewijs aanvragen</option>
                            <option value="verblijfsvergunning">Verblijfsvergunning aanvragen</option>
                            <option value="melding">Melding doen</option>
                        </select>
                        {errors.type && (
                            <p className="text-[#B00020] text-sm mt-1">{errors.type}</p>
                        )}
                    </div>

                    {formData.type && (
                        <div className="p-4 bg-white border border-[#E0E0E0]">
                            {typeInfo[formData.type]}
                        </div>
                    )}

                    <div>
                        <label htmlFor="opmerking" className="block font-bold text-black mb-1">
                            Opmerking
                        </label>
                        <textarea
                            id="opmerking"
                            name="opmerking"
                            placeholder="Voeg een opmerking toe…"
                            value={formData.opmerking}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.opmerking && (
                            <p className="text-[#B00020] text-sm mt-1">{errors.opmerking}</p>
                        )}
                    </div>

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