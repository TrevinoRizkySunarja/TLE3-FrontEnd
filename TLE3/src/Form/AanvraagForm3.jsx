import { useLocation, useNavigate, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AanvraagForm3() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    if (!data) return <Navigate to="/aanvraag/stap-1" replace />;

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/aanvraag/voltooid", { state: data });
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">
                    Stap 3 — Betaling
                </h1>
                <p className="text-lg leading-relaxed">
                    Dit is een demonstratie. Er wordt geen echte betaling uitgevoerd.
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block font-bold text-black mb-2">
                            Kies uw betaalmethode
                        </label>

                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="creditcard"
                                    required
                                    className="w-5 h-5"
                                />
                                <span className="text-[#1B1B1B]">Creditcard</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="ideal"
                                    required
                                    className="w-5 h-5"
                                />
                                <span className="text-[#1B1B1B]">iDEAL / Wero</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bank"
                                    required
                                    className="w-5 h-5"
                                />
                                <span className="text-[#1B1B1B]">Bankoverschrijving</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md
                        hover:bg-black hover:text-white transition-colors
                        focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        Betaling afronden
                    </button>
                </form>
            </section>
        </main>
    );
}