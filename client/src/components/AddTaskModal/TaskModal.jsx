import { useEffect, useState } from "react";
import "./TaskModal.css";
import Dropdown from "../Dropdown/Dropdown";

import {
    FiX,
    FiCalendar,
    FiFlag,
    FiFolder
} from "react-icons/fi";

const initialForm = {
    title: "",
    description: "",
    priority: "Medium",
    category: "Personal",
    dueDate: ""
};

const AddTaskModal = ({
     isOpen,
    onClose,
    onSubmit,
    loading = false,
    editingTask = null,
    isEditMode = false
}) => {

    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    /* -------------------------------- */

    useEffect(() => {

    if (isEditMode && editingTask) {

        setFormData({

            title: editingTask.title || "",

            description: editingTask.description || "",

            priority: editingTask.priority || "Medium",

            category: editingTask.category || "Personal",

            dueDate: editingTask.dueDate
                ? editingTask.dueDate.split("T")[0]
                : ""

        });

    }

    else {

        setFormData(initialForm);

    }

}, [editingTask, isEditMode]);

    /* -------------------------------- */

    useEffect(() => {

        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        const handleEsc = (e) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        window.addEventListener("keydown", handleEsc);

        return () => {

            document.body.style.overflow = "auto";

            window.removeEventListener("keydown", handleEsc);

        };

    }, [isOpen, onClose]);

    /* -------------------------------- */

    const handleChange = (e) => {
        // console.log("Frontend dueDate:", formData.dueDate);
        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    /* -------------------------------- */

    const validate = () => {

        const newErrors = {};

        if (!formData.title.trim()) {

            newErrors.title = "Task title is required.";

        }

        if (formData.title.length > 100) {

            newErrors.title = "Maximum 100 characters.";

        }

        if (formData.description.length > 500) {

            newErrors.description =
                "Maximum 500 characters.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    /* -------------------------------- */

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    await onSubmit(formData);

    setFormData(initialForm);

};

    /* -------------------------------- */

    if (!isOpen) return null;

    return (

        <div
            className="modal-overlay"
            onClick={() => {

            setFormData(initialForm);

            onClose();

            }}
                    >

            <div
                className="task-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="modal-header">

                    <div>

                      <h2>

                            {

                                isEditMode

                                    ? "Edit Task"

                                    : "Create Task"

                            }

                        </h2>

                        <p>

                            Organize your work efficiently.

                        </p>

                    </div>

                    <button
    className="close-btn"
    onClick={() => {

        setFormData(initialForm);

        onClose();

    }}
>
    <FiX />
</button>

                </div>

                {/* Form */}

                <form
                    className="task-form"
                    onSubmit={handleSubmit}
                >

                    {/* Title */}

                    <div className="input-group">

                        <label>

                            Task Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            value={formData.title}

                            onChange={handleChange}

                            placeholder="Enter task title"

                        />

                        {

                            errors.title &&

                            <small>

                                {errors.title}

                            </small>

                        }

                    </div>

                    {/* Description */}

                    <div className="input-group">

                        <label>

                            Description

                        </label>

                        <textarea

                            rows="5"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            placeholder="Task description"

                        />

                        {

                            errors.description &&

                            <small>

                                {errors.description}

                            </small>

                        }

                    </div>

                    {/* Row */}

                    <div className="form-row">

                        {/* Priority */}

                        <div className="input-group">

                            <label>

                                <FiFlag />

                                Priority

                            </label>

                            <Dropdown
                                options={[
                                    "Low",
                                    "Medium",
                                    "High"
                                ]}
                                value={formData.priority}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        priority: value
                                    })
                                }
                            />

                        </div>

                        {/* Category */}

                        <div className="input-group">

                            <label>

                                <FiFolder />

                                Category

                            </label>

                            <Dropdown
                                options={[
                                    "Personal",
                                    "Work",
                                    "Study",
                                    "Other"
                                ]}
                                value={formData.category}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        category: value
                                    })
                                }
                            />

                        </div>

                    </div>

                    {/* Due Date */}

                    <div className="input-group">

                        <label>

                            <FiCalendar />

                            Due Date

                        </label>

                        <input

                            type="date"

                            name="dueDate"

                            value={formData.dueDate}

                            onChange={handleChange}

                        />

                    </div>

                    {/* Footer */}

                    <div className="modal-footer">

                       <button

                        type="button"

                        className="cancel-btn"

                        onClick={() => {

                            setFormData(initialForm);

                            onClose();

                        }}

                    >

                        Cancel

                    </button>

                        <button

                            className="submit-btn"

                            type="submit"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? (

                                        isEditMode

                                            ? "Updating..."

                                            : "Creating..."

                                    )

                                    : (

                                        isEditMode

                                            ? "Update Task"

                                            : "Create Task"

                                    )

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddTaskModal;