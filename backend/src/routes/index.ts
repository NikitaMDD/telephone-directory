import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import locationRoutes from "./location.routes.js";
import departmentRoutes from "./department.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/locations", locationRoutes);
router.use("/departments", departmentRoutes);

export default router;