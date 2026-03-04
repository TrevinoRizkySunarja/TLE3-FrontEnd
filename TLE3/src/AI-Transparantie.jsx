import { createBrowserRouter, RouterProvider } from "react-router";

function AITransparenty() {


    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

            <nav className="bg-gray-500 border-b border-b-gray-500 p-4 shadow-sm">

            </nav>

            <main className="flex-1">
                <div className="max-w-3xl mx-auto p-6 border-gray-500">

                    <section className=" p-8 rounded-xl shadow-sm text-center mb-8">
                        <h1 className="text-3xl font-bold mb-4">
                            Transparantie over AI-gebruik
                        </h1>
                        <p className="text-gray-700 leading-relaxed">
                            Wij vinden het belangrijk dat je precies weet hoe en waarom
                            Artificial Intelligence (AI) wordt ingezet binnen onze gemeente.
                        </p>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                        <h2 className="text-xl font-semibold">Waarom gebruiken we AI?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            AI wordt gebruikt om processen te versnellen, meldingen te analyseren
                            en burgers sneller te helpen. Dit gebeurt altijd op een manier die
                            voldoet aan de privacywetgeving (AVG).
                        </p>

                        <h2 className="text-xl font-semibold">Welke gegevens worden gebruikt?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Alleen gegevens waarvoor jij toestemming hebt gegeven worden gebruikt.
                            Deze gegevens worden nooit gedeeld met externe partijen zonder jouw
                            expliciete toestemming.
                        </p>

                        <h2 className="text-xl font-semibold">Kan ik AI uitzetten?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Ja. In de instellingen kun je AI‑functionaliteiten uitschakelen.
                            Je blijft dan toegang houden tot alle belangrijke functies, maar
                            zonder AI‑aanbevelingen of automatische analyses.
                        </p>

                        <h2 className="text-xl font-semibold">“Waarom zie ik dit?”</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Wanneer AI jou een melding of advies toont, kun je altijd op
                            <strong> “Waarom zie ik dit?” </strong> klikken. Daar leggen we uit:
                        </p>

                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                            <li>welke gegevens zijn gebruikt</li>
                            <li>waarom deze melding relevant is</li>
                            <li>hoe je dit kunt aanpassen of uitschakelen</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed">
                            Zo houden we het systeem eerlijk, transparant en begrijpelijk.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default AITransparenty;