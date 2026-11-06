import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Asterisk, BrainCircuit, Check, ChevronLeft, ChevronRight, Code2, Cpu, Github, Globe2, Linkedin, Mail, Menu, MoveUpRight, Sparkles, Terminal, X } from 'lucide-react'
import ProjectCard from './components/ProjectCard'
import { projects, skillGroups } from './data/projects'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'journey', 'contact']
const filters = ['All', 'Web Development', 'AI / ML', 'Mobile Apps', 'Networking', 'IoT & Robotics']
const navSections = [
  { label: 'Home', index: 0, href: '#home', num: '00' },
  { label: 'About', index: 1, href: '#about', num: '01' },
  { label: 'Skills', index: 2, href: '#skills', num: '02' },
  { label: 'Projects', index: 3, href: '#projects', num: '03' },
  { label: 'Journey', index: 4, href: '#journey', num: '04' },
  { label: 'Contact', index: 5, href: '#contact', num: '05' },
]

// Custom Vector Logo Mark (Dhwani Sound Waves + Stylized 'V' in Theme Blue)
export function DhwaniEmblem({ size = 42, className = '' }) {
  return (
    <svg
      viewBox="42 16 172 224"
      width={size}
      height={size * (224 / 172)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`dhwani-emblem ${className}`}
      aria-label="Dhwani Vyas Emblem Mark"
    >
      <defs>
        <linearGradient id="dhwaniBlueGrad" x1="77" y1="177" x2="204" y2="47" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* Semicircular Sound Waves (Dhwani) */}
      <path d="M 60 22 A 106 106 0 0 1 60 234" stroke="var(--emblem-arc-4, #cbd5e1)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60 48 A 80 80 0 0 1 60 208" stroke="var(--emblem-arc-3, #94a3b8)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 60 74 A 54 54 0 0 1 60 182" stroke="var(--emblem-arc-2, #64748b)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 60 100 A 28 28 0 0 1 60 156" stroke="var(--emblem-arc-1, #1e293b)" strokeWidth="4.5" strokeLinecap="round" />

      {/* Vertical 'D' Stem */}
      <line x1="60" y1="38" x2="60" y2="218" stroke="var(--emblem-stem, #0f172a)" strokeWidth="7" strokeLinecap="round" />

      {/* Dynamic Stylized 'V' in Aesthetic Theme Blue */}
      <path d="M 77 86 L 86 97 L 126 160 L 187 79 L 183 83 L 129 177 Z" fill="url(#dhwaniBlueGrad)" />

      {/* Floating Accent Dot */}
      <circle cx="204" cy="47" r="5.8" fill="url(#dhwaniBlueGrad)" />
    </svg>
  )
}

function SectionLabel({ number, children }) { return <div className="section-label"><span>{number}</span><i/>{children}</div> }
function Reveal({ children, delay = 0, className = '' }) { return <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div> }

