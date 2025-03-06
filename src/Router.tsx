// router.tsx
import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Applayout />,
            children: [
                {
                    path: "",
                    element: <Dashboard />,
                },
                {
                    path: "product/:id",
                    element: <ProductDetail />,
                },
            ],
        },
        {
            path: "*",
            element: <NoMatch />,
        },
    ],
    {
        basename: global.basename,
    }
);