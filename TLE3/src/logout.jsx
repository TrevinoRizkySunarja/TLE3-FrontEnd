import { Link } from "react-router";

// Logout component
function Logout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Logout</h1>
                <p className="text-gray-600 mb-6">Je bent uitgelogd</p>

                <div className="space-y-3">
                    <Link
                        to="/login"
                        className="block w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                        Opnieuw inloggen
                    </Link>

                    <Link
                        to="/"
                        className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors font-medium"
                    >
                        Ga naar home
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Logout;