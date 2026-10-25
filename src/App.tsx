import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Command, Copy, Github, GraduationCap, Mail, Menu, Moon, Sun, Code2, Database, Globe, Layers, Linkedin, MessageCircle, Search, Send, ShoppingBag, Sparkles, Terminal, Wallet, X, ChevronUp, Download } from 'lucide-react';
import { profile, skills, projects, education, coursework } from './data';
const nav = [['Home', 'home'], ['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'], ['Education', 'education'], ['Certifications', 'certifications'], ['Contact', 'contact']];
const sections = [{ id: 'home', name: 'Go to Home' }, { id: 'about', name: 'About Me' }, { id: 'skills', name: 'Skills' }, { id: 'projects', name: 'Projects' }, { id: 'education', name: 'Education' }, { id: 'certifications', name: 'Certifications' }, { id: 'contact', name: 'Contact' }];
function Heading({ n, k, title, desc }: {
    n: string;
    k: string;
    title: string;
    desc: string;
}) { return <div className="section-heading"><div className="eyebrow"><span>{n}</span><i />{k}</div><div className="heading-row"><h2>{title}</h2><p>{desc}</p></div></div>; }
function App() {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        try {
            return localStorage.getItem('jk-theme') === 'light' ? 'light' : 'dark';
        }
        catch {
            return 'dark';
        }
    });
    const [menu, setMenu] = useState(false);
    const [palette, setPalette] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState('home');
    const [role, setRole] = useState('Software Engineer');
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [notice, setNotice] = useState('');
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem('jk-theme', theme);
        }
        catch { }
    }, [theme]);
    useEffect(() => {
        const roles = ['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast'];
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion)
            return;
        let i = 0;
        const id = window.setInterval(() => { i = (i + 1) % roles.length; setRole(roles[i]); }, 3200);
        return () => clearInterval(id);
    }, []);
    useEffect(() => {
        const obs = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting)
                setActive(e.target.id);
        }), { rootMargin: '-35% 0px -55% 0px' });
        document.querySelectorAll('main section[id]').forEach(s => obs.observe(s));
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        const key = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setPalette(v => !v);
            }
            if (e.key === 'Escape') {
                setPalette(false);
                setMenu(false);
            }
        };
        window.addEventListener('keydown', key);
        return () => window.removeEventListener('keydown', key);
    }, []);
    const filtered = useMemo(() => sections.filter(s => (s.name + ' ' + s.id).toLowerCase().includes(query.toLowerCase())), [query]);
    const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false); setPalette(false); setQuery(''); };
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setNotice('Email copied to clipboard.');
        }
        catch {
            window.location.href = 'mailto:' + profile.email;
        }
    };
    const send = async (e: FormEvent) => {
        e.preventDefault();
        const { VITE_EMAILJS_SERVICE_ID: s, VITE_EMAILJS_TEMPLATE_ID: t, VITE_EMAILJS_PUBLIC_KEY: k } = import.meta.env;
        if (s && t && k) {
            try {
                const emailjs = await import('@emailjs/browser');
                await emailjs.send(s, t, { from_name: form.name, reply_to: form.email, message: form.message, to_email: profile.email }, { publicKey: k });
                setNotice('Message sent successfully.');
                setForm({ name: '', email: '', message: '' });
                return;
            }
            catch {
                setNotice('EmailJS did not send. Use the email draft fallback below.');
                return;
            }
        }
        setNotice('Email delivery is not configured yet. Use the email draft fallback below.');
    };
    const fallback = () => { const sub = encodeURIComponent('Portfolio message from ' + form.name); const body = encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\n' + form.message); location.href = `mailto:${profile.email}?subject=${sub}&body=${body}`; };
    return <div className="app"><a className="skip-link" href="#main-content">Skip to content</a><div className="grain" aria-hidden="true"/><header className="header"><a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home'); }}><span className="monogram">JK<span>.</span></span><span><b>Jathish Krishna</b><small>Portfolio / 2026</small></span></a><nav aria-label="Main navigation" className={menu ? 'nav open' : 'nav'}>{nav.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={'#' + id} onClick={e => { e.preventDefault(); go(id); }}>{label}</a>)}</nav><div className="head-actions"><button className="icon" aria-label="Open command palette" onClick={() => setPalette(true)}><Command size={16}/><kbd>⌘ K</kbd></button><button className="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}</button><a className="small-cta" href="#contact" onClick={e => { e.preventDefault(); go('contact'); }}>Let’s talk <ArrowUpRight size={14}/></a><button className="icon mobile" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X size={19}/> : <Menu size={19}/>}</button></div></header>
    <main id="main-content" tabIndex={-1}>
    <section id="home" className="hero wrap"><div className="hero-text"><div className="availability"><i /> {profile.availability}</div><div className="eyebrow"><i /> HELLO, I'M</div><h1>{profile.displayName}<span>.</span></h1><div className="role-line">I build as a <strong>{role}<em>|</em></strong></div><p className="hero-desc">{profile.tagline} I’m focused on thoughtful software, practical full-stack projects, and learning how AI can make products more useful.</p><div className="buttons"><button className="btn primary" onClick={() => go('projects')}>Explore my work <ArrowDownRight size={16}/></button><button className="btn secondary" onClick={() => go('contact')}>Get in touch <ArrowUpRight size={16}/></button><a className="btn secondary resume-btn" href={`${import.meta.env.BASE_URL}resume.pdf`} download>Download resume <Download size={15}/></a></div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={12}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn <ArrowUpRight size={12}/></a><button aria-label="Copy email address" onClick={copy}><Mail size={15}/>{notice === 'Email copied to clipboard.' ? 'Copied' : 'Email'} <Copy size={12}/></button></div></div>
    <div className="hero-art"><div className="orbit o1"/><div className="orbit o2"/><div className="glow"/><div className="chip chip1"><Code2 size={15}/> Build</div><div className="chip chip2"><Sparkles size={15}/> Explore AI</div><div className="terminal"><div className="term-top"><span className="dots"><i /><i /><i /></span><span><Terminal size={12}/> jk@portfolio:~</span><span>●</span></div><div className="term-code"><p><small>01</small> <b>const</b> <i>developer</i> = {'{'}</p><p><small>02</small> &nbsp;name: <em>'Jathish Krishna'</em>,</p><p><small>03</small> &nbsp;focus: <em>'Software'</em>,</p><p><small>04</small> &nbsp;interests: [</p><p><small>05</small> &nbsp; <u>'Full-Stack'</u>,</p><p><small>06</small> &nbsp; <u>'AI'</u></p><p><small>07</small> &nbsp;]</p><p><small>08</small> {'}'};</p><p className="prompt">➜ ready_to_build<span>_</span></p></div></div><div className="art-caption">Curiosity → Code → Impact</div><div className="photo-slot"><span>JK</span><div><b>Human-first engineering</b><small>Professional photo can be added later</small></div></div></div><button className="scroll" onClick={() => go('about')}>SCROLL TO EXPLORE <ArrowDown size={14}/></button></section>
    <section id="about" className="wrap section"><Heading n="01" k="A LITTLE ABOUT ME" title="Curious by nature. Builder by choice." desc="A practical mindset, a learning habit, and a focus on making useful things."/><div className="about-grid"><div><p className="lead">{profile.about}</p><p className="muted">I enjoy working through a problem from the first idea to a usable interface. Each project is an opportunity to strengthen my fundamentals, understand trade-offs, and build with more intention.</p><div className="values"><div><Code2 /><b>Build with purpose</b><small>Useful experiences over unnecessary complexity.</small></div><div><Sparkles /><b>Keep learning</b><small>Growing through software, systems, and AI.</small></div></div></div><aside className="about-aside"><div><small>CURRENT FOCUS</small><b>Software + Full-Stack</b><span>Developing stronger engineering fundamentals</span></div><div><small>LEARNING NEXT</small><b>AI & emerging tech</b><span>Exploring practical applications and ideas</span></div><blockquote>“Make it useful. Make it clear. Keep improving.”</blockquote></aside></div></section>
    <section id="skills" className="wrap section"><Heading n="02" k="MY TOOLKIT" title="Skills I’m building with." desc="A focused set of fundamentals, organized by how I use them. No arbitrary proficiency percentages."/><div className="skill-grid">{skills.map((s, i) => <article className="skill-card" key={s.name}><div className="skill-card-top"><small>0{i + 1}</small>{i === 0 ? <Code2 /> : i === 1 ? <Globe /> : <Layers />}</div><h3>{s.name}</h3><p>{s.desc}</p><div className="pills">{s.items.map(x => <span key={x}>{x}</span>)}</div></article>)}</div><div className="learn-strip"><Sparkles /><div><b>Always learning</b><span>AI, software architecture, and better ways to build practical products.</span></div></div></section>
    <section id="projects" className="wrap section"><Heading n="03" k="SELECTED WORK" title="Projects with a purpose." desc="A look at the applications I’ve built and the work I’m continuing to develop."/><div className="project-grid">{projects.map(p => <article className="project-card" key={p.name}><div className={'project-art art-' + p.visual}><div className="project-art-top"><small>{p.n} / 04</small><span className={p.status === 'Completed' ? 'complete' : 'progress'}><i />{p.status}</span></div><div className="mock"><div className="mock-top"><span className="dots"><i /><i /><i /></span><small>{p.name.toLowerCase().replaceN(/ /g, '-')}</small>{p.visual === 'shop' ? <ShoppingBag size={14}/> : p.visual === 'expense' ? <Wallet size={14}/> : p.visual === 'chat' ? <MessageCircle size={14}/> : <Layers size={14}/>}</div><Preview kind={p.visual}/></div></div><div className="project-info"><h3>{p.name}<ArrowUpRight size={17}/></h3><p>{p.desc}</p><div className="pills">{p.tech.length ? p.tech.map(t => <span key={t}>{t}</span>) : <span className="muted-pill">Technology stack to be added</span>}</div><div className="project-links"><span>Project links can be added later <ArrowUpRight size={12}/></span></div></div></article>)}</div><p className="project-note">Project previews are illustrative, not screenshots of the actual applications. Detailed features and database integrations can be updated after verification.</p></section>
    <section id="education" className="wrap section"><Heading n="04" k="EDUCATION" title="Learning the foundations." desc="Computer science fundamentals that support the way I think about software."/><div className="edu-grid"><article className="edu-card"><GraduationCap /><small>UNDERGRADUATE DEGREE</small><h3>{education.degree}</h3><p>{education.college}</p><div className="pills"><span>{education.graduation}</span><span>{education.semester}</span><span>CGPA {education.cgpa}</span></div></article><article className="course-card"><h3><Database size={16}/> Relevant coursework</h3><div className="pills">{coursework.map(x => <span key={x}>{x}</span>)}</div><small>Edit <code>src/data.ts</code> if you need to adjust the list to match completed subjects.</small></article></div></section>
    <section id="certifications" className="wrap section"><Heading n="05" k="CONTINUOUS LEARNING" title="Learning doesn’t stop at class." desc="Interested in software engineering, AI, and emerging technologies."/><div className="cert-box"><Sparkles /><div><b>Certifications & achievements</b><p>This section is ready for verified certifications. Add the credential name, issuing organization, and link when you’re ready.</p></div><small>ADD LATER</small></div></section>
    <section id="contact" className="wrap section contact-section"><Heading n="06" k="LET'S CONNECT" title="Have a good problem to solve?" desc="I’m open to internship opportunities and conversations about software, full-stack development, and AI."/><div className="contact-grid"><div><h3>Let’s build something useful.</h3><p className="muted">For opportunities, collaboration, or a thoughtful technical conversation, send a message or reach out through my professional profiles.</p><a className="contact-link" href={'mailto:' + profile.email}><Mail /><span><small>EMAIL ME</small><b>{profile.email}</b></span><ArrowUpRight /></a><a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /><span><small>CONNECT ON LINKEDIN</small><b>Jathish Krishna</b></span><ArrowUpRight /></a><a className="contact-link" href={profile.github} target="_blank" rel="noreferrer"><Github /><span><small>EXPLORE MY GITHUB</small><b>@jathishkrishna</b></span><ArrowUpRight /></a></div><form className="form" onSubmit={send}><div className="form-title"><span>01 / SEND A MESSAGE</span><span>CONTACT FORM</span></div><label>Your name<input autoComplete="name" required minLength={2} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="How should I address you?"/></label><label>Email address<input autoComplete="email" required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"/></label><label>Your message<textarea required minLength={8} rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about what you have in mind..."/></label>{notice && <div className="notice" role="status" aria-live="polite">{notice}{notice.includes('fallback') || notice.includes('not configured') ? <button type="button" onClick={fallback}>Open email draft <ArrowUpRight size={12}/></button> : null}</div>}<button className="btn primary send" type="submit">Send message <Send size={14}/></button><small className="form-note">Direct delivery requires EmailJS configuration. Until then, use the email draft fallback.</small></form></div></section>
    </main><footer className="wrap footer"><a className="brand" href="#home" onClick={e => { e.preventDefault(); go('home'); }}><span className="monogram">JK<span>.</span></span><span><b>Jathish Krishna</b><small>Curiosity → Code → Impact</small></span></a><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12}/></a><a href={'mailto:' + profile.email}>Email <ArrowUpRight size={12}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jathish Krishna. Built with intention.</span><span>ENGLISH / INDIA</span><button onClick={() => go('home')}>Back to top <ChevronUp size={14}/></button></div></footer>
    {palette && <div className="overlay" role="presentation" onMouseDown={e => {
                if (e.target === e.currentTarget)
                    setPalette(false);
            }}><div className="palette" role="dialog" aria-modal="true" aria-label="Portfolio navigation" aria-describedby="palette-help"><div className="palette-search"><Search /><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Where would you like to go?" aria-label="Search portfolio sections"/><kbd>ESC</kbd><button aria-label="Close command palette" onClick={() => setPalette(false)}><X /></button></div>{filtered.map(s => <button className="palette-item" key={s.id} onClick={() => go(s.id)}><span><ArrowUpRight /></span><b>{s.name}</b><small>{s.id}</small></button>)}<div className="palette-foot" id="palette-help"><Command size={12}/> Ctrl/⌘ + K to toggle · Esc to close</div></div></div>}</div>;
}
function Preview({ kind }: {
    kind: string;
}) {
    if (kind === 'expense')
        return <div className="preview-expense"><small>MONTHLY OVERVIEW</small><b>₹ 24,850</b><span>Illustrative dashboard preview</span><div className="bars">{[36, 56, 42, 76, 51, 88, 62, 72, 48, 95, 61, 79].map((h, i) => <i key={i} style={{ height: h + '%' }}/>)}</div></div>;
    if (kind === 'chat')
        return <div className="preview-chat"><div className="chat-avatar">J</div><div><span>Hey! How is the build going?</span><span className="out">Making steady progress.</span><span>Nice, keep going!</span><small>Write a message…</small></div></div>;
    return <div className="preview-store"><small>{kind === 'shop' ? 'SMART SHOP' : 'EVERYDAY / OBJECTS'}</small><div><b>{kind === 'shop' ? 'Shop smarter.' : 'Find your next.'}</b><span>Discover something useful.</span><ShoppingBag /></div><section><i /><i /><i /></section></div>;
}
export default App;

