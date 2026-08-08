import api from "../api/axios";

const taskService = {

    // Get all tasks

    getAllTasks: async () => {
        
        const res = await api.get("/tasks");

        return res.data;

    },

    // Get single task

    getTask: async (id) => {

        const res = await api.get(`/tasks/${id}`);

        return res.data;

    },

    // Create task

    createTask: async (taskData) => {
     console.log("Sending:", taskData);
    const res = await api.post(
        "/tasks/createTask",
        taskData
    );

    return res.data;

},

    // Update task

    updateTask: async (id, taskData) => {

        const res = await api.patch(
            `/tasks/updateTask/${id}`,
            taskData
        );

        return res.data;

    },

    // Soft delete

    deleteTask: async (id) => {

        const res = await api.patch(
            `/tasks/deleteTask/${id}`
        );

        return res.data;

    },

    // Restore

    restoreTask: async (id) => {

        const res = await api.patch(
            `/tasks/restoreTask/${id}`
        );

        return res.data;

    },

    // Toggle completed / pending

    toggleStatus: async (id) => {

        const res = await api.patch(
            `/tasks/toggleStatus/${id}`
        );

        return res.data;

    }

};

export default taskService;