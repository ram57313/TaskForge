import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

const MainLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(() => {

        const savedState = localStorage.getItem("sidebarOpen");

        return savedState !== null
            ? JSON.parse(savedState)
            : true;

    });

    const toggleSidebar = () => {

        const newState = !sidebarOpen;

        setSidebarOpen(newState);

        localStorage.setItem(
            "sidebarOpen",
            JSON.stringify(newState)
        );

    };

    const openCreateTaskModal = () => {

        navigate("/dashboard", {
            state: {
                openCreateTask: true,
                from: location.pathname
            }
        });

    };

    return (

        <div className="dashboard">

            <Navbar
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                openCreateTaskModal={openCreateTaskModal}
            />

            <div className="dashboard-body">

                <Sidebar
                    sidebarOpen={sidebarOpen}
                />

                <main
                    className={`dashboard-main ${
                        sidebarOpen
                            ? "sidebar-open"
                            : "sidebar-closed"
                    }`}
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default MainLayout;