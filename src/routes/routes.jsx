import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../Layout/CommonLayout";
import LoginPage from "../Pages/AuthForms/Login";
import UnApprovedVehicle from "../Pages/Vehicles/UnApprovedVehicle";



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
                path: "/admin/listings/vehicles",
                element: <UnApprovedVehicle/>,
              },
        ]
    }
])

export default Routes