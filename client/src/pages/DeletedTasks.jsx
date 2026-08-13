import { useEffect, useState } from "react";
import { FiRotateCcw, FiTrash2 } from "react-icons/fi";

import taskService from "../services/taskService";

import "./DeletedTasks.css";


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

                                            <h3>

                                                {task.title}

                                            </h3>

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


                                        <button
                                            className="restore-btn"
                                            onClick={() =>
                                                handleRestore(
                                                    task
                                                )
                                            }
                                            type="button"
                                        >

                                            <FiRotateCcw />

                                            <span>

                                                Restore

                                            </span>

                                        </button>

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