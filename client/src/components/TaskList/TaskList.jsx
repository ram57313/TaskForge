import "./TaskList.css";

import TaskCard from "../TaskCard/TaskCard";
import EmptyState from "./EmptyList";
import TaskToolbar from "../TaskToolbar/TaskToolbar";


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

                tasks.length === 0

                    ? (

                        <EmptyState
                            openTaskModal={
                                openCreateTaskModal
                            }
                        />

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