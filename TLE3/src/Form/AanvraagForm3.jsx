import { useLocation, useNavigate, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

export default function AanvraagForm3() {
    // const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    // if (!user) return <Navigate to="/login" replace />;
    // if (!data) return <Navigate to="/aanvraag/stap-1" replace />;

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/aanvraag/voltooid", { state: data });
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">Stap 3 — Betaling</h1>
                <p className="text-lg leading-relaxed">
                    Dit is een demonstratie. Er wordt geen echte betaling uitgevoerd.
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="leading-relaxed">
                        Klik op de knop hieronder om de aanvraag af te ronden.
                    </p>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black transition-colors"
                    >
                        Betaling afronden
                    </button>
                </form>
            </section>
        </main>
    );
}