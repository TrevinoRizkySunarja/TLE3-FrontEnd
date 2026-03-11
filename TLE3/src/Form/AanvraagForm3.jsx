import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function AanvraagForm3() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    if (!data) return <Navigate to="/aanvraag/stap-1" replace />;

    const [payment, setPayment] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!payment) {
            setError("Selecteer een betaalmethode.");
            return;
        }

        navigate("/aanvraag/voltooid", {
            state: { ...data, payment },
        });
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">Stap 3 — Betaling</h1>
                <p className="text-lg leading-relaxed mb-4">
                    Hoe wilt u uw betaling doen? Tuurlijk met:
                </p>
                <p className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
                    Let op: er wordt betaald op locatie.
                </p>
            </section>

            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Betaalmethode */}
                    <div>
                        <label className="block font-bold text-black mb-1">Betaalmethode</label>
                        <select
                            name="payment"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                            className="w-full p-3 border border-[#E0E0E0] bg-white"
                        >
                            <option value="">Selecteer een betaalmethode…</option>
                            <option value="ideal/wero">iDEAL / Wero</option>
                            <option value="creditcard">Creditcard</option>
                            <option value="paypal">PayPal</option>
                        </select>
                        {error && <p className="text-[#B00020] text-sm">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black"
                    >
                        Betaling afronden
                    </button>
                </form>
            </section>
        </main>
    );
}