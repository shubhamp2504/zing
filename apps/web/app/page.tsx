import type { Metadata } from "next";
import Link from "next/link";
import { UNIVERSES } from "@/lib/universes";
import SearchTriggerButton from "@/components/home/SearchTriggerButton";
import FeaturedTopics from "@/components/home/FeaturedTopics";
import LivingWall from "@/components/home/LivingWall";
import ScrollReveal from "@/components/scrollytelling/ScrollReveal";
import AnimatedUniverseGrid from "@/components/home/AnimatedUniverseGrid";
import HeroLottie from "@/components/home/HeroLottie";

export const metadata: Metadata = {
  title: "ZING — India's Knowledge Universe",
};

export default function HomePage() {

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <header
        className="zing-home-hero"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 1.5rem 3rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,215,0,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <HeroLottie />

        <h1
          className="text-gradient-gold"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}
        >
          ZING
        </h1>

        <p
          style={{
            fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "32rem",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          India&apos;s most cinematic knowledge platform.
          <br />
          <span style={{ color: "rgba(255,255,255,0.85)" }}>
            7 Universes. Infinite Knowledge.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="zing-cta-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/scholar"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0.1))",
              border: "1px solid rgba(255,215,0,0.3)",
              borderRadius: "2rem",
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            ⚡ Start Exploring
          </Link>
          <SearchTriggerButton />
        </div>
      </header>

      {/* Value Proposition */}
      <ScrollReveal delay={100}>
      <section className="zing-section" style={{ padding: "2rem 1.5rem 3rem", maxWidth: "72rem", marginInline: "auto", width: "100%" }}>
        <div className="zing-value-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {[
            { icon: "📱", label: "Story Mode", desc: "Instagram-style learning" },
            { icon: "👆", label: "Swipe Cards", desc: "Tinder-style flashcards" },
            { icon: "🎬", label: "Cinematic", desc: "Full-screen immersion" },
            { icon: "🇮🇳", label: "Desi Analogies", desc: "Cricket, chai & more" },
          ].map((f) => (
            <div key={f.label} style={{ textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>{f.icon}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{f.label}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* Universe Grid — Animated with framer-motion */}
      <ScrollReveal delay={150}>
      <main
        className="zing-section"
        style={{
          flex: 1,
          padding: "0 1.5rem 3rem",
          maxWidth: "72rem",
          width: "100%",
          marginInline: "auto",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "rgba(255,255,255,0.8)" }}>
          Explore 7 Universes
        </h2>
        <AnimatedUniverseGrid universes={UNIVERSES} />
      </main>
      </ScrollReveal>

      {/* Featured Topics (client-side fetched) */}
      <FeaturedTopics />

      {/* Living Wall — editorial feed */}
      <LivingWall />
    </div>
  );
}
