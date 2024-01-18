import { createBrowserRouter } from "react-router-dom";
import Convert from "../pages/convert";
import Countdown from "../pages/countdown";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import ListML from "../pages/list_ml"
import Tictactoe from "../pages/tictactoe";
import Matching from "../pages/matching";
import Salary from "../pages/salary";
import Scramble from "../pages/scramble";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/countdown",
                element: <Countdown />,
            },
            {
                path: "/convert",
                element: <Convert />,
            },
            {
                path: "/list-ml",
                element: <ListML />
            },
            {
                path: "/tictactoe",
                element: <Tictactoe />
            },
            {
                path: "/matching-card",
                element: <Matching />
            },
            {
                path: "/salary-calc",
                element: <Salary />
            },
            {
                path: "/word-scramb",
                element: <Scramble />
            }
        ]
    },
])