import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers); //http://localhost:5000/api/users

router.post("/auth", loginUser); //http://localhost:5000/api/users/auth
router.post("/logout", logoutCurrentUser); //http://localhost:5000/api/users/logout

//http://localhost:5000/api/users( for getting all data)

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile); //http://localhost:5000/api/users/profile(specific user data)
//http://localhost:5000/api/users/profile(updated nikitha to sanchi nikitha)

// ADMIN ROUTES 👇
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);
//http://localhost:5000/api/users/6615744ad4918c453004afce(delete  some id only can admin logout then login then delete some id)
//http://localhost:5000/api/users/661626500fcbdb34f3e2aa5e(login user by id)

export default router;
