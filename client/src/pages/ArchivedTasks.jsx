import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";

import {
    FiArchive,
    FiSearch,
    FiRotateCcw,
    FiTrash2,
    FiCalendar,
    FiFolder
} from "react-icons/fi";

import taskService from "../services/taskService";
import "./ArchivedTasks.css";

const ArchivedTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(true);

    const [showModal,setShowModal]=useState(false);
    const [selectedTask,setSelectedTask]=useState(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const fetchArchivedTasks = async () => {
        try {
            setLoadingTasks(true);

            const response = await taskService.getAllTasks({
                isArchived: true,
                search,
                status: statusFilter,
                sort: sortBy
            });

            setTasks(response.data?.tasks || response.tasks || []);
        } catch (error) {
            // console.error("Error fetching archived tasks:", error);
            setTasks([]);
        } finally {
            setLoadingTasks(false);
        }
    };

    useEffect(() => {
        fetchArchivedTasks();
    }, [search, statusFilter, sortBy]);

    const handleRestore = async (taskId) => {
        try {
            await taskService.restoreArchivedTask(taskId);

            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== taskId)
            );
        } catch (error) {
            // console.error("Error restoring task:", error);
        }
    };

    const handleDelete = async () => {

        if(!selectedTask)return ;
        try {
            await taskService.deleteTask(selectedTask._id);
            setShowModal(false);
            setSelectedTask(null);

            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== selectedTask._id)
            );
        } catch (error) {
            // console.error("Error deleting task:", error);
        }
    };

    const formatDate = (date) => {
        if (!date) return "No date";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "archived-priority-high";

            case "medium":
                return "archived-priority-medium";

            case "low":
                return "archived-priority-low";

            default:
                return "";
        }
    };

    const openConfirmModal=(task)=>{
        setShowModal(true);
        setSelectedTask(task);
    }

    return (
        <div className="archived-tasks-page">

            {/* Header */}
            <div className="archived-header">

                <div className="archived-header-left">

                    <div className="archived-title-icon">
                        <FiArchive />
                    </div>

                    <div>
                        <h1>Archived Tasks</h1>

                        <p>
                            Tasks you've moved out of your active workspace
                        </p>
                    </div>

                </div>

                <div className="archived-count">
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                </div>

            </div>


            {/* Toolbar */}
            <div className="archived-toolbar">

                <div className="archived-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search archived tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>


                <div className="archived-filters">

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>


                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                </div>

            </div>


            {/* Content */}
            <div className="archived-content">

                {loadingTasks ? (

                    <div className="archived-empty-state">
                        <div className="archived-loading">
                            Loading archived tasks...
                        </div>
                    </div>

                ) : tasks.length === 0 ? (

                    <div className="archived-empty-state">

                        <div className="archived-empty-icon">
                            <FiArchive />
                        </div>

                        <h2>No archived tasks</h2>

                        <p>
                            Tasks you archive will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="archived-task-list">

                        {tasks.map((task) => (

                            <div
                                className="archived-task-card"
                                key={task._id}
                            >

                                <div className="archived-task-main">

                                    <div className="archived-task-heading">

                                        <h3>{task.title}</h3>

                                        {task.priority && (
                                            <span
                                                className={`archived-priority ${getPriorityClass(
                                                    task.priority
                                                )}`}
                                            >
                                                {task.priority}
                                            </span>
                                        )}

                                    </div>


                                    {task.description && (
                                        <p className="archived-task-description">
                                            {task.description}
                                        </p>
                                    )}


                                    <div className="archived-task-meta">

                                        <span>
                                            <FiFolder />
                                            {task.status || "Pending"}
                                        </span>

                                        {task.dueDate && (
                                            <span>
                                                <FiCalendar />
                                                {formatDate(task.dueDate)}
                                            </span>
                                        )}

                                    </div>

                                </div>


                                <div className="archived-task-actions">

                                    <button
                                        className="archived-restore-btn"
                                        onClick={() =>
                                            handleRestore(task._id)
                                        }
                                        title="Restore task"
                                    >
                                        <FiRotateCcw />
                                        <span>Restore</span>
                                    </button>


                                    <button
                                        className="archived-delete-btn"
                                        onClick={() =>
                                            openConfirmModal(task)
                                        }
                                        title="Delete task"
                                    >
                                        <FiTrash2 />
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            {showModal&&(
                <ConfirmModal 
             title="Move to trash"
             message="This task will be moved to trash and can be restored"
             onCancel={()=>{
                setShowModal(false);
                setSelectedTask(null);
             }}
             onConfirm={handleDelete}
            />
            )}

        </div>
    );
};

export default ArchivedTasks;