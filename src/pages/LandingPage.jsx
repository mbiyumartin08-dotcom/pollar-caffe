// src/components/LandingPage.jsx  (route: /)
// Hero, About and footer. The navbar comes from PublicLayout.
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

const STATS = [
  { value: "23+", label: "Handcrafted Drinks & Bites" },
  { value: "5", label: "Curated Menu Categories" },
  { value: "100%", label: "Eastlands Community Vibe" },
];

const PILLARS = [
  {
    title: "Community First",
    text: "A welcoming third space where regulars become friends and local vendors get the spotlight.",
    tone: "solid",
  },
  {
    title: "Feels Like Home",
    text: "Warm hospitality, comfortable seating, and a menu priced for everyday visits—not just special occasions.",
    tone: "soft",
  },
  {
    title: "Rooted in Culture",
    text: "Celebrating Nairobi's music, art, fitness, and street culture one cup at a time.",
    tone: "outline",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="hero-pill">
            <i className="dot" /> BURUBURU PHASE 5 • NAIROBI
          </span>
          <h1>Specialty coffee, built for community.</h1>
          <p>
            Your neighborhood hangout along Mumias South Road. Drop in for handcrafted Kenyan
            espresso, signature coolers, warm pastries, and weekend pop-up experiences.
          </p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore the Menu
            </Link>
            <a href="#about" className="btn btn-outline btn-lg">
              Our Story
            </a>
          </div>
          <div className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <img src={hero} alt="Three iced Polar drinks held up together" />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-text">
          <span className="eyebrow">ABOUT POLAR</span>
          <h2>Community. Home. Culture.</h2>
          <p>
            Born in the heart of Buruburu Phase 5 along Mumias South Road (opposite CITAM), Polar
            was created to bring specialty café culture closer to home in Eastlands. We believe you
            shouldn't have to cross town to find great coffee, fast Wi-Fi, and an inspiring
            atmosphere.
          </p>
          <p>
            By day, Polar is a cozy spot to work, study, and unwind over locally sourced coffee and
            fresh bakes. By weekend, our space transforms into a lively cultural hub—hosting pop-up
            markets, live DJ sessions, game nights, and community runs that bring Nairobi together.
          </p>
        </div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={`pillar ${p.tone}`}>
              <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <strong className="footer-brand">Polar</strong>
        <span>Mumias South Road, opposite CITAM • Buruburu Phase 5, Nairobi</span>
        <span className="footer-tag">Community | Home | Culture</span>
      </footer>
    </>
  );
}
