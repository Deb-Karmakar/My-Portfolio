// components/About.jsx

// 1. Import your profile image
import profileImage from "../assets/profile.jpg";

const About = () => (
  <section id="about" className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I’m a Full Stack Developer and lifelong learner passionate about
            crafting impactful digital solutions. With expertise in the MERN
            stack, I build scalable applications that blend frontend design,
            backend systems, and AI integration. Constantly exploring new
            tools and technologies, I aim to combine creativity and
            functionality to deliver meaningful user experiences.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Beyond coding, I enjoy experimenting with new technologies,
            participating in hackathons and open source projects, and sharing
            knowledge within the developer community. For me, every project is
            an opportunity to combine creativity, functionality, and innovation.
          </p>
        </div>
        <div className="relative flex justify-center">
          {/* 2. Add a container for the image and its glow effect */}
          <div className="relative">
            {/* This div creates the blurred, glowing, animated ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 blur opacity-75 animate-pulse"></div>

            {/* Your profile image, with 'relative' to ensure it sits on top */}
            <img
              src={profileImage}
              alt="A picture of the site owner, Debajyoti Karmakar"
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover shadow-2xl shadow-primary/20 border-4 border-slate-700"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
