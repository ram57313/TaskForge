import "./Navbar.css";

import {
  FiMenu,
  FiSearch,
  FiBell,
  FiPlus
} from "react-icons/fi";

const Navbar =  ({
    toggleSidebar,
    sidebarOpen,
    openCreateTaskModal
}) => {

  return (

    <header className="navbar">

      {/* LEFT */}

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <FiMenu
    className={sidebarOpen ? "menu-open" : "menu-closed"}
/>
        </button>

        <button className="logo-btn">
            <h2 className="logo">
                Task<span>Forge</span>
            </h2>
        </button>

      </div>

      {/* CENTER */}

      <div className="navbar-center">

        <div className="search-box">

          <FiSearch className="search-icon"/>

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

>

          <FiPlus/>

          <span>New Task</span>

        </button>

        <button className="icon-btn">

          <FiBell/>

        </button>

        {/* Placeholder */}

        <button className="profile-preview">

            <span className="avatar">
                R
            </span>

        </button>

      </div>

    </header>

  );

};

export default Navbar;