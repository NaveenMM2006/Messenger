type Workspace = {
  id: string;
  name: string;
};

type Props = {
  workspaces: Workspace[];
  selectedWorkspace: string;
  onSelect: (id: string) => void;
};

const WorkspaceSidebar = ({
  workspaces,
  selectedWorkspace,
  onSelect,
}: Props) => {

  return (
    <div className="w-20 bg-zinc-900 p-2">

      {workspaces.map((workspace) => (

        <button
          key={workspace.id}
          onClick={() =>
            onSelect(workspace.id)
          }
          className={`
            w-full mb-2 p-3 rounded
            ${
              selectedWorkspace === workspace.id
                ? "bg-blue-600"
                : "bg-zinc-700"
            }
          `}
        >
          {workspace.name[0]}
        </button>

      ))}

    </div>
  );
};

export default WorkspaceSidebar;