import "./Sidebar.css";

import {
    FiHome,
    FiClipboard,
    FiStar,
    FiArchive,
    FiTrash2,
    FiUser,
    FiSettings,
    FiLogOut
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen }) => {

    const menuItems = [

        {
            title:"Dashboard",
            icon:<FiHome/>
        },

        {
            title:"All Tasks",
            icon:<FiClipboard/>
        },

        {
            title:"Important",
            icon:<FiStar/>
        },

        {
            title:"Archived",
            icon:<FiArchive/>
        },

        {
            title:"Trash",
            icon:<FiTrash2/>
        }

    ];

    return(

        <aside
            className={`sidebar ${
                sidebarOpen ? "open" : "closed"
            }`}
        >

            <div className="sidebar-top">

                {

                    menuItems.map((item,index)=>{

                        return(

                            <button
                                key={index}
                                className="sidebar-item"
                            >

                                <span className="sidebar-icon">

                                    {item.icon}

                                </span>

                                {
                                    sidebarOpen &&

                                    <span className="sidebar-text">

                                        {item.title}

                                    </span>
                                }

                            </button>

                        )

                    })

                }

            </div>

            <div className="sidebar-bottom">

                <button className="sidebar-item">

                    <span className="sidebar-icon">

                        <FiUser/>

                    </span>

                    {
                        sidebarOpen &&

                        <span className="sidebar-text">

                            Profile

                        </span>
                    }

                </button>

                <button className="sidebar-item">

                    <span className="sidebar-icon">

                        <FiSettings/>

                    </span>

                    {
                        sidebarOpen &&

                        <span className="sidebar-text">

                            Settings

                        </span>
                    }

                </button>

                <button className="sidebar-item logout">

                    <span className="sidebar-icon">

                        <FiLogOut/>

                    </span>

                    {
                        sidebarOpen &&

                        <span className="sidebar-text">

                            Logout

                        </span>
                    }

                </button>

            </div>

        </aside>

    )

}

export default Sidebar;