import Link from 'next/link';

const UNIVERSES = [
  { slug: 'scholar', label: 'Scholar', emoji: '📐' },
  { slug: 'code-cosmos', label: 'Code Cosmos', emoji: '💻' },
  { slug: 'battle-ground', label: 'Battle Ground', emoji: '⚔️' },
  { slug: 'career', label: 'Career', emoji: '🚀' },
  { slug: 'civilization', label: 'Civilization', emoji: '🏛️' },
  { slug: 'knowledge', label: 'Knowledge', emoji: '🔬' },
  { slug: 'curiosity', label: 'Curiosity', emoji: '✨' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(255,215,0,0.02) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 1.5rem 1.5rem',
        marginTop: '4rem',
      }}
    >
      <div style={{ maxWidth: '72rem', marginInline: 'auto' }}>
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#FFD700',
                marginBottom: '0.5rem',
              }}
            >
              ⚡ ZING
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              India&apos;s most cinematic knowledge platform. Learn through 7 immersive universes.
            </p>
          </div>

          {/* Universes */}
          <div>
            <h4 style={headingStyle}>Universes</h4>
            <ul style={listStyle}>
              {UNIVERSES.map((u) => (
                <li key={u.slug}>
                  <Link href={`/${u.slug}`} style={linkStyle}>
                    {u.emoji} {u.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h4 style={headingStyle}>Popular Topics</h4>
            <ul style={listStyle}>
              {[
                { href: '/scholar/math/pythagorean-theorem', label: 'Pythagorean Theorem' },
                { href: '/code-cosmos/foundations/what-is-an-api', label: 'What is an API?' },
                { href: '/battle-ground/upsc/upsc-preparation-guide', label: 'UPSC Preparation' },
                { href: '/knowledge/space/how-black-holes-work', label: 'How Black Holes Work' },
                { href: '/code-cosmos/foundations/git-github-beginners', label: 'Git & GitHub' },
              ].map((t) => (
                <li key={t.href}>
                  <Link href={t.href} style={linkStyle}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 style={headingStyle}>Connect</h4>
            <ul style={listStyle}>
              <li>
                <a href="https://x.com/ZingPlatform" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  𝕏 Twitter / X
                </a>
              </li>
              <li>
                <a href="https://github.com/zing-platform" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  💻 GitHub
                </a>
              </li>
              <li>
                <a href="mailto:hello@zing-alpha.vercel.app" style={linkStyle}>
                  ✉️ Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '1rem' }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          <p style={{ margin: 0 }}>
            © {year} ZING. Built for India&apos;s curious minds.
          </p>
          <p style={{ margin: 0 }}>
            Made with ❤️ for every student who stayed curious.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Shared styles ── */

const headingStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: 'rgba(255,255,255,0.6)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '0.75rem',
  marginTop: 0,
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
};

const linkStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'rgba(255,255,255,0.5)',
  textDecoration: 'none',
  transition: 'color 0.15s',
};
