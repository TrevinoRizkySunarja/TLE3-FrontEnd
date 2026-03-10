import { Link, Outlet } from "react-router";
import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "./register.jsx";
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import ForgotPassword from "./forgot_password.jsx";

// Home component
function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welkom bij de applicatie</p>
        </div>
    );
}


// Layout component
function Layout() {
    return (
        <div>
            <header>
                <nav>
                    <Link to={`/`}>Home</Link>
                    <Link to={`/register`}>Registreer</Link>
                    <Link to={`/login`}>Login</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

// Router configuration
const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
            {
                path: "/forgot_password",
                element: <ForgotPassword />,
            },
        ],
    },
]);

// App component
function App() {
    return <RouterProvider router={router} />;
}

export default App;
