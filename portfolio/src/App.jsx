import { useState, useEffect } from 'react'; // 1. Add useState
import { useParticleEffects } from './hooks/useParticleEffects';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot'; // 2. Import the Chatbot component
import { FaCommentDots } from 'react-icons/fa'; // 3. Import an icon for the button

import './App.css';

function App() {
  // Activate the particle effects
  useParticleEffects();
  // 4. Add state to manage if the chatbot is open or closed
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    // You can remove the bg-slate-900 and min-h-screen if your global styles in index.css handle it
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* 5. Add the floating button to toggle the chat */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
          aria-label="Toggle Chat"
        >
          <FaCommentDots size={24} />
        </button>
      </div>

      {/* 6. Conditionally render the Chatbot component */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
}

export default App;