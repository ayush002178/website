import React, { useRef, useEffect, useState } from 'react';

const MILESTONES = [
  // Row 1 (top → right)
  {
    year: '2018',
    title: 'First Steps',
    desc: 'Odia, an initiative to bring machine translation for the Odia language, started.',
    color: '#a78bfa', // violet
    row: 0,
  },
  {
    year: '2020',
    title: 'Global Community',
    desc: 'Odias in ML started as a global community of Odias interested in machine learning worldwide.',
    color: '#f472b6', // pink
    row: 0,
  },
  {
    year: '2020',
    title: 'First Global Conference',
    desc: 'The annual global virtual conference of the Odias in ML community started.',
    color: '#fb923c', // orange
    row: 0,
  },
  {
    year: '2020',
    title: 'Odia NLP',
    desc: 'OdiaNLP project started, contributing language models, NMT, dictionary, monolingual news corpus, and spell checker for Odia.',
    color: '#fbbf24', // amber
    row: 0,
  },
  // Row 2 (right → left)
  {
    year: '2021',
    title: 'AI/ML Lecture Series',
    desc: 'AI/ML lecture series on YouTube and events on Children\'s Day for kids started.',
    color: '#34d399', // emerald
    row: 1,
  },
  {
    year: '2021',
    title: '2nd Global Conference',
    desc: 'The second global annual conference was organized.',
    color: '#4ade80', // green
    row: 1,
  },
  {
    year: '2021',
    title: 'Twitter Spaces',
    desc: 'Twitter Spaces were organized where respected guests were invited to discuss AI/ML topics. Shabarasa, an Odia Wordle game, started from here.',
    color: '#facc15', // yellow
    row: 1,
  },
  // Row 3 (left → right)
  {
    year: '2022',
    title: 'Summer School & FDP',
    desc: 'A summer school workshop program for students and a faculty development program for faculties have been conducted.',
    color: '#60a5fa', // blue
    row: 2,
  },
  {
    year: '2022',
    title: '3rd Global Conference',
    desc: '3rd annual global conference with a hybrid model was organized. Chapter leads have been introduced in the community.',
    color: '#f9a8d4', // light pink
    row: 2,
  },
  {
    year: '2023',
    title: 'OdiaGenAI',
    desc: 'After the Generative AI revolution, a few community members started a project around Generative AI development in Odia and other languages.',
    color: '#f472b6', // pink
    row: 2,
  },
  {
    year: '2023',
    title: '4th Global Conference',
    desc: 'The fourth and longest continuous (11 hrs) global conference has been organized.',
    color: '#fb923c', // orange
    row: 2,
  },
  // Row 4 (right → left — new 2024–2025)
  {
    year: '2024',
    title: 'AI Foundation Series',
    desc: 'AI Foundation Series launched — a 20-session continuum covering AI fundamentals from linear algebra to transformers, sponsored by Deep Surge AI.',
    color: '#00d4ff', // cyan
    row: 3,
  },
  {
    year: '2024',
    title: '5th Global Conference',
    desc: 'Fifth annual Odisha AI Conference — an all-day global congregation of Odias in AI, academicians, policy makers, and industry practitioners.',
    color: '#c084fc', // purple
    row: 3,
  },
  {
    year: '2025',
    title: 'Rathathon',
    desc: 'Rathathon — a perpetual 24/7 AI hackathon — launched to build real-world AI products in a barrier-free, community-driven environment.',
    color: '#4ade80', // green
    row: 3,
  },
  {
    year: '2025',
    title: 'AI Summit 2025',
    desc: 'Odisha AI Summit 2025 in Bhubaneshwar — a landmark gathering of educators, policy makers, entrepreneurs, and investors charting Odisha\'s AI future.',
    color: '#fbbf24', // gold
    row: 3,
    upcoming: true,
  },
];

