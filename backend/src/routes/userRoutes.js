import express from "express";
import { createUser, getUser } from "../controller/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);

export default router;
