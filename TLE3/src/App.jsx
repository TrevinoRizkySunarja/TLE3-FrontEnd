import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import Layout from "./index.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Layout />,
            },

        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;