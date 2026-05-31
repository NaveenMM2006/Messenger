import prisma from "../../../config/prisma";

export const createMessage = async (
  content: string,
  senderId: string,
  channelId: string
) => {

  return prisma.message.create({
    data: {
      content,
      senderId,
      channelId,
    },

    include: {
      sender: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

};

export const getChannelMessages = async (
  channelId: string
) => {

  return prisma.message.findMany({
    where: {
      channelId,
    },

    include: {
      sender: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });

};