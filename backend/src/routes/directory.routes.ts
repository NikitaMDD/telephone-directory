import { Router } from "express";

import { directoryController } from "../controllers/directory.controller.js";

const router = Router();

router.get(
    "/",
    directoryController.getDirectory
);

export default router;