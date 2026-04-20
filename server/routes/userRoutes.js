const express=require("express");
const userController=require("../controllers/userControllers");
const authController=require("../controllers/authController");
const router=express.Router();

router.route('/').get(userController.getAllUsers);
router.route('/signup').post(authController.signup);
router.route('/:id').get(userController.getUser);
router.route('/guest-login').post(authController.guestSignup);
router.route('/login').post(authController.login);

module.exports=router;