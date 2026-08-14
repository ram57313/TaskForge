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
router.route('/logout').post(authController.protect,authController.logout);
router.route('/updateMe').patch(authController.protect,userController.updateMe);
// router.route('/deleteMe').delete(authController.protect,userController.deleteMe);//permanent deletion 
router.route('/deleteMe').patch(authController.protect,userController.deleteMe);//permanent deletion for now
router.route('/restoreUser').patch(userController.restoreUser);

router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/updatePassword').post(authController.protect,authController.updatePassword)
router.patch('/resetPassword/:token', authController.resetPassword);


module.exports=router;