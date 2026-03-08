import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const UNIVERSE_COLORS: Record<string, string> = {
  scholar: '#3B82F6',
  'code-cosmos': '#10B981',
  'battle-ground': '#EF4444',
  career: '#F59E0B',
  civilization: '#8B5CF6',
  knowledge: '#06B6D4',
  curiosity: '#EC4899',
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'ZING';
  const universe = searchParams.get('universe') ?? '';
  const subtitle = searchParams.get('subtitle') ?? '';

  const color = UNIVERSE_COLORS[universe] ?? '#FFD700';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0a0a0a',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: `linear-gradient(90deg, ${color}, #FFD700)`,
          }}
        />

        {/* Universe badge */}
        {universe && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: `${color}22`,
              border: `1px solid ${color}44`,
              color: color,
              fontSize: '20px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {universe.replace(/-/g, ' ')}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? '48px' : '64px',
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '20px',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: 1.5,
            }}
          >
            {subtitle.length > 120 ? subtitle.slice(0, 120) + '...' : subtitle}
          </div>
        )}

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFD700',
              letterSpacing: '-0.04em',
            }}
          >
            ⚡ ZING
          </div>
          <div
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            India&apos;s Knowledge Platform
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
