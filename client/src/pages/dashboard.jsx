import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./dashboard.css";

import WelcomeCard from "../components/WelcomeCard/WelcomeCard.jsx";
import Stats from "../components/Stats/Stats.jsx";
import TaskList from "../components/TaskList/TaskList.jsx";
import AddTaskModal from "../components/AddTaskModal/TaskModal.jsx";

import taskService from "../services/taskService";
import toast from "react-hot-toast";

const Dashboard = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [loadingTasks, setLoadingTasks] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [sortBy, setSortBy] = useState("Newest");

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const [isCreatingTask, setIsCreatingTask] = useState(false);

    const [editingTask, setEditingTask] = useState(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const [isArchivedView, setIsArchivedView] = useState(false);

    const[stats,setStats]=useState({total: 0,
                                    completed: 0,
                                    pending: 0,
                                    archived: 0,
                                    deleted: 0,
                                    completionRate: 0})


    // ---------------- FETCH TASKS ----------------

    const fetchTasks = async () => {

    try {

        setLoadingTasks(true);


        const params = {};


        // Search
        
        if (isArchivedView) {

            params.isArchived = "true";

            }

        if (search.trim()) {

            params.search = search.trim();

        }


        // Status

        if (statusFilter === "Completed") {

            params.status = "completed";

        }

        else if (statusFilter === "Pending") {

            params.status = "pending";

        }


        // Sort

        if (sortBy === "Oldest") {

            params.sort = "oldest";

        }

        else if (sortBy === "A-Z") {

            params.sort = "az";

        }

        else {

            params.sort = "newest";

        }


        const res =
            await taskService.getAllTasks(params);


        setTasks(
            Array.isArray(res.tasks)
                ? res.tasks
                : []
        );

    }

    catch (err) {

        // console.error(err);

    }

    finally {

        setLoadingTasks(false);

    }

};


    useEffect(() => {

    const timer = setTimeout(() => {

        fetchTasks();


    }, 300);


    return () => clearTimeout(timer);

}, [search, statusFilter,sortBy,isArchivedView]);


    // ---------------- OPEN CREATE MODAL ----------------

    const openCreateTaskModal = () => {

        setEditingTask(null);

        setIsEditMode(false);

        setIsTaskModalOpen(true);

    };


    // ---------------- OPEN EDIT MODAL ----------------

    const openEditTaskModal = (task) => {

        setEditingTask(task);

        setIsEditMode(true);

        setIsTaskModalOpen(true);

    };


    // ---------------- CLOSE MODAL ----------------

    const closeTaskModal = () => {

        setEditingTask(null);

        setIsEditMode(false);

        setIsTaskModalOpen(false);

    };


    // ---------------- NAVBAR CREATE TASK ----------------

    useEffect(() => {

        if (location.state?.openCreateTask) {

            openCreateTaskModal();

            // Clear navigation state so refreshing
            // the dashboard doesn't open the modal again.

            navigate(location.pathname, {
                replace: true,
                state: {}
            });

        }

    }, [location, navigate]);


    // ---------------- CREATE ----------------

    const handleCreateTask = async (taskData) => {

        try {

            setIsCreatingTask(true);

            await taskService.createTask(taskData);

            await fetchTasks();

            await fetchStats();

            closeTaskModal();

        }

        catch (err) {

            // console.error(err);

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
            await fetchStats();


            closeTaskModal();

        }

        catch (err) {

            // console.error(err);

        }

        finally {

            setIsCreatingTask(false);

        }

    };


    // ---------------- TOGGLE STATUS ----------------

    const handleToggleStatus = async (task) => {

        try {

            await taskService.toggleStatus(task._id);

            await fetchTasks();
            await fetchStats();

        }

        catch (err) {

            // console.error(err);

        }

    };
    
    const handleDeleteTask = async (task) => {

    try {

        const res=await taskService.deleteTask(task._id);

        await fetchTasks();
        await fetchStats();
        toast.success(res.message||"Task moved to trash");

    }

    catch (err) {

        // console.error(err);

    }
 
};

const handleArchiveTask = async (task) => {

    try {

        await taskService.archiveTask(
            task._id
        );

        await fetchTasks();
        await fetchStats();

    }

    catch (err) {

        // console.error(err);

    }

};

const fetchStats=async ()=>{

    try{
    
        const res=await taskService.getTaskStats();

    
        setStats(res.stats);
        // console.log(res.stats);
    }catch(err){
        // console.error(err);
    }
}

useEffect(()=>{
    fetchStats();
},[]);


    return (

        <>

            <WelcomeCard stats={stats} />

            <Stats statsdata={stats}/>

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
                 onDelete={handleDeleteTask}

                 onArchive={handleArchiveTask}

            />


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

        </>

    );

};

export default Dashboard;