const express=require("express");
const router=express.Router();
const taskController=require("../controllers/taskController");
const authController=require("../controllers/authController")

router.use(authController.protect);

router.route("/").get(taskController.getAllTasks);
router.route("/:id").get(taskController.getTask);
router.route("/deleteTask/:id").delete(taskController.deleteTask);
router.route("/createTask").post(taskController.createTask);



module.exports=router;