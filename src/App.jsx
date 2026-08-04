import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FileText, Code, Terminal, Globe, Crown, Zap, Smile, Camera, 
  Menu, X, Phone, Mail, MapPin, Bus, HelpCircle 
} from 'lucide-react';

// --- Data definitions matching exact Replit source ---

const technicalEvents = [
  {
    num: "01",
    title: "Paper Presentation",
    icon: <FileText size={24} />,
    category: "Research Showcase",
    participants: "60",
    teamSize: "Team of 2",
    teaser: "Present your original technical papers across domains like AI, Cloud, Cybersecurity, & Web.",
    rules: [
      "Abstract submission in IEEE format before deadline.",
      "Maximum 2 members per team.",
      "8 minutes presentation + 2 minutes Q&A with judges.",
      "Hard copies of abstract and slides must be presented.",
      "Decision of judges is final."
    ],
    organiser: "Dr. S. Kanimozhi, Assoc. Prof., CSE"
  },
  {
    num: "02",
    title: "Coding",
    icon: <Code size={24} />,
    category: "Algorithmic Duel",
    participants: "80",
    teamSize: "Individual",
    teaser: "Solve complex logic puzzles and debug obfuscated code against the clock.",
    rules: [
      "Individual participation only.",
      "Round 1: Debugging & MCQs (20 mins).",
      "Round 2: Algorithmic problem solving (45 mins).",
      "No external reference material or internet allowed.",
      "Decisions of event leads are final."
    ],
    organiser: "Mr. R. Manikandan, Asst. Prof., CSE"
  },
  {
    num: "03",
    title: "Prompt Engineering",
    icon: <Terminal size={24} />,
    category: "Generative AI Sprint",
    participants: "50",
    teamSize: "Individual",
    teaser: "Guide AI models to produce exact target outputs using structured prompts.",
    rules: [
      "Individual entry on designated AI sandboxes.",
      "3 rounds with increasing complexity and token caps.",
      "Pre-saved prompt repositories are strictly barred.",
      "Evaluated on precision, token count, and execution speed.",
      "Final verdict rests with the judge panel."
    ],
    organiser: "Mrs. V. Nithya, Asst. Prof., CSE"
  },
  {
    num: "04",
    title: "Web Technology",
    icon: <Globe size={24} />,
    category: "On-Spot Webcraft",
    participants: "40",
    teamSize: "Team (1 - 2)",
    teaser: "Build responsive, high-impact web interfaces for a secret theme given live.",
    rules: [
      "Theme announced on spot; 2 hours coding duration.",
      "HTML, CSS, JS, React, Tailwind permitted.",
      "Cloned templates or pre-written code forbidden.",
      "Evaluated on UI/UX, responsiveness, and code quality.",
      "Judges decision is final."
    ],
    organiser: "Mr. G. Balaji, Asst. Prof., CSE"
  }
];

