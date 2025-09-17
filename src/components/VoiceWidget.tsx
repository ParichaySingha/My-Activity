import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { FaMicrophone, FaPhoneSlash } from 'react-icons/fa';

interface TranscriptMessage {
  role: string;
  text: string;
}

const VoiceWidget: React.FC = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vapiInstance = new Vapi("b6e0c1d6-927a-4df0-a59a-f5546040cce4");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => setIsConnected(true));
    vapiInstance.on("call-end", () => setIsConnected(false));
    vapiInstance.on("message", (msg: any) => {
      if (msg.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          { role: msg.role, text: msg.transcript },
        ]);
      }
    });

    return () => vapiInstance?.stop();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, isChatOpen]);

  const startCall = () => {
    setTranscript([]);
    vapi?.start("382cf2f2-484c-420b-9579-bf115c52ddd2");
  };

  const endCall = () => vapi?.stop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      <div
        className={`
          fixed
          bottom-0
          right-0
          w-full
          max-w-sm
          sm:w-96
          bg-white
          text-black
          rounded-t-2xl
          sm:rounded-xl
          shadow-2xl
          transition-transform
          duration-500
          ease-in-out
          ${
            isChatOpen
              ? "translate-y-0 sm:translate-x-0"
              : "translate-y-full sm:translate-x-full"
          }
          sm:bottom-6 sm:right-6
          flex flex-col
          h-[60vh] sm:h-[500px]
          overflow-hidden
        `}
        style={{ pointerEvents: isChatOpen ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-lg">Voice Assistant</span>
          <button
            onClick={() => {
              setIsChatOpen(false);
              endCall();
            }}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label="End Call"
          >
            <FaPhoneSlash size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50">
          {transcript.length === 0 && (
            <div className="text-gray-400 text-center mt-8">
              Start speaking to begin your conversation.
            </div>
          )}
          {transcript.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`px-4 py-2 rounded-2xl max-w-[80%] break-words ${
                  msg.role === "user"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Microphone Button */}
      {!isChatOpen && (
        <button
          onClick={() => {
            setIsChatOpen(true);
            startCall();
          }}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            bg-teal-600 text-white shadow-lg outline-none
            animate-pulse
            hover:bg-teal-700 transition
            sm:mb-0 mb-4
          `}
          aria-label="Start Voice Chat"
        >
          <FaMicrophone size={28} />
        </button>
      )}
    </div>
  );
};

export default VoiceWidget;
