import { Router } from "express";

import { exportController } from "../controllers/export.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/pdf",
    authMiddleware,
    exportController.pdf
);

export default router;