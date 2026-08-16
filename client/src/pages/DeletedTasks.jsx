import { useEffect, useState } from "react";
import { FiRotateCcw, FiTrash2 } from "react-icons/fi";

import taskService from "../services/taskService";


import "./DeletedTasks.css";
import toast from "react-hot-toast";


const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "deleted-priority-high";

            case "medium":
                return "deleted-priority-medium";

            case "low":
                return "deleted-priority-low";

            default:
                return "";
        }
    };

 



const DeletedTasks = () => {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);


     const fetchDeletedTasks = async () => {

        try {

            setLoading(true);

            const res =
                await taskService.getAllTasks({
                    isDeleted: true
                });

            setTasks(
                Array.isArray(res.tasks)
                    ? res.tasks
                    : []
            );

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchDeletedTasks();

    }, []);


    const handleRestore = async (task) => {

        try {

            await taskService.restoreTask(
                task._id
            );

            await fetchDeletedTasks();

        }

        catch (err) {

            console.error(err);

        }

    };

    const handlePermanentDelete=async(task)=>{
    try{
      const res= await taskService.deleteTaskPermanent(task._id);


       await fetchDeletedTasks();

       toast.success(res.message||"task deleted successfully");

    }catch(err){
         
        toast.error(err.message||"something went wrong");
        console.log(err);
    }
}   


    if (loading) {

        return (

            <section className="deleted-page">

                <h1>Trash</h1>

                <p className="deleted-loading">

                    Loading deleted tasks...

                </p>

            </section>

        );

    }


    return (

        <section className="deleted-page">

            <div className="deleted-header">

                <div>

                    <h1>

                        Trash

                    </h1>

                    <p>

                        Tasks you've deleted are kept here.

                    </p>

                </div>

                <FiTrash2 />

            </div>


            {

                tasks.length === 0

                    ? (

                        <div className="deleted-empty">

                            <FiTrash2 />

                            <h2>

                                Trash is empty

                            </h2>

                            <p>

                                Deleted tasks will appear here.

                            </p>

                        </div>

                    )

                    : (

                        <div className="deleted-list">

                            {

                                tasks.map(task => (

                                    <div
                                        className="deleted-task"
                                        key={task._id}
                                    >

                                        <div className="deleted-task-info">

                                            <div className="deleted-task-main">

                                            <h3>

                                                {task.title}

                                            </h3>

                                             {task.priority && (
                                            <span
                                                className={`deleted-priority ${getPriorityClass(
                                                    task.priority
                                                )}`}
                                            >
                                                {task.priority}
                                            </span>
                                        )}
                                            </div>



                                            <p>

                                                {task.description}

                                            </p>

                                            <span>

                                                Deleted-{" "}

                                                {task.deletedAt
                                                    ? new Date(
                                                        task.deletedAt
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )
                                                    : ""
                                                }

                                            </span>

                                        </div>

                                        


                                        <div className="deleted-task-actions">

                                            <button
                                                className="restore-btn"
                                                onClick={() =>
                                                    handleRestore(task)
                                                }
                                                type="button"
                                            >
                                                <FiRotateCcw />

                                                <span>
                                                    Restore
                                                </span>
                                            </button>


                                            <button
                                                className="permanent-delete-btn"
                                                onClick={() =>
                                                    handlePermanentDelete(task)

                                                }
                                                type="button"
                                                title="Delete permanently"
                                            >
                                                <FiTrash2 />
                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </section>

    );

};

export default DeletedTasks;