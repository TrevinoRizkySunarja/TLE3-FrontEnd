// import React, { useState } from "react";
// import {useNavigate} from "react-router";
// import Footer from "../components/Footer.jsx";
//
// function FormComponent() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         title: "",
//         body: "",
//         image: "",
//         category_ids: [],
//     });
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [showMore, setShowMore] = useState(false);
//
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };
//
//     const handleFilterChange = (filter) => {
//         setFormData((prev) => ({
//             ...prev,
//             category_ids: prev.category_ids.includes(filter)
//                 ? prev.category_ids.filter((item) => item !== filter)
//                 : [...prev.category_ids, filter],
//         }));
//     };
//
//
//     async function loadCategoryOptions() {
//         const response = await fetch(`${API_BASE_URL}/categories`);
//         const categories = await response.json();
//
//         return categories.map((category) => ({
//             value: category.id,
//             label: category.name
//         }))
//
//     const visibleFilters = showMore ? filters : filters.slice(0, 4);
//
//     async function createPost() {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}content-items`, {
//                 method: "POST",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                     "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
//
//                 },
//                 body: JSON.stringify({
//                     title: formData.title,
//                     body: formData.body,
//                     category_ids: formData.category_ids,
//                     image:formData.image
//
//                 }),
//             });
//
//             const data = await response.json();
//             console.log(data);
//
//
//             navigate("/admin/dashboard");
//         } catch (error) {
//             console.error("Er is een fout opgetreden:", error);
//         }
//     }
//
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Formulier verzonden:", formData);
//         createPost();
//     };
//
//     return (
//         <div className={'container'}>
//                 <main className="bg-white text-[#1B1B1B] font-sans px-6 py-12">
//                     <section className="max-w-3xl mx-auto bg-[#F5F5F5] p-8 border border-[#E0E0E0]">
//                         <h2 className="text-2xl font-bold text-black mb-6 leading-snug">
//                            Post aanmaken
//                         </h2>
//
//                         <form onSubmit={handleSubmit} className="space-y-6">
//
//                             <div>
//                                 <label htmlFor="title" className="block font-bold text-black mb-1">
//                                     Titel
//                                 </label>
//                                 <input
//                                     id="title"
//                                     name="title"
//                                     type="text"
//                                     placeholder="Geef de Titel van je Post"
//                                     value={formData.title}
//                                     required
//                                     onChange={handleInputChange}
//                                     className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
//                             focus:outline-none focus:ring-2 focus:ring-[#008100]"
//                                 />
//
//                                 <label htmlFor="body" className="block font-bold text-black mb-1">
//                                     Beschrijving
//                                 </label>
//                                 <input
//                                     id="body"
//                                     name="body"
//                                     type="text"
//                                     placeholder="Leg hier de details van je post uit"
//                                     value={formData.body}
//                                     required
//                                     onChange={handleInputChange}
//                                     className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B]
//                             focus:outline-none focus:ring-2 focus:ring-[#008100]"
//                                 />
//
//                             </div>
//
//                             <div>
//                                 <label htmlFor="image" className="block font-bold text-black mb-1">
//                                     Afbeelding
//                                 </label>
//                                 <input
//
//                                     type="url"
//                                     id="image"
//                                     name="image"
//                                     placeholder="https://..."
//                                     value={formData.image}
//                                     onChange={handleInputChange}
//                                 />
//                                 {formData.image && (
//                                     <div style={{ marginTop: "20px" }}>
//                                         <img
//                                             src={formData.image}
//                                             alt="preview"
//                                             style={{ width: "200px", borderRadius: "8px" }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//
//                             <div className="space-y-4">
//                                 <h2 className="block font-bold text-black mb-1"> filters</h2>
//                                 <div className="grid grid-cols-2 gap-3">
//
//                                     {visibleFilters.map((filter) => (
//                                         <label
//                                             key={filter}
//                                             className="flex items-center gap-2 border border-neutral-300 bg-white px-3 py-2 text-sm"
//                                         >
//                                             <input
//                                                 type="checkbox"
//                                                 className="h-4 w-4"
//                                                 checked={formData.category_ids.includes(filter)}
//                                                 onChange={() => handleFilterChange(filter)}
//                                             />
//                                             {filter}
//                                         </label>
//                                     ))}
//                                 </div>
//
//                                 {filters.length > 4 && (
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowMore(!showMore)}
//                                         className="text-sm text-neutral-700 underline"
//                                     >
//                                         {showMore ? "Zie minder" : "Zie meer"}
//                                     </button>
//                                 )}
//
//                             </div>
//
//                             <button
//                                 type="submit"
//                                 className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md
//                         hover:bg-black hover:text-white transition-colors
//                         focus:outline-none focus:ring-2 focus:ring-black"
//                             >
//                                 Opslaan
//                             </button>
//                         </form>
//                     </section>
//                 </main>
//             <Footer />
//         </div>
//     );
// }
//
// export default FormComponent;

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import Footer from "../components/Footer.jsx";

function FormComponent() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        title: "",

        body: "",

        image: "",

        category_ids: ""

    });

    const [filters, setFilters] = useState([]);

    const [showMore, setShowMore] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {

        loadCategoryOptions();

    }, []);

    async function loadCategoryOptions() {

        try {

            const response = await fetch(`${API_BASE_URL}categories`, {

                method: "GET",

                headers: {

                    Accept: "application/json",

                    "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"

                }

            });

            const categories = await response.json();

            const mappedCategories = categories.map((category) => ({

                value: category.id,

                label: category.name

            }));

            setFilters(mappedCategories);

        } catch (error) {

            console.error("Fout bij ophalen categorieën:", error);

        }

    }

    const handleInputChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleFilterChange = (filterValue) => {

        setFormData((prev) => ({

            ...prev,

            category_ids: prev.category_ids === filterValue ? "" : filterValue

        }));

    };

    async function createPost() {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}content-items`, {

                method: "POST",

                headers: {

                    Accept: "application/json",

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`,

                    "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"

                },

                body: JSON.stringify({

                    title: formData.title,

                    body: formData.body,

                    category_ids: formData.category_ids,

                    image: formData.image

                })

            });

            const data = await response.json();

            console.log(data);

            navigate("/admin/dashboard");

        } catch (error) {

            console.error("Er is een fout opgetreden:", error);

        }

    }

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log("Formulier verzonden:", formData);

        createPost();

    };

    const visibleFilters = showMore ? filters : filters.slice(0, 4);

    return (
        <div className="container">
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

                                placeholder="Geef de titel van je post"

                                value={formData.title}

                                required

                                onChange={handleInputChange}

                                className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#008100]"

                            />

                            <label htmlFor="body" className="block font-bold text-black mb-1 mt-4">

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

                                className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#008100]"

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

                                className="w-full p-3 border border-[#E0E0E0] bg-white text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#008100]"

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
                            <h2 className="block font-bold text-black mb-1">Filters</h2>

                            <div className="grid grid-cols-2 gap-3">

                                {visibleFilters.map((filter) => (
                                    <label

                                        key={filter.value}

                                        className="flex items-center gap-2 border border-neutral-300 bg-white px-3 py-2 text-sm"
                                    >
                                        <input

                                            type="checkbox"

                                            className="h-4 w-4"

                                            checked={formData.category_ids === filter.value}

                                            onChange={() => handleFilterChange(filter.value)}

                                        />

                                        {filter.label}
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

                            className="px-6 py-3 bg-[#008100] text-white font-bold rounded-md hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                        >

                            Opslaan
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>

    );

}

export default FormComponent;