const nonTechnicalEvents = [
  {
    num: "01",
    title: "Chess",
    icon: <Crown size={24} />,
    category: "Grandmaster Gambit",
    participants: "40",
    teamSize: "Individual",
    teaser: "Battle on the 64 squares in a rapid elimination tournament.",
    rules: [
      "FIDE blitz rules apply with 5 mins time control.",
      "Knockout brackets followed by final round.",
      "Touch-move rule strictly enforced.",
      "Mobile phones and smartwatches strictly prohibited.",
      "Chief arbiter verdict is final."
    ],
    organiser: "Mr. K. Ramesh, Asst. Prof., CSE"
  },
  {
    num: "02",
    title: "Rapid Rush",
    icon: <Zap size={24} />,
    category: "Minute to Win It",
    participants: "60",
    teamSize: "Team of 2",
    teaser: "Fast-paced physical dexterity and reflex micro-challenges.",
    rules: [
      "Execute mini-tasks within 60 seconds.",
      "Score based on speed and accuracy.",
      "Prop tampering leads to disqualification.",
      "Top scorers qualify for final round.",
      "Event coordinator decision is final."
    ],
    organiser: "Dr. T. Selvam, Asst. Prof., CSE"
  },
  {
    num: "03",
    title: "Meme Creation",
    icon: <Smile size={24} />,
    category: "Digital Satire",
    participants: "35",
    teamSize: "Individual",
    teaser: "Create hilarious tech and college life memes on given templates.",
    rules: [
      "On-spot theme disclosed; 45 mins timeframe.",
      "Any mobile/laptop editing app allowed.",
      "No offensive, political, or NSFW content.",
      "Judged on humour, originality, and relevance to theme."
    ],
    organiser: "Ms. Nandhini R., Asst. Prof., CSE"
  },
  {
    num: "04",
    title: "Photography",
    icon: <Camera size={24} />,
    category: "Campus Theme Hunt",
    participants: "45",
    teamSize: "Individual",
    teaser: "Capture the campus through your lens based on mystery themes.",
    rules: [
      "Individual participation, mobile or DSLR both allowed.",
      "Two themes announced at the start of the event.",
      "Photos must be shot live on campus during the slot.",
      "Basic cropping allowed; heavy editing is not permitted.",
      "Judged on composition, theme fit, and originality."
    ],
    organiser: "Mr. Bala Murugan, Asst. Prof., CSE"
  }
];

// --- Matrix Rain Background Canvas Component ---
const MatrixCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    let columns = Math.ceil(canvas.width / fontSize);
    let drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? '#EF4444' : '#DC2626';
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="matrix-canvas" />;
};

