export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const about = {
  name: "Karan Pratap Singh Rathore",
  tagline: "Full-Stack Developer | GenAI | SDE",
  bio: "Recent B.Tech graduate from IIT Jodhpur, currently preparing for software engineering roles with a strong focus on full-stack development, data structures & algorithms, and GenAI. Skilled in building end-to-end scalable applications — from modern frontend interfaces to robust backend systems and AI-driven tools. Experienced with React, TypeScript, system design, and machine learning, with a growing interest in agentic AI and autonomous systems. Passionate about solving real-world problems and building high-impact, reliable products.",
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
    title: "Freelance Project - Computer Vision",
    company: "Chiral",
    date: "Dec 2025",
    description: [
      "Developed a computer vision model using YOLOv8 and OpenCV to automate the detection, classification, and diameter measurement of microscopic organoids.",
    ],
    color: "#00cea8",
  },
  {
    title: "Frontend Developer Intern",
    company: "SharpCareer Technologies",
    date: "Jun 2024 - Jul 2024",
    description: [
      "Designed and implemented a dynamic, responsive hotel booking website, enhancing user experience and accessibility using React.js and bootstrap."
    ],
    color: "#f59e0b",
  }
];

export const projects = [
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