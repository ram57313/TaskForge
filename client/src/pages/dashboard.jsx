import { useState } from "react";
import "./Dashboard.css";

import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import WelcomeCard from "../components/WelcomeCard/WelcomeCard.jsx";
import Stats from "../components/Stats/Stats.jsx";
// import Filters from "../components/Filters/Filters";
// import TaskCard from "../components/Taskcard/Taskcard.jsx";
import TaskList from "../components/TaskList/TaskList.jsx";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  return (
    <div className="dashboard">
      <Navbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="dashboard-body">
        <Sidebar sidebarOpen={sidebarOpen} />

        <main
          className={`dashboard-main ${
            sidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <WelcomeCard />

          <Stats />

          {/* <Filters /> */}

          <TaskList />

          {/* <TaskList
    tasks={tasks}
    search={search}
    setSearch={setSearch}
    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}
    sortBy={sortBy}
    setSortBy={setSortBy}
    openTaskModal={openTaskModal}
    onEdit={handleEdit}
    onArchive={handleArchive}
    onDelete={handleDelete}
    onToggle={handleToggle}
/> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;