import { Router } from "express";

import { departmentController } from "../controllers/department.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    departmentController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    departmentController.getById
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.create
);

router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.update
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    departmentController.remove
);

export default router;