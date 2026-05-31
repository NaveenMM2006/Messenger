import prisma from "../../../config/prisma";

export const createWorkspace = async (
  name: string,
  description: string,
  ownerId: string
) => {

  const workspace = await prisma.workspace.create({
    data: {
      name,
      description,
      ownerId,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: ownerId,
      workspaceId: workspace.id,
      role: "OWNER",
    },
  });

  return workspace;
};

export const getUserWorkspaces = async (
  userId: string
) => {

  return prisma.workspaceMember.findMany({
    where: {
      userId,
    },

    include: {
      workspace: true,
    },
  });

};