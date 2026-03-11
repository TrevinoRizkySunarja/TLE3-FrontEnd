import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import LayoutWithNavbar from "./LayoutWithNavbar.jsx";
import TestNavbar from "./pages/TestNavbar";
import NavbarIng from "./pages/NavbarIng";
// Importeer je nieuwe FYP pagina
import FYP from "./pages/fyp.jsx";
// Importeer authentication pages
import Register from "./register.jsx";
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import ForgotPassword from "./forgot_password.jsx";
import { Outlet } from "react-router";

import Dashboard from "./admin/dashboard.jsx";
import Post from "./admin/post.jsx";
import Layout from "./index.jsx";
import Filter from "./admin/filter.jsx";
import Home from "./admin/home.jsx";

// Placeholder components
const Home = () => <div style={{ padding: 24 }}><h2>Home (placeholder)</h2></div>;
const CreateProduct = () => <div style={{ padding: 24 }}><h2>Create Product (placeholder)</h2></div>;
const ProductDetail = () => <div style={{ padding: 24 }}><h2>Product Detail (placeholder)</h2></div>;


const AuthLayout = () => <div><Outlet /></div>;

const router = createBrowserRouter([
    {
        element: <LayoutWithNavbar />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/post",
                element: <Post />,
                path: "/fyp",
                element: <FYP />,
            },
            {
                path: "/create",
                element: <CreateProduct />,
            },
            {
                path: "/products/:id",
                element: <ProductDetail />,
            },
            {
                path: "/navbar-ing",
                element: <NavbarIng />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/test-navbar",
                element: <TestNavbar />,
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
                path: "/filter",
                element: <Filter />,
                path: "/forgot_password",
                element: <ForgotPassword />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;