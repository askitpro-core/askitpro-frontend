const BASE_URL = "http://127.0.0.1:8000";


// ✅ Submit doubt (correct schema)
export const submitDoubt = async (text, sessionId) => {
  const res = await fetch(BASE_URL + "/submit-doubt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      author_name: "Anonymous",
      room_code: sessionId,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Submit failed");
  }

  return await res.json();
};


// ✅ Get doubts (FIXED — ALWAYS RETURNS ARRAY)
export const getDoubts = async (sessionId) => {
  const res = await fetch(
    BASE_URL + "/doubts?room_code=" + sessionId
  );

  if (!res.ok) throw new Error("Fetch failed");

  const data = await res.json();

  // 🔥 HANDLE BOTH BACKEND FORMATS
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.doubts)) return data.doubts;

  return [];
};