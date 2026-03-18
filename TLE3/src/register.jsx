import { useState } from "react";
import { Link, useNavigate } from "react-router";


// back end van register pagina
function Register() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birth_date: "",
        phone_number: "",
        bsn: "",
        gender: "",
        is_admin: false,
        personalization_enabled: true,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function register(){

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-api-key":"sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
            },
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                birth_date: formData.birth_date,
                phone_number: formData.phone_number,
                bsn: formData.bsn,
                gender: formData.gender,
                is_admin: formData.is_admin,
                personalization_enabled: formData.personalization_enabled
            })
        });

        const data = await response.json();
        console.log(data);

        navigate('/login');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dit heb je meegestuurd", formData);
       register().then(r => 'successfully registered');
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
                        <input
                            type="hidden"
                            id="is_admin"
                            name="is_admin"
                            value={formData.is_admin}
                            onChange={handleChange}
                            placeholder="123456789"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.bsn && <p className="text-red-600 text-xs mt-1">{errors.bsn}</p>}
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
