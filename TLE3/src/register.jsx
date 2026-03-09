import { useState } from "react";
import { Link } from "react-router";


// back end van register pagina
function Register() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birth_date: "",
        phone_number: "",
        bsn: "",
        gender: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
// validatie van de form data die de gebruiker invult, zoals naam, email, wachtwoord, geboortedatum, telefoonnummer, BSN en geslacht.
// Als er fouten zijn, worden deze opgeslagen in de errors state en weergegeven aan de gebruiker. Als alle validaties slagen, wordt true geretourneerd.
    const validateForm = () => {
        const newErrors = {};

        // Validate first_name
        if (!formData.first_name.trim()) {
            newErrors.first_name = "Naam is verplicht";
        } else if (formData.first_name.trim().length < 2) {
            newErrors.first_name = "Naam moet minstens 2 tekens zijn";
        }

        // Validate last_name
        if (!formData.last_name.trim()) {
            newErrors.last_name = "Naam is verplicht";
        } else if (formData.last_name.trim().length < 2) {
            newErrors.last_name = "Naam moet minstens 2 tekens zijn";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is verplicht";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Vul een geldig emailadres in";
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Wachtwoord is verplicht";
        } else if (formData.password.length < 8) {
            newErrors.password = "Wachtwoord moet minstens 8 tekens zijn";
        }

        // Validate birth_date
        if (!formData.birth_date) {
            newErrors.birth_date = "Geboortedatum is verplicht";
        }

        // Validate phone_number
        const phoneRegex = /^(06|\+31)[0-9](-?[0-9]){7,8}$/;
        if (!formData.phone_number) {
            newErrors.phone_number = "Telefoonnummer is verplicht";
        } else if (!phoneRegex.test(formData.phone_number)) {
            newErrors.phone_number = "Telefoonnummer moet 06-12345678 of +31612345678 zijn";
        }

        // Validate BSN
        const bsnRegex = /^[0-9]{9}$/;
        if (!formData.bsn) {
            newErrors.bsn = "BSN is verplicht";
        } else if (!bsnRegex.test(formData.bsn)) {
            newErrors.bsn = "BSN moet 9 cijfers zijn";
        }

        // Validate gender
        if (!formData.gender) {
            newErrors.gender = "Selecteer een geslacht";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors({ submit: data?.message || "Registratie mislukt." });
                return;
            }
            setSuccess("Registratie gelukt!");
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                birth_date: "",
                phone_number: "",
                bsn: "",
                gender: "",
            });
        } catch (err) {
            setErrors({ submit: err.message || "Er ging iets mis." });
        } finally {
            setLoading(false);
        }
    };
// front end van register pagina
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(https://www.rotterdam.nl/_next/image?url=https%3A%2F%2Fbackend-dvg.rotterdam.nl%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fhero_large%2Fpublic%2F2026-03%2F25464-ht-stadhuis-1920x375.jpg%3Fh%3D8a1a2c21%26itok%3DmyqNdVCC&w=1920&q=75)' }}>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Registeren</h1>
                <p className="text-center text-gray-600 mb-6">Maak een nieuw account aan</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Voornaam:
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.first_name && <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>}
                    </div>

                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Achternaam:
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.last_name && <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Wachtwoord:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                            Geboortedatum:
                        </label>
                        <input
                            type="date"
                            id="birth_date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.birth_date && <p className="text-red-600 text-xs mt-1">{errors.birth_date}</p>}
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                            Telefoonnummer:
                        </label>
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="06-12345678"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.phone_number && <p className="text-red-600 text-xs mt-1">{errors.phone_number}</p>}
                    </div>

                    <div>
                        <label htmlFor="bsn" className="block text-sm font-medium text-gray-700 mb-1">
                            BSN:
                        </label>
                        <input
                            type="text"
                            id="bsn"
                            name="bsn"
                            value={formData.bsn}
                            onChange={handleChange}
                            placeholder="123456789"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.bsn && <p className="text-red-600 text-xs mt-1">{errors.bsn}</p>}
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Geslacht:
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option value="">--- Selecteer ---</option>
                            <option value="man">Man</option>
                            <option value="vrouw">Vrouw</option>
                            <option value="anders">Anders</option>
                            <option value="zeg_ik_liever_niet">Zeg ik liever niet</option>
                        </select>
                        {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-60"
                    >
                        {loading ? "Bezig..." : "Registreer"}
                    </button>
                </form>

                {errors.submit && <p className="text-red-600 text-sm mt-3">{errors.submit}</p>}
                {success && <p className="text-green-600 text-sm mt-3">{success}</p>}

                <p className="text-center text-gray-600 mt-4">
                    Heb je al een account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        <u>Log hier in</u>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
