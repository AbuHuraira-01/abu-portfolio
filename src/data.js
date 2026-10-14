// All portfolio content lives here. Edit this file to update the site.

export const PROFILE = {
  name: 'Abu Huraira',
  role: 'Frontend & MERN Stack Developer',
  location: 'Karachi, Pakistan',
  email: 'ahuraira0835@gmail.com',
  phone: '+92 314 0288048',
  whatsapp: 'https://wa.me/923140288048',
  // Add your links here when ready, e.g. 'https://github.com/username'
  github: '',
  linkedin: '',
};

export const PROJECTS = [
  {
    id: 'mern',
    title: 'Full-Stack MERN App',
    kind: 'Web app · MERN course',
    wire: 'app',
    lang: 'js',
    file: 'routes/auth.js',
    summary:
      'A full-stack application with a React frontend, an Express REST API and a MongoDB database, built end to end.',
    points: [
      'REST API with JWT authentication, input validation and structured error handling',
      'Mongoose schemas with relationships and indexing for fast queries',
      'React UI built with hooks, state management and API integration',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    code: `// routes/auth.js
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.matches(req.body.password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});`,
  },
  {
    id: 'design-system',
    title: 'Figma Design System',
    kind: 'UI/UX · Component library',
    wire: 'system',
    lang: 'jsx',
    file: 'Button.jsx',
    summary:
      'A reusable component set in Figma, designed so every variant maps one to one onto a React component.',
    points: [
      'Buttons, inputs, toggles and chips built with auto layout and variants',
      'Visual hierarchy, Gestalt principles and accessible color contrast applied throughout',
      'Clean developer handoff: Figma variant names match component props',
    ],
    tags: ['Figma', 'Auto layout', 'Variants', 'Accessibility'],
    code: `// Button.jsx  (props mirror the Figma variants)
export function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button className={\`btn btn--\${variant} btn--\${size}\`} {...props}>
      {children}
    </button>
  );
}

// Figma:  Button / variant=primary, size=md
<Button variant="primary" size="md">Get started</Button>`,
  },
  {
    id: 'shopify',
    title: 'Shopify Store Operations',
    kind: 'E-commerce · Store manager',
    wire: 'store',
    lang: 'js',
    file: 'daily-routine.js',
    summary:
      'Ran the day-to-day side of an online store, from new orders to product listings and customer messages.',
    points: [
      'Processed and fulfilled customer orders accurately and on time',
      'Kept product listings up to date and answered customer queries',
    ],
    tags: ['Shopify', 'E-commerce', 'Customer support'],
    code: `// daily-routine.js  (how I ran the store, written as code)
for (const order of todaysOrders) {
  verify(order.payment);
  pack(order.items);
  fulfill(order, { notifyCustomer: true });
}

reply(customerQueries);
update(productListings);`,
  },
  {
    id: 'frontend',
    title: 'Responsive Web Pages',
    kind: 'Frontend · Aptech',
    wire: 'landing',
    lang: 'css',
    file: 'styles.css',
    summary:
      'Responsive, user-friendly pages built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, versioned with Git.',
    points: [
      'Layouts that adapt cleanly from desktop down to phone',
      'Code managed with Git and published on GitHub',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
    code: `/* Responsive card grid */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 600px) {
  .hero h1 { font-size: 2rem; }
  .nav { display: none; }
}`,
  },
];

export const SKILL_GROUPS = [
  {
    id: 'frontend',
    name: 'Frontend',
    items: [
      { name: 'React', note: 'MERN course: component-driven interfaces with hooks, state management and API integration.' },
      { name: 'JavaScript', note: 'Used across the Aptech frontend course and the MERN stack program.' },
      { name: 'HTML5', note: 'Semantic, responsive page structure in the Aptech frontend course.' },
      { name: 'CSS3', note: 'Responsive layouts with Flexbox, Grid and media queries.' },
      { name: 'Bootstrap', note: 'Fast responsive layouts in the Aptech frontend course.' },
      { name: 'jQuery', note: 'DOM interactions and effects in early frontend projects.' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Database',
    items: [
      { name: 'Node.js', note: 'Server side of the MERN stack program.' },
      { name: 'Express.js', note: 'REST APIs with JWT authentication, input validation and error handling.' },
      { name: 'MongoDB', note: 'Schema design, indexing and efficient querying.' },
      { name: 'Mongoose', note: 'Data models with relationships for scalable apps.' },
      { name: 'REST APIs', note: 'Designed and built the API layer that the React frontend talks to.' },
    ],
  },
  {
    id: 'design',
    name: 'Design & Tools',
    items: [
      { name: 'Figma', note: 'Wireframes, high-fidelity prototypes and design systems with auto layout and variants.' },
      { name: 'Git & GitHub', note: 'Version control on every project since the Aptech course.' },
      { name: 'Shopify', note: 'Managed store operations as Shopify Store Manager, 10/2025 to 01/2026.' },
    ],
  },
  {
    id: 'soft',
    name: 'Soft Skills',
    items: [
      { name: 'Communication', note: 'Talked with donors and supporters during the TCF Baghbaan summer internship.' },
      { name: 'Teaching', note: 'Explaining ideas clearly, one step at a time.' },
      { name: 'Time Management', note: 'Balancing ICS studies with courses, work and volunteering.' },
      { name: 'Patience', note: 'Useful for teaching, and for debugging.' },
    ],
  },
];

// Ordered oldest to newest; the site shows newest first.
export const HISTORY = [
  {
    title: 'UI/UX Design & Product Prototyping',
    org: 'Self-paced online program',
    dates: '03/2024 – 04/2025',
    type: 'Learning',
    note: 'User research, wireframing, prototyping and design systems in Figma.',
  },
  {
    title: 'Frontend Web Development',
    org: 'Aptech Computer Education, North Nazimabad',
    dates: '08/2024 – 12/2024',
    type: 'Learning',
    note: 'HTML5, CSS3, JavaScript, Bootstrap, jQuery, Git and GitHub.',
  },
  {
    title: 'MERN Stack Web Development',
    org: 'Self-paced online program',
    dates: '10/2024 – 12/2025',
    type: 'Learning',
    note: 'MongoDB, Express, React and Node.js, from API to deployed app.',
  },
  {
    title: 'Intermediate (ICS)',
    org: 'Government National College, Karachi',
    dates: '08/2025 – Present',
    type: 'Learning',
    current: true,
    note: 'Computer science track, currently in progress.',
  },
  {
    title: 'Shopify Store Manager',
    org: 'E-commerce store',
    dates: '10/2025 – 01/2026',
    type: 'Work',
    note: 'Order processing, product listings and customer queries.',
  },
  {
    title: 'Volunteer, Baghbaan Summer Intern',
    org: 'The Citizens Foundation (TCF)',
    dates: '07/2026 – 09/2026',
    type: 'Volunteering',
    note: 'Fundraising and community outreach with the internship team.',
  },
];
