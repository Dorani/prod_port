"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Book,
  Code,
  Shield,
  Smartphone,
  Globe,
  Users,
  Check,
  Zap,
  Briefcase,
  Cpu,
} from "lucide-react";
import Image from "next/image";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "mentoring",
        "pricing",
        "learning",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "mentoring", label: "Mentoring" },
    { id: "pricing", label: "Services" },
    { id: "learning", label: "Learning" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    { name: "AI & Machine Learning", level: 90 },
    { name: "Cybersecurity", level: 85 },
    { name: "React", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "Mobile App Development", level: 82 },
    { name: "Algorithms & Data Structures", level: 85 },
    { name: "Technical Coaching", level: 90 },
    { name: "Process Optimization", level: 88 },
    { name: "Mentoring", level: 92 },
  ];

  const pricingPlans = [
    {
      icon: Briefcase,
      title: "FAANG Career Prep",
      price: "$299",
      duration: "per session",
      features: [
        "1-on-1 technical interview coaching",
        "STEM-focused career strategy",
        "Resume and portfolio optimization",
        "Mock interviews with real FAANG questions",
      ],
      cta: "Accelerate Your Career",
    },
    {
      icon: Smartphone,
      title: "Application Development",
      price: "Custom",
      duration: "project-based",
      features: [
        "Full-stack app development",
        "Mobile and web app expertise",
        "UI/UX design consultation",
        "Performance optimization",
      ],
      cta: "Build Your App",
    },
    {
      icon: Cpu,
      title: "AI Optimization",
      price: "$499",
      duration: "per consultation",
      features: [
        "AI model fine-tuning",
        "Machine learning pipeline optimization",
        "AI integration strategies",
        "Performance benchmarking",
      ],
      cta: "Enhance Your AI",
    },
    {
      icon: Zap,
      title: "Process Automation",
      price: "Custom",
      duration: "project-based",
      features: [
        "Internal tool development",
        "Workflow automation",
        "Custom software solutions",
        "Integration with existing systems",
      ],
      cta: "Streamline Your Processes",
    },
  ];

  const CircularNodeGraph = () => {
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [debugInfo, setDebugInfo] = useState("");

    useEffect(() => {
      const updateDimensions = () => {
        const width = Math.min(800, window.innerWidth - 40);
        const height = Math.min(600, window.innerHeight - 200);
        setDimensions({ width, height });
        setDebugInfo(
          `Window: ${window.innerWidth}x${window.innerHeight}, Graph: ${width}x${height}`
        );
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const nodePositions = skills.map((_, index) => {
      const angle = (index / skills.length) * 2 * Math.PI;
      const x =
        dimensions.width / 2 + dimensions.width * 0.35 * Math.cos(angle);
      const y =
        dimensions.height / 2 + dimensions.height * 0.35 * Math.sin(angle);
      return { x, y };
    });

    return (
      <div className="relative w-full h-full" style={{ minHeight: "600px" }}>
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {skills.map((skill, index) => {
            const { x, y } = nodePositions[index];

            return (
              <g key={index}>
                {skills.map((_, i) => {
                  if (i !== index) {
                    const { x: x2, y: y2 } = nodePositions[i];
                    return (
                      <motion.line
                        key={`${index}-${i}`}
                        x1={x}
                        y1={y}
                        x2={x2}
                        y2={y2}
                        stroke="#64ffda"
                        strokeWidth="1"
                        opacity="0.5"
                        animate={{
                          x1: [x, x + 5, x - 5, x],
                          y1: [y, y - 5, y + 5, y],
                          x2: [x2, x2 - 5, x2 + 5, x2],
                          y2: [y2, y2 + 5, y2 - 5, y2],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                      />
                    );
                  }
                  return null;
                })}
                <circle
                  cx={x}
                  cy={y}
                  r={10 + skill.level / 10}
                  fill="#64ffda"
                />
                <text
                  x={x}
                  y={y + 25}
                  textAnchor="middle"
                  fill="#ccd6f6"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {skill.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-0 left-0 text-xs text-[#64ffda]">
          {debugInfo}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0a192f] text-[#8892b0] min-h-screen font-sans">
      <header className="fixed w-full z-50 bg-[#0a192f]/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-[#64ffda] font-bold text-xl">
            Engineer, Mentor, Consultant
          </a>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm hover:text-[#64ffda] transition-colors ${
                  activeSection === item.id ? "text-[#64ffda]" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-[#64ffda]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 right-0 w-64 bg-[#112240] z-50 p-6"
          >
            <button
              className="absolute top-4 right-4 text-[#64ffda]"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
            <nav className="flex flex-col space-y-4 mt-12">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm hover:text-[#64ffda] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] mb-4">
                Software Engineer, Mentor, Consultant
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Empowering through innovation, security, and knowledge sharing
              </p>
              <a
                href="#projects"
                className="inline-flex items-center bg-transparent hover:bg-[#64ffda]/10 text-[#64ffda] font-semibold py-2 px-4 border border-[#64ffda] rounded transition-colors"
              >
                View Projects <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                About Me
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-6 relative w-64 h-64 mx-auto md:mx-0">
                    <Image
                      src="/images/IMG_6563.jpeg"
                      alt="Your Name"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="mb-4">
                    I&apos;m a versatile software engineer with a strong focus
                    on AI, machine learning, and cybersecurity. My passion lies
                    in building innovative solutions that push the boundaries of
                    technology while ensuring robust security measures.
                  </p>
                  <p className="mb-4">
                    From mobile apps to web applications, I&apos;ve honed my
                    skills in various technologies including React, Node.js, and
                    PostgreSQL. My experience spans optimizing technical
                    processes and developing efficient, scalable solutions.
                  </p>
                  <p>
                    Beyond coding, I&apos;m deeply committed to mentoring and
                    technical coaching. I believe in the power of knowledge
                    sharing and community building, always striving to help
                    others grow in their coding journeys.
                  </p>
                </div>
                <div className="bg-[#112240] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">
                    Core Competencies
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {[
                      "AI & Machine Learning",
                      "Cybersecurity",
                      "Full-Stack Development",
                      "Mobile App Creation",
                      "Process Optimization",
                      "Technical Mentoring",
                      "Algorithm Design",
                      "Continuous Learning",
                    ].map((skill) => (
                      <li key={skill} className="flex items-center">
                        <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda]" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Technical Proficiencies
              </h2>
              <div className="flex justify-center items-center">
                <div
                  className="w-full max-w-6xl"
                  style={{ paddingBottom: "10%" }}
                >
                  <CircularNodeGraph />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Featured Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "AI-Powered Phishing Detection",
                    description:
                      "Developed an app leveraging cutting-edge AI to detect and prevent phishing attempts, enhancing cybersecurity measures.",
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile App Development",
                    description:
                      "Created innovative mobile applications focusing on user experience and performance optimization.",
                  },
                  {
                    icon: Globe,
                    title: "Efficient Web Applications",
                    description:
                      "Built and optimized web applications using React, Node.js, and PostgreSQL, improving load times and user interactions.",
                  },
                  {
                    icon: Users,
                    title: "Educator Feedback System",
                    description:
                      "Optimized feedback systems for academic managers and tutors, streamlining performance evaluations through AI-driven insights.",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#112240] p-6 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <project.icon className="h-8 w-8 text-[#64ffda] mb-4" />
                    <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2">
                      {project.title}
                    </h3>
                    <p className="mb-4">{project.description}</p>
                    <a href="#" className="text-[#64ffda] hover:underline">
                      Learn more
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="mentoring" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Mentoring & Coaching
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#0a192f] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">
                    My Approach
                  </h3>
                  <p className="mb-4">
                    As a passionate mentor and technical coach, I focus on
                    empowering individuals to reach their full potential in the
                    tech industry. My approach combines hands-on guidance with
                    fostering independent problem-solving skills.
                  </p>
                  <p>
                    I believe in tailoring my mentoring style to each
                    individual&apos;s needs, whether they&apos;re just starting
                    their coding journey or looking to advance their career in
                    AI and cybersecurity.
                  </p>
                </div>
                <div className="bg-[#0a192f] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#ccd6f6] mb-4">
                    Areas of Guidance
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>
                        Career development in software engineering and AI
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>
                        Technical skill enhancement in various programming
                        languages
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>Project planning and execution strategies</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                      <span>Interview preparation for tech roles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Specialized Services
              </h2>
              <p className="text-xl mb-12 text-center max-w-3xl mx-auto">
                Elevate your tech career or business with tailored services
                designed to meet your specific needs and goals.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#112240] p-6 rounded-lg flex flex-col justify-between"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <plan.icon className="h-12 w-12 text-[#64ffda] mb-4" />
                      <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-2xl font-bold text-[#64ffda] mb-2">
                        {plan.price}
                      </p>
                      <p className="text-sm mb-4">{plan.duration}</p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 text-[#64ffda] mt-1" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center justify-center bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#64ffda]/90 transition-colors w-full"
                    >
                      {plan.cta}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="learning" className="py-20 bg-[#112240]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Continuous Learning
              </h2>
              <p className="mb-8 text-lg">
                I&apos;m a firm believer in lifelong learning. Currently,
                I&apos;m focusing on expanding my knowledge in:
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Code,
                    title: "Advanced Algorithms",
                    description:
                      "Deepening understanding of complex algorithms and their applications",
                  },
                  {
                    icon: Shield,
                    title: "Cutting-edge Cybersecurity",
                    description:
                      "Staying ahead of the latest threats and protection measures",
                  },
                  {
                    icon: Book,
                    title: "AI Research",
                    description:
                      "Exploring the newest developments in artificial intelligence and machine learning",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#0a192f] p-6 rounded-lg text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <item.icon className="h-12 w-12 text-[#64ffda] mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#ccd6f6] mb-2">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-center text-lg">
                Beyond tech, I&apos;m passionate about fitness, reading, and
                always seeking new challenges to broaden my horizons.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#ccd6f6] mb-8">
                Get in Touch
              </h2>
              <p className="mb-8 max-w-2xl">
                Whether you&apos;re looking for a collaborator on an AI project,
                need cybersecurity consulting, or are interested in mentorship
                opportunities, I&apos;m always open to new connections and
                challenges. Let&apos;s create something amazing together or help
                you grow in your tech journey.
              </p>
              <a
                href="mailto:seif.dorani@gmail.com"
                className="inline-flex items-center bg-[#64ffda] text-[#0a192f] font-semibold py-2 px-4 rounded hover:bg-[#64ffda]/90 transition-colors"
              >
                Reach Out <Mail className="ml-2 h-4 w-4" />
              </a>
              <div className="mt-12 flex space-x-6">
                <a
                  href="https://github.com/Dorani"
                  className="text-[#8892b0] hover:text-[#64ffda]"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/seifdorani/"
                  className="text-[#8892b0] hover:text-[#64ffda]"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a192f] py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            Designed & Built by Seif Dorani - Software Engineer, Mentor, and
            Consultant
          </p>
        </div>
      </footer>
    </div>
  );
}
