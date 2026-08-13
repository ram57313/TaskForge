import "./Taskcard.css";

import {
    FiEdit2,
    FiTrash2,
    FiCalendar,
    FiFolder,
    FiArchive,
    FiRotateCcw
} from "react-icons/fi";


const TaskCard = ({
    task,
    onEdit,
    onDelete,
    onToggle,
    onArchive,
    isArchivedView,
    onRestore
}) => {

    return (

        <div
            className={`task-card ${
                task.status
                    ? "completed-card"
                    : ""
            }`}
        >

            {/* HEADER */}

            <div className="task-header">

                <button
                    className={`status-btn ${
                        task.status
                            ? "completed"
                            : ""
                    }`}
                    onClick={() => onToggle(task)}
                    aria-label={
                        task.status
                            ? "Mark as pending"
                            : "Mark as completed"
                    }
                    type="button"
                >

                    <span className="status-circle"></span>

                </button>


                <div className="task-content">

                     <div className="task-title-row">

                            <span
                                className={`priority-dot priority-${task.priority?.toLowerCase()}`}
                                title={`${task.priority} priority`}
                            />

                            <h3
                                className={
                                    task.status
                                    ? "completed-title"
                                    : ""
                                }
                            >
                                {task.title}
                            </h3>

                    </div>


                </div>

            </div>


            {/* FOOTER */}

            <div className="task-footer">

                <div className="task-meta">

                    <span>

                        <FiFolder />

                        {task.category}

                    </span>


                    <span>

                        <FiCalendar />

                        <span className="task-date">

                            {task.dueDate
                                ? new Date(
                                    task.dueDate
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    }
                                )
                                : "No due date"
                            }

                        </span>

                    </span>

                </div>


                <div className="task-actions">

    {
        isArchivedView ? (

            <>

                <button
                    className="restore-btn"
                    onClick={() => onRestore(task)}
                    title="Restore task"
                    type="button"
                >

                    <FiRotateCcw />

                </button>


                <button
                    className="delete-btn"
                    onClick={() => onDelete(task)}
                    title="Move to Trash"
                    type="button"
                >

                    <FiTrash2 />

                </button>

            </>

        ) : (

            <>

                {/* EDIT */}

                <button
                    onClick={() => onEdit(task)}
                    disabled={task.status}
                    className={
                        task.status
                            ? "disabled-btn"
                            : ""
                    }
                    title={
                        task.status
                            ? "Mark the task as pending to edit it"
                            : "Edit Task"
                    }
                    type="button"
                >

                    <FiEdit2 />

                </button>


                {/* ARCHIVE */}

                <button
                    className="archive-btn"
                    onClick={() => onArchive(task)}
                    title="Archive task"
                    type="button"
                >

                    <FiArchive />

                </button>


                {/* DELETE */}

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task)}
                    title="Move to Trash"
                    type="button"
                >

                    <FiTrash2 />

                </button>

            </>

        )
    }

</div>

            </div>

        </div>

    );

};

export default TaskCard;