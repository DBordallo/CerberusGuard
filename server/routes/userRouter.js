import express from "express";
import {createUser} from "../controllers/UserController.js";
import {getAllUsers} from "../controllers/UserController.js";
import { getUser } from "../controllers/UserController.js";
import {updateUser} from "../controllers/UserController.js";
import {deleteUser, getUserByAccountId}  from "../controllers/UserController.js";
import verifyToken from "../middlewares/jwtMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { registerSchemas } from "../schemas/auth.schemas.js";

const userRouter = express.Router();


userRouter.post("/", registerSchemas, createUser);
userRouter.get("/",verifyToken,isAdmin, getAllUsers);
userRouter.get("/:id", getUser);
userRouter.get("/usrAcc/:id", getUserByAccountId);
userRouter.put("/:id", verifyToken, isAdmin, updateUser);
userRouter.delete("/:id", verifyToken, isAdmin, deleteUser);


export default userRouter