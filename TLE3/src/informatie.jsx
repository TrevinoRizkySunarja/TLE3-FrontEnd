import Navbar from "./components/Navbar.jsx";
import React from "react";

export default function InformatiePagina() {
    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <Navbar />

            {/* HEADER BLOK */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5]
                                p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                    Over ons team & het CMGT‑project
                </h1>
                <p className="text-lg leading-relaxed">
                    Deze webapplicatie is ontwikkeld als onderdeel van het
                    Creative Media & Game Technologies (CMGT) project.
                    Op deze pagina lees je meer over het team, de opdracht
                    en de visie achter dit project.
                </p>
            </section>

            {/* TEAM SECTIE */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5]
                                p-8 border border-[#E0E0E0]">
                <h2 className="text-2xl font-bold text-black mb-4">
                    Het projectteam
                </h2>

                <p className="leading-relaxed mb-6">
                    Ons team bestaat uit studenten van de opleiding
                    <strong> Creative Media & Game Technologies (CMGT)</strong>.
                    Binnen dit project heeft ieder teamlid een eigen rol
                    en verantwoordelijkheid gehad.
                </p>

                <ul className="space-y-4">
                    <li>
                        <p className="font-bold text-black">FrontEnd</p>
                        <p className="leading-relaxed">
                            Verantwoordelijk voor de gebruikerservaring,
                            interface‑ontwerp, flow‑structuur en implementatie
                            van de aanvraagformulieren.
                        </p>
                    </li>

                    <li>
                        <p className="font-bold text-black">BackEnd</p>
                        <p className="leading-relaxed">
                            Overige teamleden hebben gewerkt aan backend‑logica,
                            datamodellering, onderzoek, content en technische
                            implementatie van de aanbevelingssystemen.
                        </p>
                    </li>
                </ul>
            </section>

            {/* PROJECT SECTIE */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5]
                                p-8 border border-[#E0E0E0]">
                <h2 className="text-2xl font-bold text-black mb-4">
                    Over het CMGT‑project
                </h2>

                <p className="leading-relaxed mb-4">
                    Dit project is ontwikkeld in samenwerking met een
                    gemeentelijke casus. De opdracht was om een
                    <strong> gepersonaliseerde webapplicatie</strong> te ontwerpen
                    die burgers ondersteunt bij het aanvragen van documenten,
                    het doen van meldingen en het ontvangen van relevante informatie.
                </p>

                <p className="leading-relaxed mb-4">
                    De applicatie maakt gebruik van een
                    <strong> human‑in‑the‑loop aanbevelingssysteem</strong>,
                    waarbij zowel burgers als ambtenaren betrokken zijn bij
                    het verbeteren van de aanbevelingen.
                </p>

                <p className="leading-relaxed">
                    Het doel van het project is om digitale gemeentelijke
                    dienstverlening toegankelijker, duidelijker en persoonlijker
                    te maken.
                </p>
            </section>

            {/* AFSLUITING */}
            <section className="max-w-3xl mx-auto bg-[#F5F5F5]
                                p-8 border border-[#E0E0E0]">
                <h2 className="text-2xl font-bold text-black mb-4">
                    Waarom deze pagina?
                </h2>

                <p className="leading-relaxed">
                    Transparantie is belangrijk. Daarom leggen we op deze pagina uit
                    wie deze applicatie heeft gemaakt, waarom het project bestaat
                    en hoe het aansluit op de opleiding CMGT. Zo weet je precies
                    waar de applicatie vandaan komt en wat het doel ervan is.
                </p>
            </section>

        </main>
    );
}