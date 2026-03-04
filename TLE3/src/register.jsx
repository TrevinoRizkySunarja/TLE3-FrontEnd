import { Link } from "react-router";

function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Registeren</h1>
                <p className="text-center text-gray-600 mb-6">Maak een nieuw account aan</p>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Voornaam:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Achternaam:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="font-medium text-gray-700">Geslacht:</label>

                        <select
                            id="gender"
                            name="gender"
                            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="male">Man</option>
                            <option value="female">Vrouw</option>
                            <option value="other">Anders</option>
                            <option value="prefer_not">Wil ik niet zeggen</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Wachtwoord:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                        Registreer
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Heb je al een account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        Log hier in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
