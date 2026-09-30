import React, { useState } from 'react';

const LOGO_IMAGE_MAP = {
  accenture: '/logos/accenture.jpeg',
  tcs: '/logos/tcs.jpeg',
  hexaware: '/logos/hexaware.jpeg',
  mphasis: '/logos/mphasis.jpeg',
  hcltech: '/logos/hcltech.jpeg',
  capgemini: '/logos/capgemini.jpeg',
  techmahindra: '/logos/techmahindra.jpeg',
  ltimindtree: '/logos/ltimindtree.jpeg',
  wipro: '/logos/wipro.jpeg',
  infosys: '/logos/infosys.jpeg',
  coforge: '/logos/coforge.jpeg',
  cognizant: '/logos/cognizant.jpeg',
  virtusa: '/logos/virtusa.jpeg',
  birlasoft: '/logos/birlasoft.jpeg',
  persistent: '/logos/persistent.jpeg',
  ust: '/logos/ust.jpeg',
  genpact: '/logos/genpact.jpeg',
  ey: '/logos/ey.jpeg',
  kpmg: '/logos/kpmg.jpeg',
  pwc: '/logos/pwc.jpeg',
  deloitte: '/logos/deloitte.jpeg',
  ibm: '/logos/ibm.jpeg',
  cgi: '/logos/cgi.jpeg',
  dxc: '/logos/dxc.jpeg',
  zoho: '/logos/zoho.jpg'
};

export const CompanyLogo = ({ id, size = 42, className = '' }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const imageSrc = LOGO_IMAGE_MAP[id];

  if (imageSrc && !imgFailed) {
    return (
      <div 
        className={`company-logo-img-wrapper ${className}`} 
        style={{ 
          width: size, 
          height: size, 
          borderRadius: '8px', 
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: '#FFFFFF', 
          padding: '2px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          flexShrink: 0
        }}
      >
        <img 
          src={imageSrc} 
          alt={`${id} Logo`} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  // Fallback SVGs for any non-mapped company
  switch (id) {
    case 'tcs':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <rect width="100" height="100" rx="20" fill="#004B87" />
          <path d="M25 35H75M50 35V75M35 55H65" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );
    case 'accenture':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <rect width="100" height="100" rx="20" fill="#0A0A0A" stroke="rgba(161,0,255,0.3)" strokeWidth="2" />
          <path d="M30 30L70 50L30 70" stroke="#A100FF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'infosys':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <rect width="100" height="100" rx="20" fill="#007CC3" />
          <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900">Infosys</text>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <rect width="100" height="100" rx="20" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
          <circle cx="50" cy="50" r="22" stroke="#C5A880" strokeWidth="6" fill="none" />
          <text x="50" y="57" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif">
            {(id || 'IF').substring(0, 2).toUpperCase()}
          </text>
        </svg>
      );
  }
};

export const BrandLogo = ({ size = 36 }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #C5A880 0%, #8A8A8A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(197, 168, 128, 0.3)'
      }}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      </div>
      <span className="brand-text" style={{
        fontSize: '1.35rem',
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: '-0.03em'
      }}>
        INTERVIEW<span style={{ color: '#C5A880' }}>FORGE</span>
      </span>
    </div>
  );
};
