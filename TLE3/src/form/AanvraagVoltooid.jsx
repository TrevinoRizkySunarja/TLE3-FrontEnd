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
                // CONTENT-ITEM AANMAKEN
                const contentPayload = {
                    title: `Aanvraag: ${data.type_name}`,
                    body: JSON.stringify(data),
                    content_type: "aanvraag",
                    status: "submitted",
                    created_by: data.email
                };

                const contentRes = await fetch("http://145.24.237.215:8000/api/content-items", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
                    },
                    body: JSON.stringify(contentPayload),
                });

                if (!contentRes.ok) {
                    const errorText = await contentRes.text();
                    console.error("Content-item aanmaken mislukt:", contentRes.status, errorText);
                    return;
                }

                const content = await contentRes.json(); // bevat content.id

                const inquiryPayload = {
                    user_id: data.user_id,
                    type_id: data.type_id,
                    content: data,
                    status: "ingediend",
                    question: data.omschrijving
                };

                const inquiryRes = await fetch("http://145.24.237.215:8000/api/inquiries", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
                    },
                    body: JSON.stringify(inquiryPayload),
                });

                if (!inquiryRes.ok) {
                    const errorText = await inquiryRes.text();
                    console.error("Inquiry aanmaken mislukt:", inquiryRes.status, errorText);
                    return;
                }

                // 3️⃣ REPORT AANMAKEN (volgens ERD)
                const reportPayload = {
                    title: `Nieuwe aanvraag van ${data.naam}`,
                    description: data.omschrijving,
                    user_id: data.user_id,
                    content_id: content.id
                };

                const reportRes = await fetch("http://145.24.237.215:8000/api/reports", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
                    },
                    body: JSON.stringify(reportPayload),
                });

                if (!reportRes.ok) {
                    const errorText = await reportRes.text();
                    console.error("Report aanmaken mislukt:", reportRes.status, errorText);
                    return;
                }

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

                {data.rijbewijsNummer && <p className="text-lg mb-2">Rijbewijsnummer: {data.rijbewijsNummer}</p>}
                {data.heeftOudRijbewijs && <p className="text-lg mb-2">Oud rijbewijs: {data.heeftOudRijbewijs}</p>}
                {data.heeftOudPaspoort && <p className="text-lg mb-2">Oud paspoort: {data.heeftOudPaspoort}</p>}
                {data.oudIdNummer && <p className="text-lg mb-2">Oud ID-kaartnummer: {data.oudIdNummer}</p>}
                {data.redenIdAanvraag && <p className="text-lg mb-2">Reden ID-aanvraag: {data.redenIdAanvraag}</p>}
                {data.nationaliteit && <p className="text-lg mb-2">Nationaliteit: {data.nationaliteit}</p>}
                {data.redenVerblijf && <p className="text-lg mb-2">Reden van verblijf: {data.redenVerblijf}</p>}

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