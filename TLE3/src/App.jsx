import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import Layout from "./index.jsx";
import AITransparantie from "./AITransparantie.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Layout />,
            },
            {
                path: "/ai-transparantie",
                element: <AITransparantie />,
            },

        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;