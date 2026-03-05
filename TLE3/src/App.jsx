import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import Layout from "./index.jsx";

// Aanvraagformulieren
import AanvraagForm from "./Form/AanvraagForm";
import AanvraagForm2 from "./Form/AanvraagForm2";
import AanvraagForm3 from "./Form/AanvraagForm3";
import AanvraagVoltooid from "./Form/AanvraagVoltooid";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <div>Homepagina komt hier</div>,
            },
            {
                path: "/aanvraag/stap-1",
                element: <AanvraagForm />,
            },
            {
                path: "/aanvraag/stap-2",
                element: <AanvraagForm2 />,
            },
            {
                path: "/aanvraag/stap-3",
                element: <AanvraagForm3 />,
            },
            {
                path: "/aanvraag/voltooid",
                element: <AanvraagVoltooid />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;