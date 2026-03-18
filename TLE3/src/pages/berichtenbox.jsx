import { useEffect, useState } from "react";

export default function Berichtenbox() {
    const [notifications, setNotifications] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // TODO: vervang door echte API-call zodra backend endpoint bestaat
    async function fetchNotifications() {
        try {
            setLoading(true);

            // Voor nu: dummy data (kan direct vervangen worden door fetch)
            const dummy = [
                {
                    id: "1",
                    title: "Uw paspoort verloopt binnenkort",
                    message: "Uw paspoort verloopt op 12-06-2026. Maak op tijd een afspraak om verlenging aan te vragen.",
                    date: "2026-03-10T09:00:00Z",
                    type: "document",
                    read: false
                },
                {
                    id: "2",
                    title: "Statusupdate: aanvraag ID-kaart",
                    message: "Uw aanvraag voor een ID-kaart is nu IN BEHANDELING.",
                    date: "2026-03-08T14:30:00Z",
                    type: "aanvraag",
                    read: true
                },
                {
                    id: "3",
                    title: "Nieuwe aanbeveling beschikbaar",
                    message: "We hebben nieuwe informatie voor u over subsidies binnen Flowhaven.",
                    date: "2026-03-05T11:15:00Z",
                    type: "aanbeveling",
                    read: true
                }
            ];

            setNotifications(dummy);
        } catch (err) {
            setError("Kon berichten niet ophalen.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    function markAsRead(id) {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    }

    function openNotification(n) {
        setSelected(n);
        if (!n.read) markAsRead(n.id);
    }

    return (
        <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">

            {/* HEADER */}
            <section className="max-w-3xl mx-auto mb-12 bg-[#F5F5F5]
                                p-8 border border-[#E0E0E0]">
                <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                    Berichtenbox
                </h1>
                <p className="text-lg leading-relaxed">
                    Bekijk hier uw notificaties van de gemeente Flowhaven.
                </p>
            </section>

            {/* CONTENT */}
            <section className="max-w-3xl mx-auto bg-[#F5F5F5]
                                p-8 border border-[#E0E0E0]">

                {loading && <p className="text-lg">Berichten laden…</p>}
                {error && <p className="text-[#B00020]">{error}</p>}

                {!loading && notifications.length === 0 && (
                    <p className="text-lg">U heeft nog geen berichten.</p>
                )}

                {/* LIJST */}
                <div className="space-y-4">
                    {notifications.map((n) => (
                        <button
                            key={n.id}
                            onClick={() => openNotification(n)}
                            className={`w-full text-left p-4 border border-[#E0E0E0] bg-white hover:bg-gray-100 transition 
                                ${!n.read ? "border-[#008100] bg-green-50" : ""}`}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-black">
                                    {n.title}
                                </h3>
                                {!n.read && (
                                    <span className="text-sm bg-[#008100] text-white px-2 py-1 rounded">
                                        Nieuw
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                {new Date(n.date).toLocaleString("nl-NL")}
                            </p>
                        </button>
                    ))}
                </div>

                {/* DETAILPANEEL */}
                {selected && (
                    <div className="mt-8 p-6 bg-white border border-[#E0E0E0]">
                        <h2 className="text-2xl font-bold text-black mb-2">
                            {selected.title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            {new Date(selected.date).toLocaleString("nl-NL")}
                        </p>
                        <p className="leading-relaxed mb-6">
                            {selected.message}
                        </p>

                        <button
                            onClick={() => setSelected(null)}
                            className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black"
                        >
                            Terug naar overzicht
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}