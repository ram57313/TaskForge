import api from "../api/axios";

const taskService = {

    // ================= GET ALL =================

    getAllTasks: async (params = {}) => {

        const res = await api.get(
            "/tasks",
            {
                params
            }
        );

        return res.data;

    },


    // ================= GET ONE =================

    getTask: async (id) => {

        const res = await api.get(
            `/tasks/${id}`
        );

        return res.data;

    },


    // ================= CREATE =================

    createTask: async (taskData) => {

        const res = await api.post(
            "/tasks/createTask",
            taskData
        );

        return res.data;

    },


    // ================= UPDATE =================

    updateTask: async (id, taskData) => {

        const res = await api.patch(
            `/tasks/updateTask/${id}`,
            taskData
        );

        return res.data;

    },


    // ================= SOFT DELETE =================

    deleteTask: async (id) => {

        const res = await api.patch(
            `/tasks/deleteTask/${id}`
        );

        return res.data;

    },


    // ================= RESTORE =================

    restoreTask: async (id) => {

        const res = await api.patch(
            `/tasks/restoreTask/${id}`
        );

        return res.data;

    },


    // ================= TOGGLE STATUS =================

    toggleStatus: async (id) => {

        const res = await api.patch(
            `/tasks/toggleStatus/${id}`
        );

        return res.data;

    },

    // ================= ARCHIVE =================

    archiveTask: async (id) => {

        const res = await api.patch(
            `/tasks/archiveTask/${id}` 
        );

        return res.data;

    },


// ================= RESTORE ARCHIVED =================

    restoreArchivedTask: async (id) => {

        const res = await api.patch(
            `/tasks/restoreArchivedTask/${id}`
        );

        return res.data;

    }

};

export default taskService;