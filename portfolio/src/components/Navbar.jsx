import { useState, useEffect } from 'react';
import logoImage from '../assets/DK logo.png';

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-2' 
        : 'py-4'
    }`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-500 ${
        isScrolled 
          ? 'rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20' 
          : 'rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25'
      }`}>
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-indigo-500/8 via-purple-500/8 to-pink-500/8"></div>
        
        {/* Main navbar container with fixed height */}
        <div className="relative h-16 flex justify-between items-center">
          
          <a href="#home">
            {/* The logo size is now increased without affecting the navbar height */}
            <img 
              src={logoImage} 
              alt="DK Logo" 
              className="h-40 transition-transform duration-300 hover:scale-110" 
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <li key={item} className="relative group">
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={`relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 rounded-xl overflow-hidden ${
                    activeSection === item.toLowerCase() 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 rounded-xl backdrop-blur-sm">
                      <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{item}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-white/10"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center space-y-1">
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 shadow-sm ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 shadow-sm ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-4 h-0.5 bg-white transition-all duration-300 shadow-sm ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-8 rounded-xl bg-gray-900/95 border border-gray-700 overflow-hidden shadow-2xl z-40">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10"></div>
            <div className="relative p-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-4 rounded-xl font-medium transition-all duration-300 text-base mb-2 last:mb-0 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-gradient-to-r from-indigo-500/30 to-purple-600/30 text-white border border-indigo-400/30 shadow-lg'
                      : 'text-gray-100 hover:bg-gray-800/70 hover:text-white hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;