// --- Stat Box Component ---
const StatBox = ({ end, label, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 2000, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <div className="stat-box" ref={ref}>
      <div className="num">
        {count < 10 && end < 10 ? `0${count}` : count}
        {suffix}
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
};

// --- Event Card 3D Flip Component ---
const EventCard = ({ event, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="event-card-wrapper"
    >
      <motion.div
        className="event-card"
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setFlipped(!flipped);
          }
        }}
        tabIndex={0}
        role="button"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Card Front */}
        <div className="card-face card-front">
          <div className="card-top-strip">
            <div className="card-event-num">{event.num}</div>
            <div className="card-icon-circle">{event.icon}</div>
          </div>
          <div className="card-body">
            <h3>{event.title}</h3>
            <div className="card-cat">{event.category}</div>
            <div className="participant-pill">Participants: {event.participants}</div>
            <p className="card-teaser">{event.teaser}</p>
            <div className="card-tap-hint">
              Tap to view details <span style={{ color: 'var(--glow)', marginLeft: 4 }}>▸</span>
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div className="card-face card-back" style={{ transform: 'rotateY(180deg)' }}>
          <div className="close-hint">Tap to close</div>
          <h4>{event.title}</h4>
          <div className="meta-row">
            <span className="meta-pill">{event.teamSize}</span>
            <span className="meta-pill">Cap: {event.participants}</span>
          </div>
          <ul className="rules-list">
            {event.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
          <div className="card-organiser">
            Organiser: <b>{event.organiser}</b>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App Component ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <MatrixCanvas />

      <div className="glow-bg" style={{ top: '8%', left: '50%', transform: 'translateX(-50%)' }} />

      {/* Navigation */}
      <nav>
        <div className="nav-wrap">
          <a href="#home" className="logo">
            TECHNO<span>VANZA</span>
          </a>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#technical" onClick={() => setMobileMenuOpen(false)}>Technical</a></li>
            <li><a href="#nontechnical" onClick={() => setMobileMenuOpen(false)}>Non-Technical</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
          <button
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="glitch-wrapper">
              <span className="glitch-tet" data-text="TECHNOVANZA 2026">
                TECHNO<span className="tech">VANZA</span> 2026
              </span>
            </h1>
            <p className="college-line">
              <b>Anjalai Ammal Mahalingam Engineering College</b>
            </p>
            <p className="desc">Department of Computer Science & Engineering</p>
          </motion.div>

          {/* Developer SVG Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="developer-animation anim-glow"
          >
            <svg viewBox="0 0 700 350" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="100" y="280" width="500" height="12" rx="6" fill="#1F1F1F" />
              <rect x="330" y="230" width="40" height="50" fill="#0D0D0D" />
              <path d="M 300 280 L 400 280 L 380 270 L 320 270 Z" fill="#1A1A1A" />
              <rect x="180" y="70" width="340" height="170" rx="10" fill="#0A0A0A" stroke="#DC2626" strokeWidth="3" />
              <rect x="190" y="80" width="320" height="150" rx="4" fill="#030303" />
              <path d="M 190 84 C 190 81.7 191.7 80 194 80 L 506 80 C 508.2 80 510 81.7 510 84 L 510 98 L 190 98 Z" fill="#121212" />
              <circle cx="205" cy="89" r="4" fill="#EF4444" />
              <circle cx="217" cy="89" r="4" fill="#F59E0B" />
              <circle cx="229" cy="89" r="4" fill="#10B981" />
              <text x="245" y="93" fill="#666" fontFamily="monospace" fontSize="10">main.py - TECHNOVANZA_2026</text>
              <g fontFamily="monospace" fontSize="11" fontWeight="bold">
                <text x="205" y="120" fill="#DC2626">&gt; import</text>
                <text x="260" y="120" fill="#FEE2E2">innovation, ai</text>
                <text x="205" y="140" fill="#7F1D1D">class</text>
                <text x="245" y="140" fill="#EF4444">CSE_Developer</text>
                <text x="345" y="140" fill="#FEE2E2">:</text>
                <g>
                  <text x="220" y="160" fill="#991B1B">def</text>
                  <text x="250" y="160" fill="#FEE2E2">build_future(self):</text>
                </g>
                <text x="235" y="180" fill="#EF4444">return</text>
                <text x="285" y="180" fill="#10B981">"VICTORY 2026"</text>
                <rect x="390" y="170" width="7" height="12" fill="#EF4444" className="anim-cursor" />
              </g>
              <rect x="190" y="195" width="320" height="35" fill="#000000" opacity="0.7" />
              <text x="200" y="210" fill="#10B981" fontFamily="monospace" fontSize="9">[SUCCESS] Compiling TechnoVanza.exe ...</text>
              <text x="200" y="222" fill="#EF4444" fontFamily="monospace" fontSize="9">[STATUS] Ready to compete. Access granted.</text>
              
              <g className="anim-float-1">
                <rect x="80" y="100" width="80" height="40" rx="8" fill="#0A0A0A" stroke="#DC2626" strokeWidth="1.5" />
                <text x="92" y="125" fill="#EF4444" fontFamily="monospace" fontSize="12" fontWeight="bold">&lt;CODE/&gt;</text>
              </g>
              <g className="anim-float-2">
                <circle cx="600" cy="110" r="22" fill="#0A0A0A" stroke="#EF4444" strokeWidth="1.5" />
                <path d="M 590 110 L 610 110 M 600 100 L 600 120 M 593 103 L 607 117" stroke="#DC2626" strokeWidth="2" />
                <circle cx="600" cy="110" r="4" fill="#FEE2E2" />
              </g>
              <g className="anim-float-1" style={{ animationDelay: '1.5s' }}>
                <rect x="560" y="200" width="75" height="35" rx="6" fill="#0A0A0A" stroke="#7F1D1D" strokeWidth="1.5" />
                <text x="572" y="222" fill="#10B981" fontFamily="monospace" fontSize="11">0100101</text>
              </g>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="info"
          >
            <div className="badge">29th August 2026, AC Conference Hall</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="hero-cta"
          >
            <a href="#contact" className="btn">Download the Rules PDF</a>
            {/* <a href="#technical" className="btn-outline">View Events</a> */}
          </motion.div>
        </div>
      </section>

      {/* Technical Events Section */}
      <section className="section" id="technical">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-head"
        >
          <p className="eyebrow">// Technical Track</p>
          <h2>Technical <span>Events</span></h2>
          <p>Four arenas to prove your engineering edge. Tap a card to unlock the brief.</p>
        </motion.div>

        <div className="event-grid">
          {technicalEvents.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="divider-label"
      >
        Beyond The Terminal
      </motion.div>

      {/* Non-Technical Events Section */}
      <section className="section" id="nontechnical">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-head"
        >
          <p className="eyebrow">// Off-Duty Track</p>
          <h2>Non-Technical <span>Events</span></h2>
          <p>Strategy, speed, and creativity — no compiler required.</p>
        </motion.div>

        <div className="event-grid">
          {nonTechnicalEvents.map((event, index) => (
            <EventCard key={index} event={event} index={index} />
          ))}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '40px', marginBottom: '80px', position: 'relative', zIndex: 2 }}
      >
        <a href="#contact" className="btn" style={{ padding: '14px 32px', fontSize: '16px' }}>
          Register Now
        </a>
      </motion.div>

      {/* About Section */}
      <section className="section" id="about">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-head"
        >
          <p className="eyebrow">// Know Us</p>
          <h2>About <span>Technovanza</span></h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="about-container"
        >
          <div className="about-wrap">
            <div className="about-text">
              <p>
                Technovanza 2026 is the annual national-level technical symposium hosted by the Department of Computer Science & Engineering at Anjalai Ammal Mahalingam Engineering College.
              </p>
              <p>
                Built by students for students, the symposium brings together coders, builders, and thinkers from across the region for a single day of competition, learning, and exchange — spanning coding arenas, AI challenges, research showcases, and events built purely for fun.
              </p>
              <p>
                Whether you're here to compete, present, or just soak in the energy, Technovanza is where the next generation of engineers gets tested.
              </p>
            </div>

            <div className="stat-grid">
              <StatBox end={8} label="Events" />
              <StatBox end={300} suffix="+" label="Participants" />
              <StatBox end={1} label="Day, All In" />
              <StatBox end={2026} label="Edition" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Coordinators Section */}
      <section className="section" id="coordinators">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-head"
        >
          <p className="eyebrow">// The Team</p>
          <h2>Meet the <span>Coordinators</span></h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="coord-container"
        >
          {/* Top Row: Principal & HOD */}
          <div className="coord-top-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="coord-card"
            >
              <div className="coord-role-tag">Principal</div>
              <div className="coord-avatar coord-avatar--principal">V</div>
              <div className="coord-name">Dr. K. Velmurugan</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="coord-card coord-card--hod"
            >
              <div className="hod-glow-ring" />
              <div className="coord-role-tag coord-role-tag--hod">Head of Department</div>
              <div className="coord-avatar coord-avatar--hod">V</div>
              <div className="coord-name coord-name--hod">T. Vigneswari</div>
              <div className="coord-designation coord-designation--dept">
                Dept. of Computer Science & Engineering
              </div>
              <ul className="hod-lines">
                <li>Steering 8 cross-discipline events for 300+ participants across the region.</li>
                <li>Fostering technical excellence and innovation through competitive learning.</li>
                <li>The driving force behind Technovanza — where ideas meet execution.</li>
              </ul>
              <div className="hod-quote-mark">"</div>
            </motion.div>
          </div>

          {/* Bottom Row: Staff & Student Coordinators */}
          <div className="coord-bottom-row">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="coord-card"
            >
              <div className="coord-role-tag">Staff Co-ordinators</div>
              <div className="coord-members">
                <div className="coord-member">
                  <div className="coord-avatar coord-avatar--sm">M</div>
                  <div>
                    <div className="coord-name">Manikandan</div>
                    <div className="coord-designation">Assistant Professor, CSE Department</div>
                  </div>
                </div>
                <div className="coord-divider" />
                <div className="coord-member">
                  <div className="coord-avatar coord-avatar--sm">N</div>
                  <div>
                    <div className="coord-name">Nithya</div>
                    <div className="coord-designation">Assistant Professor, CSE Department</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="coord-card"
            >
              <div className="coord-role-tag">Student Co-ordinators</div>
              <div className="coord-members">
                <div className="coord-member">
                  <div className="coord-avatar coord-avatar--sm">L</div>
                  <div>
                    <div className="coord-name">A.V. Lekka</div>
                  </div>
                </div>
                <div className="coord-divider" />
                <div className="coord-member">
                  <div className="coord-avatar coord-avatar--sm">V</div>
                  <div>
                    <div className="coord-name">Vijay Narayan</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact & Venue Section */}
      <section className="section" id="contact">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-head"
        >
          <p className="eyebrow">// Reach Us</p>
          <h2>Contact <span>& Venue</span></h2>
          <p>Questions about events, teams, or registration — reach out directly.</p>
        </motion.div>

        {/* Registration Help Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="reg-help-banner"
        >
          <div className="reg-help-icon">
            <Phone size={18} />
          </div>
          <div className="reg-help-text">
            <span className="reg-help-title">Facing any problem with registration?</span>
            <span className="reg-help-sub">Reach one of these numbers immediately</span>
          </div>
          <div className="reg-help-contacts">
            <a href="tel:+919600496137" className="reg-contact-item">
              <span className="reg-contact-name">M. Madhavan</span>
              <span className="reg-contact-num">96004 96137</span>
            </a>
            <div className="reg-contact-item">
              <span className="reg-contact-name">R. Niveesh</span>
              <span className="reg-contact-num reg-contact-soon">—</span>
            </div>
            <div className="reg-contact-item">
              <span className="reg-contact-name">S. Naveen</span>
              <span className="reg-contact-num reg-contact-soon">—</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="contact-grid"
        >
          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <Mail size={20} />
            </div>
            <h4>Email Us</h4>
            <div className="role">Official Event Mail</div>
            <a href="mailto:Technovanza2026@gmail.com">Technovanza2026@gmail.com</a>
          </div>

          {/* Registration Support Card */}
          <div className="contact-card">
            <div className="contact-card-icon">
              <Phone size={20} />
            </div>
            <h4>M. Madhavan</h4>
            <div className="role">Registration Support</div>
            <a href="tel:+919600496137">+91 96004 96137</a>
          </div>

          {/* Venue Box */}
          <div className="venue-box">
            <div className="venue-info-block">
              <span>
                <MapPin size={14} style={{ display: 'inline', marginRight: 6 }} />
                Venue
              </span>
              AC Conference Hall,<br />
              Anjalai Ammal Mahalingam Engg College,<br />
              Kovilvenni, Thiruvarur – 614 403
            </div>

            <div className="venue-info-block">
              <span>Date & Time</span>
              August 29, 2026<br />
              08:30 AM — 04:30 PM
            </div>

            <div className="venue-info-block">
              <span>
                <Bus size={14} style={{ display: 'inline', marginRight: 6 }} />
                Bus Route
              </span>
              <div className="bus-route-list">
                <div className="bus-route-item">
                  <span className="bus-route-dir">Thiruvarur → Thanjavur</span>
                  <span className="bus-route-stop">Get off at Kovilvenni Stop</span>
                </div>
                <div className="bus-route-item">
                  <span className="bus-route-dir">Thanjavur → Thiruvarur</span>
                  <span className="bus-route-stop">Get off at Kovilvenni Stop</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="map-container"
        >
          <div className="map-label">
            <MapPin size={14} />
            <span>Find Us on the Map</span>
          </div>
          <div className="map-frame-wrap">
            <iframe
              title="Anjalai Ammal Mahalingam Engineering College"
              src="https://maps.google.com/maps?q=Anjalai+Ammal+Mahalingam+Engineering+College+Kovilvenni+Thiruvarur&output=embed&z=14"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <div>© 2026 Technovanza. All rights reserved.</div>
        <div className="foot-tag">System Sequence Complete</div>
      </footer>
    </>
  );
}
