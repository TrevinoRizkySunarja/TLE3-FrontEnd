import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function AanvraagForm2() {
    const navigate = useNavigate();
    const location = useLocation();
    const previousData = location.state;

    if (!previousData) return <Navigate to="/aanvraag/stap-1" replace />;

    const typeId = Number(previousData.type_id);
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        locatie: "",
        datum: "",
        tijd: "",
    });

    const [errors, setErrors] = useState({});

    const timeSlots = [
        "09:00","09:30","10:00","10:30","11:00","11:30",
        "12:00","12:30","13:00","13:30","14:00","14:30",
        "15:00","15:30","16:00","16:30"
    ];

    const needsAppointmentStep =
        typeId === 1 || typeId === 2 || typeId === 3 || typeId === 4 ||
        (typeId === 5 && !previousData.wilAfspraak);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function validate() {
        const newErrors = {};
        if (needsAppointmentStep) {
            if (!formData.locatie) newErrors.locatie = "Selecteer een locatie.";
            if (!formData.datum) newErrors.datum = "Kies een datum.";
            if (!formData.tijd) newErrors.tijd = "Kies een tijdstip.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        navigate("/aanvraag/stap-3", {
            state: {
                ...previousData,
                ...(needsAppointmentStep ? formData : {}),
            },
        });
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">
                    Stap 2 — {needsAppointmentStep ? "Tijd & Locatie" : "Controle"}
                </h1>
                <p className="text-lg leading-relaxed mb-2">
                    Type aanvraag: <strong>{previousData.type_name}</strong>
                </p>
                <p className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
                    {previousData.warning}
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {needsAppointmentStep ? (
                        <>
                            {/* Locatie */}
                            <div>
                                <label className="block font-bold text-black mb-1">Locatie</label>
                                <select
                                    name="locatie"
                                    value={formData.locatie}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer een locatie…</option>
                                    <option value="Stadhuis Rotterdam">Stadhuis Rotterdam</option>
                                    <option value="Publieksbalie Zuid">Publieksbalie Zuid</option>
                                    <option value="Publieksbalie Noord">Publieksbalie Noord</option>
                                </select>
                                {errors.locatie && (
                                    <p className="text-[#B00020] text-sm">{errors.locatie}</p>
                                )}
                            </div>

                            {/* Datum */}
                            <div>
                                <label className="block font-bold text-black mb-1">Datum</label>
                                <input
                                    type="date"
                                    name="datum"
                                    min={today}
                                    value={formData.datum}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.datum && (
                                    <p className="text-[#B00020] text-sm">{errors.datum}</p>
                                )}
                            </div>

                            {/* Tijd */}
                            <div>
                                <label className="block font-bold text-black mb-1">Tijd</label>
                                <select
                                    name="tijd"
                                    value={formData.tijd}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer een tijd…</option>
                                    {timeSlots.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                {errors.tijd && (
                                    <p className="text-[#B00020] text-sm">{errors.tijd}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="leading-relaxed">
                            Er zijn geen extra gegevens nodig voor deze aanvraag. Klik op de knop
                            hieronder om door te gaan naar de betaling.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black"
                    >
                        Verder naar betaling
                    </button>
                </form>
            </section>
        </main>
    );
}