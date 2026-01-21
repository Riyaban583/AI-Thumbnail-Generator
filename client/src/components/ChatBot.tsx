import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      text: "👋 Hi! I'm your AI assistant powered by Gemini. How can I help you today?",
      timestamp: new Date()
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const robot = "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [open, isMinimized]);

  useEffect(() => {
    if (!open && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "bot") {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setUnreadCount(0);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage, timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          text: data.reply || "I apologize, but I couldn't generate a response. Please try again.",
          timestamp: new Date()
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          text: "⚠️ Unable to connect to the server. Please ensure the backend is running on port 3000.",
          timestamp: new Date()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: "bot", 
        text: "👋 Hi! I'm your AI assistant powered by Gemini. How can I help you today?",
        timestamp: new Date()
      },
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes typing {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.8), 0 0 40px rgba(168, 85, 247, 0.6); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
          border-radius: 10px;
        }
        
        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4338ca, #6d28d9);
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .message-bubble-user {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
          overflow: hidden;
        }
        
        .message-bubble-user::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .message-bubble-user:hover::before {
          left: 100%;
        }
        
        .message-bubble-bot {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
          border: 1px solid #e0e7ff;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), 0 0 20px rgba(99, 102, 241, 0.15);
        }
      `}</style>

      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 shadow-2xl hover:scale-110 transition-all duration-300 group animate-glow"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-75 group-hover:opacity-100 blur-md"></div>
        <div className="relative flex items-center justify-center h-full w-full rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <img 
            src={robot} 
            className="h-10 w-10 group-hover:rotate-12 transition-transform duration-300 filter drop-shadow-lg animate-float" 
            alt="AI Assistant"
          />
        </div>
        {!open && unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce shadow-lg">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>

      {open && (
        <div 
          className={`fixed bottom-24 right-6 z-50 w-96 rounded-3xl glass-morphism shadow-2xl overflow-hidden transition-all duration-300 border border-white/20 ${
            isMinimized ? 'h-16' : 'h-[550px]'
          }`}
          style={{
            animation: 'slideIn 0.3s ease-out',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="relative flex justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-4 text-white overflow-hidden">
            <div className="absolute inset-0 shimmer-effect opacity-30"></div>
            <div className="relative flex items-center gap-3">
              <div className="relative">
                <div className="h-2.5 w-2.5 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 h-2.5 w-2.5 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide">🤖 Gemini Assistant</span>
                <span className="text-xs text-white/80">Always here to help</span>
              </div>
            </div>
            <div className="relative flex gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 rounded-lg p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                <span className="text-sm">{isMinimized ? '▲' : '▼'}</span>
              </button>
              <button 
                onClick={clearChat}
                className="hover:bg-white/20 rounded-lg p-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                title="Clear chat"
              >
                🗑️
              </button>
              <button 
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 rounded-lg px-2.5 py-2 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              >
                ✖
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div 
                className="h-[380px] overflow-y-auto p-5 space-y-4 text-sm bg-gradient-to-b from-slate-50 via-white to-indigo-50/30 chat-scrollbar"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                  >
                    <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${
                          msg.role === "user"
                            ? "message-bubble-user text-white rounded-br-md"
                            : "message-bubble-bot text-gray-800 rounded-bl-md"
                        }`}
                      >
                        <div className="break-words leading-relaxed">{msg.text}</div>
                      </div>
                      <div 
                        className={`text-xs mt-1.5 px-2 ${
                          msg.role === "user" ? "text-indigo-400" : "text-gray-400"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="message-bubble-bot rounded-2xl rounded-bl-md px-5 py-4 shadow-lg">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ animation: 'typing 1.4s infinite', animationDelay: '0s' }}></div>
                        <div className="h-2.5 w-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ animation: 'typing 1.4s infinite', animationDelay: '0.2s' }}></div>
                        <div className="h-2.5 w-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ animation: 'typing 1.4s infinite', animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2 border-t border-indigo-100 bg-white/80 backdrop-blur-sm p-4">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="flex-1 rounded-2xl border-2 border-gray-200 px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-0 focus:border-indigo-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed input-glow bg-white/90"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {loading ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      '📤'
                    )}
                  </span>
                  <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></div>
                </button>
              </div>

              <div className="flex gap-2 px-4 pb-4 overflow-x-auto bg-gradient-to-b from-white/80 to-transparent">
                <button
                  onClick={() => setInput("Tell me about blockchain")}
                  className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 rounded-full whitespace-nowrap transition-all duration-200 border border-indigo-200 hover:border-indigo-300 hover:shadow-md hover:scale-105"
                >
                  💡 About Blockchain
                </button>
                <button
                  onClick={() => setInput("How does attendance work?")}
                  className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 rounded-full whitespace-nowrap transition-all duration-200 border border-purple-200 hover:border-purple-300 hover:shadow-md hover:scale-105"
                >
                  📋 Attendance Info
                </button>
                <button
                  onClick={() => setInput("Help me get started")}
                  className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-pink-50 to-indigo-50 hover:from-pink-100 hover:to-indigo-100 text-pink-700 rounded-full whitespace-nowrap transition-all duration-200 border border-pink-200 hover:border-pink-300 hover:shadow-md hover:scale-105"
                >
                  🚀 Get Started
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}