import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import LayoutWithNavbar from "./LayoutWithNavbar.jsx";
import AuthLayout from "./AuthLayout.jsx"; // maak dit bestand of laat het inline

// Pages
import TestNavbar from "./pages/TestNavbar";
import NavbarIng from "./pages/NavbarIng";
import FYP from "./pages/fyp.jsx";

// Auth pages
import Register from "./register.jsx";
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import ForgotPassword from "./forgot_password.jsx";

// Admin pages
import Dashboard from "./admin/dashboard.jsx";
import Post from "./admin/post.jsx";
import Layout from "./index.jsx";
import Filter from "./admin/filter.jsx";

import AITransparantie from "./AITransparantie.jsx";

// Placeholder pages
const CreateProduct = () => (
    <div style={{ padding: 24 }}>
        <h2>Create Product (placeholder)</h2>
    </div>
);

const ProductDetail = () => (
    <div style={{ padding: 24 }}>
        <h2>Product Detail (placeholder)</h2>
    </div>
);

// Router
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
                element: <Post/>,
            },
            {
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
            { path: "/", element: <Home /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/post", element: <Post /> },
            { path: "/fyp", element: <FYP /> },
            { path: "/create", element: <CreateProduct /> },
            { path: "/products/:id", element: <ProductDetail /> },
            { path: "/navbar-ing", element: <NavbarIng /> },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            { path: "/test-navbar", element: <TestNavbar /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/logout", element: <Logout /> },
            { path: "/filter", element: <Filter /> },
            { path: "/forgot_password", element: <ForgotPassword /> },
            { path: "/ai-transparantie", element: <AITransparantie /> },
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
                element: <Filter/>,
            },
            {
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