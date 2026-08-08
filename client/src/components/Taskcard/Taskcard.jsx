import "./TaskCard.css";

import {

    FiEdit2,

    FiArchive,

    FiTrash2,

    FiCalendar,

    FiFolder

} from "react-icons/fi";

const TaskCard = ({
    task,
    onEdit,
    onArchive,
    onDelete,
    onToggle
}) => {

    return(

        <div
    className={`task-card ${
        task.status ? "completed-card" : ""
    }`}
>

            <div className="task-header">

                <button
                    className={`status-btn ${
                        task.status==true ? "completed" : ""
                    }`}
                    onClick={() => onToggle(task)}
                    aria-label={
                        task.status
                            ? "Mark as pending"
                            : "Mark as completed"
                    }
                >

    <span className="status-circle"></span>

</button>

                <div className="task-content">

                    <h3
                        className={
                            task.status
                            ? "completed-title"
                            : ""
                        }
                    >

                        {task.title}

                    </h3>

                    <p>

                        {task.description}

                    </p>

                </div>

            </div>

            <div className="task-footer">

                <div className="task-meta">

                    <span>

                        <FiFolder/>

                        {task.category}

                    </span>

                    <span>

                        <FiCalendar/>

                        <p className="task-date">
    {new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })}
</p>

                    </span>

                </div>

                <div className="task-actions">


                      
                    <button
                        onClick={() => onEdit(task)}
                        disabled={task.status}
                        className={task.status ? "disabled-btn" : ""}
                        title={
                            task.status
                                ? "Mark the task as pending to edit it"
                                : "Edit Task"
                        }
                    >

                        <FiEdit2/>

                    </button>

                    <button
                        onClick={()=>onArchive(task)}
                    >

                        <FiArchive/>

                    </button>

                    <button
                        className="delete-btn"
                        onClick={()=>onDelete(task)}
                    >

                        <FiTrash2/>

                    </button>

                </div>

            </div>

        </div>

    )

}

export default TaskCard;