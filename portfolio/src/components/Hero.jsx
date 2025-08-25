import { FaDownload } from "react-icons/fa"; // 1. Import the download icon

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-center px-4 relative"
    >
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-[clamp(3rem,8vw,6rem)] font-extrabold leading-tight mb-4 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text animate-fadeInUp"
          style={{ animationFillMode: "both" }}
        >
          Debajyoti Karmakar
        </h1>
        <p
          className="text-[clamp(1.2rem,4vw,2rem)] text-text-muted mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          Creative Developer & Problem Solver
        </p>
        <p
          className="text-lg max-w-xl mx-auto mb-12 animate-fadeInUp"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          I craft digital solutions by blending web development, UI/UX, and AI
          integration—building scalable applications that merge creativity,
          functionality, and intelligent automation{" "}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>

          {/* 2. Add the new Download CV button */}
          <a
            href="/Debajyoti_Karmakar_CV.pdf" // The path to your CV in the public folder
            download="Debajyoti_Karmakar_CV.pdf" // This prompts the browser to download the file
            className="btn btn-frosted flex items-center justify-center gap-2"
          >
            <FaDownload />
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
