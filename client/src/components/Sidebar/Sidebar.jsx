
import "./Sidebar.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { logout } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import {
    FiHome,
    FiTrash2,
    FiUser,
    FiSettings,
    FiLogOut,
    FiArchive
} from "react-icons/fi";
import toast from "react-hot-toast";

import { NavLink } from "react-router-dom";
import { useState } from "react";
const Sidebar = ({ sidebarOpen }) => {

    const {checkAuth}=useAuth();

    const [isopenModal,setIsOpenModal]=useState(false);

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
        },

    ];


    const handleLogout=async()=>{
        try{

            const res= await logout();
            toast.success(res.data.message||"Logged out successful");
            await checkAuth();
             setIsOpenModal(false); 
        }catch(error){
            toast.error("Logout failed");
        }
    } 

    const openModal=()=>{
        setIsOpenModal(true);
    }


    return (
          <>
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

                <button className="sidebar-item logout" type="button" onClick={()=>{
                    openModal()
                }}>

                    <span className="sidebar-icon">
                       <FiLogOut/> 
                    </span>

                    {sidebarOpen&&(
                        <span className="sidebar-text">
                             Logout
                        </span>
                    )}

                </button>
 

            </div>

        </aside>

        {isopenModal&&
            (<ConfirmModal title="Logout" message="Are you sure you want to logout" onCancel={()=>{setIsOpenModal(false)}} onConfirm={handleLogout}/>)
        }
      </>
    );

};

export default Sidebar;