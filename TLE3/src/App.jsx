import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import Layout from "./index.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/create",
                element: <CreateProduct />,
            },

            {
                path: "/products/:id",
                element: <ProductDetail />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;