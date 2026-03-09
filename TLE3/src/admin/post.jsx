import { useState } from "react";
import {useNavigate} from "react-router";

function FormComponent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        funFact: "",
        imageUrl: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function createProduct() {
        try {
            const response = await fetch("http://145.24.237.14:8001/characters/detail", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    funFact: formData.funFact,
                    imageUrl: formData.imageUrl,
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
        createProduct();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-xl space-y-5 rounded-xl border bg-white p-6 shadow-sm">
                {/* Name */}
                <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="example: idk"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="description" className="text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        placeholder="Describe your character..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="funFact" className="text-sm font-medium text-slate-700">
                        Fun fact
                    </label>
                    <input
                        type="text"
                        id="funFact"
                        name="funFact"
                        required
                        placeholder="Tell a fun fact about your character"
                        value={formData.funFact}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="imageUrl" className="text-sm font-medium text-slate-700">
                        Image URL <span className="text-slate-400">(optional)</span>
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://..."
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default FormComponent;