import api from "./api";

export const getChannels = async (
  workspaceId: string
) => {

  const response =
    await api.get(
      `/channels/${workspaceId}`
    );

  return response.data;
};