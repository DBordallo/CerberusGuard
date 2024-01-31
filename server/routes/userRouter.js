import express from "express";
import { createUser, getAllUsers, getUser, updateUser, deleteUser, getUserByAccountId } from "../controllers/UserController.js";
import verifyToken from "../middlewares/jwtMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { registerSchemas } from "../schemas/auth.schemas.js";

const userRouter = express.Router();

userRouter.post("/", registerSchemas, createUser);
userRouter.get("/", verifyToken, isAdmin, getAllUsers);
userRouter.get("/user/:id", getUser);  // Cambiado para evitar conflicto con la siguiente ruta
userRouter.get("/usrAcc/:id", getUserByAccountId);
userRouter.put("/:id", verifyToken, isAdmin, updateUser);
userRouter.delete("/:id", verifyToken, isAdmin, deleteUser);

export default userRouter;
