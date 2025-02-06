import { Router } from "express";
import { getUser } from "../controllers/tutorController";

const router = Router();

router.get("/", getUser);

export default router;
