import { useLocation, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

export default function AanvraagVoltooid() {
    // const { user } = useAuth();
    const location = useLocation();
    const data = location.state;

    if (!data) return <Navigate to="/aanvraag/stap-1" replace />;

    const type = data.type;

    const documentInfo = {
        rijbewijs: "Neem uw oude rijbewijs mee naar uw afspraak.",
        paspoort: "Neem uw oude paspoort mee naar uw afspraak.",
        id: "Neem uw oude identiteitsbewijs mee naar uw afspraak.",
        verblijfsvergunning: "Neem uw identiteitsdocument en relevante bewijsstukken mee.",
        melding: "Uw melding is succesvol ontvangen.",
    };

    const heeftAfspraak =
        type !== "melding" || (type === "melding" && data.afspraakMaken === "ja");

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">

            {/* TITEL */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">
                    Aanvraag voltooid
                </h1>
                <p className="text-lg leading-relaxed">
                    Uw aanvraag is succesvol verwerkt.
                </p>
            </section>

            {/* INHOUD */}
            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0] space-y-6">

                {/* Dynamische info per type */}
                <p className="text-lg leading-relaxed">
                    {documentInfo[type]}
                </p>

                {/* OPMERKING */}
                {data.opmerking && (
                    <div className="p-4 bg-white border border-[#E0E0E0]">
                        <p className="font-bold text-black mb-1">Uw opmerking:</p>
                        <p className="leading-relaxed">{data.opmerking}</p>
                    </div>
                )}

                {/* AFSPRAAKGEGEVENS */}
                {heeftAfspraak && (
                    <div className="space-y-2">
                        <p className="text-lg">Uw afspraak vindt plaats op:</p>

                        <p className="font-bold text-black text-xl">
                            {data.locatie}
                        </p>

                        <p className="text-lg">
                            Datum: <strong>{data.datum}</strong>
                        </p>

                        <p className="text-lg">
                            Tijd: <strong>{data.tijd}</strong>
                        </p>
                    </div>
                )}

                {/* MELDING ZONDER AFSPRAAK */}
                {type === "melding" && data.afspraakMaken === "nee" && (
                    <p className="text-lg leading-relaxed">
                        U heeft ervoor gekozen geen afspraak te maken. Wij nemen contact met u op indien nodig.
                    </p>
                )}

                <p className="leading-relaxed">
                    U ontvangt ook een bevestiging per e‑mail.
                </p>
            </section>
        </main>
    );
}