import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import locationRoutes from "./location.routes.js";
import departmentRoutes from "./department.routes.js";
import employeeRoutes from "./employee.routes.js";
import searchRoutes from "./search.routes.js";
import directoryRoutes from "./directory.routes.js";
import userRoutes from "./user.routes.js";
import auditRoutes from "./audit.routes.js";
import exportRoutes from "./export.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/locations", locationRoutes);
router.use("/departments", departmentRoutes);
router.use("/employees", employeeRoutes);
router.use("/search", searchRoutes);
router.use("/directory", directoryRoutes);
router.use("/users", userRoutes);
router.use("/audit", auditRoutes);
router.use("/export", exportRoutes);

export default router;