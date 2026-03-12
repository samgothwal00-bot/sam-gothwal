import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, User, Briefcase, Layout, BookOpen, Mail, 
  Facebook, Twitter, Instagram, Linkedin, Pin,
  Moon, Sun, Menu, X, Settings, Save, Edit3, Layers, Palette
} from 'lucide-react';
import { cn } from './lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio', icon: Layout },
  { id: 'blogs', label: 'Blogs', icon: BookOpen },
  { id: 'contact', label: 'Contact Me', icon: Mail },
];

const socialIcons = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Pin, href: '#' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => {
        setContent({
          hero: {
            name: "Sergio Gadot",
            title: "Passionate Designer",
            description: "I design and build beautiful, functional websites and online stores that help businesses grow and succeed in the digital world."
          },
          about: {
            heading: "I'm a Freelancer Front-end Developer with over 3 years of experience.",
            description: "I specialize in creating interactive and responsive user interfaces using modern technologies. My goal is to deliver high-quality code that provides an exceptional user experience.",
            stats: [
              { label: "Projects Completed", value: "5k+" },
              { label: "Satisfied Clients", value: "3k+" }
            ]
          }
        });
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  if (!content) return <div className="h-screen flex items-center justify-center bg-[#0a0a0c] text-primary text-xl font-bold tracking-widest animate-pulse">SAM.</div>;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 flex",
      isDarkMode ? "bg-[#0a0a0c] text-white" : "bg-gray-50 text-gray-900"
    )}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-inherit border-b border-white/10">
        <span className="text-xl font-bold tracking-tighter">SAM<span className="text-primary">.</span></span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-72 z-40 transition-transform duration-300 lg:translate-x-0 border-r border-white/10",
        isDarkMode ? "bg-[#0a0a0c]" : "bg-white",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-8">
          <div className="flex flex-col items-center mb-12">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
              <img 
                src="https://picsum.photos/seed/sam-profile/300/300" 
                alt="Sam" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-2xl font-black tracking-widest uppercase">Sergiobi</h2>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeSection === item.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "hover:bg-primary/10 hover:text-primary"
                )}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="flex justify-center gap-4 mb-8">
              {socialIcons.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-center text-xs opacity-50">© 2026 Sam Portfolio</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen relative transition-all duration-300">
        {/* Floating Controls */}
        <div className="fixed top-6 right-6 z-50 flex gap-3">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md text-inherit shadow-lg hover:scale-110 transition-transform"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Sections */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24 space-y-32">
          {/* Hero Section */}
          <section id="home" className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6"
            >
              <h3 className="text-primary font-medium tracking-widest uppercase">Hello, I am</h3>
              <h1 className="text-6xl lg:text-8xl font-black leading-tight">{content.hero.name}</h1>
              <h2 className="text-2xl lg:text-3xl font-light opacity-80">I Am <span className="text-primary font-medium">{content.hero.title}</span></h2>
              <p className="text-lg opacity-60 max-w-lg">
                {content.hero.description}
              </p>
              <button className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                Download CV
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative w-72 h-72 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-8 border-white/5 z-10">
                <img 
                  src="https://picsum.photos/seed/sergio-hero/800/800" 
                  alt="Sergio" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-full -z-10"></div>
            </motion.div>
          </section>

          {/* About Me Section */}
          <section id="about" className="space-y-12">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">About Me<span className="text-primary">.</span></h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
                  >
                    <img 
                      src={`https://picsum.photos/seed/about-${i}/400/400`} 
                      alt="About" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-bold leading-tight">
                  {content.about.heading}
                </h3>
                <p className="text-lg opacity-60">
                  {content.about.description}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {content.about.stats.map((stat: any, i: number) => (
                    <div key={i}>
                      <span className="text-4xl font-black text-primary block">{stat.value}</span>
                      <span className="text-sm uppercase tracking-widest opacity-60">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/80 transition-colors">Contact Me</button>
                  <button className="px-8 py-3 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-colors">Portfolio</button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Education & Skills */}
          <section className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Education</h2>
              <div className="space-y-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/10 pl-8">
                {[
                  { title: "Graphic Designer", institution: "International Design Institute" },
                  { title: "Web Development", institution: "International Design Institute" },
                  { title: "Search Engine Optimization", institution: "International Design Institute" }
                ].map((edu, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-primary border-4 border-[#0a0a0c]"></div>
                    <h4 className="text-xl font-bold text-primary">{edu.title}</h4>
                    <p className="opacity-60">{edu.institution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Skills</h2>
              <div className="space-y-8">
                {[
                  { name: "HTML5", p: 95 },
                  { name: "WordPress", p: 85 },
                  { name: "Magento", p: 70 },
                  { name: "UI/UX", p: 90 }
                ].map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between font-bold">
                      <span>{skill.name}</span>
                      <span>{skill.p}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.p}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center">Experience<span className="text-primary">.</span></h2>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white/5 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl">
                    W
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">Front-end Developer</h4>
                    <p className="text-primary font-medium">WeLab | Remote | Jan 2019 – Present</p>
                    <p className="mt-4 opacity-60">
                      Developed and maintained complex web applications using React, Next.js, and Tailwind CSS. Collaborated with cross-functional teams to deliver high-quality products.
                    </p>
                  </div>
                  <div className="px-6 py-2 bg-primary/10 text-primary rounded-full font-bold text-sm">
                    Full Time
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center">What I Do?<span className="text-primary">.</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Web Design", desc: "Creating visually stunning and user-friendly website designs." },
                { title: "Web Development", desc: "Building robust and scalable web applications." },
                { title: "SEO Marketing", desc: "Optimizing content to rank higher in search results." },
                { title: "UI/UX Design", desc: "Designing intuitive interfaces for better user experience." },
                { title: "Digital Marketing", desc: "Promoting brands through various digital channels." },
                { title: "Branding", desc: "Developing unique brand identities for businesses." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                    <Briefcase size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                  <p className="opacity-60">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center">My Portfolio<span className="text-primary">.</span></h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['All', 'Branding', 'Photoshop', 'Fashion', 'Product'].map((filter, i) => (
                <button 
                  key={i}
                  className={cn(
                    "px-6 py-2 rounded-full font-bold transition-all",
                    i === 0 ? "bg-primary text-white" : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden"
                >
                  <img 
                    src={`https://picsum.photos/seed/portfolio-${i}/600/450`} 
                    alt="Portfolio" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">Project Title</h4>
                    <p className="text-white/80 uppercase tracking-widest text-sm">Branding</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center">Testimonials<span className="text-primary">.</span></h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-white/5 p-10 rounded-3xl relative">
                  <div className="absolute -top-6 left-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-4xl font-serif">"</div>
                  <p className="text-lg italic opacity-80 mb-8">
                    "Working with Sergio was an absolute pleasure. His attention to detail and creative vision brought our project to life in ways we hadn't imagined."
                  </p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      alt="Client" 
                      className="w-14 h-14 rounded-full border-2 border-primary"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-bold">John Doe</h5>
                      <p className="text-sm text-primary">CEO, TechFlow</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Section */}
          <section id="blogs" className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center">Latest Blog<span className="text-primary">.</span></h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 rounded-3xl overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/blog-${i}/800/450`} 
                      alt="Blog" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                      <span>March 12, 2026</span>
                      <span>•</span>
                      <span>Design</span>
                    </div>
                    <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">The Future of Web Design in 2026</h4>
                    <p className="opacity-60 line-clamp-2">
                      Explore the latest trends and technologies shaping the web design landscape this year...
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center">Get In Touch<span className="text-primary">.</span></h2>
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hello@sergio.com" },
                  { icon: Home, label: "Address", value: "123 Design St, Creative City" },
                  { icon: Briefcase, label: "Phone", value: "+1 234 567 890" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-3xl flex items-center gap-6">
                    <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold uppercase tracking-widest opacity-60">{item.label}</h5>
                      <p className="font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-2 bg-white/5 p-10 rounded-3xl">
                <form className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                  />
                  <textarea 
                    placeholder="Message" 
                    rows={5}
                    className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                  <button className="md:col-span-2 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/80 transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="h-96 rounded-3xl overflow-hidden border border-white/10 grayscale invert opacity-50 hover:opacity-100 transition-opacity">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153166!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1625061545631!5m2!1sen!2sau" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </section>
        </div>
      </main>
    </div>
  );
}
