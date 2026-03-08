/**
 * ⚡ Knowledge Galaxy — 2D Force-Directed Graph (D3.js-style)
 *
 * Visualizes topic connections as an interactive graph.
 * This is the 2D fallback (used when device tier is 'low' or 'mid').
 *
 * Uses pure Canvas2D for performance — no Three.js dependency.
 * Client Component.
 */
'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface GalaxyNode {
  id: string;
  label: string;
  universe: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface GalaxyEdge {
  source: string;
  target: string;
  strength: number;
}

interface KnowledgeGalaxyProps {
  topics: Array<{
    slug: string;
    title: string;
    universe: string;
  }>;
  connections: Array<{
    from: string;
    to: string;
    strength: number;
  }>;
  universeColors?: Record<string, string>;
  onTopicClick?: (slug: string) => void;
}

const DEFAULT_COLORS: Record<string, string> = {
  'scholar': '#3B82F6',
  'code-cosmos': '#10B981',
  'battle-ground': '#EF4444',
  'career': '#F59E0B',
  'civilization': '#8B5CF6',
  'knowledge': '#06B6D4',
  'curiosity': '#EC4899',
};

export default function KnowledgeGalaxy({
  topics,
  connections,
  universeColors = DEFAULT_COLORS,
  onTopicClick,
}: KnowledgeGalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodesRef = useRef<GalaxyNode[]>([]);
  const edgesRef = useRef<GalaxyEdge[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize nodes
  useEffect(() => {
    const w = canvasRef.current?.width ?? 800;
    const h = canvasRef.current?.height ?? 600;

    nodesRef.current = topics.map((t) => ({
      id: t.slug,
      label: t.title,
      universe: t.universe,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      radius: 6,
    }));

    edgesRef.current = connections.map((c) => ({
      source: c.from,
      target: c.to,
      strength: c.strength,
    }));
  }, [topics, connections]);

  // Force simulation + render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    function tick() {
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Force simulation
      // 1. Repulsion (all pairs)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j]!.x - nodes[i]!.x;
          const dy = nodes[j]!.y - nodes[i]!.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 800 / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i]!.vx -= fx;
          nodes[i]!.vy -= fy;
          nodes[j]!.vx += fx;
          nodes[j]!.vy += fy;
        }
      }

      // 2. Attraction (connected edges)
      for (const edge of edges) {
        const src = nodes.find((n) => n.id === edge.source);
        const tgt = nodes.find((n) => n.id === edge.target);
        if (!src || !tgt) continue;
        const dx = tgt.x - src.x;
        const dy = tgt.y - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 120) * 0.01 * edge.strength;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        src.vx += fx;
        src.vy += fy;
        tgt.vx -= fx;
        tgt.vy -= fy;
      }

      // 3. Center gravity
      for (const node of nodes) {
        node.vx += (w / 2 - node.x) * 0.001;
        node.vy += (h / 2 - node.y) * 0.001;
      }

      // 4. Apply velocity with damping
      for (const node of nodes) {
        node.vx *= 0.9;
        node.vy *= 0.9;
        node.x += node.vx;
        node.y += node.vy;
        // Bounds
        node.x = Math.max(20, Math.min(w - 20, node.x));
        node.y = Math.max(20, Math.min(h - 20, node.y));
      }

      // Render
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Draw edges
      for (const edge of edges) {
        const src = nodes.find((n) => n.id === edge.source);
        const tgt = nodes.find((n) => n.id === edge.target);
        if (!src || !tgt) continue;
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = `rgba(255,255,255,${0.03 + edge.strength * 0.07})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const color = universeColors[node.universe] ?? '#FFD700';
        const isHovered = hoveredNode === node.id;

        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 10 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? color : `${color}88`;
        ctx.fill();

        // Glow
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = `${color}20`;
          ctx.fill();
        }

        // Label (show on hover or if few nodes)
        if (isHovered || nodes.length <= 15) {
          ctx.font = '11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = isHovered ? '#fff' : 'rgba(255,255,255,0.5)';
          ctx.fillText(node.label, node.x, node.y - 14);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    }

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [hoveredNode, universeColors]);

  // Mouse interaction
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };

      // Find hovered node
      const found = nodesRef.current.find((n) => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 15;
      });
      setHoveredNode(found?.id ?? null);
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const found = nodesRef.current.find((n) => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 15;
      });

      if (found && onTopicClick) {
        onTopicClick(found.id);
      }
    },
    [onTopicClick]
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '24rem',
        position: 'relative',
        background: 'rgba(10,10,10,0.5)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{
          width: '100%',
          height: '100%',
          cursor: hoveredNode ? 'pointer' : 'default',
        }}
      />
      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {Object.entries(universeColors)
          .filter(([u]) => topics.some((t) => t.universe === u))
          .map(([universe, color]) => (
            <span
              key={universe}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.625rem',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: color,
                }}
              />
              {universe}
            </span>
          ))}
      </div>
      {/* Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.375rem 0.75rem',
            borderRadius: '0.5rem',
            background: 'rgba(20,20,20,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.8)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {topics.find((t) => t.slug === hoveredNode)?.title} — Click to explore
        </div>
      )}
    </div>
  );
}
