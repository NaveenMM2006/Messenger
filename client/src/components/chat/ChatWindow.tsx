type Props = {
  messages: any[];
};

const ChatWindow = ({
  messages,
}: Props) => {

  return (
    <div className="flex-1 p-4 overflow-y-auto">

      {messages.map((message) => (

        <div
          key={message.id}
          className="mb-4"
        >

          <div className="font-bold text-white">
            {message.sender.fullName}
          </div>

          <div className="text-zinc-200">
            {message.content}
          </div>

        </div>

      ))}

    </div>
  );
};

export default ChatWindow;