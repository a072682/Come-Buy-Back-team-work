import { createHashRouter } from "react-router-dom";
import BackIndexPage from "../pages/BackIndexPage/BackIndexPage";
import NotFound from "../pages/NotFound/NotFound.jsx";
import FrontLayout from "../layouts/FrontLayout.jsx";
import UserManagement from "../pages/UserManagement/UserManagement.jsx";
import OrderManagement from "../pages/OrderManagement/OrderManagement.jsx";
import CustomerMessageManagement from "../pages/CustomerMessageManagement/CustomerMessageManagement.jsx";




const router = createHashRouter([ //createHashRouter為建立router的方法
	{
		path:"/",
		element: <FrontLayout />,
        children:[
            {
                path: "",
                element: <BackIndexPage />,
            },
            {
                path: "BackIndexPage",
                element: <BackIndexPage />,
            },
            {
                path: "UserManagement",
                element: <UserManagement />,
            },
            {
                path: "OrderManagement",
                element: <OrderManagement />,
            },
            {
                path: "CustomerMessageManagement",
                element: <CustomerMessageManagement />,
            },
        ]
	},
    {
        path: "*",
        element: <NotFound />,
    }
])
export default router;