function Header({ activeIndex, onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-left">
        <span className="header-tagline">CSE (IoT) · PORTFOLIO</span>
      </div>

      <a
        className="brand-logo-center"
        href="#home"
        onClick={(e) => { e.preventDefault(); onNavClick(0, true); }}
        aria-label="Dhwani Vyas home"
      >
        <DhwaniEmblem size={40} />
      </a>

      <div className="header-right">
        <a
          className="header-cta"
          href="#contact"
          onClick={(e) => { e.preventDefault(); onNavClick(5, true); }}
        >
          LET'S TALK <MoveUpRight size={14}/>
        </a>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X/> : <Menu/>}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {navSections.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={activeIndex === item.index ? 'active' : ''}
                onClick={() => { setMenuOpen(false); onNavClick(item.index, true); }}
              >
                <span>{item.num} {item.label}</span>
                <ArrowUpRight size={16}/>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function VerticalNav({ activeIndex, onNavClick }) {
  return (
    <nav className="vertical-left-nav" aria-label="Section navigation">
      <div className="vertical-nav-track" aria-hidden="true" />
      {navSections.map((item) => {
        const isActive = activeIndex === item.index
        return (
          <a
            key={item.label}
            href={item.href}
            className={`vertical-nav-item ${isActive ? 'is-active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              onNavClick(item.index, true)
            }}
            title={item.label}
          >
            <span className="vertical-nav-dot" />
            <span className="vertical-nav-num">{item.num}</span>
            <span className="vertical-nav-text">{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}

function Hero({ onNavClick }) {
  const [typed, setTyped] = useState(0)
  const roles = ['FULL-STACK WEB DEVELOPMENT', 'AI / MACHINE LEARNING', 'DATA-DRIVEN APPLICATIONS']
  useEffect(() => { const id = setInterval(() => setTyped((v) => (v + 1) % roles.length), 3000); return () => clearInterval(id) }, [])

  return (
    <section id="home" className="hero porsche-hero">
      <div className="hero-topline">
        <span>DHWANI VYAS <i>/</i> DEVELOPER PORTFOLIO</span>
        <span><i className="status-dot"/> OPEN TO INTERNSHIP & PROJECT OPPORTUNITIES</span>
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <motion.div className="hero-kicker" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12 }}>
            <span className="kicker-star"><Asterisk size={15}/></span> COMPUTER SCIENCE & ENGINEERING · IoT
          </motion.div>
          <motion.div className="hero-name" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .18 }}>
            <span className="hero-name-first">Dhwani</span><span className="hero-name-last"> Vyas</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .3 }}>
            Building for the web.<br/><span className="headline-serif">Thinking with AI.</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>
            I develop <span className="hero-field-tag">Full-Stack Web</span> applications and explore <span className="hero-field-tag">AI / ML</span> to turn ideas into useful digital experiences.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>
            <a className="button button-dark" href="#projects" onClick={(e) => { e.preventDefault(); onNavClick(3, true); }}>
              EXPLORE MY WORK <ArrowUpRight size={16}/>
            </a>
            <a className="text-link" href="#about" onClick={(e) => { e.preventDefault(); onNavClick(1, true); }}>
              ABOUT ME <ArrowDownRight size={16}/>
            </a>
          </motion.div>
        </div>
        <Reveal className="hero-console">
          <div className="console-top">
            <span><i/> <i/> <i/></span>
            <small>DHVANI / BUILD.LOG</small>
            <span>2026</span>
          </div>
          <div className="console-content">
            <div className="console-overline">CURRENT FOCUS</div>
            <AnimatePresence mode="wait">
              <motion.div className="console-role" key={typed} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>
                {roles[typed]}
              </motion.div>
            </AnimatePresence>
            <div className="console-rule"/>
            <div className="console-line"><span>01</span><b>Design</b><small>Interfaces with purpose</small></div>
            <div className="console-line"><span>02</span><b>Develop</b><small>Scalable web experiences</small></div>
            <div className="console-line"><span>03</span><b>Discover</b><small>Patterns through machine learning</small></div>
            <div className="console-bottom"><span>STATUS</span><b><i/> BUILDING & LEARNING</b></div>
          </div>
          <div className="console-side">WEB · AI · DATA</div>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <div className="hero-role">
          <span className="role-label">SPECIALISING IN</span>
          <AnimatePresence mode="wait">
            <motion.span key={typed} className="role-value" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>
              {roles[typed]}
            </motion.span>
          </AnimatePresence>
        </div>
        <a href="#about" className="scroll-cue" onClick={(e) => { e.preventDefault(); onNavClick(1, true); }}>
          SCROLL TO EXPLORE <ArrowDown size={15}/>
        </a>
        <span className="hero-location">GUJARAT · INDIA</span>
      </div>
    </section>
  )
}

function About({ onNavClick }) {
  return (
    <section id="about" className="about-section section-pad">
      <div className="section-wrap">
        <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
        <div className="about-layout">
          <Reveal className="about-heading">
            <h2>Curious by nature.<br/><span className="serif-accent">Practical by</span><br/>design.</h2>
            <div className="about-asterisk">✳</div>
          </Reveal>
          <Reveal delay={.12} className="about-copy">
            <p className="about-lead">I'm a Computer Science & Engineering student specialising in <b>Internet of Things</b> at G.H. Patel College of Engineering & Technology.</p>
            <p>My primary interests are full-stack web development and AI/ML. I enjoy turning ideas into useful products — from building responsive interfaces and backend workflows to exploring machine learning models and data-driven applications.</p>
            <p>My IoT and robotics projects give me a broader engineering perspective, but my focus is on software that solves clear, real-world problems.</p>
            <a href="#contact" className="underlined-link" onClick={(e) => { e.preventDefault(); onNavClick(5, true); }}>
              HAVE A PROJECT IN MIND? <ArrowUpRight size={15}/>
            </a>
          </Reveal>
        </div>
        <div className="about-facts">
          <div><span>01 / EDUCATION</span><b>B.Tech · CSE (IoT)</b><small>GCET, Anand</small></div>
          <div><span>02 / INTERESTS</span><b>Web Development · AI/ML</b><small>Building software products</small></div>
          <div><span>03 / APPROACH</span><b>Learn by building</b><small>Curiosity-led problem solving</small></div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const icons = { code: Code2, globe: Globe2, brain: BrainCircuit, cpu: Cpu, wrench: Terminal }
  return (
    <section id="skills" className="skills-section section-pad">
      <div className="section-wrap">
        <SectionLabel number="02">THE TOOLKIT</SectionLabel>
        <div className="section-heading-row">
          <Reveal>
            <h2>Tools for turning <span className="serif-accent">ideas into products.</span></h2>
          </Reveal>
          <p>My strongest interests sit at the intersection<br/>of web engineering and applied AI.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon]
            return (
              <Reveal key={group.title} delay={i * .06} className="skill-card">
                <div className="skill-card-head">
                  <span className="skill-icon"><Icon size={19}/></span>
                  <span>0{i + 1}</span>
                </div>
                <h3>{group.title}</h3>
                <div className="skill-tags">
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </Reveal>
            )
          })}
        </div>
        <div className="skills-note">
          <Sparkles size={16}/>
          <span>Always learning. Always adding another tool to the toolbox.</span>
        </div>
      </div>
    </section>
  )
}

function Projects({ onOpen }) {
  const [filter, setFilter] = useState('All')
  const sliderRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.type === filter)

  const updateScrollState = () => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
    const maxScroll = scrollWidth - clientWidth
    setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0)
  }

  const handleScroll = (direction) => {
    if (!sliderRef.current) return
    const step = sliderRef.current.clientWidth > 640 ? 410 : sliderRef.current.clientWidth * 0.85
    const amount = direction === 'left' ? -step : step
    sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
    updateScrollState()
  }, [filter])

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    updateScrollState()
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [filtered])

  return (
    <section id="projects" className="projects-section section-pad">
      <div className="section-wrap">
        <SectionLabel number="03">SELECTED WORK</SectionLabel>
        <div className="section-heading-row projects-heading">
          <Reveal>
            <h2>Built to solve.<br/><span className="serif-accent">Made to matter.</span></h2>
          </Reveal>
          <p>Web applications, machine learning experiments<br/>and engineering projects — each with a practical purpose.</p>
        </div>

        <div className="project-controls">
          <div className="filter-list">
            {filters.map((f) => (
              <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
                {f}<span>{f === 'All' ? projects.length : projects.filter((p) => p.type === f).length}</span>
              </button>
            ))}
          </div>

          <div className="project-controls-right">
            <span className="project-count">SHOWING {String(filtered.length).padStart(2, '0')} PROJECTS</span>
            <div className="slider-nav-buttons">
              <button 
                type="button"
                className={`slider-nav-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous project"
              >
                <ChevronLeft size={17} />
              </button>
              <button 
                type="button"
                className={`slider-nav-btn ${!canScrollRight ? 'is-disabled' : ''}`}
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next project"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        <div className="projects-horizontal-wrapper">
          <div 
            ref={sliderRef}
            className="projects-horizontal-track"
            tabIndex={0}
            role="region"
            aria-label="Horizontal scrollable projects list"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={onOpen}/>
            ))}
          </div>
          <div className="projects-progress-bar" aria-hidden="true">
            <div className="projects-progress-fill" style={{ width: `${Math.max(6, scrollProgress)}%` }} />
          </div>
        </div>

        <div className="projects-bottom">
          <div className="scroll-hint">
            <span className="scroll-indicator-dot" />
            <span>SWIPE OR USE ARROWS TO SCROLL PROJECTS HORIZONTALLY</span>
          </div>
          <a href="https://github.com/DhwaniVyas" target="_blank" rel="noreferrer" className="underlined-link">
            FIND ME ON GITHUB <ArrowUpRight size={15}/>
          </a>
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="journey-section section-pad">
      <div className="section-wrap">
        <SectionLabel number="04">THE JOURNEY SO FAR</SectionLabel>
        <div className="journey-layout">
          <Reveal>
            <h2>Learning is<br/>the <span className="serif-accent">constant.</span></h2>
            <p className="journey-intro">A foundation in computing, a curiosity for connected technology, and plenty left to explore.</p>
          </Reveal>
          <div className="timeline">
            <Reveal className="timeline-item">
              <span className="timeline-index">01</span>
              <div>
                <span className="timeline-date">CURRENT / UNDERGRADUATE</span>
                <h3>B.Tech — Computer Science & Engineering (IoT)</h3>
                <p>G.H. Patel College of Engineering & Technology, Anand</p>
                <div className="timeline-tags"><span>Internet of Things</span><span>Robotics Minor</span></div>
              </div>
              <span className="timeline-status"><i/> IN PROGRESS</span>
            </Reveal>
            <Reveal delay={.1} className="timeline-item">
              <span className="timeline-index">02</span>
              <div>
                <span className="timeline-date">HANDS-ON LEARNING</span>
                <h3>Projects & technical exploration</h3>
                <p>Developing full-stack applications, exploring machine-learning workflows and applying software engineering to practical problems.</p>
                <div className="timeline-tags"><span>TaskFlow</span><span>FormulaX</span><span>Stock Prediction</span></div>
              </div>
              <span className="timeline-status">ONGOING</span>
            </Reveal>
            <Reveal delay={.2} className="timeline-item">
              <span className="timeline-index">03</span>
              <div>
                <span className="timeline-date">NEXT CHAPTER</span>
                <h3>Internships & real-world engineering</h3>
                <p>Looking to contribute to meaningful software and applied AI projects while learning from strong engineering teams.</p>
                <div className="timeline-tags"><span>AI / ML</span><span>Software Development</span></div>
              </div>
              <span className="timeline-status">LOOKING AHEAD</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact({ onNavClick }) {
  const email = 'sounddiametre47@gmail.com'
  const phone = '7043735330'
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="section-wrap">
        <SectionLabel number="05">HAVE SOMETHING IN MIND?</SectionLabel>
        <div className="contact-main">
          <Reveal>
            <p className="contact-kicker"><span/> OPEN TO INTERESTING OPPORTUNITIES</p>
            <h2>Let's build<br/><span className="serif-accent">what's next.</span></h2>
          </Reveal>
          <Reveal delay={.12} className="contact-aside">
            <p>Have a project, an opportunity, or want to talk about web development and AI? Reach out.</p>
            <a className="contact-email" href={`mailto:${email}`}>{email} <ArrowUpRight size={18}/></a>
            <a className="phone-link" href={`tel:+91${phone}`}>+91 {phone}</a>
          </Reveal>
        </div>
        <div className="contact-footer">
          <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); onNavClick(0, true); }}>
            <DhwaniEmblem size={28} />
            <span>DHWANI VYAS <i>/</i> PORTFOLIO</span>
          </a>
          <div className="social-links">
            <a href="https://github.com/DhwaniVyas" target="_blank" rel="noreferrer"><Github size={17}/> GITHUB <ArrowUpRight size={12}/></a>
            <a href="https://www.linkedin.com/in/dhwani-vyas-13gm17/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LINKEDIN <ArrowUpRight size={12}/></a>
            <a href={`mailto:${email}`}><Mail size={17}/> EMAIL <ArrowUpRight size={12}/></a>
            <a href={`tel:+91${phone}`}>☎ PHONE <ArrowUpRight size={12}/></a>
          </div>
          <span className="copyright">© 2026 DHWANI VYAS · ENGINEERING PORTFOLIO</span>
        </div>
      </div>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="project-modal"
            initial={{ opacity: 0, y: 24, scale: .985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: .985 }}
            transition={{ duration: .25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} project details`}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close project details"><X/></button>
            <div className="modal-visual">
              <img src={project.image} alt={project.imageAlt}/>
              <span>{project.number} / {project.category}</span>
            </div>
            <div className="modal-content">
              <span className="eyebrow">{project.type.toUpperCase()}</span>
              <h2>{project.name}</h2>
              <h4>PROJECT OVERVIEW</h4>
              <p>{project.details}</p>
              <h4>REAL-WORLD APPLICATION</h4>
              <p>{project.realWorldUse}</p>
              <h4>KEY HIGHLIGHTS</h4>
              <ul>{project.highlights.map((h) => <li key={h}><Check size={15}/>{h}</li>)}</ul>
              <h4>TECH STACK</h4>
              <div className="tag-row modal-tags">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
              <div className="modal-actions">
                {project.github ? (
                  <a className="button button-dark" href={project.github} target="_blank" rel="noreferrer">
                    VIEW SOURCE <Github size={16}/>
                  </a>
                ) : (
                  <span className="modal-note">Project link can be added here</span>
                )}
                {project.demo && (
                  <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">
                    LIVE DEMO <ArrowUpRight size={15}/>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSection, setActiveSection] = useState(0)
  const isLockedRef = useRef(false)
  const lockTimerRef = useRef(null)

  // Fluid section transition: updates active section index and locks during slide
  const goToSection = (index, force = false) => {
    if (index < 0 || index >= SECTIONS.length) return
    if (!force && isLockedRef.current) return

    isLockedRef.current = true
    setActiveSection(index)

    clearTimeout(lockTimerRef.current)
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false
    }, 850)
  }

  // Wheel listener: One scroll moves to next section and stays stuck there smoothly
  useEffect(() => {
    const handleWheel = (e) => {
      if (selectedProject) return
      // If user is scrolling horizontally, do not intercept
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      // Prevent continuous unbuffered scroll
      e.preventDefault()

      if (isLockedRef.current) return
      if (Math.abs(e.deltaY) < 14) return

      if (e.deltaY > 0) {
        goToSection(activeSection + 1)
      } else if (e.deltaY < 0) {
        goToSection(activeSection - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeSection, selectedProject])

  // Keyboard navigation: Arrow keys & PageDown/PageUp glide section-by-section
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) return
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        goToSection(activeSection + 1)
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        goToSection(activeSection - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToSection(0, true)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToSection(SECTIONS.length - 1, true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, selectedProject])

  // Touch navigation: vertical swipe triggers smooth section glide
  useEffect(() => {
    let startY = 0
    let startX = 0

    const onTouchStart = (e) => {
      if (selectedProject) return
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const onTouchEnd = (e) => {
      if (selectedProject || isLockedRef.current) return
      const endY = e.changedTouches[0].clientY
      const endX = e.changedTouches[0].clientX
      const diffY = startY - endY
      const diffX = startX - endX

      // Ignore horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY)) return

      if (Math.abs(diffY) > 32) {
        if (diffY > 0) {
          goToSection(activeSection + 1)
        } else {
          goToSection(activeSection - 1)
        }
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [activeSection, selectedProject])

  // Sync hash on section change
  useEffect(() => {
    const id = SECTIONS[activeSection]
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }, [activeSection])

  // Support direct initial URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const idx = SECTIONS.indexOf(hash)
    if (idx !== -1) {
      setActiveSection(idx)
    }
  }, [])

  return (
    <>
      <Header activeIndex={activeSection} onNavClick={(i) => goToSection(i, true)}/>
      <VerticalNav activeIndex={activeSection} onNavClick={(i) => goToSection(i, true)}/>
      <div className="sections-wrapper">
        <main
          className="sections-track"
          style={{ transform: `translate3d(0, -${activeSection * 100}vh, 0)` }}
        >
          <Hero onNavClick={(i) => goToSection(i, true)}/>
          <About onNavClick={(i) => goToSection(i, true)}/>
          <Skills/>
          <Projects onOpen={setSelectedProject}/>
          <Journey/>
          <Contact onNavClick={(i) => goToSection(i, true)}/>
        </main>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)}/>
    </>
  )
}
