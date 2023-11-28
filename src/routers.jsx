import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CreateTask from "./pages/CreateTask";
import Edit from "./pages/Edit";




const routers = createBrowserRouter([
    {
        path: "/",
        element: (
                <App></App>
        )
    },
    {
        path: "/create-task",
        element: (
           <CreateTask></CreateTask>
        )
    },
    {
        path: "/:i",
        element: (
           <Edit></Edit>
        )
    },



])
export default routers;