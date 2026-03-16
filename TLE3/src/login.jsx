import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            console.log("[Login] Attempting connection to backend...");
            const response = await fetch("http://145.24.237.215:8000/api/user/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const rawBody = await response.text();
            const contentType = response.headers.get("content-type") || "";
            let data = null;

            console.log("[Login] Raw response body:", rawBody);
            console.log("[Login] Response content-type:", contentType);

            if (rawBody.trim() && contentType.includes("application/json")) {
                try {
                    data = JSON.parse(rawBody);
                    console.log("[Login] Parsed response data:", data);
                } catch {
                    console.error("[Login] Connected, but response JSON is invalid");
                    setError("Server gaf ongeldige JSON terug");
                    return;
                }
            } else {
                console.log("[Login] Non-JSON or empty response received");
            }

            if (!response.ok) {
                const serverMessage = data?.message || data?.error || (rawBody.trim() && !contentType.includes("application/json") ? rawBody : "");
                console.error(`[Login] Backend connection failed (HTTP ${response.status})`, serverMessage || "Unknown error");
                setError(serverMessage || `Inloggen mislukt (HTTP ${response.status})`);
                return;
            }

            console.log(`[Login] Backend connected successfully (HTTP ${response.status})`);
            const token = data?.token || data?.accessToken || data?.jwt;
            if (!token) {
                console.warn("[Login] Connected, but no token received");
                setError("Login gelukt, maar geen token ontvangen");
                return;
            }

            localStorage.setItem("token", token);

            // Sla gebruikersgegevens op zodat FYP en Profile ze kunnen lezen
            const apiUser = data?.user || data || {};
            const authUser = {
                first_name:   apiUser.first_name  || apiUser.firstname || "",
                last_name:    apiUser.last_name   || apiUser.lastname  || "",
                email:        apiUser.email       || email,
                phone_number: apiUser.phone_number || "",
                birth_date:   apiUser.birth_date   || "",
                bsn:          apiUser.bsn           || "",
                gender:       apiUser.gender        || "",
                role:         apiUser.role          || apiUser.is_admin ? "admin" : "user",
            };

            localStorage.setItem("authUser", JSON.stringify(authUser));

            console.log("[Login] ✅ LOGIN GELUKT!");
            console.log("[Login] Token opgeslagen in localStorage");
            console.log("[Login] Gebruikersgegevens opgeslagen:", authUser);

            // Admin check: redirect naar dashboard als admin, anders naar FYP
            const isAdmin = apiUser.role === "admin" || apiUser.is_admin === true || apiUser.is_admin === 1;
            if (isAdmin) {
                console.log("[Login] 👑 Gebruiker is ADMIN → doorsturen naar /admin/dashboard");
                navigate("/admin/dashboard");
            } else {
                console.log("[Login] 👤 Gebruiker is geen admin → doorsturen naar /fyp");
                navigate("/fyp");
            }
        } catch (submitError) {
            console.error("[Login] Network/connection error", submitError);
            setError(submitError.message || "Serverfout");
        } finally {
            setIsLoading(false);
        }
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