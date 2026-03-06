"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

const publications = [
  {
    title: "The 1% Standard",
    tag: "Manifesto",
    summary:
      "A concise declaration of ownership, discipline, structure, and long-term thinking.",
  },
  {
    title: "RYTHM Framework",
    tag: "Framework",
    summary:
      "Raise Yourself To Help Mankind — a practical philosophy for responsible entrepreneurial growth.",
  },
  {
    title: "Partner Growth Notes",
    tag: "Insights",
    summary:
      "Short essays and field notes on business development, leadership, and community building.",
  },
];

const events = [
  {
    title: "Partner Growth Session",
    date: "12 Mar 2026",
    type: "Virtual",
    summary:
      "A practical session focused on communication, accountability, and business momentum.",
  },
  {
    title: "Community Leadership Forum",
    date: "28 Apr 2026",
    type: "Hybrid",
    summary:
      "Leadership conversations on service, ethics, and scaling impact without losing structure.",
  },
  {
    title: "Entrepreneurship Roundtable",
    date: "17 Jun 2026",
    type: "In Person",
    summary:
      "A curated event for sharing case studies, opportunities, and distribution strategies.",
  },
];

const initiatives = [
  {
    id: "mad",
    title: "Make A Difference (MAD)",
    summary:
      "A people-centered initiative designed to channel entrepreneurial effort into measurable human impact.",
    details:
      "MAD exists to move beyond words into practical change. It connects leadership, service, and execution in ways communities can actually feel.",
    icon: Handshake,
  },
  {
    id: "gdbd",
    title: "Global Distribution & Business Development",
    summary:
      "A strategic growth arm focused on partnerships, market access, and responsible expansion.",
    details:
      "This initiative helps partners think beyond short-term hustle and toward systems, distribution leverage, and sustainable growth models.",
    icon: Globe2,
  },
  {
    id: "leadership",
    title: "Leadership Development",
    summary:
      "Programs and learning paths that strengthen communication, character, and consistency.",
    details:
      "The goal is not performance theater. It is maturity, execution, and leadership that holds under pressure.",
    icon: Users,
  },
];

const partners = [
  {
    name: "Senior Entrepreneur Profile",
    role: "Partner Spotlight",
    summary:
      "A profile page pattern for featuring partners, their journey, values, and areas of contribution.",
  },
  {
    name: "Affiliate Network",
    role: "Ecosystem",
    summary:
      "A simple overview of aligned affiliates, contributors, and supporting organizations.",
  },
  {
    name: "Coordinator Pathway",
    role: "Operations",
    summary:
      "A structured view of how partner coordination, support, and escalation can be presented.",
  },
];

type PageKey =
  | "home"
  | "about"
  | "publications"
  | "events"
  | "initiatives"
  | "partners"
  | "legal"
  | "governance"
  | "philosophy"
  | "privacy"
  | "standards"
  | "login"
  | "register";

