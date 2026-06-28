import { Router } from "express";

import { auditController } from "../controllers/audit.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));
router.get("/", auditController.getAll);

export default router;