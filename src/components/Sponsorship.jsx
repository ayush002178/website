import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Sponsorship({ sponsor, sectionName, accentColor = 'var(--c1)' }) {
  const mailToSubject = encodeURIComponent(`Sponsorship Inquiry - ${sectionName}`);
  const mailToBody = encodeURIComponent(`Hi Odisha AI Team,\n\nWe are interested in discussing sponsorship opportunities for the ${sectionName}.\n\nBest regards,\n[Your Name/Company]`);

  return (
    <div 
      className="card card-glow"
      style={{
        marginTop: '3.5rem',
        padding: '2.5rem',
        border: `1px solid var(--border)`,
        borderRadius: 'var(--r3)',
        background: 'linear-gradient(180deg, var(--bg3) 0%, rgba(13,13,13,0.7) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}0e 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} 
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title */}
        <div 
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 800,
            color: accentColor,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '1.75rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: accentColor }} />
          Sponsorship
        </div>

        {/* Dynamic Sponsor Content */}
        {sponsor ? (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem',
              background: 'rgba(255, 255, 255, 0.015)',
              padding: '1.5rem',
              borderRadius: 'var(--r2)',
              border: '1px solid rgba(255,255,255,0.04)'
            }}
          >
            {/* Sponsor Logo container */}
            <div 
              style={{
                background: '#ffffff',
                padding: '1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                height: '75px',
                flexShrink: 0,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            >
              <img 
                src={sponsor.logo} 
                alt={sponsor.name} 
                style={{ 
                  maxHeight: '100%', 
                  maxWidth: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </div>
            {/* Sponsor Text */}
            <div style={{ flex: 1, minWidth: '240px' }}>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                {sponsor.desc || `This program is made possible by the generous support of ${sponsor.name}.`}
              </p>
              {sponsor.url && (
                <a 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.3rem', 
                    fontSize: '0.8rem', 
                    marginTop: '0.5rem', 
                    color: accentColor, 
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Visit Sponsor Website <ArrowRight size={12} />
                </a>
              )}
            </div>
          </div>
        ) : null}

        {/* Invitation / Call to Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            Support Odisha's AI Ecosystem
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text2)', margin: 0, maxWidth: '780px' }}>
            We invite forward-thinking businesses, foundations, and community members to sponsor <strong>{sectionName}</strong>. 
            By partnering with Odisha AI, your organization gains prominent brand visibility among premium AI practitioners, research scholars, developers, and educators while empowering low-barrier-to-entry education.
          </p>

          <div style={{ marginTop: '0.5rem' }}>
            <a 
              href={`mailto:info@odishaai.org?subject=${mailToSubject}&body=${mailToBody}`}
              className="btn btn-outline"
              style={{ 
                borderColor: accentColor, 
                color: accentColor, 
                gap: '0.6rem',
                fontSize: '0.82rem',
                padding: '0.6rem 1.2rem',
                background: 'transparent'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = `${accentColor}0d`;
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.color = accentColor;
              }}
            >
              <Mail size={14} /> Become a Sponsor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
