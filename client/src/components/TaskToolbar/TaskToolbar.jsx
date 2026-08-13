import "./TaskToolbar.css";

import Dropdown from "../Dropdown/Dropdown.jsx";

import {
    FiSearch,
    FiFilter,
    FiArrowUp,
    FiPlus
} from "react-icons/fi";

const TaskToolbar = ({
    taskCount = 0,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    openTaskModal
}) => {

    return (

        <section className="task-toolbar">

            <div className="toolbar-left">

                <div className="toolbar-title">

                    <h2>Tasks</h2>

                    <span>{taskCount} Tasks</span>

                </div>

            </div>

            <div className="toolbar-right">

                <div className="toolbar-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        autoComplete="off"
                    />

                </div>

                {/* <div className="toolbar-select"> */}

                    <div className="toolbar-filter">

    <FiFilter className="toolbar-filter-icon"/>

    <Dropdown
        options={[
            "All",
            "Completed",
            "Pending",
            // "Archived"
        ]}
        value={statusFilter || "All"}
        onChange={setStatusFilter}
    />

</div>



                {/* </div> */}

                {/* <div className="toolbar-select"> */}

                    <div className="toolbar-filter">

    <FiArrowUp className="toolbar-filter-icon"/>

    <Dropdown
        options={[
            "Newest",
            "Oldest",
            "A-Z"
        ]}
        value={sortBy || "Newest"}
        onChange={setSortBy}
    />

</div>

                {/* </div> */}

                <button
                    className="toolbar-add-btn"
                    onClick={openTaskModal}
                >

                    <FiPlus/>

                    <span>New Task</span>

                </button>

            </div>

        </section>

    );

};

export default TaskToolbar;