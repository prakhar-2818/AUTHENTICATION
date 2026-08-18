import { useEffect, useRef, useState, useCallback } from "react";
import "./Home.css";

/* ===========================================================
   EDIT ME — swap this data for your own bio / skills / work.
   Everything below is placeholder content, organized so the
   whole site can be re-authored from this one block.
=========================================================== */

const NAME = "Prakhar Shakya";
const ROLE = "B.Tech CSIT Student & Aspiring Full-Stack Developer";
const TAGLINE =
  "3rd-year Computer Science student at KIET who likes turning coursework into real, working projects.";
const COLLEGE = "KIET Group of Institutions";
const LOCATION = "Ghaziabad, Uttar Pradesh, India";
const AVAILABILITY = "Open to internships";

/* Swap this for your own photo — drop the file in /public and point
   this at it, e.g. "/profile-photo.jpg". The hero card flips to show
   it on hover (desktop) or tap (mobile). */
const PHOTO_SRC = "/profile-image.jpg";
const PHOTO_ALT = `Photo of ${NAME}`;

const HERO_OBJECT = {
  name: NAME,
  role: "CSIT Undergrad",
  college: "KIET",
  year: 3,
};

const ABOUT_EYEBROW = "// a little about me";
const ABOUT = `I'm a third-year B.Tech Computer Science student at
${COLLEGE}, spending most of my time somewhere between lecture
notes and a code editor.

I like the moment an idea most people would leave as a sketch
actually turns into something you can click through — so I try
to build real, working versions of the things I'm learning
about, not just solve problems on paper.`;

const ABOUT_FACTS = [
  { label: "studying", value: "B.Tech CSE, 3rd Year" },
  { label: "college", value: COLLEGE },
  { label: "based in", value: LOCATION },
  { label: "open to", value: "internships & collabs" },
];

/* Kept short on purpose — real skills at a real level, not a
   wall of buzzwords. */
const SKILLS = [
  {
    group: "languages",
    items: ["C++", "Java", "Python", "JavaScript"],
  },
  {
    group: "web",
    items: ["HTML & CSS", "React", "Node.js", "MongoDB"],
  },
  {
    group: "tools",
    items: ["Git & GitHub", "VS Code", "Postman"],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: COLLEGE,
    period: "2024 — 2028 · 3rd Year",
    summary:
      "Core coursework in data structures, DBMS, operating systems, and OOP, alongside self-directed web projects to actually apply what's covered in class.",
    focus: ["DSA", "DBMS", "OOP"],
  },
  {
    degree: "Senior Secondary (PCM)",
    school: "— add your school here —",
    period: "2020 — 2022",
    summary:
      "Focused on Physics, Chemistry, and Mathematics, and started teaching myself to code in the final year.",
    focus: [],
  },
];

/* ===========================================================
   NOW — a lightweight "currently" snapshot, in the spirit of
   nownownow.com. Update this every so often; that's the point.
=========================================================== */
const NOW = [
  { label: "studying", value: "Data engineering with AWS , Advance database , Deep_learing and Generative_AI" },
  { label: "building", value: "A notes-sharing app for my batch" },
  { label: "learning", value: "DSA in JAVA, one problem a day" },
  { label: "prepping for", value: "Summer internship applications" },
];

const PROJECTS = [
  {
    name: "CampusConnect",
    desc: "A web app for managing club events and RSVPs at KIET, built after our own club's sign-ups kept getting lost in a WhatsApp group.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
    year: "2025",
  },
  {
    name: "StudyStack",
    desc: "A notes-sharing platform for classmates to upload and search semester notes by subject and unit.",
    tech: ["React", "Express", "MongoDB"],
    github: "#",
    live: "#",
    year: "2024",
  },
  {
    name: "ExpenseBuddy",
    desc: "A small expense tracker built to actually keep my own hostel budget in check — logs spends by category and shows a monthly summary.",
    tech: ["JavaScript", "Chart.js"],
    github: "#",
    live: "#",
    year: "2024",
  },
  {
    name: "Weatherly",
    desc: "A clean weather lookup app built while learning to work with public APIs — search any city, see a 5-day outlook.",
    tech: ["React", "REST API"],
    github: "#",
    live: "#",
    year: "2023",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Prakhar was one of the few students who showed up to office hours with actual code, not just questions about the exam.",
    name: "Dr. A. Verma",
    title: "Professor, KIET Dept. of CSE",
  },
  {
    quote:
      "He picked up React faster than anyone else on our hackathon team, and still made time to explain it to the rest of us.",
    name: "Ishaan Malhotra",
    title: "Teammate, college hackathon",
  },
  {
    quote:
      "Reliable, curious, and never afraid to say 'I don't know that yet, but I'll figure it out.'",
    name: "Ritika Sen",
    title: "Coding Club Lead, KIET",
  },
];

