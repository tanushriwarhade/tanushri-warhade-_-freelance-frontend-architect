import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Layout, 
  Palette, 
  Zap, 
  CheckCircle2, 
  Download,
  Moon,
  Sun,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { PROJECTS, SKILLS, TESTIMONIALS, SERVICES, Project, RESUME_URL } from './constants';

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['about', 'skills', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('Hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
        <motion.a 
          href="#" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display font-bold text-xl tracking-tight"
        >
          TANUSHRI<span className="text-brand-primary">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`transition-all hover:opacity-80 relative ${activeSection === link.name ? 'text-brand-primary' : 'hover:text-brand-primary'}`}
            >
              {link.name}
              {activeSection === link.name && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary"
                />
              )}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="bg-brand-primary text-white px-5 py-2 rounded-full font-semibold hover:translate-y-[-2px] transition-all shadow-lg shadow-brand-primary/20">
            Hire Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass p-6 flex flex-col gap-4 border-t border-zinc-200 dark:border-zinc-800"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium py-2">
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="bg-brand-primary text-white text-center py-3 rounded-xl font-bold">
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Section = ({ id, title, subtitle, children, className = "" }: any) => (
  <section id={id} className={`py-24 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-16">
          {subtitle && <p className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-3">{subtitle}</p>}
          {title && <h2 className="text-3xl md:text-5xl font-display font-bold">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  </section>
);

const ProjectGrid = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI', 'SaaS', 'Dashboard'];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <Section id="projects" title="Selected Works" subtitle="Portfolio">
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              filter === cat 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-full flex flex-col"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl aspect-video">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.liveUrl} className="p-3 bg-white text-zinc-900 rounded-full hover:scale-110 transition-transform"><ExternalLink size={20} /></a>
                  <a href={project.githubUrl} className="p-3 bg-white text-zinc-900 rounded-full hover:scale-110 transition-transform"><Github size={20} /></a>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex gap-2 mb-3">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 flex-1">{project.description}</p>
                <button className="flex items-center gap-2 text-sm font-bold group/btn">
                  View Case Study <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <div className="min-h-screen">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 pt-20 overflow-hidden">
        {/* Animated Background Blob */}
        <div className="absolute top-1/4 right-[-10%] w-[50vw] h-[50vw] bg-brand-primary/20 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-1/4 left-[-10%] w-[40vw] h-[40vw] bg-brand-secondary/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              Available for Freelance Opportunities
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight">
              Full-Stack <span className="gradient-text">Developer</span> focused on React, Django & AI.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl leading-relaxed">
              Based in Pune. Specializing in building client-ready SaaS tools, AI-powered dashboards, and modern interfaces with performance optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:translate-y-[-4px] transition-all shadow-2xl shadow-brand-primary/40 flex items-center justify-center gap-2">
                View Projects <ArrowRight size={20} />
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 glass rounded-2xl font-bold text-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2">
                Hire Me
              </a>
            </div>
            
            <div className="mt-16 flex items-center gap-8 opacity-50 overflow-hidden whitespace-nowrap">
               <span className="text-sm font-bold uppercase tracking-widest whitespace-nowrap">Focused on Clean Code & Scalable Solutions</span>
               <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects Completed', value: '25+' },
            { label: 'Happy Clients', value: '10+' },
            { label: 'Experience', value: '1+ Yr' },
            { label: 'Design Fidelity', value: '100%' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <h4 className="text-3xl md:text-5xl font-display font-bold mb-1">{stat.value}</h4>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="Engineering End-to-End Digital Solutions" subtitle="Philosophy">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-primary/20 blur-3xl group-hover:bg-brand-primary/30 transition-colors" />
            <div className="relative glass p-4 rounded-[40px] rotate-[-2deg] group-hover:rotate-0 transition-transform">
              {/* Replace the URL below with your photo URL */}
              <img 
                src="/profile.png" 
                alt="Tanushri Warhade" 
                className="w-full aspect-square object-cover rounded-[32px]"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 italic">"I build end-to-end solutions that bridge the gap between design and functionality."</h3>
            <div className="space-y-6 text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg">
              <p>
                As a freelance developer at <strong>Pin & Paper Tech</strong> and a national hackathon solo developer (IIIT Nagpur), I've honed my ability to ship high-quality products under strict deadlines.
              </p>
              <p>
                My expertise spans from building dynamic UIs with <strong>React</strong> to robust backends with <strong>Django & Python</strong>. Whether it's an AI resume optimizer or an e-commerce price tracker, I focus on performance, SEO, and clean code.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-4">
                {[
                  'B.Sc Physics student, Fergusson College',
                  'National Hackathon Soloist',
                  'AI & SaaS Tool Specialist',
                  'Expert in React-Django Bridge'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                    <CheckCircle2 size={18} className="text-brand-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a 
                href={"https://drive.google.com/file/d/1noKeq6xUzzVAEuweF1htpdyeTwRduHC_/view?usp=sharing"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-2xl font-bold mt-8 hover:scale-105 transition-transform"
              >
                Download Resume <Download size={18} />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Solving Problems with Modern Tools" subtitle="Tech Stack" className="bg-zinc-100 dark:bg-zinc-900/50">
        <div className="grid md:grid-cols-3 gap-12">
          {['Frontend', 'UI/UX', 'Tools'].map((cat) => (
            <div key={cat} className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 flex items-center justify-between underline decoration-brand-primary decoration-4 underline-offset-8">
                {cat} 
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.filter(s => s.category === cat).map((skill) => (
                  <span key={skill.name} className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-xl text-sm font-semibold shadow-sm border border-zinc-200 dark:border-zinc-700 hover:border-brand-primary transition-colors">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <ProjectGrid />

      {/* Services Section */}
      <Section id="services" title="How I Can Help Your Agency" subtitle="Solutions">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, i) => (
            <div key={service.title} className="p-8 glass rounded-3xl hover:bg-brand-primary/5 transition-colors group cursor-default">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                {service.icon === 'Layout' && <Layout size={28} />}
                {service.icon === 'Code2' && <Code2 size={28} />}
                {service.icon === 'Palette' && <Palette size={28} />}
                {service.icon === 'Zap' && <Zap size={28} />}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Ready to start a project?" subtitle="Let's Talk">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-12">
              Currently accepting new freelance projects for Q3/Q4. If you have a Figma file that needs some code magic, I'm your person.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-zinc-500">Contact Details</p>
                  <div className="flex flex-col">
                    <a href="mailto:tanuwarhade@gmail.com" className="text-xl font-bold hover:text-brand-primary transition-colors">tanuwarhade@gmail.com</a>
                    <span className="text-lg text-zinc-500 font-medium">+91 8208885350</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-zinc-500">Professional Profile</p>
                  <a href="https://linkedin.com/in/tanushriwarhade" className="text-xl font-bold hover:text-brand-primary transition-colors">linkedin.com/in/tanushriwarhade</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand-primary">
                  <Github size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-zinc-500">Technical Profile</p>
                  <a href="https://github.com/tanushriwarhade" className="text-xl font-bold hover:text-brand-primary transition-colors">github.com/tanushriwarhade</a>
                </div>
              </div>
            </div>
          </div>
          
          <form 
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              
              try {
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                const result = await res.json();
                if (result.success) {
                  alert(result.message);
                  (e.target as HTMLFormElement).reset();
                }
              } catch (err) {
                console.error(err);
                alert("Failed to send message. Please try again.");
              }
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 px-1">Name</label>
                <input type="text" name="name" required placeholder="Tanushri Warhade" className="w-full glass p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 px-1">Email</label>
                <input type="email" name="email" required placeholder="tanuwarhade@gmail.com" className="w-full glass p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-500 px-1">Project Budget</label>
              <input 
                type="text" 
                name="budget"
                placeholder="e.g. $1,200 or Fixed Price" 
                className="w-full glass p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-500 px-1">Message</label>
              <textarea name="message" required placeholder="Hi Tanushri, I have an interesting project for you..." rows={5} className="w-full glass p-4 rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary transition-all" />
            </div>
            <button type="submit" className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:translate-y-[-4px] transition-all shadow-xl shadow-brand-primary/20">
              Send Message
            </button>
          </form>
        </div>
      </Section>

      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
        <p>© 2026 Tanushri Warhade. Built with React, Tailwind & Motion.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="https://github.com/tanushriwarhade" className="hover:text-brand-primary transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/tanushriwarhade" className="hover:text-brand-primary transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