// Group into rows
const ROWS = [0, 1, 2, 3].map(r => MILESTONES.filter(m => m.row === r));
// Rows 0 and 2 go L→R; rows 1 and 3 go R→L
const ROW_DIRECTION = ['ltr', 'rtl', 'ltr', 'rtl'];

function MilestoneCard({ m, index, visible }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      flex: '1 1 0', minWidth: 0,
    }}>
      {/* Year pill */}
      <div style={{
        padding: '0.3rem 1rem',
        borderRadius: '999px',
        background: `${m.color}22`,
        border: `1.5px solid ${m.color}`,
        color: m.color,
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: '0.9rem',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
        boxShadow: `0 0 14px ${m.color}33`,
      }}>
        {m.year}
        {m.upcoming && <span style={{ fontSize: '0.6rem', marginLeft: '0.4rem', opacity: 0.8 }}>upcoming</span>}
      </div>

      {/* Connector dot + line */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: m.color,
          boxShadow: `0 0 8px ${m.color}`,
          flexShrink: 0,
        }} />
        <div style={{ width: 1.5, height: 18, background: `${m.color}55` }} />
      </div>

      {/* Card */}
      <div style={{
        background: 'rgba(15,15,25,0.9)',
        border: `1px solid ${m.color}33`,
        borderTop: `2.5px solid ${m.color}`,
        borderRadius: '12px',
        padding: '1rem 1.1rem',
        width: '100%',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
        onMouseOver={e => {
          e.currentTarget.style.borderColor = m.color;
          e.currentTarget.style.boxShadow = `0 0 24px ${m.color}22, 0 8px 32px rgba(0,0,0,0.5)`;
        }}
        onMouseOut={e => {
          e.currentTarget.style.borderColor = `${m.color}33`;
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        }}
      >
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '0.88rem',
          color: m.color,
          marginBottom: '0.45rem',
          lineHeight: 1.25,
        }}>
          {m.title}
        </div>
        <p style={{
          margin: 0,
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.65,
        }}>
          {m.desc}
        </p>
      </div>
    </div>
  );
}

export default function JourneyTimeline() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: 'linear-gradient(135deg, #0a0a16 0%, #0d0820 50%, #0a0a16 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '3rem 2rem 2.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Starfield dots */}
      {[...Array(32)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 2 + 1,
          height: Math.random() * 2 + 1,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.4)',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{
          fontSize: '0.7rem',
          fontFamily: "'JetBrains Mono', monospace",
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          ODIAS IN ML
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fff 30%, rgba(191,90,242,0.8))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem',
        }}>
          Odias in AI/ML Journey
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.85rem',
          fontStyle: 'italic',
        }}>
          A community timeline of milestones, initiatives, and conferences
        </p>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {ROWS.map((row, ri) => {
          const isRtl = ROW_DIRECTION[ri] === 'rtl';
          const orderedRow = isRtl ? [...row].reverse() : row;
          const globalOffset = ROWS.slice(0, ri).reduce((a, r) => a + r.length, 0);

          return (
            <div key={ri}>
              {/* Dashed connector line */}
              <div style={{
                height: 0,
                borderTop: '1.5px dashed rgba(255,255,255,0.12)',
                margin: '0 0 1rem',
                position: 'relative',
              }}>
                {/* Arrow tip */}
                <div style={{
                  position: 'absolute',
                  right: isRtl ? 'auto' : -6,
                  left: isRtl ? -6 : 'auto',
                  top: -5,
                  width: 0, height: 0,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  [isRtl ? 'borderRight' : 'borderLeft']: '8px solid rgba(255,255,255,0.25)',
                }} />
              </div>

              {/* Cards row */}
              <div
                className="timeline-row"
                style={{
                  display: 'flex',
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}>
                {orderedRow.map((m, ci) => (
                  <MilestoneCard
                    key={`${ri}-${ci}`}
                    m={m}
                    index={globalOffset + ci}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'right',
        marginTop: '2rem',
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.25)',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        For more details: odishaai.org/initiatives/
      </div>
    </div>
  );
}
