import prisma from "../../../config/prisma";

export const createChannel = async (
  name: string,
  description: string,
  workspaceId: string
) => {

  return prisma.channel.create({
    data: {
      name,
      description,
      workspaceId,
    },
  });

};

export const getWorkspaceChannels = async (
  workspaceId: string
) => {

  return prisma.channel.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

};