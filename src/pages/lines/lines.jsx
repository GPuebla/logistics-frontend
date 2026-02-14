import { useEffect, useState } from "react";
import { getLines, createLine, deleteLine } from "../../api/lines";

function Lines() {
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState("");

  useEffect(() => {
    loadLines();
  }, []);

  const loadLines = async () => {
    const data = await getLines();
    setLines(data);
  };

  const handleCreate = async () => {
    if (!newLine.trim()) return;
    await createLine({ name: newLine });
    setNewLine("");
    loadLines();
  };

  const handleDelete = async (id) => {
    await deleteLine(id);
    loadLines();
  };

  return (
    <div className="page">
      <h1>Lines</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
          placeholder="New line name"
        />
        <button onClick={handleCreate}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line._id}>
              <td>{line.name}</td>
              <td>
                <button onClick={() => handleDelete(line._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lines;
