// import { createBrowserRouter, RouterProvider } from "react-router";
// // import je components
// import Layout from "./index.jsx";
// import LayoutWithNavbar from "./LayoutWithNavbar.jsx";
// import TestNavbar from "./pages/TestNavbar";
// import NavbarIng from "./pages/NavbarIng";
//
//
// // Placeholder components (will be replaced by your real pages)
// const Home = () => <div style={{ padding: 24 }}><h2>Home (placeholder)</h2></div>;
// const CreateProduct = () => <div style={{ padding: 24 }}><h2>Create Product (placeholder)</h2></div>;
// const ProductDetail = () => <div style={{ padding: 24 }}><h2>Product Detail (placeholder)</h2></div>;
//
// const router = createBrowserRouter([
//     {
//         element: <LayoutWithNavbar />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />,
//             },
//             {
//                 path: "/create",
//                 element: <CreateProduct />,
//             },
//
//             {
//                 path: "/products/:id",
//                 element: <ProductDetail />,
//             },
//             {
//                 path: "/navbar-ing",
//                 element: <NavbarIng />,
//             },
//         ],
//     },
//     {
//         element: <Layout />,
//         children: [
//             {
//                 path: "/test-navbar",
//                 element: <TestNavbar />,
//             },
//         ],
//     },
// ]);
//
// function App() {
//     return <RouterProvider router={router} />;
// }
//
// export default App;

import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import Layout from "./index.jsx";
import LayoutWithNavbar from "./LayoutWithNavbar.jsx";
import TestNavbar from "./pages/TestNavbar";
import NavbarIng from "./pages/NavbarIng";
// Importeer je nieuwe FYP pagina
import FYP from "./pages/fyp.jsx";


// Placeholder components
const Home = () => <div style={{ padding: 24 }}><h2>Home (placeholder)</h2></div>;
const CreateProduct = () => <div style={{ padding: 24 }}><h2>Create Product (placeholder)</h2></div>;
const ProductDetail = () => <div style={{ padding: 24 }}><h2>Product Detail (placeholder)</h2></div>;

const router = createBrowserRouter([
    {
        element: <LayoutWithNavbar />,
        children: [
            {
                path: "/",
                element: <Home />,
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
        ],
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/test-navbar",
                element: <TestNavbar />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;