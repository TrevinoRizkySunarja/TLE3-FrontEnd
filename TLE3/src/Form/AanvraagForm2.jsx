import { useState, useMemo } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function AanvraagForm2() {
    const navigate = useNavigate();
    const location = useLocation();
    const dataFromStep1 = location.state;

    if (!dataFromStep1) return <Navigate to="/aanvraag/stap-1" replace />;

    const type = dataFromStep1.type;

    const [formData, setFormData] = useState({
        locatie: "",
        datum: "",
        tijd: "",
        gezondheidsverklaring: "",
        theorieGehaald: "",
        praktijkGehaald: "",
        oudDocumentAanwezig: "",
        pasfotoAanwezig: "",
        nationaliteit: "",
        redenVerblijf: "",
        meldingTekst: "",
        afspraakMaken: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const timeSlots = useMemo(() => {
        const slots = [];
        let hour = 12;
        let minute = 0;

        while (hour < 17 || (hour === 17 && minute === 0)) {
            const h = String(hour).padStart(2, "0");
            const m = String(minute).padStart(2, "0");
            slots.push(`${h}:${m}`);
            minute += 30;
            if (minute === 60) {
                minute = 0;
                hour += 1;
            }
        }
        return slots;
    }, []);

    function validate() {
        const newErrors = {};

        if (type === "rijbewijs") {
            if (!formData.gezondheidsverklaring) newErrors.gezondheidsverklaring = "Maak een keuze.";
            if (!formData.theorieGehaald) newErrors.theorieGehaald = "Maak een keuze.";
            if (!formData.praktijkGehaald) newErrors.praktijkGehaald = "Maak een keuze.";
        }

        if (type === "paspoort" || type === "id") {
            if (!formData.oudDocumentAanwezig) newErrors.oudDocumentAanwezig = "Maak een keuze.";
            if (!formData.pasfotoAanwezig) newErrors.pasfotoAanwezig = "Maak een keuze.";
        }

        if (type === "verblijfsvergunning") {
            if (!formData.nationaliteit.trim()) newErrors.nationaliteit = "Selecteer uw nationaliteit.";
            if (!formData.redenVerblijf.trim()) newErrors.redenVerblijf = "Beschrijf de reden van uw aanvraag.";
        }

        if (type === "melding") {
            if (!formData.meldingTekst.trim()) newErrors.meldingTekst = "Beschrijf uw melding.";
            if (!formData.afspraakMaken) newErrors.afspraakMaken = "Maak een keuze.";
            if (formData.afspraakMaken === "ja") {
                if (!formData.locatie) newErrors.locatie = "Kies een locatie.";
                if (!formData.datum) newErrors.datum = "Kies een datum.";
                if (!formData.tijd) newErrors.tijd = "Kies een tijd.";
            }
        } else {
            if (!formData.locatie) newErrors.locatie = "Kies een locatie.";
            if (!formData.datum) newErrors.datum = "Kies een datum.";
            if (!formData.tijd) newErrors.tijd = "Kies een tijd.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        const combinedData = { ...dataFromStep1, ...formData };

        if (type === "melding" && formData.afspraakMaken === "nee") {
            navigate("/aanvraag/voltooid", { state: combinedData });
        } else {
            navigate("/aanvraag/stap-3", { state: combinedData });
        }
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">
                    Stap 2 — Aanvullende informatie
                </h1>
                <p className="text-lg leading-relaxed">
                    U doet een aanvraag voor: <strong>{type}</strong>
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* RYBEWIJS */}
                    {type === "rijbewijs" && (
                        <>
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Gezondheidsverklaring ingediend?
                                </label>
                                <select
                                    name="gezondheidsverklaring"
                                    value={formData.gezondheidsverklaring}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                                {errors.gezondheidsverklaring && (
                                    <p className="text-[#B00020] text-sm">{errors.gezondheidsverklaring}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Theorie-examen gehaald?
                                </label>
                                <select
                                    name="theorieGehaald"
                                    value={formData.theorieGehaald}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                                {errors.theorieGehaald && (
                                    <p className="text-[#B00020] text-sm">{errors.theorieGehaald}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Praktijkexamen gehaald?
                                </label>
                                <select
                                    name="praktijkGehaald"
                                    value={formData.praktijkGehaald}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                                {errors.praktijkGehaald && (
                                    <p className="text-[#B00020] text-sm">{errors.praktijkGehaald}</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* PASPOORT / ID */}
                    {(type === "paspoort" || type === "id") && (
                        <>
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Oud document aanwezig?
                                </label>
                                <select
                                    name="oudDocumentAanwezig"
                                    value={formData.oudDocumentAanwezig}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                                {errors.oudDocumentAanwezig && (
                                    <p className="text-[#B00020] text-sm">{errors.oudDocumentAanwezig}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Geldige pasfoto aanwezig?
                                </label>
                                <select
                                    name="pasfotoAanwezig"
                                    value={formData.pasfotoAanwezig}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                                {errors.pasfotoAanwezig && (
                                    <p className="text-[#B00020] text-sm">{errors.pasfotoAanwezig}</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* VERBLIJFSVERGUNNING */}
                    {type === "verblijfsvergunning" && (
                        <>
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Nationaliteit
                                </label>
                                <select
                                    name="nationaliteit"
                                    value={formData.nationaliteit}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer uw nationaliteit…</option>
                                    {/* Landenlijst hier */}
                                </select>
                                {errors.nationaliteit && (
                                    <p className="text-[#B00020] text-sm">{errors.nationaliteit}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Reden van verblijf
                                </label>
                                <textarea
                                    name="redenVerblijf"
                                    rows="4"
                                    value={formData.redenVerblijf}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.redenVerblijf && (
                                    <p className="text-[#B00020] text-sm">{errors.redenVerblijf}</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* MELDING */}
                    {type === "melding" && (
                        <>
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Beschrijf uw melding
                                </label>
                                <textarea
                                    name="meldingTekst"
                                    rows="5"
                                    value={formData.meldingTekst}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.meldingTekst && (
                                    <p className="text-[#B00020] text-sm">{errors.meldingTekst}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Wilt u een afspraak maken?
                                </label>
                                <select
                                    name="afspraakMaken"
                                    value={formData.afspraakMaken}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                                {errors.afspraakMaken && (
                                    <p className="text-[#B00020] text-sm">{errors.afspraakMaken}</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* AFSPRAAKGEGEVENS */}
                    {(type !== "melding" || formData.afspraakMaken === "ja") && (
                        <>
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Locatie
                                </label>
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

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Datum
                                </label>
                                <input
                                    type="date"
                                    name="datum"
                                    value={formData.datum}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.datum && (
                                    <p className="text-[#B00020] text-sm">{errors.datum}</p>
                                )}
                            </div>

                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Tijd
                                </label>
                                <select
                                    name="tijd"
                                    value={formData.tijd}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Selecteer een tijd…</option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                {errors.tijd && (
                                    <p className="text-[#B00020] text-sm">{errors.tijd}</p>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black"
                    >
                        Verder
                    </button>
                </form>
            </section>
        </main>
    );
}