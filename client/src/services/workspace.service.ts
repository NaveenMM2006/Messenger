import api from "./api";

export const getMyWorkspaces = async () => {
  const response = await api.get("/workspaces");
  return response.data;
};