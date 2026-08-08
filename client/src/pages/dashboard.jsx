import { useState, useEffect } from "react";
import "./Dashboard.css";

import Navbar from "../components/Navbar/Navbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import WelcomeCard from "../components/WelcomeCard/WelcomeCard.jsx";
import Stats from "../components/Stats/Stats.jsx";
import TaskList from "../components/TaskList/TaskList.jsx";
import AddTaskModal from "../components/AddTaskModal/TaskModal.jsx";

import taskService from "../services/taskService";

const Dashboard = () => {

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const savedState = localStorage.getItem("sidebarOpen");
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    // Edit Mode
    const [editingTask, setEditingTask] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleSidebar = () => {

        const newState = !sidebarOpen;

        setSidebarOpen(newState);

        localStorage.setItem(
            "sidebarOpen",
            JSON.stringify(newState)
        );

    };

    const fetchTasks = async () => {

        try {

            setLoadingTasks(true);

            const res = await taskService.getAllTasks();

           const fetchedTasks = Array.isArray(res.tasks)? res.tasks:[];

            fetchedTasks.sort((a, b) => {

                if (a.status === b.status) return 0;

                return a.status ? 1 : -1;
            });

            setTasks(fetchedTasks);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoadingTasks(false);

        }

    };

    useEffect(() => {

        fetchTasks();

    }, []);

    // ---------------- CREATE ----------------

    const openCreateTaskModal = () => {

        setEditingTask(null);

        setIsEditMode(false);

        setIsTaskModalOpen(true);

    };

    // ---------------- EDIT ----------------

    const openEditTaskModal = (task) => {

        setEditingTask(task);

        setIsEditMode(true);

        setIsTaskModalOpen(true);

    };

    // ---------------- CLOSE ----------------

    const closeTaskModal = () => {

        setEditingTask(null);

        setIsEditMode(false);

        setIsTaskModalOpen(false);

    };

    // ---------------- CREATE ----------------

    const handleCreateTask = async (taskData) => {

        try {

            setIsCreatingTask(true);

            await taskService.createTask(taskData);

            await fetchTasks();

            closeTaskModal();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setIsCreatingTask(false);

        }

    };

    // ---------------- UPDATE ----------------

    const handleUpdateTask = async (taskData) => {

        try {

            setIsCreatingTask(true);

            await taskService.updateTask(
                editingTask._id,
                taskData
            );

            await fetchTasks();

            closeTaskModal();

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setIsCreatingTask(false);

        }

    };

    const handleToggleStatus = async (task) => {

    try {

        await taskService.toggleStatus(task._id);

        await fetchTasks();

    }

    catch (err) {

        console.error(err);

    }

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

                    <WelcomeCard />

                    <Stats />

                    <TaskList

                        tasks={tasks}

                        search={search}
                        setSearch={setSearch}

                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}

                        sortBy={sortBy}
                        setSortBy={setSortBy}

                        openCreateTaskModal={openCreateTaskModal}

                        onEdit={openEditTaskModal}

                        onToggle={handleToggleStatus}

                    />

                </main>

            </div>

            <AddTaskModal

                isOpen={isTaskModalOpen}

                onClose={closeTaskModal}

                onSubmit={
                    isEditMode
                        ? handleUpdateTask
                        : handleCreateTask
                }

                loading={isCreatingTask}

                editingTask={editingTask}

                isEditMode={isEditMode}

            />

        </div>

    );

};

export default Dashboard;