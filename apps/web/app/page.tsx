import type { Metadata } from "next";
import Link from "next/link";
import SearchTriggerButton from "@/components/home/SearchTriggerButton";

export const metadata: Metadata = {
  title: "ZING — India's Knowledge Universe",
  description: "Learn anything. Understand everything. 7 universes of knowledge.",
};

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem"
    }}>
      {/* Minimal Hero */}
      <main style={{ 
        maxWidth: "48rem", 
        width: "100%",
        textAlign: "center" 
      }}>
        {/* Logo/Title */}
        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ZING
        </h1>

        {/* Tagline */}
        <p style={{ 
          fontSize: "clamp(1rem, 3vw, 1.25rem)", 
          color: "rgba(255,255,255,0.6)",
          marginBottom: "3rem",
          lineHeight: 1.5
        }}>
          Learn anything. Understand everything.
        </p>

        {/* Search Bar */}
        <div style={{ marginBottom: "3rem" }}>
          <SearchTriggerButton />
        </div>

        {/* 3 Quick Shortcuts */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1rem",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          <Link
            href="/scholar"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              padding: "2rem 1.5rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "0.75rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            className="glass-card-hover"
          >
            <span style={{ fontSize: "2.5rem" }}>📚</span>
            <span style={{ 
              fontSize: "0.9375rem", 
              fontWeight: 600, 
              color: "rgba(255,255,255,0.9)" 
            }}>
              Student
            </span>
            <span style={{ 
              fontSize: "0.75rem", 
              color: "rgba(255,255,255,0.5)",
              textAlign: "center"
            }}>
              School & Exams
            </span>
          </Link>

          <Link
            href="/code-cosmos"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              padding: "2rem 1.5rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "0.75rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            className="glass-card-hover"
          >
            <span style={{ fontSize: "2.5rem" }}>💻</span>
            <span style={{ 
              fontSize: "0.9375rem", 
              fontWeight: 600, 
              color: "rgba(255,255,255,0.9)" 
            }}>
              Code
            </span>
            <span style={{ 
              fontSize: "0.75rem", 
              color: "rgba(255,255,255,0.5)",
              textAlign: "center"
            }}>
              Learn Programming
            </span>
          </Link>

          <Link
            href="/knowledge"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              padding: "2rem 1.5rem",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "0.75rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            className="glass-card-hover"
          >
            <span style={{ fontSize: "2.5rem" }}>🤔</span>
            <span style={{ 
              fontSize: "0.9375rem", 
              fontWeight: 600, 
              color: "rgba(255,255,255,0.9)" 
            }}>
              Curious
            </span>
            <span style={{ 
              fontSize: "0.75rem", 
              color: "rgba(255,255,255,0.5)",
              textAlign: "center"
            }}>
              Explore Topics
            </span>
          </Link>
        </div>

        {/* Small Browse Link */}
        <div style={{ marginTop: "3rem" }}>
          <Link 
            href="/scholar" 
            style={{ 
              fontSize: "0.875rem", 
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            or browse all 7 universes →
          </Link>
        </div>
      </main>
    </div>
  );
}
