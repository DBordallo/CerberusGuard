import { Router } from "express";
import { createAccount, getAccount, updateAccount, getAccounts, deleteAccount } from "../controllers/Account.controller.js";

const router = Router()

router.get("/", getAccounts);
router.get("/:id", getAccount);
router.post("/", createAccount);
router.put("/:id",  updateAccount);
router.delete("/:id", deleteAccount);

export default router