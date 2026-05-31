type Channel = {
  id: string;
  name: string;
};

type Props = {
  channels: Channel[];
  selectedChannel: string;
  onSelect: (id: string) => void;
};

const ChannelSidebar = ({
  channels,
  selectedChannel,
  onSelect,
}: Props) => {

  return (
    <div className="w-64 bg-zinc-800 p-4">

      <h2 className="text-white mb-4">
        Channels
      </h2>

      {channels.map((channel) => (

        <button
          key={channel.id}
          onClick={() =>
            onSelect(channel.id)
          }
          className={`
            block
            w-full
            text-left
            p-2
            rounded
            mb-2
            text-white
            ${
              selectedChannel === channel.id
                ? "bg-blue-600"
                : "bg-zinc-700"
            }
          `}
        >
          # {channel.name}
        </button>

      ))}

    </div>
  );
};

export default ChannelSidebar;