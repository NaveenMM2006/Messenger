import { Request, Response } from "express";

import {
  createChannel,
  getWorkspaceChannels,
} from "../services/channel.service";

export const create = async (
  req: Request,
  res: Response
) => {

  const {
    name,
    description,
    workspaceId,
  } = req.body;

  const channel = await createChannel(
    name,
    description,
    workspaceId
  );

  res.status(201).json({
    success: true,
    channel,
  });

};

export const getChannels = async (
  req: Request,
  res: Response
) => {

  const { workspaceId } = req.params;

  const channels =
    await getWorkspaceChannels(workspaceId);

  res.json({
    success: true,
    channels,
  });

};