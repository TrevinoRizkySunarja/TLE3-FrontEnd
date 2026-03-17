import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    async function login() {

        try {
            setIsLoading(true);
            setError("");

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "x-api-key":"sk_aef3c11fe1e6ba045ee72b46904ac5cae1ccb2aab5c7b5c88d9beff818592d5f"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Login mislukt");
            }

            if (data.user.is_admin) {
                console.log("admin");
                setToken(data.token);
                navigate("/admin/dashboard", { state: { user: data.user } });
            } else {
                console.log("gewone gebruiker");
                setToken(data.token);
                navigate("/fyp", { state: { user: data.user } });
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
        login().then(r => 'logged in succesfully');
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
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            title="Vul een geldig emailadres in"
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
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            minLength="8"
                            title="Wachtwoord moet minimaal 8 tekens lang zijn"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-70"
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