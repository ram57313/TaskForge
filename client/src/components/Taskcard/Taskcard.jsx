import "./Taskcard.css";

import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiFolder,
  FiArchive,
  FiRotateCcw,
} from "react-icons/fi";

const getPriority=(priority)=>{
    switch(priority){
        case "high":return "high-priority";
                     
        case "medium":return "medium-priority";
                        
        case "low":return "low-priority";  
        
        default :return " ";
    }

}



const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggle,
  onArchive,
  isArchivedView,
  onRestore,
}) => {

   const getOverdue=()=>{
      if(!task.dueDate)return "";
      
      const currDate=new Date().getDate();
      const taskDueDate=new Date(task.dueDate).getDate();

      if(taskDueDate==currDate)return "task-today-due";

      if(taskDueDate<currDate)return "task-yesterday-due";

      return "";

  }

   
  return (
    <div className={`task-card ${task.status ? "completed-card" : ""}`}>
      {/* HEADER */}

      <div className="task-header">
        <button
          className={`status-btn ${task.status ? "completed" : ""}`}
          onClick={() => onToggle(task)}
          aria-label={task.status ? "Mark as pending" : "Mark as completed"}
          type="button"
        >
          <span className="status-circle"></span>
        </button>

        <div className="task-content">
          <div className="task-title-row">
            <h3 className={task.status ? "completed-title" : ""}>
              {task.title}
            </h3>

            <span
              className={`priority ${getPriority(task.priority?.toLowerCase())}`}
            >
              {task.priority}
            </span>

          </div>
          <div className="task-description">
             {task.description}
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

         

          { !task.status&&(
             <span>
            <FiCalendar />
            <span className={`task-date ${getOverdue()}`}>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "No due date"}
            </span>
            </span>
          )
          }  
          
        </div>

        <div className="task-actions">
          {isArchivedView ? (
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
                className={task.status ? "disabled-btn" : ""}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
