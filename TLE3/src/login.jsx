import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";   // ⭐ AuthContext import

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin() {
        try {
            setIsLoading(true);
            setError("");

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}user/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "x-api-key": "sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();
            console.log("LOGIN RESPONSE:", data);

            if (!response.ok) {
                throw new Error(data.message || "Login mislukt");
            }

            login(data.token, data.user);

            if (data.user.is_admin) {
                navigate("/admin/dashboard");
            } else {
                navigate("/fyp");
            }

        } catch (error) {
            console.error(error);
            setError(error.message || "Er ging iets mis");
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin().then(r => 'successfully login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Inloggen</h1>
                <p className="text-center text-gray-600 mb-6">Hier kan je inloggen op je account</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Wachtwoord:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            minLength="8"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-70"
                        disabled={isLoading}
                    >
                        {isLoading ? "Bezig met inloggen..." : "Inloggen"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    <Link to="/forgot_password" className="text-blue-600 hover:text-blue-700 font-medium">
                        Wachtwoord vergeten?
                    </Link>
                </p>

                <p className="text-center text-gray-600 mt-2">
                    Nog geen account?{" "}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                        Registreer hier
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;