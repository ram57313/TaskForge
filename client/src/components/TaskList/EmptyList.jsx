import "./EmptyList.css";

import { FiClipboard, FiPlus } from "react-icons/fi";

const EmptyState = ({ openTaskModal }) => {

    return (

        <div className="empty-state">

            <FiClipboard className="empty-icon"/>

            <h2>

                No Tasks Yet

            </h2>

            <p>

                Your workspace is empty.
                Create your first task and start organizing your work.

            </p>

            <button
                className="empty-btn"
                onClick={openTaskModal}
            >

                <FiPlus/>

                <span>

                    Create First Task

                </span>

            </button>

        </div>

    );

};

export default EmptyState;