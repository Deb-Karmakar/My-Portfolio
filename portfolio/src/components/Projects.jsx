import { useState } from 'react'; // 1. Import useState for managing state

// 2. Import your project images
import ZeroBite from '../assets/projects/ZeroBite.jpg'; // Assuming you have this image


// 3. Import icons
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';

// 4. Update your data with the real project and new 'date' field
const projectsData = [
  {
    id: 1,
    title: 'ZeroBite: Smart Surplus Food Redistribution',
    description: 'An AI-powered MERN stack application designed to combat campus food waste by redistributing surplus meals to students and NGOs. Features include AI freshness prediction using the Gemini API, a gamified rewards system with multilingual support and a volunteer logistics network.',
    image: ZeroBite,
    tags: ['React', 'Node.js', 'MongoDB', 'Google Gemini API', 'Google Maps API', 'Cloudinary', 'i18next'],
    githubLink: 'https://github.com/Deb-Karmakar/Smart-Surplus-App', // Add your real link
    liveLink: 'https://zerobite-y4i8.onrender.com/', // Add your real link
    date: 'August 2025',
  },
  
];

const Projects = () => {
  // 5. State to manage whether all projects are shown
  const [showAll, setShowAll] = useState(false);

  // Logic to determine which projects to display
  const projectsToShow = showAll ? projectsData : projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
        </div>
        
        {/* 6. Conditional rendering for the grid */}
        <div className={
          projectsData.length === 1 
            ? 'flex justify-center' // Center if only one project
            : 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' // Grid for multiple projects
        }>
          {projectsToShow.map((project) => (
            <div 
              key={project.id} 
              className={`bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 ${projectsData.length === 1 ? 'max-w-lg' : ''}`}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col">
                {/* 7. Date Created Tag */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <FaCalendarAlt />
                  <span>{project.date}</span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-auto">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    <FaGithub /> Code
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    <FaExternalLinkAlt /> Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 8. "Show More" Button */}
        {projectsData.length > 3 && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-outline"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;