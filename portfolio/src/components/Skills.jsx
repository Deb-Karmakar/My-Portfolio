// components/Skills.jsx

// 1. Import icons from stable libraries (Font Awesome and Simple Icons)
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

// 2. The updated skills list with the reliable AWS icon
const skillsList = [
  { name: 'React', icon: <SiReact /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'AWS', icon: <FaAws /> }, // Using the stable Font Awesome icon
  { name: 'Docker', icon: <SiDocker /> },
  { name:'GraphQL', icon: <SiGraphql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
];

const Skills = () => (
  <section id="skills" className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {skillsList.map((skill) => (
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
    </div>
  </section>
);

export default Skills;