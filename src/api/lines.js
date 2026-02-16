const API_URL = "https://api-node-docker.onrender.com/api";

export const getLines = async () => {
  const res = await fetch(`${API_URL}/lines`);
  if (!res.ok) throw new Error("Error fetching lines");
  return res.json();
};

export const createLine = async (line) => {
  const res = await fetch(`${API_URL}/lines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(line),
  });

  if (!res.ok) throw new Error("Error creating line");
  return res.json();
};

export const editLine = async (id,line) => {
  const res = await fetch(`${API_URL}/lines${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(line),
  });

  if (!res.ok) throw new Error("Error editing line");
  return res.json();
};

export const deleteLine = async (id) => {
  const res = await fetch(`${API_URL}/lines/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error deleting line");
};
