import { Router } from "express";

import { authenticate } from "../../../middlewares/auth.middleware";
import { create, getMyWorkspaces } from "../controllers/workspace.controller";

const router = Router();

router.post("/", authenticate, create);
router.get("/",authenticate,getMyWorkspaces);

export default router;