import { createBrowserRouter, RouterProvider } from "react-router";
// import je components

import Dashboard from "./admin/dashboard.jsx";
import Post from "./admin/post.jsx";
import Layout from "./index.jsx";
import Filter from "./admin/filter.jsx";
import Home from "./admin/home.jsx";



const router = createBrowserRouter([
    {
        element: <Layout />,
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
            },
            {
                path: "/filter",
                element: <Filter />,
            },



        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;