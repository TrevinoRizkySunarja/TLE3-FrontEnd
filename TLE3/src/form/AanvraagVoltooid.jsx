import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import NavbarIngelogd from "../components/NavbarIngelogd.jsx";

export default function AanvraagVoltooid() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    if (!data) return <Navigate to="/aanvraag/stap-1" replace />;

    useEffect(() => {
        async function saveToBackend() {
            try {
                const inquiryPayload = {
                    user_id: 1,
                    type_id: data.type_id,
                    question: data.omschrijving,
                    status: "ingediend",
                    content: JSON.stringify(data),
                };

                const inquiryRes = await fetch("/api/inquiries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(inquiryPayload),
                });

                if (!inquiryRes.ok) return;

                const inquiry = await inquiryRes.json();

                const reportPayload = {
                    title: `Nieuwe aanvraag van ${data.naam}`,
                    description: data.omschrijving,
                    user_id: 1,
                    content_id: inquiry.id,
                };

                await fetch("/api/reports", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reportPayload),
                });

            } catch (err) {
                console.error("Fout bij opslaan aanvraag:", err);
            }
        }

        saveToBackend();
    }, [data]);

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <NavbarIngelogd />
            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0] mb-12">
                <h1 className="text-4xl font-bold text-black mb-4">Aanvraag voltooid</h1>

                <p className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded mb-6">
                    {data.warning}
                </p>

                <p className="text-lg mb-2">
                    Type aanvraag: <strong>{data.type_name}</strong>
                </p>
                <p className="text-lg mb-2">Naam: {data.naam}</p>
                <p className="text-lg mb-4">E-mailadres: {data.email}</p>

                {data.rijbewijsNummer && (
                    <p className="text-lg mb-2">Rijbewijsnummer: {data.rijbewijsNummer}</p>
                )}
                {data.heeftOudRijbewijs && (
                    <p className="text-lg mb-2">Oud rijbewijs: {data.heeftOudRijbewijs}</p>
                )}
                {data.heeftOudPaspoort && (
                    <p className="text-lg mb-2">Oud paspoort: {data.heeftOudPaspoort}</p>
                )}
                {data.oudIdNummer && (
                    <p className="text-lg mb-2">Oud ID-kaartnummer: {data.oudIdNummer}</p>
                )}
                {data.redenIdAanvraag && (
                    <p className="text-lg mb-2">Reden ID-aanvraag: {data.redenIdAanvraag}</p>
                )}
                {data.nationaliteit && (
                    <p className="text-lg mb-2">Nationaliteit: {data.nationaliteit}</p>
                )}
                {data.redenVerblijf && (
                    <p className="text-lg mb-2">Reden van verblijf: {data.redenVerblijf}</p>
                )}

                {data.locatie && (
                    <>
                        <p className="font-bold text-black text-xl mb-2">{data.locatie}</p>
                        <p className="text-lg mb-2">Datum: {data.datum}</p>
                        <p className="text-lg mb-2">Tijd: {data.tijd}</p>
                    </>
                )}

                <p className="text-lg mb-4">Betaalmethode: {data.payment}</p>

                <p className="leading-relaxed mb-4">
                    U ontvangt ook een bevestiging per e‑mail.
                </p>

                <button
                    onClick={() => navigate("/fyp")}
                    className="mt-2 px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black"
                >
                    Terug naar homepage
                </button>
            </section>
        </main>
    );
}