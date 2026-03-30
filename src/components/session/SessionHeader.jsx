import { useState } from "react";
import { MdVideocam, MdContentCopy, MdCheck } from "react-icons/md";

function SessionHeader() {
  const livecode = "ABC123";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(livecode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = livecode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-6 flex items-start">
        {/* session header */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          {/* left section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <MdVideocam className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight">
                Live Session
              </h1>
              <p className="text-xs text-white/55">
                Share this code with your students
              </p>
            </div>
          </div>

          {/* right side */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden">
              <span className="px-4 py-2 text-xs font-medium text-white/50 uppercase tracking-wide">
                Code
              </span>
              <span className="px-4 py-2 text-lg font-mono font-bold tracking-[0.25em] text-pink-300 border-l border-white/15">
                {livecode}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 active:scale-95"
              }`}
            >
              {copied ? (
                <>
                  <MdCheck className="text-base" />
                  Copied
                </>
              ) : (
                <>
                  <MdContentCopy className="text-base" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionHeader;
