import { Response , Request } from "express";

import { AuthRequest }
from "../../../middlewares/auth.middleware";

import { createMessage, getChannelMessages}
from "../services/message.service";

import { getIO }
from "../../../sockets";

export const sendMessage = async (
  req: AuthRequest,
  res: Response
) => {

  const {
    content,
    channelId,
  } = req.body;

  const message =
    await createMessage(
      content,
      req.user.userId,
      channelId
    );

  getIO().to(channelId).emit(
    "new-message",
    message
  );

  res.status(201).json({
    success: true,
    message,
  });

};

export const getMessages = async (
  req: Request,
  res: Response
) => {

  const { channelId } = req.params;

  const messages =
    await getChannelMessages(channelId);

  res.json({
    success: true,
    messages,
  });

};