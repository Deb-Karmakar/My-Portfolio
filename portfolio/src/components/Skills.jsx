// components/Skills.jsx

import { useState } from 'react'; // 1. Import useState
import { FaAws } from 'react-icons/fa';
import { 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiPython, 
  SiDocker, 
  SiGraphql, 
  SiMongodb 
} from 'react-icons/si';

// Expanded skills list to better demonstrate the "Show More" feature
const skillsList = [
  { name: 'React', icon: <SiReact /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
];

const Skills = () => {
  // 2. Add state to manage visibility
  const [showAll, setShowAll] = useState(false);

  // 3. Determine which skills to display based on state
  const skillsToDisplay = showAll ? skillsList : skillsList.slice(0, 4);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
        </div>
        
        {/* The grid now maps over the dynamically sliced array */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skillsToDisplay.map((skill) => (
            <div 
              key={skill.name} 
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 text-center group transition-all duration-300 hover:bg-slate-700/50 hover:-translate-y-2"
            >
              <div className="text-5xl text-slate-300 w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:text-white group-hover:scale-110">
                {skill.icon}
              </div>
              <h3 className="text-white font-semibold">{skill.name}</h3>
            </div>
          ))}
        </div>

        {/* 4. Add the "Show More" / "Show Less" button */}
        {skillsList.length > 4 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-slate-700/50 btn btn-outline text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-primary hover:text-white"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;