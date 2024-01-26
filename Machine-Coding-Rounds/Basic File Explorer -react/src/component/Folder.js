import { useState } from "react";

const Folder = ({ explorer }) => {
  const [expand, setExpand] = useState(false);
  if (explorer.isFolder) {
    return (
      <div>
        <span onClick={() => setExpand(!expand)}>📂{explorer.name}</span>
        <br />
        <div style={{ display: expand ? "block" : "none", paddingLeft: 20 }}>
          {explorer.items.map((exp) => {
            return <Folder key={exp.id} explorer={exp} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span>
        📄{explorer.name}
        <br />
      </span>
    );
  }
};

export default Folder;
