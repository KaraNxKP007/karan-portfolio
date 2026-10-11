export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const about = {
  name: "Karan Pratap Singh Rathore",
  tagline: "Software Engineering | AI Engineering | Full-Stack Development",
  bio: "IIT Jodhpur graduate building software products at the intersection of full-stack engineering and AI. My work focuses on turning ideas into production-ready applications — from scalable MERN-stack products to GenAI-powered systems, LLM applications, RAG pipelines, tool-using agents, and agentic workflows built with technologies like LangChain and LangGraph. I have a strong understanding of how modern deep learning and AI systems work and am continuously deep-diving into advanced AI engineering, with a focus on building reliable, useful, and autonomous systems. Beyond writing code, I want to build technology that solves meaningful problems, changes how people interact with software, and ultimately contributes to a better way of how society works.",
  email: "karanpratap1810@gmail.com",
  phone: "+91-7413087071",
  linkedin: "https://linkedin.com/in/karanpratap7",
  github: "https://github.com/KaraNxKP007",
};

export const skills = [
  { name: "React.js", category: "Web" },
  { name: "Node.js", category: "Web" },
  { name: "Express.js", category: "Web" },
  { name: "TypeScript", category: "Web" },
  { name: "JavaScript", category: "Web" },
  { name: "HTML5 / CSS3", category: "Web" },
  { name: "Tailwind CSS", category: "Web" },
  { name: "Python", category: "AI/ML" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "OpenCV", category: "AI/ML" },
  { name: "LLM Integration", category: "AI/ML" },
  { name: "YOLOv8", category: "AI/ML" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "SQL", category: "Database" },
  { name: "Git / GitHub", category: "Tools" },
  { name: "VS Code API", category: "Tools" },
  { name: "Linux Shell", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "C / C++", category: "Tools" },
];

export const experiences = [
  {
    title: "Summer Intern",
    company: "RIL",
    date: "May 2025 - Jul 2025",
    description: [
      "Developed a predictive maintenance model integrating process parameters and sensor data to forecast heat-exchanger fouling.",
      "Reduced unplanned downtime by 20% and improved system reliability.",
    ],
    color: "#23b5da",
  },
  {
    title: "Frontend Developer Intern",
    company: "SharpCareer Technologies",
    date: "Jun 2024 - Jul 2024",
    description: [
      "Designed and implemented a dynamic, responsive hotel booking website, enhancing user experience and accessibility using React.js and bootstrap."
    ],
    color: "#f59e0b",
  },
  {
  title: "Developer",
  company: "IIChE, IIT Jodhpur",
  date: "Aug 2023 – Nov 2024",
  description: [
    "Helped in designing and deploying the official chapter website using HTML/CSS/JS and the React framework, achieving a 50-point improvement in Google Lighthouse performance.",
    "Led UI/UX implementation and feature rollouts for chapter events, delivering a responsive, mobile-friendly platform that increased student engagement.",
    "Onboarded and mentored junior chapter developers on React component design and Git workflows to support ongoing site maintenance.",
  ],
  color: "#c084fc",
},
];

