import { Router } from "express";

import {
  create,
  getChannels,
} from "../controllers/channel.controller";

import { authenticate }
from "../../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  create
);

router.get(
  "/:workspaceId",
  authenticate,
  getChannels
);

export default router;