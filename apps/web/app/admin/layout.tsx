/**
 * ⚡ Admin Layout — Protected route group
 *
 * Server Component. In production, checks NextAuth admin role.
 * For now, always renders (auth to be added when NextAuth is configured).
 */

import type { ReactNode } from 'react';
import AdminGate from '../../components/admin/AdminGate';

export const metadata = {
  title: 'Admin | ZING',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGate>
      <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        color: 'rgba(255,255,255,0.9)',
      }}
    >
      {/* Admin Sidebar */}
      <nav
        className="admin-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '14rem',
          height: '100vh',
          background: 'rgba(15,15,15,0.95)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          zIndex: 50,
        }}
      >
        <a
          href="/"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#FFD700',
            textDecoration: 'none',
            marginBottom: '1.5rem',
          }}
        >
          ⚡ <span className="admin-logo-text">ZING Admin</span>
        </a>

        {[
          { href: '/admin', label: 'Dashboard', icon: '📊' },
          { href: '/admin/pipeline', label: 'Pipeline', icon: '📝' },
          { href: '/admin/create', label: 'Create', icon: '✍️' },
          { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
          { href: '/admin/translate', label: 'Translate', icon: '🌐' },
          { href: '/admin/connect', label: 'Connections', icon: '🔗' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'background 0.1s',
            }}
          >
            <span>{item.icon}</span>
            <span className="admin-nav-label">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <main
        className="admin-main"
        style={{
          marginLeft: '14rem',
          padding: '2rem',
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </div>
    </AdminGate>
  );
}
