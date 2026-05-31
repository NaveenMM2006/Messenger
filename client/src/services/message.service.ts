import api from "./api";

export const getMessages = async (
  channelId: string
) => {
  const response = await api.get(
    `/messages/${channelId}`
  );

  return response.data;
};

export const sendMessage = async (
  content: string,
  channelId: string
) => {
  const response = await api.post(
    "/messages",
    {
      content,
      channelId,
    }
  );

  return response.data;
};