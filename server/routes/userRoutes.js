const express=require("express");
const userController=require("../controllers/userControllers");
const authController=require("../controllers/authController");
const router=express.Router();

router.get('/me',authController.protect,userController.getMe,userController.getUser);


router.route('/').get(authController.protect,userController.getAllUsers);
router.route('/signup').post(authController.signup);


router.route('/:id').get(userController.getUser);
router.route('/guest-login').post(authController.guestSignup);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);

module.exports=router;