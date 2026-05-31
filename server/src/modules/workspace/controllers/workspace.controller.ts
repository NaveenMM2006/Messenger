import { Response } from "express";

import { AuthRequest } from "../../../middlewares/auth.middleware";
import { createWorkspace, getUserWorkspaces } from "../services/workspace.service";

export const create = async (
  req: AuthRequest,
  res: Response
) => {

  const { name, description } = req.body;

  const workspace = await createWorkspace(
    name,
    description,
    req.user.userId
  );

  res.status(201).json({
    success: true,
    workspace,
  });
};

export const getMyWorkspaces = async (
  req: AuthRequest,
  res: Response
) => {

  const workspaces = await getUserWorkspaces(
    req.user.userId
  );

  res.json({
    success: true,
    workspaces,
  });

};