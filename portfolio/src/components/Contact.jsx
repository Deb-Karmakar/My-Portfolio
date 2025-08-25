import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { title: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/in/debajyoti-karmakar7/" },
  { title: "GitHub", icon: <FaGithub />, href: "https://github.com/Deb-Karmakar" },
  { title: "X", icon: <FaXTwitter />, href: "https://x.com/thedebkarma" },
  {
    title: "Email",
    icon: <FaEnvelope />,
    href: "mailto:debkarma97@gmail.com?subject=Contact%20from%20your%20Portfolio",
  },
];

const Contact = () => {
  const [status, setStatus] = useState("Send Message");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const domainBlocklist = [
    'example.com', 'test.com', 'mailinator.com', 'temp-mail.org', '10minutemail.com',
  ];

  const validateEmail = (emailToValidate) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(String(emailToValidate).toLowerCase())) {
      return { isValid: false, message: "Please enter a valid email address format." };
    }
    const domain = emailToValidate.split('@')[1];
    if (domainBlocklist.includes(domain)) {
      return { isValid: false, message: "This email domain is not allowed." };
    }
    return { isValid: true, message: "" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = validateEmail(email);
    if (!validationResult.isValid) {
      setEmailError(validationResult.message);
      return;
    }
    setEmailError("");
    setStatus("Sending...");
    
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/meoljvrb", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("Message Sent!");
        e.target.reset();
        setEmail("");
        setTimeout(() => setStatus("Send Message"), 4000);
      } else {
        setStatus("Error! Try Again");
        setTimeout(() => setStatus("Send Message"), 4000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Error! Try Again");
      setTimeout(() => setStatus("Send Message"), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <SectionTitle>Let's Work Together</SectionTitle>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-text-muted mb-8">
          I'm always excited to take on new challenges. Whether you have a specific idea or just want to connect, I'd love to hear from you!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <input type="text" name="name" placeholder="Name" required className="form-input" />
          <div>
            <input
              type="email"
              name="_replyto"
              placeholder="Email"
              required
              className="form-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <input type="text" name="subject" placeholder="Subject" required className="form-input" />
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            required
            className="form-input resize-none" // <-- This class disables resizing
          ></textarea>
          <button
            type="submit"
            className={`w-full btn btn-primary transition-colors duration-300 ${
              status === "Message Sent!" ? "bg-green-500" : ""
            }`}
            disabled={status !== "Send Message"}
          >
            {status}
          </button>
        </form>
        <div className="flex justify-center gap-4 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              title={link.title}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-bg-card border border-white/10 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-1"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;