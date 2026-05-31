import { useState } from "react";

type Props = {
  onSend: (content: string) => void;
};

const MessageInput = ({
  onSend,
}: Props) => {

  const [content, setContent] =
    useState("");

  const handleSend = () => {

    if (!content.trim())
      return;

    onSend(content);

    setContent("");
  };

  return (

    <div className="p-4 bg-zinc-900">

      <div className="flex gap-2">

        <input
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Type message..."
          className="flex-1 p-2 rounded"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 px-4 rounded text-white"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default MessageInput;