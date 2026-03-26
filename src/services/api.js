const BASE_URL= "http://127.0.0.1:8000"; 

export const submitDoubt = async (title, description) => {
  try {
    // I manually joined the strings to avoid backtick issues for you
    const res = await fetch(BASE_URL + "/submit-doubt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Failed to submit");
    }

    return await res.json();
  } catch (err) {
    console.error("Submit Doubt Error:", err);
    throw err;
  }
};
export const getDoubts = async () => {
  try {
    const res = await fetch(BASE_URL + "/doubts");
    if (!res.ok) throw new Error("Failed to fetch doubts");
    return await res.json();
  } catch (err) {
    console.error("Get Doubts Error:", err);
    throw err;
  }
};

export const upvoteDoubt = async (doubtId) => {
  try {
    const res = await fetch(BASE_URL + "/doubts/" + doubtId + "/upvote", {
      method: "POST",
    });
    if (!res.ok) throw new Error("Vote failed");
    return await res.json();
  } catch (err) {
    console.error("Upvote Error:", err);
    throw err;
  }
};
