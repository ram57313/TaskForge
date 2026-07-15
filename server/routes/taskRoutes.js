const express=require("express");
const router=express.Router();
const taskController=require("../controllers/taskController");
const authController=require("../controllers/authController")

router.use(authController.protect);

router.route("/").get(taskController.getAllTasks);
router.route("/:id").get(taskController.getTask);
// router.route("/deleteTask/:id").delete(taskController.deleteTaskPermanent);
router.route("/deleteTask/:id").patch(taskController.deleteTaskTemp);
router.route("/restoreTask/:id").patch(taskController.restoreTask);
router.route("/createTask").post(taskController.createTask);
router.route("/updateTask/:id").patch(taskController.updateTask);
router.route("/toggleStatus/:id").patch(taskController.toggleStatusOfTask);

module.exports=router;