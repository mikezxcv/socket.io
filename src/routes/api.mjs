import { Router } from "express";
import userRoutes from "./api/user.mjs";

const router = Router();

router.use("/user", userRoutes);

export default router;
