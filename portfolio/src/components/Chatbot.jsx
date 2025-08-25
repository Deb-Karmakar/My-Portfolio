import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';

// --- Helper function to generate the detailed instructions for the AI ---
const generateSystemPrompt = () => {
  return `You are Debajyoti Karmakar's AI assistant, a helpful and professional AI assistant for Debajyoti Karmakar's personal portfolio.
    Your purpose is to answer questions about Debajyoti's skills, projects, and experience based ONLY on the information provided below.
    Keep your answers friendly, professional, and concise.

    VERY IMPORTANT FORMATTING RULES:
    - Do NOT use Markdown. Do not use asterisks or underscores for formatting.
    - To emphasize text, wrap it in <b> and </b> tags. For example: "My main skills are <b>React</b> and <b>Node.js</b>."
    - Use simple hyphen bullets (-) for lists. Start each bullet on a new line.

    --- KNOWLEDGE BASE START ---

    About Debajyoti Karmakar:
    - A passionate full-stack developer.
    - Specializes in creating innovative web applications using modern JavaScript technologies.
    - Crafts digital experiences that blend cutting-edge technology with beautiful design.
    - Enjoys exploring new technologies, contributing to open-source projects, and sharing knowledge.

    Skills & Technologies:
    - Frontend: React, Next.js, TypeScript, Tailwind CSS
    - Backend: Node.js, Express.js, GraphQL
    - Databases: MongoDB, PostgreSQL

    Featured Projects:
    - Project 1: ZeroBite - Smart Surplus Food Redistribution. An AI-powered MERN stack app to combat food waste on campus. It uses the Gemini API for AI features, Google Maps for logistics, and has a gamified rewards system.

    Contact Information:
    - GitHub: https://github.com/Deb-Karmakar
    - LinkedIn: https://www.linkedin.com/in/debajyoti-karmakar7/
    - Email: debkarma97@gmail.com. Encourage users to use the contact form on the page for inquiries.

    --- KNOWLEDGE BASE END ---

    Your first message should always be: "Hi there! I'm Debajyoti's AI assistant. Feel free to ask me anything about his skills or projects."
    If you don't know an answer, say: "That's a great question. I don't have that information, but you can reach out to Debajyoti directly using the contact form." Do not invent information.
    `;
};

// --- Helper function to safely render the AI's response HTML ---
const formatResponse = (text) => {
  const sanitizedText = text.replace(/<b>(.*?)<\/b>/g, "<strong>$1</strong>");
  return { __html: sanitizedText };
};


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatHistory = useRef([]); // To keep track of the conversation for the API

  // Effect to scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Effect to initialize the chat with a welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          sender: "ai", 
          text: "Hi there! I'm Debajyoti's AI assistant. Feel free to ask me anything about his skills or projects." 
        },
      ]);
      chatHistory.current = [
        { role: "user", parts: [{ text: generateSystemPrompt() }] },
        { role: "model", parts: [{ text: "Hi there! I'm Debajyoti's AI assistant. Feel free to ask me anything about his skills or projects." }] }
      ];
    }
  }, [isOpen]);


  const handleSend = async () => {
    if (userInput.trim() === "" || isLoading) return;

    const newUserMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Add user message to API history
    chatHistory.current.push({ role: "user", parts: [{ text: userInput }] });
    
    setUserInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key is not configured.");

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

      const payload = { contents: chatHistory.current };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      const aiResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response.";
      
      const newAiMessage = { sender: "ai", text: aiResponseText };
      setMessages((prev) => [...prev, newAiMessage]);
      
      // Add AI response to API history
      chatHistory.current.push({ role: "model", parts: [{ text: aiResponseText }] });

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage = {
        sender: "ai",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-[90px] right-4 sm:right-6 w-[calc(100%-32px)] sm:w-96 h-[60vh] max-h-[500px] bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-[1000] ${
          isOpen ? "translate-y-0 opacity-100 visible" : "translate-y-5 opacity-0 invisible"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-slate-800/60 p-3 rounded-t-2xl flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <FaRobot className="text-primary text-xl" />
            <h3 className="text-md font-semibold text-white">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>

        {/* Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-slate-700/70 text-gray-200 rounded-bl-none"
                }`}
              >
                <p style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={formatResponse(msg.text)} />
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-2">
              <div className="bg-slate-700/70 p-3 rounded-xl rounded-bl-none">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Footer/Input */}
        <div className="flex-shrink-0 p-3 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about my projects..."
            disabled={isLoading}
            className="flex-1 w-full px-4 py-2 text-sm bg-slate-800/50 border border-white/20 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={!userInput.trim() || isLoading}
            className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:bg-gray-500 disabled:scale-100"
          >
            <FaPaperPlane className="text-sm" />
          </button>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 md:right-6 w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center text-3xl z-[999] transition-transform duration-300 hover:scale-110"
        aria-label="Open chatbot"
      >
        <TbMessageChatbot className="h-8 w-8" />
      </button>
    </>
  );
};

export default Chatbot;