export const projects = [
    {
    name: "PersonaShift – AI-Powered Interview & Career Simulation Platform",
    description:
      "Architected a full-stack AI interview simulation platform featuring real-time transcript streaming, adaptive interviewer personas, speech-based interactions, and post-session performance analytics. Implemented secure authentication and user management with Google OAuth 2.0, email OTP verification, JWT-based authorization, bcrypt password hashing, and Supabase PostgreSQL with role-based access control. Developed an asynchronous ATS resume-parsing and semantic evaluation pipeline using BullMQ, Redis, pdf-parse, and local transformer embedding models to enable scalable background processing and automated resume analysis.",
    tags: ["React.js", "Node.js", "Supabase", "OAuth 2.0", "BullMQ", "Redis"],
    github: "https://drive.google.com/file/d/1y_Vaf_lfMzfbNG_6BkyIvjQ6nI5UMnOh/view?usp=sharing",
    live: "https://drive.google.com/file/d/1y_Vaf_lfMzfbNG_6BkyIvjQ6nI5UMnOh/view?usp=sharing",
    gradient: "from-violet-600 to-fuchsia-500",
  },
  {
    name: "AI Dev Team – Autonomous Multi-Agent Software Generation Platform",
    description:
      "Architected a multi-agent orchestration pipeline using LangGraph, Google Gemini, and Docker to autonomously convert natural-language requirements into deployed, full-stack applications end-to-end. Designed a 5-stage architecture agent and deterministic cross-validator performing schema, API, and dependency integrity checks with zero LLM cost, eliminating false-positive validation loops and cutting redundant model calls by 60%. Built a self-correcting code generation loop (Coder → Reviewer → Executor → Debugger) with tiered failure escalation and git-based rollback, enabling autonomous bug resolution across generated projects without human intervention.",
    tags: ["LangGraph", "Google Gemini", "Docker", "Multi-Agent"],
    github: about.github,
    live: about.github,
    gradient: "from-amber-500 to-rose-500",
  },
  {
    name: "CodeBulb – AI Pilot for VS Code",
    description:
      "A VS Code extension with dual-engine AI (Google Gemini 2.5 Flash + DeepSeek V3) for real-time code generation, debugging, and full-stack project scaffolding. Deployed to VS Code Marketplace (v0.1.2) with a custom WebView Sidebar, Markdown rendering, and secure local key storage.",
    tags: ["TypeScript", "VS Code API", "Gemini AI", "DeepSeek", "Node.js"],
    github: "https://github.com/KaraNxKP007/codebulb",
    live: "https://marketplace.visualstudio.com/items?itemName=KaranPratapio.codebulb",
    gradient: "from-purple-600 to-blue-500",
  },
  {
    name: "TalentBridge – Career Platform",
    description:
      "A full-stack career guidance platform built for featuring job listings, resume parsing, student-recruiter matchmaking, and an AI-powered recommendation engine. Designed with scalable microservices architecture and a real-time notification system.",
    tags: ["React.js", "Node.js", "PostgreSQL", "REST API", "System Design"],
    github: "https://github.com/KaraNxKP007/talentbridge",
    live: "https://karanxkp007.github.io/talentbridge/",
    gradient: "from-blue-600 to-cyan-400",
  },
  {
    name: "Fischer-Yates Algorithm Analyzer",
    description:
      "An interactive Single Page Application to visualize the O(n) Fischer-Yates shuffle using asynchronous JavaScript and CSS transforms for step-by-step DOM animations. Integrated jsPDF with custom Regex sanitization to generate downloadable performance audit reports.",
    tags: ["JavaScript", "CSS3 Animations", "jsPDF", "SPA"],
    github: "https://github.com/KaraNxKP007",
    live: "https://fischer-algorithm-visualizer.netlify.app/",
    gradient: "from-teal-500 to-green-400",
  },
  {
    name: "COVID-19 Chest X-Ray Detection",
    description:
      "An AI-based diagnostic web app using Streamlit and TensorFlow with DenseNet121, achieving 96.2% accuracy and 0.978 AUC-ROC on 40K+ chest X-rays for COVID-19 vs. Normal classification. Built as part of a Machine Learning course project.",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "Streamlit", "NumPy"],
    github: "https://github.com/KaraNxKP007/covid-deploy",
    live: "https://covid-deploy-lfvgaacdplv5cd68aafvkb.streamlit.app/",
    gradient: "from-red-500 to-orange-400",
  },
];

export const achievements = [
  {
    title: "Ranked 2nd in Department",
    description:
      "Academic rank at IIT Jodhpur, Chemical Engineering batch 2022-2026.",
  },
  {
    title: "Coordinator — Career Guidance Cell, IIT Jodhpur",
    description: "May 2024 – Apr 2025. Led career guidance initiatives for the student body.",
  },
  {
    title: "Developer Head — IIChE Student Chapter",
    description: "Sep 2024 – Dec 2024. Led technical development for the chapter.",
  },
];

export const competitions = [
  {
    title: "Amazon ML Challenge 2025",
    type: "Competition",
    result: "Top 1%",
    description: "Smart Product Pricing. Built a 723-feature multimodal pricing model using CLIP, ResNet50, Sentence Transformers. Improved SMAPE from 61% to 35%.",
    tags: ["Python", "Machine Learning", "CLIP", "ResNet50"],
    color: "#f59e0b",
    icon: "🏆",
  },
];