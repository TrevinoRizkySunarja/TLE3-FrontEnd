export default function AITransparantie() {
    return (
        <main className="bg-white text-[#1B1B1B] font-sans">
            {/* HERO SECTION */}
            <section className="bg-[#F5F5F5] border-b border-[#E0E0E0] py-12 px-6 text-center">
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                    Transparantie over AI‑gebruik
                </h1>
                <p className="max-w-2xl mx-auto text-lg leading-relaxed">
                    Onze gemeente gebruikt Artificial Intelligence (AI) om processen te verbeteren,
                    burgers sneller te helpen en informatie persoonlijker te maken.
                    We vinden het belangrijk dat je precies weet hoe dit werkt.
                </p>
            </section>

            {/* MAIN CONTENT */}
            <section className="max-w-4xl mx-auto py-12 px-6 space-y-12">

                {/* Waarom AI */}
                <div className="bg-[#FFFFFF] p-8 border border-[#E0E0E0] rounded-lg">
                    <h2 className="text-2xl font-bold text-black mb-3 leading-snug">
                        Waarom gebruiken we AI?
                    </h2>
                    <p className="leading-relaxed">
                        AI helpt ons om meldingen sneller te verwerken, relevante informatie te tonen
                        en burgers beter te ondersteunen. Dit gebeurt altijd binnen de wettelijke kaders
                        en met respect voor jouw privacy.
                    </p>
                </div>

                {/* Welke gegevens */}
                <div className="bg-[#FFFFFF] p-8 border border-[#E0E0E0] rounded-lg">
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
                </div>

                {/* AI uitzetten */}
                <div className="bg-[#FFFFFF] p-8 border border-[#E0E0E0] rounded-lg">
                    <h2 className="text-2xl font-bold text-black mb-3 leading-snug">
                        Kan ik AI uitzetten?
                    </h2>
                    <p className="leading-relaxed">
                        Ja. Je kunt AI‑functionaliteiten op elk moment uitschakelen in de instellingen.
                        Je behoudt toegang tot alle belangrijke functies, maar zonder persoonlijke aanbevelingen.
                    </p>

                    <button
                        className="mt-4 px-6 py-3 bg-[#008100] text-white font-bold rounded-md
                       hover:bg-black hover:text-[#F5F5F5] transition-colors"
                    >
                        Ga naar instellingen
                    </button>
                </div>

                {/* Waarom zie ik dit */}
                <div className="bg-[#FFFFFF] p-8 border border-[#E0E0E0] rounded-lg">
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
                </div>

            </section>
        </main>
    );
}