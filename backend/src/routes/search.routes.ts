import { Router } from "express";

import { searchController } from "../controllers/search.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", searchController.search);

export default router;