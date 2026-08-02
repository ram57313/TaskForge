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

        <div className="task-card">

            <div className="task-header">

                <button
    className={`status-btn ${
        task.completed ? "completed" : ""
    }`}
    onClick={() => onToggle(task)}
    aria-label={
        task.completed
            ? "Mark as pending"
            : "Mark as completed"
    }
>

    <span className="status-circle"></span>

</button>

                <div className="task-content">

                    <h3
                        className={
                            task.completed
                            ? "completed"
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

                        {task.dueDate}

                    </span>

                </div>

                <div className="task-actions">

                    <button
                        onClick={()=>onEdit(task)}
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