const CONTACT = {
  email: "prakharshakya@gmail.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  twitter: "https://twitter.com/yourhandle",
};

const SECTIONS = [
  { id: "home", label: "home.jsx" },
  { id: "about", label: "about.js" },
  { id: "now", label: "now.js" },
  { id: "skills", label: "skills.js" },
  { id: "education", label: "education.js" },
  { id: "projects", label: "projects.js" },
  { id: "words", label: "words.js" },
  { id: "contact", label: "contact.js" },
];

/* ===========================================================
   Inline icon set — no external icon dependency, everything
   is a small hand-tuned SVG so the stroke weight matches type.
=========================================================== */
const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
      <path d="M12 .5C5.73.5.98 5.25.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.36-3.83-1.36-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.65 1.24 3.3.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.2.66.79.55 4.51-1.5 7.77-5.76 7.77-10.78C23.02 5.25 18.27.5 12 .5Z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  ),
  twitter: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
      <path d="M18.24 2.5h3.3l-7.2 8.23L23 21.5h-6.62l-5.18-6.77-5.93 6.77H1.96l7.7-8.8L1.5 2.5h6.79l4.68 6.19 5.27-6.19Zm-1.16 17.02h1.83L6.98 4.38H5.02l12.06 15.14Z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  external: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  arrowDown: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 4v16M5 13l7 7 7-7" />
    </svg>
  ),
  arrowRight: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  quote: (p) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" {...p}>
      <path d="M9.5 7C6.46 7 4 9.46 4 12.5S6.46 18 9.5 18c.28 0 .5.22.5.5s-.22.5-.5.5C5.36 19 2 15.64 2 11.5S5.36 4 9.5 4c.28 0 .5.22.5.5s-.22.5-.5.5ZM19 7c-3.04 0-5.5 2.46-5.5 5.5S15.96 18 19 18c.28 0 .5.22.5.5s-.22.5-.5.5c-4.14 0-7.5-3.36-7.5-7.5S14.86 4 19 4c.28 0 .5.22.5.5s-.22.5-.5.5Z" />
    </svg>
  ),
  flip: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M17 2.1 21 6l-4 3.9M3 11V9a4 4 0 0 1 4-4h14M7 21.9 3 18l4-3.9M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
};

/* ===========================================================
   useTypewriter — types a string out character by character,
   respects prefers-reduced-motion.
=========================================================== */
function useTypewriter(text, { start = true, speed = 32 } = {}) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setOutput(text);
      setDone(true);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [start, text, speed]);

  return { output, done };
}

