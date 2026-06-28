import { Router } from "express";

import { employeeController } from "../controllers/employee.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    employeeController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    employeeController.getById
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.create
);

router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.update
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    employeeController.remove
);

export default router;