import { useEffect, useState } from "react";
import socket from "../../services/socket";

import WorkspaceSidebar
from "../../components/workspace/WorkspaceSidebar";

import ChannelSidebar
from "../../components/channel/ChannelSidebar";

import { getMyWorkspaces }
from "../../services/workspace.service";

import { getChannels }
from "../../services/channel.service";

import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";

import { getMessages,sendMessage } from "../../services/message.service";


const DashboardPage = () => {

  const [workspaces, setWorkspaces] =
    useState<any[]>([]);

  const [channels, setChannels] =
    useState<any[]>([]);

  const [
    selectedWorkspace,
    setSelectedWorkspace,
  ] = useState("");
  const [messages, setMessages] =
   useState<any[]>([]);
    
  const [
    selectedChannel,
    setSelectedChannel,
  ] = useState("");
  useEffect(() => {

    const loadWorkspaces =
      async () => {

        const data =
          await getMyWorkspaces();

        const ws =
          data.workspaces.map(
            (item: any) =>
              item.workspace
          );

        setWorkspaces(ws);

        if (ws.length > 0) {
          setSelectedWorkspace(
            ws[0].id
          );
        }
      };

    loadWorkspaces();

  }, []);

  useEffect(() => {

    if (!selectedWorkspace)
      return;

    const loadChannels =
      async () => {

        const data =
          await getChannels(
            selectedWorkspace
          );

        setChannels(
          data.channels
        );
        setChannels(data.channels);

        if (data.channels.length > 0) {
        setSelectedChannel(
            data.channels[0].id
        );
        }
      };

    loadChannels();

  }, [selectedWorkspace]);

useEffect(() => {

  if (!selectedChannel)
    return;

  socket.emit(
    "join-channel",
    selectedChannel
  );

  const loadMessages =
    async () => {

      const data =
        await getMessages(
          selectedChannel
        );

      setMessages(
        data.messages
      );
    };

  loadMessages();

}, [selectedChannel]);

useEffect(() => {

  const handleNewMessage =
    (message: any) => {

      setMessages((prev) => {

        const exists =
          prev.some(
            (m) =>
              m.id === message.id
          );

        if (exists)
          return prev;

        return [
          ...prev,
          message,
        ];
      });

    };

  socket.on(
    "new-message",
    handleNewMessage
  );

  return () => {

    socket.off(
      "new-message",
      handleNewMessage
    );

  };

}, []);

const handleSendMessage =
  async (
    content: string
  ) => {

    await sendMessage(
        content,
        selectedChannel
    );
  };

  return (

    <div className="h-screen flex">

      <WorkspaceSidebar
        workspaces={workspaces}
        selectedWorkspace={
          selectedWorkspace
        }
        onSelect={
          setSelectedWorkspace
        }
      />

      <ChannelSidebar
        channels={channels}
        selectedChannel={
            selectedChannel
        }
        onSelect={
            setSelectedChannel
        }
      />

      <div className="flex-1 bg-zinc-700 ">

        <div className="flex flex-col h-full">

  <ChatWindow
    messages={messages}
  />

  {selectedChannel && (

    <MessageInput
      onSend={
        handleSendMessage
      }
    />

  )}

</div>

      </div>

    </div>

  );
};

export default DashboardPage;