/* ===========================================================
   useCountUp — animates a number from 0 to target once visible.
=========================================================== */
function useCountUp(target, { duration = 1200, start = false } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

/* ===========================================================
   Reveal — IntersectionObserver-driven fade/slide wrapper used
   throughout the page for scroll-triggered entrances.
=========================================================== */
function Reveal({ as: Tag = "div", className = "", children, onVisible, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onVisible?.();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onVisible]);

  return (
    <Tag ref={ref} className={`reveal ${visible ? "reveal--visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ===========================================================
   LineGutter — the signature editor-margin element running the
   full height of the page, recalculated on resize/content load.
=========================================================== */
function LineGutter() {
  const [count, setCount] = useState(60);

  useEffect(() => {
    const compute = () => {
      const rowHeight = 32;
      const total = Math.ceil(document.documentElement.scrollHeight / rowHeight);
      setCount(total);
    };
    compute();
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 700);
    const t2 = setTimeout(compute, 1600);
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="gutter" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="gutter__num">
          {String(i + 1).padStart(2, "0")}
        </span>
      ))}
    </div>
  );
}

/* ===========================================================
   ProgressRail — thin scroll-progress indicator pinned to the
   right edge, filled amber as the reader moves through the page.
=========================================================== */
function ProgressRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <div className="rail__track">
        <div className="rail__fill" style={{ transform: `scaleY(${progress})` }} />
      </div>
    </div>
  );
}

/* ===========================================================
   HeroCard — the hero's signature element AND the flip photo
   card in one. Front face types out a JS object describing the
   student; the whole card flips on hover (desktop) or tap
   (touch/mobile) to reveal a real photo on the back.
=========================================================== */
function HeroCard({ data, active, photoSrc, photoAlt }) {
  const lines = [
    { k: "name", v: `"${data.name}"`, t: "str" },
    { k: "role", v: `"${data.role}"`, t: "str" },
    { k: "college", v: `"${data.college}"`, t: "str" },
    { k: "year", v: String(data.year), t: "num" },
  ];
  const [visibleLines, setVisibleLines] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!active) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisibleLines(lines.length);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      className="hero-card"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? "Show code view" : "Flip card to see photo"}
    >
      <div className={`hero-card__inner ${flipped ? "hero-card__inner--flipped" : ""}`}>
        {/* FRONT — the "developer.js" code face */}
        <div className="hero-card__face hero-card__face--front">
          <div className="term__bar">
            <span className="term__dot term__dot--a" />
            <span className="term__dot term__dot--b" />
            <span className="term__dot term__dot--c" />
            <span className="term__title">student.js</span>
          </div>
          <div className="term__body">
            <p className="term__line">
              <span className="kw">const</span> <span className="fn">student</span> <span className="punc">=</span>
            </p>
            <p className="term__line term__line--indent">
              <span className="punc">{"{"}</span>
            </p>
            {lines.map((line, i) => (
              <p
                key={line.k}
                className={`term__line term__line--indent2 ${i < visibleLines ? "term__line--in" : ""}`}
              >
                <span className="key">{line.k}</span>
                <span className="punc">: </span>
                <span className={line.t === "str" ? "str" : "num"}>{line.v}</span>
                <span className="punc">,</span>
              </p>
            ))}
            <p className="term__line term__line--indent">
              <span className="punc">{"}"}</span>
            </p>
            <p className="term__line term__line--gap">
              <span className="fn">console</span>
              <span className="punc">.</span>
              <span className="fn">log</span>
              <span className="punc">(</span>
              <span className="str">"Let's build something great!"</span>
              <span className="punc">);</span>
            </p>
            <div className="hero-card__hint">
              {/* <Icon.flip /> hover or tap to flip */}
            </div>
          </div>
        </div>

        {/* BACK — the real photo */}
        <div className="hero-card__face hero-card__face--back">
          {!imgError ? (
            <>
              <img src={photoSrc} alt={photoAlt} className="hero-card__photo" onError={() => setImgError(true)} />
              <div className="hero-card__photo-overlay" />
              <p className="hero-card__photo-name">{data.name}</p>
            </>
          ) : (
            <div className="hero-card__fallback">
              {/* <p>Add your photo at</p> */}
              <code>{photoSrc}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   StatChip — small animated metric used in the About section.
=========================================================== */
function StatChip({ value, suffix = "", label, start }) {
  const n = useCountUp(value, { start, duration: 1100 });
  return (
    <div className="stat">
      <p className="stat__value">
        {n}
        {suffix}
      </p>
      <p className="stat__label">{label}</p>
    </div>
  );
}

/* ===========================================================
   Home — top-level page component.
=========================================================== */
function Home({ user }) {
  const name = user?.name || NAME;
  const heroData = { ...HERO_OBJECT, name };

  const [active, setActive] = useState("home");
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.section);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const accents = ["a", "b", "c", "d"];
  const { output: introOutput, done } = useTypewriter(`console.log("Hello, I'm ${name}")`, {
    start: true,
    speed: 30,
  });

  return (
    <div className="home-container">
      <LineGutter />
      <ProgressRail />

      <nav className="tabbar" aria-label="Section navigation">
        <div className="tabbar__inner">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`tab ${active === s.id ? "tab--active" : ""}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="page">
        {/* ============================= HERO ============================= */}
        <section id="home" data-section="home" ref={(el) => (sectionRefs.current.home = el)} className="hero">
          <div className="hero__grid">
            <div className="hero__copy">
              <div className="hero__eyebrow">
                <span className="status-dot" />
                {AVAILABILITY}
              </div>

              <p className="hero__greeting">Hello, I'm</p>
              <h1 className="hero__name">
                {name.split(" ")[0]}
                <span className="hero__name-dot">.</span>
              </h1>

              <div className="hero__code" role="status" aria-live="polite">
                <span className="code-punc">&gt; </span>
                <span className="code-line">{introOutput}</span>
                <span className={`caret ${done ? "caret--slow" : ""}`}>▍</span>
              </div>

              <h2 className={`hero__role ${done ? "hero__role--in" : ""}`}>{ROLE}</h2>
              <p className={`hero__tagline ${done ? "hero__tagline--in" : ""}`}>{TAGLINE}</p>

              <div className={`hero__ctas ${done ? "hero__ctas--in" : ""}`}>
                <button className="btn btn--primary" onClick={() => scrollTo("projects")}>
                  View My Work <Icon.arrowRight />
                </button>
                <button className="btn btn--ghost" onClick={() => scrollTo("contact")}>
                  Contact Me
                </button>
              </div>

              <div className={`hero__social ${done ? "hero__social--in" : ""}`}>
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="social-link">
                  <Icon.github /> GitHub
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="social-link">
                  <Icon.linkedin /> LinkedIn
                </a>
              </div>
            </div>

            <div className="hero__visual">
              <HeroCard data={heroData} active={done} photoSrc={PHOTO_SRC} photoAlt={PHOTO_ALT} />
              <div className="hero__blob" aria-hidden="true" />
            </div>
          </div>

          <button className="hero__scroll" onClick={() => scrollTo("about")} aria-label="Scroll to about section">
            <Icon.arrowDown />
          </button>
        </section>

        {/* ============================= ABOUT ============================= */}
        <section id="about" data-section="about" ref={(el) => (sectionRefs.current.about = el)} className="section">
          <Reveal className="section__kicker" as="p">
            about
          </Reveal>

          <Reveal className="file-block" onVisible={() => setStatsVisible(true)}>
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">about.js</span>
            </div>
            <div className="file-block__body about__body">
              <div className="about__text">
                <p className="comment">{ABOUT_EYEBROW}</p>
                <p className="prose">{ABOUT}</p>

                <div className="about__facts">
                  {ABOUT_FACTS.map((f) => (
                    <div key={f.label} className="about__fact">
                      <span className="about__fact-label">{f.label}</span>
                      <span className="about__fact-value">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about__stats">
                <StatChip value={3} label="year of B.Tech" start={statsVisible} />
                <StatChip value={4} suffix="+" label="projects built" start={statsVisible} />
                <StatChip value={1} label="coding club" start={statsVisible} />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================= NOW ============================= */}
        <section id="now" data-section="now" ref={(el) => (sectionRefs.current.now = el)} className="section">
          <Reveal className="section__kicker" as="p">
            right now
          </Reveal>

          <Reveal className="file-block">
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">now.js</span>
            </div>
            <div className="file-block__body">
              <p className="comment">// last updated this semester</p>
              <div className="now-grid">
                {NOW.map((n) => (
                  <div key={n.label} className="now-row">
                    <span className="now-row__label">{n.label}</span>
                    <span className="now-row__value">{n.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================= SKILLS ============================= */}
        <section id="skills" data-section="skills" ref={(el) => (sectionRefs.current.skills = el)} className="section">
          <Reveal className="section__kicker" as="p">
            skills
          </Reveal>

          <Reveal className="file-block">
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">skills.js</span>
            </div>
            <div className="file-block__body">
              {SKILLS.map((group, gi) => (
                <div key={group.group} className="skill-row">
                  <p className="code-decl">
                    <span className="kw">const</span> {group.group} <span className="punc">=</span>{" "}
                    <span className="punc">[</span>
                  </p>
                  <div className="chip-row">
                    {group.items.map((item, i) => (
                      <span key={item} className={`chip chip--${accents[(gi + i) % accents.length]}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="code-decl code-decl--close">
                    <span className="punc">]</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ============================= EDUCATION ============================= */}
        <section
          id="education"
          data-section="education"
          ref={(el) => (sectionRefs.current.education = el)}
          className="section"
        >
          <Reveal className="section__kicker" as="p">
            education
          </Reveal>

          <Reveal className="file-block">
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">education.js</span>
            </div>
            <div className="file-block__body">
              <div className="timeline">
                {EDUCATION.map((ed, i) => (
                  <Reveal key={ed.degree} className="timeline__item" style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="timeline__marker">
                      <span className="timeline__dot" />
                      {i < EDUCATION.length - 1 && <span className="timeline__line" />}
                    </div>
                    <div className="timeline__content">
                      <p className="timeline__period">{ed.period}</p>
                      <h3 className="timeline__role">{ed.degree}</h3>
                      <p className="timeline__org">{ed.school}</p>
                      <p className="timeline__summary">{ed.summary}</p>
                      {ed.focus.length > 0 && (
                        <div className="chip-row chip-row--tight">
                          {ed.focus.map((t, ti) => (
                            <span key={t} className={`chip chip--sm chip--${accents[ti % accents.length]}`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================= PROJECTS ============================= */}
        <section
          id="projects"
          data-section="projects"
          ref={(el) => (sectionRefs.current.projects = el)}
          className="section"
        >
          <Reveal className="section__kicker" as="p">
            projects
          </Reveal>

          <Reveal className="file-block">
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">projects.js</span>
            </div>
            <div className="file-block__body">
              <div className="project-grid">
                {PROJECTS.map((p, i) => (
                  <Reveal key={p.name} className="project-card" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="project-card__top">
                      <p className="code-decl">
                        <span className="kw">function</span> <span className="fn">{p.name}</span>
                        <span className="punc">() {"{"}</span>
                      </p>
                      <span className="project-card__year">{p.year}</span>
                    </div>
                    <p className="project-card__desc">{p.desc}</p>
                    <div className="chip-row chip-row--tight">
                      {p.tech.map((t, ti) => (
                        <span key={t} className={`chip chip--sm chip--${accents[ti % accents.length]}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="project-card__links">
                      <a href={p.github} className="icon-link" aria-label={`${p.name} on GitHub`}>
                        <Icon.github /> code
                      </a>
                      <a href={p.live} className="icon-link" aria-label={`${p.name} live demo`}>
                        <Icon.external /> live
                      </a>
                    </div>
                    <p className="code-decl code-decl--close">
                      <span className="punc">{"}"}</span>
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================= TESTIMONIALS ============================= */}
        <section id="words" data-section="words" ref={(el) => (sectionRefs.current.words = el)} className="section">
          <Reveal className="section__kicker" as="p">
            kind words
          </Reveal>

          <Reveal className="file-block">
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">words.js</span>
            </div>
            <div className="file-block__body">
              <div className="testimonial-grid">
                {TESTIMONIALS.map((t, i) => (
                  <Reveal key={t.name} className="testimonial-card" style={{ transitionDelay: `${i * 90}ms` }}>
                    <Icon.quote className="testimonial-card__quote-icon" />
                    <p className="testimonial-card__quote">{t.quote}</p>
                    <div className="testimonial-card__attr">
                      <span className="testimonial-card__name">{t.name}</span>
                      <span className="testimonial-card__title">{t.title}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================= CONTACT ============================= */}
        <section
          id="contact"
          data-section="contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          className="section section--contact"
        >
          <Reveal className="section__kicker" as="p">
            contact
          </Reveal>

          <Reveal className="file-block">
            <div className="file-block__header">
              <span className="dot dot--a" />
              <span className="dot dot--b" />
              <span className="dot dot--c" />
              <span className="file-block__name">contact.js</span>
            </div>
            <div className="file-block__body">
              <p className="comment">// let's build something</p>
              <p className="code-decl">
                <span className="kw">export default</span> <span className="punc">{"{"}</span>
              </p>
              <div className="contact-list">
                <a className="contact-row" href={`mailto:${CONTACT.email}`}>
                  <Icon.mail className="contact-row__icon" />
                  <span className="key">email:</span>
                  <span className="str">"{CONTACT.email}"</span>
                </a>
                <a className="contact-row" href={CONTACT.github} target="_blank" rel="noreferrer">
                  <Icon.github className="contact-row__icon" />
                  <span className="key">github:</span>
                  <span className="str">"{CONTACT.github.replace("https://", "")}"</span>
                </a>
                <a className="contact-row" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                  <Icon.linkedin className="contact-row__icon" />
                  <span className="key">linkedin:</span>
                  <span className="str">"{CONTACT.linkedin.replace("https://", "")}"</span>
                </a>
                <a className="contact-row" href={CONTACT.twitter} target="_blank" rel="noreferrer">
                  <Icon.twitter className="contact-row__icon" />
                  <span className="key">twitter:</span>
                  <span className="str">"{CONTACT.twitter.replace("https://", "")}"</span>
                </a>
              </div>
              <p className="code-decl code-decl--close">
                <span className="punc">{"}"}</span>
              </p>

              <a className="btn btn--primary contact-cta" href={`mailto:${CONTACT.email}`}>
                Say hello <Icon.arrowRight />
              </a>
            </div>
          </Reveal>

          <footer className="footer">
            <span>
              © {new Date().getFullYear()} {name}
            </span>
            <span className="footer__eof">// EOF</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Home;
