import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

export default function AanvraagForm2() {
    // const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const previousData = location.state;

    // if (!user) return <Navigate to="/login" replace />;
    // if (!previousData) return <Navigate to="/aanvraag/stap-1" replace />;

    const [formData, setFormData] = useState({
        locatie: "",
        datum: "",
        tijd: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {};
        if (!formData.locatie) newErrors.locatie = "Selecteer een locatie.";
        if (!formData.datum) newErrors.datum = "Kies een datum.";
        if (!formData.tijd) newErrors.tijd = "Kies een tijdstip.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        navigate("/aanvraag/stap-3", {
            state: { ...previousData, ...formData },
        });
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">Stap 2 — Tijd & Locatie</h1>
                <p className="text-lg leading-relaxed">
                    Kies waar en wanneer u uw aanvraag wilt afronden.
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Locatie */}
                    <div>
                        <label className="block font-bold text-black mb-1">Locatie</label>
                        <select
                            name="locatie"
                            value={formData.locatie}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
                        >
                            <option value="">Selecteer een locatie…</option>
                            <option value="Stadhuis Rotterdam">Stadhuis Rotterdam</option>
                            <option value="Publieksbalie Zuid">Publieksbalie Zuid</option>
                            <option value="Publieksbalie Noord">Publieksbalie Noord</option>
                        </select>
                        {errors.locatie && <p className="text-[#B00020] text-sm">{errors.locatie}</p>}
                    </div>

                    {/* Datum */}
                    <div>
                        <label className="block font-bold text-black mb-1">Datum</label>
                        <input
                            type="date"
                            name="datum"
                            value={formData.datum}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.datum && <p className="text-[#B00020] text-sm">{errors.datum}</p>}
                    </div>

                    {/* Tijd */}
                    <div>
                        <label className="block font-bold text-black mb-1">Tijd</label>
                        <input
                            type="time"
                            name="tijd"
                            value={formData.tijd}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#008100]"
                        />
                        {errors.tijd && <p className="text-[#B00020] text-sm">{errors.tijd}</p>}
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black transition-colors"
                    >
                        Verder naar betaling
                    </button>
                </form>
            </section>
        </main>
    );
}