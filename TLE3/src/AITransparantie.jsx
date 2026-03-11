import React from "react";
import NavbarUit from "./components/NavbarUit.jsx";

export default function AITransparantie() {
    return (
        <>
            <NavbarUit />
            <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
                {/* SECTION 1 — Waarom AI */}
                <section className="max-w-4xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                    <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                        Transparantie over AI‑gebruik
                    </h1>
                    <p className="text-lg leading-relaxed">
                        Onze gemeente gebruikt Artificial Intelligence (AI) om processen te verbeteren,
                        burgers sneller te helpen en informatie persoonlijker te maken.
                        We vinden het belangrijk dat je precies weet hoe dit werkt.
                    </p>
                </section>

                {/* SECTION 2 — Waarom gebruiken we AI */}
                <section className="max-w-4xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                    <h2 className="text-2xl font-bold text-black mb-3 leading-snug">
                        Waarom gebruiken we AI?
                    </h2>
                    <p className="leading-relaxed">
                        AI helpt ons om meldingen sneller te verwerken, relevante informatie te tonen
                        en burgers beter te ondersteunen. Dit gebeurt altijd binnen de wettelijke kaders
                        en met respect voor jouw privacy.
                    </p>
                </section>

                {/* SECTION 3 — Welke gegevens worden gebruikt */}
                <section className="max-w-4xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                    <h2 className="text-2xl font-bold text-black mb-3 leading-snug">
                        Welke gegevens worden gebruikt?
                    </h2>
                    <p className="leading-relaxed">
                        Alleen gegevens waarvoor jij toestemming hebt gegeven worden gebruikt.
                        Deze gegevens worden nooit gedeeld met externe partijen zonder jouw expliciete toestemming.
                    </p>

                    <ul className="list-disc ml-6 mt-3 space-y-1">
                        <li>Basisgegevens (zoals leeftijd of woonplaats)</li>
                        <li>Documentstatus (bijv. paspoort of vergunning)</li>
                        <li>Voorkeuren en interesses</li>
                        <li>Interactiegeschiedenis binnen de website</li>
                    </ul>
                </section>

                {/* SECTION 4 — AI uitzetten */}
                <section className="max-w-4xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                    <h2 className="text-2xl font-bold text-black mb-3 leading-snug">
                        Kan ik AI uitzetten?
                    </h2>
                    <p className="leading-relaxed">
                        Ja. Je kunt AI‑functionaliteiten op elk moment uitschakelen in de instellingen.
                        Je behoudt toegang tot alle belangrijke functies, maar zonder persoonlijke aanbevelingen.
                    </p>

                    <a
                        href="/instellingen"
                        className="inline-block mt-4 px-6 py-3 bg-[#008100] text-white font-bold rounded-md
                   hover:bg-black hover:text-[#F5F5F5] transition-colors"
                    >
                        Ga naar instellingen
                    </a>
                </section>

                {/* SECTION 5 — Waarom zie ik dit */}
                <section className="max-w-4xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                    <h2 className="text-2xl font-bold text-black mb-3 leading-snug">
                        Waarom zie ik dit?
                    </h2>
                    <p className="leading-relaxed">
                        Wanneer AI jou een melding of advies toont, kun je altijd op
                        <strong> “Waarom zie ik dit?” </strong> klikken. Daar leggen we uit:
                    </p>

                    <ul className="list-disc ml-6 mt-3 space-y-1">
                        <li>welke gegevens zijn gebruikt</li>
                        <li>waarom deze melding relevant is</li>
                        <li>hoe je dit kunt aanpassen of uitschakelen</li>
                    </ul>
                </section>

            </main>
        </>
    );
}