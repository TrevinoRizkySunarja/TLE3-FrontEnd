import { useState } from "react";
import {useNavigate} from "react-router";

function FormComponent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        image: "",
        content_type: [],
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showMore, setShowMore] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFilterChange = (filter) => {
        setFormData((prev) => ({
            ...prev,
            content_type: prev.content_type.includes(filter)
                ? prev.content_type.filter((item) => item !== filter)
                : [...prev.content_type, filter],
        }));
    };


    const filters = [
        "Financieel",
        "Educatie",
        "Buitenland",
        "Evenementen",
        "Hulp vragen",
        "Formulieren aanvragen",
        "Boetes",
        "Belasting"
    ];
    const visibleFilters = showMore ? filters : filters.slice(0, 4);

    async function createPost() {
        try {
            const response = await fetch("http://145.24.237.215:8000/api/content-items/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.body,
                    content_type: formData.content_type,
                    image:formData.image

                }),
            });

            const data = await response.json();
            console.log(data);

            navigate("/");
        } catch (error) {
            console.error("Er is een fout opgetreden:", error);
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulier verzonden:", formData);
        createPost();
    };

    return (
        <div className={'container'}>
                <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
                    <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
                        <h2 className="text-2xl font-bold text-black mb-6 leading-snug">
                           Post aanmaken
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="title" className="block font-bold text-black mb-1">
                                    Titel
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Geef de Titel van je Post"
                                    value={formData.title}
                                    required
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                                />

                                <label htmlFor="body" className="block font-bold text-black mb-1">
                                    Beschrijving
                                </label>
                                <input
                                    id="body"
                                    name="body"
                                    type="text"
                                    placeholder="Leg hier de details van je post uit"
                                    value={formData.body}
                                    required
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
                            focus:outline-none focus:ring-2 focus:ring-[#008100]"
                                />

                            </div>

                            <div>
                                <label htmlFor="image" className="block font-bold text-black mb-1">
                                    Afbeelding
                                </label>
                                <input

                                    type="url"
                                    id="image"
                                    name="image"
                                    placeholder="https://..."
                                    value={formData.image}
                                    onChange={handleInputChange}
                                />
                                {formData.image && (
                                    <div style={{ marginTop: "20px" }}>
                                        <img
                                            src={formData.image}
                                            alt="preview"
                                            style={{ width: "200px", borderRadius: "8px" }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <h2 className="block font-bold text-black mb-1"> filters</h2>
                                <div className="grid grid-cols-2 gap-3">

                                    {visibleFilters.map((filter) => (
                                        <label
                                            key={filter}
                                            className="flex items-center gap-2 border border-neutral-300 bg-white px-3 py-2 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={formData.content_type.includes(filter)}
                                                onChange={() => handleFilterChange(filter)}
                                            />
                                            {filter}
                                        </label>
                                    ))}
                                </div>

                                {filters.length > 4 && (
                                    <button
                                        type="button"
                                        onClick={() => setShowMore(!showMore)}
                                        className="text-sm text-neutral-700 underline"
                                    >
                                        {showMore ? "Zie minder" : "Zie meer"}
                                    </button>
                                )}

                            </div>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md
                        hover:bg-black hover:text-white transition-colors
                        focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                Opslaan
                            </button>
                        </form>
                    </section>
                </main>
        </div>
    );
}

export default FormComponent;