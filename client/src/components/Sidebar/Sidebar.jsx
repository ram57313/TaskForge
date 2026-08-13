import "./Sidebar.css";

import {
    FiHome,
    FiTrash2,
    FiUser,
    FiSettings,
    FiLogOut,
    FiArchive
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {

    const menuItems = [

        {
            title: "Dashboard",
            icon: <FiHome />,
            path: "/dashboard"
        },

        {
            title:"Archive",
            icon:<FiArchive/>,
            path:"/archived"
        },

        {
            title: "Trash",
            icon: <FiTrash2 />,
            path: "/deleted"
        }


    ];

    const bottomItems = [

        {
            title: "Profile",
            icon: <FiUser />,
            path: "/profile"
        },

        {
            title: "Settings",
            icon: <FiSettings />,
            path: "/settings"
        }

    ];


    return (

        <aside
            className={`sidebar ${
                sidebarOpen
                    ? "open"
                    : "closed"
            }`}
        >

            {/* TOP */}

            <div className="sidebar-top">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">

                            {item.icon}

                        </span>

                        {sidebarOpen && (

                            <span className="sidebar-text">

                                {item.title}

                            </span>

                        )}

                    </NavLink>

                ))}

            </div>


            {/* BOTTOM */}

            <div className="sidebar-bottom">

                {bottomItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">

                            {item.icon}

                        </span>

                        {sidebarOpen && (

                            <span className="sidebar-text">

                                {item.title}

                            </span>

                        )}

                    </NavLink>

                ))}


                {/* LOGOUT */}

                <button
                    className="sidebar-item logout"
                    type="button"
                >

                    <span className="sidebar-icon">

                        <FiLogOut />

                    </span>

                    {sidebarOpen && (

                        <span className="sidebar-text">

                            Logout

                        </span>

                    )}

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;