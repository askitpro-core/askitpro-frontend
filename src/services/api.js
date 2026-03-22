const BASE_URL = "http://localhost:8000";

export const submitDoubt = async (title, description) => {
  const res = await fetch(`${BASE_URL}/submit-doubt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) throw new Error("Failed to submit");

  return res.json();
};

export const getDoubts = async () => {
  const res = await fetch(`${BASE_URL}/doubts`);

  if (!res.ok) throw new Error("Failed to fetch doubts");

  return res.json();
};