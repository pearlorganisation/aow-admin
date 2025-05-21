import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../Layout/CommonLayout";
import LoginPage from "../Pages/AuthForms/Login";
import UnApprovedVehicle from "../Pages/Vehicles/UnApprovedVehicle";
import ApprovedVehicles from "../Pages/Vehicles/ApprovedVehicles";



const Routes = createBrowserRouter([
    {
        path: "/login",
        element :  <LoginPage />
    },
    {
        
        path:"/",
        element:<CommonLayout />,
        children: [
            {
              index: true,
              element: "",
            },
            {
                path: "/admin/listings/unverified/vehicles",
                element: <UnApprovedVehicle/>,
              },
              {
                path: "/admin/listings/verified/vehicles",
                element: <ApprovedVehicles/>,
              },
        ]
    }
])

export default Routes