import "./TaskList.css";

import TaskCard from "../Taskcard/Taskcard";
import EmptyState from "./EmptyList";
import TaskToolbar from "../TaskToolbar/TaskToolbar";

import { FiSearch } from "react-icons/fi";

const TaskList = ({
    tasks = [],

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    sortBy,
    setSortBy,

    openCreateTaskModal,

    onEdit,

    onDelete,

    onToggle,

    onArchive,
    onRestore,
    isArchivedview=false
}) => {
     const isFiltering=search?.trim()!==""||statusFilter!=="All";

    return (

        <section className="task-list-container">

            <TaskToolbar

                taskCount={tasks.length}

                search={search}
                setSearch={setSearch}

                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}

                sortBy={sortBy}
                setSortBy={setSortBy}

                openTaskModal={openCreateTaskModal}

            />


            {

                tasks.length === 0? 
                
                    (isFiltering?(

                        <div className="no-results-state">

                            <FiSearch className="no-results-icon" />

                            <h2>
                                No Tasks Found
                            </h2>

                            <p>
                                No tasks match your current search or filter.
                            </p>

                        </div>

                    )
                    :(
                        <EmptyState
                            openTaskModal={
                                openCreateTaskModal
                            }
                        />

                    )
                )

                    : (

                        <div className="task-list">

                            {

                                tasks.map(task => (

                                    <TaskCard

                                        key={task._id}

                                        task={task}

                                        onEdit={onEdit}

                                        onDelete={onDelete}

                                        onToggle={onToggle}

                                       onArchive={onArchive}

                                       onRestore={onRestore}

                                       isArchivedview={isArchivedview}


                                    />

                                ))

                            }

                        </div>

                    )

            }

        </section>

    );

};

export default TaskList;