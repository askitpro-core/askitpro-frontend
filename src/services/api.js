const BASE_URL = "http://127.0.0.1:8000";


// ✅ Submit doubt
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


// ✅ Get doubts
export const getDoubts = async (sessionId) => {
  const res = await fetch(
    BASE_URL + "/doubts?room_code=" + sessionId
  );

  if (!res.ok) throw new Error("Fetch failed");

  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.doubts)) return data.doubts;

  return [];
};


// ✅ 🔍 Search
export const searchDoubts = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "/search?query=" + encodeURIComponent(query)
    );

    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.results)) return data.results;

    return [];
  } catch (err) {
    console.error("Search API error:", err);
    return [];
  }
};


// ✅ 🧠 Cluster Summary
export const getClusterSummary = async (clusterId) => {
  try {
    const res = await fetch(
      BASE_URL + `/cluster-summary?cluster_id=${clusterId}`
    );

    if (!res.ok) throw new Error("Summary failed");

    const data = await res.json();

    return data?.summary || "";
  } catch (err) {
    console.error("Summary error:", err);
    return "";
  }
};