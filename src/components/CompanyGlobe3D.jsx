import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { COMPANIES } from '../data/mockData';
import { CompanyLogo } from './CompanyLogos';
import './CompanyGlobe3D.css';

export const CompanyGlobe3D = ({ onSelectCompany }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredCompanyId, setHoveredCompanyId] = useState(null);
  const [cardPositions, setCardPositions] = useState([]);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveringCard = useRef(false);

  // Top 25 companies list from mockData
  const companyList = COMPANIES.slice(0, 25);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 10;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Globe Particle Sphere (Lightweight, Airy Digital Earth)
    const globeRadius = 3.05;
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xC5A880);
    const colorDim = new THREE.Color(0x443322);
    const colorBright = new THREE.Color(0xFFF0DD);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = globeRadius * Math.cos(theta) * Math.sin(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixedColor = Math.random() > 0.85 ? colorBright : (Math.random() > 0.4 ? colorGold : colorDim);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const globePoints = new THREE.Points(geometry, material);
    scene.add(globePoints);

    // 5. Latitude & Longitude Grid Rings (Lighter & Subtle)
    const gridGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xC5A880,
      transparent: true,
      opacity: 0.08
    });

    [-1.5, -0.75, 0.75, 1.5].forEach((yPos) => {
      const ringRadius = Math.sqrt(Math.max(0, globeRadius * globeRadius - yPos * yPos));
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(ringRadius * Math.cos(theta), yPos, ringRadius * Math.sin(theta)));
      }
      ringGeo.setFromPoints(points);
      const ringLine = new THREE.Line(ringGeo, ringMat);
      gridGroup.add(ringLine);
    });

    // Equator Ring
    const equatorGeo = new THREE.BufferGeometry();
    const eqPoints = [];
    for (let j = 0; j <= 64; j++) {
      const theta = (j / 64) * Math.PI * 2;
      eqPoints.push(new THREE.Vector3(globeRadius * Math.cos(theta), 0, globeRadius * Math.sin(theta)));
    }
    equatorGeo.setFromPoints(eqPoints);
    const equatorLine = new THREE.Line(equatorGeo, new THREE.LineBasicMaterial({ color: 0xC5A880, transparent: true, opacity: 0.18 }));
    gridGroup.add(equatorLine);

    scene.add(gridGroup);

    // 6. Orbital Rings & Light Pulses
    const orbitalGroup = new THREE.Group();
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0xC5A880,
      transparent: true,
      opacity: 0.18
    });

    const orbits = [
      { radius: 4.1, rotX: Math.PI / 3, rotY: Math.PI / 6, speed: 0.003 },
      { radius: 4.5, rotX: -Math.PI / 4, rotY: -Math.PI / 5, speed: -0.002 },
      { radius: 4.9, rotX: Math.PI / 6, rotY: -Math.PI / 3, speed: 0.002 }
    ];

    const pulseNodes = [];

    orbits.forEach((orb) => {
      const orbitGeo = new THREE.BufferGeometry();
      const points = [];
      for (let j = 0; j <= 90; j++) {
        const theta = (j / 90) * Math.PI * 2;
        points.push(new THREE.Vector3(orb.radius * Math.cos(theta), 0, orb.radius * Math.sin(theta)));
      }
      orbitGeo.setFromPoints(points);
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.rotation.x = orb.rotX;
      orbitLine.rotation.y = orb.rotY;
      orbitalGroup.add(orbitLine);

      // Light Pulse Node
      const pulseGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xFFF0DD, transparent: true, opacity: 0.85 });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      orbitalGroup.add(pulseMesh);
      pulseNodes.push({ mesh: pulseMesh, orbit: orb, angle: Math.random() * Math.PI * 2 });
    });

    scene.add(orbitalGroup);

    // 7. Company Cards 3D Positions Setup
    const companyCardsData = companyList.map((comp, idx) => {
      const phi = Math.acos(-1 + (2 * (idx + 0.5)) / companyList.length);
      const theta = Math.sqrt(companyList.length * Math.PI) * phi;
      const cardRadius = 3.85 + (idx % 3) * 0.12;

      const baseVec = new THREE.Vector3(
        cardRadius * Math.cos(theta) * Math.sin(phi),
        cardRadius * Math.sin(theta) * Math.sin(phi),
        cardRadius * Math.cos(phi)
      );

      return {
        company: comp,
        basePos: baseVec,
        currentPos: baseVec.clone(),
        index: idx
      };
    });

    // Mouse Move Handling for Parallax Tilt
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mousePos.current.targetX = y * 0.25;
      mousePos.current.targetY = x * 0.35;
    };

    const containerEl = containerRef.current;
    containerEl.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Ultra-slow, calm, & elegant rotation (~28-35s per full turn)
      const rotSpeed = isHoveringCard.current ? 0.0003 : 0.0012;

      globePoints.rotation.y += rotSpeed;
      gridGroup.rotation.y += rotSpeed;

      // Parallax smooth interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      scene.rotation.x = mousePos.current.x;
      scene.rotation.y = mousePos.current.y;

      // Rotate Pulse Nodes along Orbits
      pulseNodes.forEach((p) => {
        p.angle += p.orbit.speed;
        const x = p.orbit.radius * Math.cos(p.angle);
        const z = p.orbit.radius * Math.sin(p.angle);
        const vec = new THREE.Vector3(x, 0, z);
        vec.applyAxisAngle(new THREE.Vector3(1, 0, 0), p.orbit.rotX);
        vec.applyAxisAngle(new THREE.Vector3(0, 1, 0), p.orbit.rotY);
        p.mesh.position.copy(vec);
      });

      // Project 3D Company Card Positions to 2D Screen Space
      const newScreenPositions = companyCardsData.map((card) => {
        const rotatedVec = card.basePos.clone();
        rotatedVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), globePoints.rotation.y);
        
        rotatedVec.y += Math.sin(elapsedTime * 1.2 + card.index) * 0.06;

        rotatedVec.applyAxisAngle(new THREE.Vector3(1, 0, 0), mousePos.current.x);
        rotatedVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), mousePos.current.y);

        const projVec = rotatedVec.clone().project(camera);

        const screenX = ((projVec.x + 1) * width) / 2;
        const screenY = ((-projVec.y + 1) * height) / 2;

        const zDepth = rotatedVec.z;
        const isFront = zDepth > 0;

        const scale = THREE.MathUtils.lerp(0.62, 1.1, (zDepth + 4.5) / 9.0);
        const opacity = THREE.MathUtils.clamp(THREE.MathUtils.lerp(0.2, 1.0, (zDepth + 4.0) / 8.0), 0.2, 1.0);
        const zIndex = Math.floor((zDepth + 10) * 10);

        return {
          id: card.company.id,
          name: card.company.shortName || card.company.name,
          company: card.company,
          x: screenX,
          y: screenY,
          scale,
          opacity,
          zIndex,
          isFront
        };
      });

      setCardPositions(newScreenPositions);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Observer
    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      containerEl.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="globe-3d-root" ref={containerRef}>
      <canvas ref={canvasRef} className="globe-webgl-canvas" />

      <div className="globe-cards-overlay">
        {cardPositions.map((card) => {
          const isHovered = hoveredCompanyId === card.id;

          return (
            <div
              key={card.id}
              className={`globe-company-card ${card.isFront ? 'is-front' : 'is-back'} ${isHovered ? 'hovered' : ''}`}
              style={{
                transform: `translate3d(${card.x}px, ${card.y}px, 0px) translate(-50%, -50%) scale(${isHovered ? card.scale * 1.15 : card.scale})`,
                opacity: isHovered ? 1.0 : card.opacity,
                zIndex: isHovered ? 9999 : card.zIndex,
                pointerEvents: card.opacity > 0.35 ? 'auto' : 'none'
              }}
              onMouseEnter={() => {
                setHoveredCompanyId(card.id);
                isHoveringCard.current = true;
              }}
              onMouseLeave={() => {
                setHoveredCompanyId(null);
                isHoveringCard.current = false;
              }}
              onClick={() => onSelectCompany(card.id)}
            >
              <div className="card-glass-body">
                <CompanyLogo id={card.id} size={28} />
                <span className="card-comp-name">{card.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
