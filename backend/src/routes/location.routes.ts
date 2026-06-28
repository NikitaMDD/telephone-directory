import { Router } from "express";

import { locationController } from "../controllers/location.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    locationController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    locationController.getById
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    locationController.create
);

router.patch(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    locationController.update
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    locationController.remove
);

export default router;