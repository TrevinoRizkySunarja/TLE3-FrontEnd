import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import Layout from "./index.jsx";
import LayoutWithNavbar from "./LayoutWithNavbar.jsx";

// Pages
import TestNavbar from "./pages/TestNavbar";
import NavbarIng from "./pages/NavbarIng";
import FYP from "./pages/fyp.jsx";
import Homepage from "./pages/homepage.jsx";
import NavbarUit from "./pages/navbaruit.jsx";
import Profile_User from "./pages/profile_user.jsx";

// Auth pages
import Register from "./register.jsx";
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import ForgotPassword from "./forgot_password.jsx";

// Admin pages
import Dashboard from "./admin/dashboard.jsx";
import Post from "./admin/post.jsx";
import Filter from "./admin/filter.jsx";

import AITransparantie from "./AITransparantie.jsx";

// Aanvraagformulieren
import AanvraagForm from "./form/AanvraagForm.jsx";
import AanvraagForm2 from "./form/AanvraagForm2.jsx";
import AanvraagForm3 from "./form/AanvraagForm3.jsx";
import AanvraagVoltooid from "./form/AanvraagVoltooid.jsx";

// Placeholder pages
const CreateProduct = () => (
    <div style={{ padding: 24 }}>
        <h2>Create Product (placeholder)</h2>
    </div>
);

const router = createBrowserRouter([
    {
        element: <LayoutWithNavbar />,
        children: [
            {
                path: "/",
                element: <Homepage />,
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
            {
                path: "/navbar-uit",
                element: <NavbarUit />,
            },
            { path: "/",                    element: <Homepage /> },
            { path: "/fyp",                 element: <FYP /> },
            { path: "/settings",            element: <Profile_User /> },
            { path: "/create",              element: <CreateProduct /> },
            { path: "/dashboard",           element: <Dashboard /> },
            { path: "/admin/dashboard",     element: <Dashboard /> },
            { path: "/post",                element: <Post /> },
            { path: "/navbar-ing",          element: <NavbarIng /> },
            { path: "/test-navbar",         element: <TestNavbar /> },
            { path: "/filter",              element: <Filter /> },
            { path: "/ai-transparantie",    element: <AITransparantie /> },
            { path: "/aanvraag/stap-1",     element: <AanvraagForm /> },
            { path: "/aanvraag/stap-2",     element: <AanvraagForm2 /> },
            { path: "/aanvraag/stap-3",     element: <AanvraagForm3 /> },
            { path: "/aanvraag/voltooid",   element: <AanvraagVoltooid /> },
        ],
    },

    // Auth pages (zonder layout)
    { path: "/register",        element: <Register /> },
    { path: "/login",           element: <Login /> },
    { path: "/logout",          element: <Logout /> },
    { path: "/forgot_password", element: <ForgotPassword /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;