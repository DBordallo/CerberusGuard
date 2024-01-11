import express from "express";
import {createUser} from "../controllers/UserController.js";
import {getAllUsers} from "../controllers/UserController.js";
import { getUser } from "../controllers/UserController.js";
import {updateUser} from "../controllers/UserController.js";
import {deleteUser}  from "../controllers/UserController.js";
import { loginUser } from "../controllers/UserController.js";

const userRouter = express.Router();


userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);


export default userRouter