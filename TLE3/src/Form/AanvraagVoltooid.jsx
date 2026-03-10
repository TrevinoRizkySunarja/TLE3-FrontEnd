import { useLocation, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

export default function AanvraagVoltooid() {
    // const { user } = useAuth();
    const location = useLocation();
    const data = location.state;

    // if (!user) return <Navigate to="/login" replace />;
    // if (!data) return <Navigate to="/aanvraag/stap-1" replace />;

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
            <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4">Aanvraag voltooid</h1>

                <p className="text-lg leading-relaxed mb-6">
                    Uw aanvraag is succesvol ingediend. Vergeet niet uw oude document mee te nemen naar:
                </p>

                <p className="font-bold text-black text-xl mb-2">{data.locatie}</p>
                <p className="text-lg mb-2">Datum: {data.datum}</p>
                <p className="text-lg mb-6">Tijd: {data.tijd}</p>

                <p className="leading-relaxed">
                    U ontvangt ook een bevestiging per e‑mail.
                </p>
            </section>
        </main>
    );
}