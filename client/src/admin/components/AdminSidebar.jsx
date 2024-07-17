import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

const AdminSidebar = () => {
    return (
        <>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/admin" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="/admin/incidents" icon={HiViewBoards} >
                            Incidents
                        </Sidebar.Item>

                        <Sidebar.Item href="/admin/users" icon={HiUser}>
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default AdminSidebar
