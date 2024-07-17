import AdminRoutes from "./AdminRoute"
import AdminSidebar from "./components/AdminSidebar"
import { Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <div className="flex flex-row h-screen justify-between">
            <div className="w-[15%] h-full">
                <AdminSidebar className="w-full" />
            </div>
            <div className="h-full w-[82%]">
                <AdminRoutes />
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
