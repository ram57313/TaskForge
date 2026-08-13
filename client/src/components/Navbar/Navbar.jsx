import "./Navbar.css";

import {
    FiMenu,
    FiSearch,
    FiBell,
    FiPlus
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


const Navbar = ({
    toggleSidebar,
    sidebarOpen,
    openCreateTaskModal
}) => {

    const navigate = useNavigate();

    const { user } = useAuth();


    return (

        <header className="navbar">


            {/* LEFT */}

            <div className="navbar-left">

                <button
                    className="menu-btn"
                    onClick={toggleSidebar}
                    type="button"
                >

                    <FiMenu
                        className={
                            sidebarOpen
                                ? "menu-open"
                                : "menu-closed"
                        }
                    />

                </button>


                <button
                    className="logo-btn"
                    type="button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <h2 className="logo">

                        Task<span>Forge</span>

                    </h2>

                </button>

            </div>


            {/* CENTER */}

            <div className="navbar-center">

                <div className="search-box">

                    <FiSearch
                        className="search-icon"
                    />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        autoComplete="off"
                    />

                </div>

            </div>


            {/* RIGHT */}

            <div className="navbar-right">


                <button
                    className="new-task-btn"
                    onClick={openCreateTaskModal}
                    type="button"
                >

                    <FiPlus />

                    <span>
                        New Task
                    </span>

                </button>


                <button
                    className="icon-btn"
                    type="button"
                    aria-label="Notifications"
                >

                    <FiBell />

                </button>


                <button
                    className="profile-preview"
                    type="button"
                    onClick={() =>
                        navigate("/profile")
                    }
                    aria-label="Open profile"
                >

                    <span className="avatar">

                        {user?.name
                            ?.charAt(0)
                            .toUpperCase() || "U"
                        }

                    </span>

                </button>

            </div>

        </header>

    );

};

export default Navbar;