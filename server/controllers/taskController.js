const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Apifeatures = require("../utils/apiFeatures");


const filteredObj = (obj, ...allowedFields) => {

    const newObj = {};

    Object.keys(obj).forEach(el => {

        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }

    });

    return newObj;

};


// ================= CREATE =================

exports.createTask = catchAsync(async (req, res, next) => {

    const task = await Task.create({

        title: req.body.title,

        description: req.body.description,

        status: req.body.status,

        isDeleted: false,

        category: req.body.category,

        priority: req.body.priority,

        dueDate: req.body.dueDate,

        user: req.user._id,

        isArchived:false

    });

    res.status(200).json({

        status: "success",

        task

    });

});


// ================= GET ALL =================
 
exports.getAllTasks = catchAsync(async (req, res, next) => {

    const filter = {

        user: req.user._id,

        isDeleted: false,

        isArchived:false
    };

    if (req.query.isArchived === "true") {

    filter.isArchived = true;

    }


    // ================= SEARCH =================

    if (req.query.search) {

        const searchRegex = new RegExp(
            req.query.search,
            "i"
        );

        filter.$or = [

            {
                title: searchRegex
            },

            {
                description: searchRegex
            }

        ];

    }


    // ================= STATUS =================

    if (req.query.status === "completed") {

        filter.status = true;

    }

    else if (req.query.status === "pending") {

        filter.status = false;

    }


    // ================= SORT =================

    let sort = {
        createdAt: -1
    };


    if (req.query.sort === "oldest") {

        sort = {
            createdAt: 1
        };

    }

    else if (req.query.sort === "az") {

        sort = {
            title: 1
        };

    }

    if(req.query.isDeleted){
        filter.isDeleted=true;
    }


    const tasks = await Task
        .find(filter)
        .sort(sort);


    res.status(200).json({

        status: "success",

        result: tasks.length,

        tasks

    });

});

// ================= GET ONE =================

exports.getTask = catchAsync(async (req, res, next) => {

    const task = await Task.findOne({

        _id: req.params.id,

        user: req.user._id

    });


    if (!task) {

        return next(
            new AppError(
                "No Task found with that ID",
                404
            )
        );

    }


    res.status(200).json({

        status: "success",

        task

    });

});


// ================= PERMANENT DELETE =================

exports.deleteTaskPermanent = catchAsync(async (req, res, next) => {

    const task = await Task.findOneAndDelete({

        _id: req.params.id,

        user: req.user._id

    });


    if (!task) {

        return next(
            new AppError(
                "No Task with that ID",
                404
            )
        );

    }


    res.status(204).json({

        status: "success",

        data: null

    });

});


// ================= SOFT DELETE =================

exports.deleteTaskTemp = catchAsync(async (req, res, next) => {

    const task = await Task.findOneAndUpdate(

        {
            _id: req.params.id,

            user: req.user._id,

            isDeleted: false
        },

        {
            isDeleted: true,

            deletedAt: new Date()

        },

        {
            new: true
        }

    );


    if (!task) {

        return next(
            new AppError(
                "No Task found with that ID",
                404
            )
        );

    }


    res.status(200).json({

        status: "success",

        message: "Task moved to trash",

        task

    });

});


// ================= UPDATE =================

exports.updateTask = catchAsync(async (req, res, next) => {

    if (
        req.body.deletedAt ||
        req.body.isDeleted
    ) {

        return next(
            new AppError(
                "You cant update the restricted fields",
                400
            )
        );

    }


    // If description is empty,
    // use title as description

    if (
        !req.body.description?.trim() &&
        req.body.title
    ) {

        req.body.description = req.body.title;

    }


    const filteredBody = filteredObj(

        req.body,

        "title",

        "description",

        "category",

        "priority",

        "dueDate"

    );


    const task = await Task.findOneAndUpdate(

        {
            _id: req.params.id,

            user: req.user._id,

            isDeleted: false

        },

        filteredBody,

        {
            new: true,

            runValidators: true

        }

    );


    if (!task) {

        return next(
            new AppError(
                "No Task found with that ID",
                404
            )
        );

    }


    res.status(200).json({

        status: "success",

        task

    });

});


// ================= RESTORE =================

exports.restoreTask = catchAsync(async (req, res, next) => {

    const task = await Task.findOneAndUpdate(

        {
            _id: req.params.id,

            user: req.user._id,

            isDeleted: true

        },

        {

            isDeleted: false,

            deletedAt: null

        },

        {

            new: true

        }

    );


    if (!task) {

        return next(
            new AppError(
                "No deleted task found with that ID",
                404
            )
        );

    }


    res.status(200).json({

        status: "success",

        message: "Task restored successfully",

        task

    });

});


// ================= TOGGLE STATUS =================

exports.toggleStatusOfTask = catchAsync(async (req, res, next) => {

    const task = await Task.findOne({

        _id: req.params.id,

        user: req.user._id,

        isDeleted: false

    });


    if (!task) {

        return next(
            new AppError(
                "No Task found with that ID",
                404
            )
        );

    }


    task.status = !task.status;

    await task.save();


    res.status(200).json({

        status: "success",

        message: "Status toggled successfully",

        task

    });

});

// ================= ARCHIVE =================

exports.archiveTask = catchAsync(async (req, res, next) => {

    const task = await Task.findOneAndUpdate(

        {
            _id: req.params.id,

            user: req.user._id,

            isDeleted: false,

            isArchived: false
        },

        {
            isArchived: true
        },

        {
            new: true
        }

    );


    if (!task) {

        return next(
            new AppError(
                "No active task found with that ID",
                404
            )
        );

    }


    res.status(200).json({

        status: "success",

        message: "Task archived successfully",

        task

    });

});

// ================= RESTORE ARCHIVED =================

exports.restoreArchivedTask = catchAsync(async (req, res, next) => {

    const task = await Task.findOneAndUpdate(

        {
            _id: req.params.id,

            user: req.user._id,

            isDeleted: false,

            isArchived: true
        },

        {
            isArchived: false
        },

        {
            new: true
        }

    );


    if (!task) {

        return next(
            new AppError(
                "No archived task found with that ID",
                404
            )
        );

    }


    res.status(200).json({

        status: "success",

        message: "Task restored successfully",

        task

    });

});