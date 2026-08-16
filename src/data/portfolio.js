export const personal = {
  name: 'Mayank Madhyani',
  brand: 'ASTRA Studio',
  location: 'Surat, Gujarat, India',
  tagline: "Still figuring it out. Building stuff anyway.",
  status: 'Recently completed Class 12',
  email: 'mayankmadhyani@gmail.com',

  // Placeholders — replace with actual URLs when available
  social: {
    github: { label: 'GitHub', url: null, handle: 'Mayank Madhyani' },
    linkedin: { label: 'LinkedIn', url: null, handle: 'Mayank Madhyani' },
    instagram: { label: 'Instagram', url: null, handle: 'Mayank Madhyani' },
  },
};

export const about = {
  headline: "Class 12 done. Now what?",
  paragraphs: [
    "Scored 80% in Class 10, 90% in Class 12 at Scholar English Academy — then immediately started poking around the internet instead of figuring out my future. That's kind of the plan right now.",
    "I'm interested in how things are built and how people find them. So I started learning web development (mostly by vibing and occasionally breaking things) and digital marketing (because what's the point of building if nobody sees it).",
    "Currently managing the web presence for Shivansh Interior, which means I'm doing real work — just not the kind with a fancy title yet.",
    "When I'm not doing that, I'm collecting Hot Wheels, overthinking Avengers theories, or somewhere in a Minecraft world that I'll never actually finish.",
  ],
  funFact: "My Minecraft world has been 'almost done' for three years.",
};

export const skills = [
  {
    id: 'vibe-coding',
    label: 'Vibe Coding',
    description: 'Building things without fully knowing what I\'m doing — which is fine, actually.',
    level: 'LEARNING',
    levelClass: 'learning',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    icon: '💻',
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing',
    description: 'Making things visible. Understanding audiences. Figuring out why some posts get 3 views.',
    level: 'EXPLORING',
    levelClass: 'exploring',
    tags: ['Social Media', 'Content Strategy', 'SEO Basics'],
    icon: '📡',
  },
  {
    id: 'social-media',
    label: 'Social Media',
    description: 'Managing social presence. Creating content. Not going viral yet, but working on it.',
    level: 'COMFORTABLE',
    levelClass: 'comfortable',
    tags: ['Instagram', 'Content Creation', 'Analytics'],
    icon: '🌐',
  },
  {
    id: 'creative-experiments',
    label: 'Creative Experiments',
    description: 'Building unusual digital things. Mostly for fun. Sometimes they work.',
    level: 'CURRENTLY BUILDING',
    levelClass: 'building',
    tags: ['UI Design', 'Pixel Art', 'Concepts'],
    icon: '🔭',
  },
];

export const projects = [
  {
    id: 'shivansh-interior',
    name: 'Shivansh Interior',
    tagline: 'A real business. A real project. A real deadline.',
    description: 'Handling the digital side of Shivansh Interior — building their web presence from scratch and managing social media. Still in progress, but it\'s live work with actual stakes.',
    role: ['Website Development', 'Social Media Management'],
    status: 'IN PROGRESS',
    statusClass: 'progress',
    links: {
      website: null, // [ COMING SOON ]
      instagram: null, // [ COMING SOON ]
    },
    tags: ['Web Dev', 'Social Media', 'Interior Design'],
    year: '2024–',
    color: 'cyan',
  },
  // Add future projects here — just add a new object to this array
];

export const education = [
  {
    id: 'class-12',
    institution: 'Scholar English Academy',
    level: 'Class 12',
    result: '90%',
    status: 'COMPLETED',
    highlight: true,
  },
  {
    id: 'class-10',
    institution: 'Scholar English Academy',
    level: 'Class 10',
    result: '80%',
    status: 'COMPLETED',
    highlight: false,
  },
];

export const achievements = {
  message: "ACHIEVEMENTS: CURRENTLY LOADING...",
  subtext: "Check back in a few years. Something's definitely compiling.",
  items: [], // Add real achievements here when they happen
};

export const easterEggs = [
  { id: 'minecraft', hint: 'KONAMI_CODE_DETECTED', message: 'creeper.aw.man' },
  { id: 'avengers', hint: 'ASSEMBLE', message: 'Whatever it takes.' },
];
