import { useState } from "react";
import { MdVideocam, MdContentCopy, MdCheck } from "react-icons/md";

function SessionHeader({ sessionId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex items-center justify-between">

      <div className="flex items-center gap-3">
        <MdVideocam />
        <div>
          <h1>Live Session</h1>
          <p className="text-xs text-gray-300">
            Share this code with students
          </p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="bg-pink-500 px-4 py-2 rounded-lg"
      >
        {copied ? "Copied" : sessionId}
      </button>

    </div>
  );
}

export default SessionHeader;
