import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AanvraagForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        naam: "",
        email: "",
        type_id: "",
        type_name: "",
        warning: "",
        omschrijving: "",
        // type-specifiek
        rijbewijsNummer: "",
        heeftOudRijbewijs: "",
        heeftOudPaspoort: "",
        oudIdNummer: "",
        redenIdAanvraag: "",
        nationaliteit: "",
        redenVerblijf: "",
        wilAfspraak: false,
        locatie: "",
        datum: "",
        tijd: "",
    });

    const [errors, setErrors] = useState({});

    const aanvraagTypes = [
        { id: 1, name: "Rijbewijs aanvragen", warning: "Neem uw oude rijbewijs mee naar de afspraak als u die heeft." },
        { id: 2, name: "Paspoort aanvragen", warning: "Neem uw oude paspoort mee naar de afspraak als u die heeft." },
        { id: 3, name: "ID-kaart aanvragen", warning: "Neem uw oude ID-kaart mee naar de afspraak als u die heeft." },
        { id: 4, name: "Verblijfsvergunning aanvragen", warning: "Neem al uw verblijfsdocumenten mee naar de afspraak." },
        { id: 5, name: "Melding doen", warning: "Beschrijf uw melding zo volledig mogelijk." },
    ];

    const landen = [
        "Nederland",
        "België",
        "Duitsland",
        "Frankrijk",
        "Spanje",
        "Italië",
        "Polen",
        "Turkije",
        "Marokko",
        "Suriname",
        "Anders",
    ];

    const today = new Date().toISOString().split("T")[0];

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (name === "type_id") {
            const selected = aanvraagTypes.find(t => t.id === Number(value));
            setFormData({
                ...formData,
                type_id: value,
                type_name: selected?.name || "",
                warning: selected?.warning || "",
            });
        } else if (name === "wilAfspraak") {
            setFormData({ ...formData, wilAfspraak: type === "checkbox" ? checked : value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    function validate() {
        const newErrors = {};

        if (!formData.naam.trim()) newErrors.naam = "Vul uw naam in.";
        if (!formData.email.trim()) newErrors.email = "Vul uw e-mailadres in.";
        if (!formData.type_id) newErrors.type_id = "Selecteer een aanvraagtype.";

        // type-specifieke validatie
        const typeId = Number(formData.type_id);

        if (typeId === 5) {
            // Melding doen
            if (!formData.omschrijving.trim()) newErrors.omschrijving = "Beschrijf uw melding.";
            if (formData.wilAfspraak) {
                if (!formData.locatie) newErrors.locatie = "Selecteer een locatie.";
                if (!formData.datum) newErrors.datum = "Kies een datum.";
                if (!formData.tijd) newErrors.tijd = "Kies een tijdstip.";
            }
        } else if (typeId === 4) {
            // Verblijfsvergunning
            if (!formData.nationaliteit) newErrors.nationaliteit = "Selecteer uw nationaliteit.";
            if (!formData.redenVerblijf.trim()) newErrors.redenVerblijf = "Vul de reden van verblijf in.";
        } else if (typeId === 1) {
            // Rijbewijs
            if (!formData.rijbewijsNummer.trim()) newErrors.rijbewijsNummer = "Vul uw rijbewijsnummer in.";
        } else if (typeId === 2) {
            // Paspoort
            // geen extra verplicht veld behalve omschrijving
            if (!formData.omschrijving.trim()) newErrors.omschrijving = "Beschrijf uw aanvraag.";
        } else if (typeId === 3) {
            // ID-kaart
            if (!formData.oudIdNummer.trim()) newErrors.oudIdNummer = "Vul uw oude ID-kaartnummer in (of 'geen').";
            if (!formData.redenIdAanvraag.trim()) newErrors.redenIdAanvraag = "Vul de reden van aanvraag in.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        navigate("/aanvraag/stap-2", {
            state: {
                ...formData,
                type_id: Number(formData.type_id),
            },
        });
    }

    const typeId = Number(formData.type_id);

    const timeSlots = [
        "09:00","09:30","10:00","10:30","11:00","11:30",
        "12:00","12:30","13:00","13:30","14:00","14:30",
        "15:00","15:30","16:00","16:30"
    ];

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
                            name="type_id"
                            value={formData.type_id}
                            onChange={handleChange}
                            className="w-full p-3 border border-[#E0E0E0] bg-white"
                        >
                            <option value="">Selecteer een optie…</option>
                            {aanvraagTypes.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        {errors.type_id && <p className="text-[#B00020] text-sm">{errors.type_id}</p>}
                    </div>

                    {/* WARNING ALGEMEEN PER TYPE */}
                    {formData.warning && (
                        <p className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
                            {formData.warning}
                        </p>
                    )}

                    {/* TYPE-SPECIFIEKE VELDEN */}

                    {typeId === 1 && (
                        <div>
                            <label className="block font-bold text-black mb-1">Rijbewijsnummer</label>
                            <input
                                name="rijbewijsNummer"
                                type="text"
                                value={formData.rijbewijsNummer}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#E0E0E0] bg-white"
                            />
                            {errors.rijbewijsNummer && (
                                <p className="text-[#B00020] text-sm">{errors.rijbewijsNummer}</p>
                            )}
                            <div className="mt-3">
                                <label className="block font-bold text-black mb-1">
                                    Heeft u een oud rijbewijs?
                                </label>
                                <select
                                    name="heeftOudRijbewijs"
                                    value={formData.heeftOudRijbewijs}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                >
                                    <option value="">Maak een keuze…</option>
                                    <option value="ja">Ja</option>
                                    <option value="nee">Nee</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {typeId === 2 && (
                        <div>
                            <label className="block font-bold text-black mb-1">
                                Heeft u een oud paspoort?
                            </label>
                            <select
                                name="heeftOudPaspoort"
                                value={formData.heeftOudPaspoort}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#E0E0E0] bg-white"
                            >
                                <option value="">Maak een keuze…</option>
                                <option value="ja">Ja</option>
                                <option value="nee">Nee</option>
                            </select>
                        </div>
                    )}

                    {typeId === 3 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Oud ID-kaartnummer
                                </label>
                                <input
                                    name="oudIdNummer"
                                    type="text"
                                    value={formData.oudIdNummer}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.oudIdNummer && (
                                    <p className="text-[#B00020] text-sm">{errors.oudIdNummer}</p>
                                )}
                            </div>
                            <div>
                                <label className="block font-bold text-black mb-1">
                                    Reden van aanvraag
                                </label>
                                <textarea
                                    name="redenIdAanvraag"
                                    value={formData.redenIdAanvraag}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.redenIdAanvraag && (
                                    <p className="text-[#B00020] text-sm">{errors.redenIdAanvraag}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {typeId === 4 && (
                        <div className="space-y-4">
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
                                    <option value="">Selecteer een land…</option>
                                    {landen.map((land) => (
                                        <option key={land} value={land}>{land}</option>
                                    ))}
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
                                    value={formData.redenVerblijf}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.redenVerblijf && (
                                    <p className="text-[#B00020] text-sm">{errors.redenVerblijf}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {typeId === 5 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold text-black mb-1">Omschrijving</label>
                                <textarea
                                    name="omschrijving"
                                    value={formData.omschrijving}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full p-3 border border-[#E0E0E0] bg-white"
                                />
                                {errors.omschrijving && (
                                    <p className="text-[#B00020] text-sm">{errors.omschrijving}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    id="wilAfspraak"
                                    name="wilAfspraak"
                                    type="checkbox"
                                    checked={formData.wilAfspraak}
                                    onChange={handleChange}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="wilAfspraak" className="font-bold text-black">
                                    Ik wil een afspraak maken
                                </label>
                            </div>

                            {formData.wilAfspraak && (
                                <div className="space-y-4">
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
                                </div>
                            )}
                        </div>
                    )}

                    {/* GENERIEKE OMSCHRIJVING VOOR NIET-MELDING */}
                    {typeId !== 5 && (
                        <div>
                            <label className="block font-bold text-black mb-1">Omschrijving</label>
                            <textarea
                                name="omschrijving"
                                value={formData.omschrijving}
                                onChange={handleChange}
                                rows="5"
                                className="w-full p-3 border border-[#E0E0E0] bg-white"
                            />
                            {errors.omschrijving && (
                                <p className="text-[#B00020] text-sm">{errors.omschrijving}</p>
                            )}
                        </div>
                    )}

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