function Card({
  children,
  className = "",
  padded = true,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`card ${padded ? "pad" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

function Button({
  children,
  onClick,
  primary = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className={`btn ${primary ? "btn-primary" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Topbar({ currentPage, setCurrentPage }: { currentPage: PageKey; setCurrentPage: (page: PageKey) => void }) {
  const [open, setOpen] = useState(false);
  const links: [PageKey, string][] = [
    ["home", "Home"],
    ["about", "About"],
    ["publications", "Publications"],
    ["events", "Events"],
    ["initiatives", "Initiatives"],
    ["partners", "Partners"],
    ["legal", "Legal"],
  ];

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <button className="brand" onClick={() => setCurrentPage("home")}>
          <div className="brand-badge">1%</div>
          <div>
            <div className="brand-title">The One Percent Club</div>
            <div className="brand-sub">Ownership. Discipline. Service.</div>
          </div>
        </button>

        <nav className="nav-links">
          {links.map(([key, label]) => (
            <button
              key={key}
              className={`nav-link ${currentPage === key ? "active" : ""}`}
              onClick={() => setCurrentPage(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <Button onClick={() => setCurrentPage("login")}>Login</Button>
          <Button primary onClick={() => setCurrentPage("register")}>Join as Partner</Button>
        </div>

        <button className="mobile-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mobile-panel-inner">
              {links.map(([key, label]) => (
                <button
                  key={key}
                  className="mobile-link"
                  onClick={() => {
                    setCurrentPage(key);
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
              <Button onClick={() => { setCurrentPage("login"); setOpen(false); }}>Login</Button>
              <Button primary onClick={() => { setCurrentPage("register"); setOpen(false); }}>Join as Partner</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Shell({ eyebrow, title, desc, actions, children }: { eyebrow?: string; title: string; desc?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
          <h2>{title}</h2>
          {desc ? <p className="desc">{desc}</p> : null}
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function HomePage({ setCurrentPage, setInitiativeId }: { setCurrentPage: (page: PageKey) => void; setInitiativeId: (id: string | null) => void }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="pill"><Sparkles size={16} /> A cleaner modern preview of the rebrand</div>
            <h1>A disciplined platform for entrepreneurial growth and meaningful impact.</h1>
            <p>
              The One Percent Club is built around ownership, long-term thinking, and service. This prototype presents the same structure and content direction from the redesign document in a cleaner, more modern web experience.
            </p>
            <div className="hero-actions">
              <Button primary onClick={() => setCurrentPage("about")}>Explore About</Button>
              <Button onClick={() => setCurrentPage("initiatives")}>View Initiatives</Button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="card-grid">
            <Card>
              <div className="eyebrow" style={{ letterSpacing: ".08em" }}>Mission</div>
              <h3 style={{ marginTop: ".75rem", display: "flex", gap: ".5rem", alignItems: "center" }}><Target size={18} /> Mission</h3>
              <p>To cultivate entrepreneurs grounded in integrity, service, sustainability, and leadership.</p>
            </Card>
            <Card>
              <div className="eyebrow" style={{ letterSpacing: ".08em" }}>Vision</div>
              <h3 style={{ marginTop: ".75rem", display: "flex", gap: ".5rem", alignItems: "center" }}><Globe2 size={18} /> Vision</h3>
              <p>Raise Yourself To Help Mankind — personal elevation that expands your capacity to contribute.</p>
            </Card>
            <Card className="" style={{ gridColumn: "1 / -1" } as React.CSSProperties}>
              <h3>Featured Sections</h3>
              <p>Built from the redesign structure: publications, events, initiatives, partners, governance, and standards.</p>
              <div className="two-grid" style={{ marginTop: "1rem" }}>
                {[
                  ["Publications", "publications"],
                  ["Events", "events"],
                  ["Initiatives", "initiatives"],
                  ["Partners & Affiliates", "partners"],
                  ["Governance", "governance"],
                  ["Standards", "standards"],
                ].map(([label, key]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentPage(key as PageKey)}
                    className="btn"
                    style={{ textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    {label}
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container three-grid">
          {[
            { icon: Users, title: "Leadership", text: "Programs that build clarity, accountability, communication, and execution discipline." },
            { icon: BookOpen, title: "Publications", text: "Manifestos, insights, frameworks, and thought pieces that define the operating philosophy." },
            { icon: Handshake, title: "Partnerships", text: "A growing ecosystem of affiliates, coordinators, and senior entrepreneurs contributing value." },
          ].map((item) => (
            <Card key={item.title}>
              <item.icon size={36} />
              <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
              <p>{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <Shell
        eyebrow="Initiatives"
        title="Built around action, not just language."
        desc="The site structure in the redesign suggests major initiative-led storytelling. This prototype turns that into responsive cards and detail pages."
      >
        <div className="three-grid">
          {initiatives.map((item) => (
            <Card key={item.id}>
              <item.icon size={38} />
              <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
              <p>{item.summary}</p>
              <div style={{ marginTop: "1rem" }}>
                <Button primary onClick={() => { setInitiativeId(item.id); setCurrentPage("initiatives"); }}>
                  View details <ArrowRight size={16} style={{ marginLeft: 8 }} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Shell>
    </>
  );
}

function AboutPage() {
  return (
    <Shell
      eyebrow="About"
      title="A platform built on ownership, discipline, and service."
      desc="This About page combines a clear organization overview with mission and vision instead of fragmenting them into separate shallow pages."
    >
      <div className="two-grid">
        <Card>
          <p>
            The One Percent Club was established around a core belief: sustained success is engineered, not improvised. It exists for people who want more than ambition. It exists for people who want structure, ownership, discipline, and impact.
          </p>
          <p>
            This modern web version presents the organization as a serious, clear, and trust-building platform — not a noisy funnel. The tone is calm, grounded, and forward-looking.
          </p>
          <p>
            The site architecture follows the redesign document by treating the organization as a real institution with philosophy, governance, publications, initiatives, and partner pathways.
          </p>
        </Card>
        <div className="two-grid">
          <Card className="dark-card">
            <div className="eyebrow" style={{ color: "#cbd5e1" }}>Vision</div>
            <h3 style={{ marginTop: ".8rem" }}>Raise Yourself To Help Mankind</h3>
            <p>A future where personal elevation expands one’s capacity to contribute.</p>
          </Card>
          <Card>
            <div className="eyebrow">Mission</div>
            <h3 style={{ marginTop: ".8rem" }}>Mission</h3>
            <p>To cultivate entrepreneurs grounded in integrity, service, sustainability, and leadership — people who build with intention and operate with responsibility.</p>
          </Card>
        </div>
      </div>
    </Shell>
  );
}

function PublicationsPage() {
  return (
    <Shell eyebrow="Publications" title="Ideas, frameworks, and operating documents." desc="A cleaner, easier-to-scan presentation of the publication layer shown in the redesign PDF.">
      <div className="three-grid">
        {publications.map((item) => (
          <Card key={item.title}>
            <div className="meta-chip">{item.tag}</div>
            <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
            <p>{item.summary}</p>
            <div style={{ marginTop: "1rem" }}><Button>Read Preview</Button></div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function EventsPage() {
  return (
    <Shell eyebrow="Events" title="Curated sessions and community gatherings." desc="Dummy event cards can later connect to a full calendar or RSVP workflow.">
      <div className="three-grid">
        {events.map((item) => (
          <Card key={item.title}>
            <CalendarDays size={36} />
            <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
            <div className="inline-meta"><span>{item.date}</span><span>•</span><span>{item.type}</span></div>
            <p>{item.summary}</p>
            <div style={{ marginTop: "1rem" }}><Button primary>Register Interest</Button></div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function InitiativesPage({ initiativeId, setInitiativeId }: { initiativeId: string | null; setInitiativeId: (id: string | null) => void }) {
  const active = useMemo(() => initiatives.find((i) => i.id === initiativeId) || null, [initiativeId]);

  if (active) {
    const Icon = active.icon;
    return (
      <Shell
        eyebrow="Initiative Detail"
        title={active.title}
        desc={active.details}
        actions={<Button onClick={() => setInitiativeId(null)}>Back to all initiatives</Button>}
      >
        <div className="two-grid">
          <Card>
            <Icon size={42} />
            <h3 style={{ marginTop: "1rem" }}>Overview</h3>
            <p>{active.summary} {active.details}</p>
          </Card>
          <Card>
            <h3>Sample Actions</h3>
            <ul className="list">
              <li>Present the initiative clearly with context, outcomes, and participation options.</li>
              <li>Add success stories, field notes, and media content later without redesigning the page.</li>
              <li>Use this page structure as the base for future real data integration.</li>
            </ul>
          </Card>
        </div>
      </Shell>
    );
  }

  return (
    <Shell eyebrow="Initiatives" title="Purpose-led initiatives with room to scale." desc="Each initiative begins as a clear content page and can later evolve into a full program area with media, outcomes, and registration.">
      <div className="three-grid">
        {initiatives.map((item) => (
          <Card key={item.id}>
            <item.icon size={40} />
            <h3 style={{ marginTop: "1rem" }}>{item.title}</h3>
            <p>{item.summary}</p>
            <div style={{ marginTop: "1rem" }}>
              <Button primary onClick={() => setInitiativeId(item.id)}>Open Initiative</Button>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function PartnersPage() {
  return (
    <Shell eyebrow="Partners & Affiliates" title="An ecosystem of builders, contributors, and aligned organizations." desc="This page merges partner credibility with profile-led storytelling, as suggested in the redesign PDF.">
      <div className="three-grid">
        {partners.map((item) => (
          <Card key={item.name}>
            <div className="meta-chip">{item.role}</div>
            <h3 style={{ marginTop: "1rem" }}>{item.name}</h3>
            <p>{item.summary}</p>
            <div style={{ marginTop: "1rem" }}><Button>View Profile</Button></div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function LegalHub({ setCurrentPage }: { setCurrentPage: (page: PageKey) => void }) {
  const items: [PageKey, string, string][] = [
    ["governance", "Governance", "How the organization is structured and how responsibility is framed."],
    ["philosophy", "Philosophy", "The beliefs and principles that shape how the organization thinks and operates."],
    ["privacy", "Privacy Policy", "How user information is handled, protected, and used across the platform."],
    ["standards", "Standards", "Operational standards, quality expectations, and trust-building guidelines."],
  ];

  return (
    <Shell eyebrow="Legal" title="Legal, governance, and policy documents." desc="A summary-led legal hub makes this easier to navigate without overwhelming first-time visitors.">
      <div className="two-grid">
        {items.map(([key, title, text]) => (
          <Card key={key}>
            <h3>{title}</h3>
            <p>{text}</p>
            <div style={{ marginTop: "1rem" }}><Button onClick={() => setCurrentPage(key)}>Open {title}</Button></div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function ContentPage({ eyebrow, title, desc, blocks }: { eyebrow: string; title: string; desc: string; blocks: { title: string; text: string }[] }) {
  return (
    <Shell eyebrow={eyebrow} title={title} desc={desc}>
      <div className="two-grid">
        {blocks.map((block) => (
          <Card key={block.title}>
            <h3>{block.title}</h3>
            <p>{block.text}</p>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function LoginPage({ setCurrentPage }: { setCurrentPage: (page: PageKey) => void }) {
  return (
    <Shell eyebrow="Access" title="Partner Login" desc="This is a front-end preview only. Inputs and submission behavior are dummy interactions for review purposes.">
      <div className="container" style={{ width: "min(560px, calc(100% - 2rem))" }}>
        <Card>
          <div style={{ display: "grid", gap: "1rem" }}>
            <input className="field" placeholder="Email address" />
            <input className="field" type="password" placeholder="Password" />
            <Button primary>Sign In</Button>
            <button className="nav-link" onClick={() => setCurrentPage("register")}>Need an account? Go to partner registration.</button>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function RegisterPage() {
  return (
    <Shell eyebrow="Join" title="Partner Registration" desc="This prototype keeps registration realistic enough for review, while using dummy submission behavior.">
      <div className="container" style={{ width: "min(860px, calc(100% - 2rem))" }}>
        <Card>
          <div className="form-grid">
            <input className="field" placeholder="First name" />
            <input className="field" placeholder="Last name" />
            <input className="field full" placeholder="Email address" />
            <input className="field" placeholder="Phone number" />
            <input className="field" placeholder="Country" />
            <input className="field full" placeholder="Area of interest" />
            <textarea className="textarea full" placeholder="Tell us briefly about your background" />
            <div className="full"><Button primary>Submit Registration</Button></div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Footer({ setCurrentPage }: { setCurrentPage: (page: PageKey) => void }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand-title" style={{ fontSize: "1.1rem" }}>The One Percent Club</div>
          <p style={{ maxWidth: 460 }}>
            A responsive front-end prototype based on the website redesign document. Built to be reviewable now and expandable later.
          </p>
          <div className="inline-meta" style={{ marginTop: "1rem" }}>
            <span><Mail size={14} style={{ marginRight: 6, verticalAlign: "middle" }} /> info@onepercentclub.net</span>
            <span><Phone size={14} style={{ marginRight: 6, verticalAlign: "middle" }} /> +234 000 000 0000</span>
            <span><MapPin size={14} style={{ marginRight: 6, verticalAlign: "middle" }} /> Australia / Global Network</span>
          </div>
        </div>
        <div>
          <h4>Site</h4>
          <div style={{ display: "grid", gap: ".65rem" }}>
            {[
              ["about", "About"],
              ["publications", "Publications"],
              ["events", "Events"],
              ["initiatives", "Initiatives"],
              ["partners", "Partners"],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setCurrentPage(key as PageKey)}>{label}</button>
            ))}
          </div>
        </div>
        <div>
          <h4>Legal</h4>
          <div style={{ display: "grid", gap: ".65rem" }}>
            {[
              ["governance", "Governance"],
              ["philosophy", "Philosophy"],
              ["privacy", "Privacy Policy"],
              ["standards", "Standards"],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setCurrentPage(key as PageKey)}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Site() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [initiativeId, setInitiativeId] = useState<string | null>(null);

  const page = (() => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} setInitiativeId={setInitiativeId} />;
      case "about":
        return <AboutPage />;
      case "publications":
        return <PublicationsPage />;
      case "events":
        return <EventsPage />;
      case "initiatives":
        return <InitiativesPage initiativeId={initiativeId} setInitiativeId={setInitiativeId} />;
      case "partners":
        return <PartnersPage />;
      case "legal":
        return <LegalHub setCurrentPage={setCurrentPage} />;
      case "governance":
        return (
          <ContentPage
            eyebrow="Governance"
            title="Governance, company details, and disclaimer."
            desc="A grouped governance page can hold organization details, governing posture, and important liability context while still remaining easy to scan."
            blocks={[
              { title: "Governance", text: "This section explains how the organization is guided, how accountability is maintained, and how key decisions are structured." },
              { title: "Registered Company Details", text: "One Percent Club Global Pty Ltd and its formal registration details can live here in a structured, trust-building format." },
              { title: "Disclaimer", text: "This section sets legal boundaries around content, representation, and the use of information presented on the site." },
            ]}
          />
        );
      case "philosophy":
        return (
          <ContentPage
            eyebrow="Philosophy"
            title="The thinking behind the standard."
            desc="This page translates the philosophy shown in the redesign into a cleaner and more readable section-based experience."
            blocks={[
              { title: "Ownership", text: "The philosophy emphasizes personal responsibility over excuse-making and long-term structure over short-term emotion." },
              { title: "Discipline", text: "Consistency, standards, and internal order are treated as the real foundations of sustainable success." },
              { title: "Service", text: "Growth is not framed as private gain alone. The deeper model is growth that expands capacity to help others." },
            ]}
          />
        );
      case "privacy":
        return (
          <ContentPage
            eyebrow="Privacy Policy"
            title="How information is handled on the platform."
            desc="This dedicated page makes the privacy layer easier to locate for users, partners, and third-party compliance checks."
            blocks={[
              { title: "Information Collected", text: "A future full version can describe what personal data is collected through forms, browsing activity, and communication channels." },
              { title: "How Information Is Used", text: "This section can explain service delivery, communication, records management, and analytical use in plain language." },
              { title: "Data Protection", text: "This section can later include data retention, storage, third-party processors, and user rights." },
            ]}
          />
        );
      case "standards":
        return (
          <ContentPage
            eyebrow="Standards"
            title="Standards that shape culture and execution."
            desc="This page can carry the quality expectations, conduct standards, and operating rules that define the organization’s internal discipline."
            blocks={[
              { title: "Communication", text: "Clear communication, consistency, and respectful professionalism are treated as baseline standards." },
              { title: "Conduct", text: "Partners are expected to act with integrity, accountability, and seriousness in how they represent the organization." },
              { title: "Execution", text: "Standards exist to turn aspiration into repeatable action, not performative language." },
            ]}
          />
        );
      case "login":
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case "register":
        return <RegisterPage />;
    }
  })();

  return (
    <>
      <Topbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <AnimatePresence mode="wait">
        <motion.main
          key={`${currentPage}-${initiativeId ?? "root"}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {page}
        </motion.main>
      </AnimatePresence>
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
