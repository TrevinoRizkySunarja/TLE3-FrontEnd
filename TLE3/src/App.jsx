import { createBrowserRouter, RouterProvider } from "react-router";

// Layout
import LayoutWithNavbar from "./LayoutWithNavbar.jsx";

// Pages
import TestNavbar from "./pages/TestNavbar";
import NavbarIng from "./pages/NavbarIng";
import FYP from "./pages/fyp.jsx";
import Homepage from "./pages/homepage.jsx";
import InformatiePagina from "./informatie.jsx";
import NavbarUit from "./pages/navbaruit.jsx";
import Profile_User from "./pages/profile_user.jsx";
import Berichtenbox from "./pages/berichtenbox.jsx";

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

// Auth system
import { AuthProvider } from "./auth/AuthContext.jsx";
import AuthGuard from "./auth/AuthGuard.jsx";

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
            { path: "/", element: <Homepage /> },
            { path: "/fyp", element: <FYP /> },
            { path: "/create", element: <CreateProduct /> },
            { path: "/navbar-ing", element: <NavbarIng /> },
            { path: "/navbar-uit", element: <NavbarUit /> },

            //  Beveiligde profielpagina
            {
                path: "/settings",
                element: (
                    <AuthGuard>
                        <Profile_User />
                    </AuthGuard>
                )
            },

            { path: "/admin/dashboard", element: <Dashboard /> },
            { path: "/post", element: <Post /> },
            { path: "/test-navbar", element: <TestNavbar /> },
            { path: "/filter", element: <Filter /> },
            { path: "/ai-transparantie", element: <AITransparantie /> },

            //  Beveiligde aanvraagformulieren
            {
                path: "/aanvraag/stap-1",
                element: (
                    <AuthGuard>
                        <AanvraagForm />
                    </AuthGuard>
                )
            },
            {
                path: "/aanvraag/stap-2",
                element: (
                    <AuthGuard>
                        <AanvraagForm2 />
                    </AuthGuard>
                )
            },
            {
                path: "/aanvraag/stap-3",
                element: (
                    <AuthGuard>
                        <AanvraagForm3 />
                    </AuthGuard>
                )
            },
            {
                path: "/aanvraag/voltooid",
                element: (
                    <AuthGuard>
                        <AanvraagVoltooid />
                    </AuthGuard>
                )
            },

            //  Beveiligde berichtenbox
            {
                path: "/berichten",
                element: (
                    <AuthGuard>
                        <Berichtenbox />
                    </AuthGuard>
                )
            },
            {
                path: "/settings",
                element: (
                    <AuthGuard>
                        <Profile_User />
                    </AuthGuard>
                )
            },
            {
                path: "/admin/dashboard",
                element: (
                    <AuthGuard>
                        <Dashboard />
                    </AuthGuard>
                )
            },
        ],
    },

    // Auth pages (zonder layout)
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "/forgot_password", element: <ForgotPassword /> },
    { path: "/informatie", element: <InformatiePagina /> },
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;