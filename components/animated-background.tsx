"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

interface Bird {
  id: number;
  x: number;
  y: number;
  speed: number;
  wingPhase: number;
}

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stars
  useEffect(() => {
    if (!mounted) return;

    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, [mounted]);

  // Generate birds
  useEffect(() => {
    if (!mounted) return;

    const generateBirds = () => {
      const newBirds: Bird[] = [];
      for (let i = 0; i < 8; i++) {
        newBirds.push({
          id: i,
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * 120 + 60,
          speed: Math.random() * 1.2 + 0.4,
          wingPhase: Math.random() * Math.PI * 2,
        });
      }
      setBirds(newBirds);
    };

    generateBirds();
  }, [mounted]);

  // Animate stars
  useEffect(() => {
    if (!mounted || theme !== "dark") return;

    const animateStars = () => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          opacity: 0.2 + Math.abs(Math.sin(Date.now() * star.twinkleSpeed)) * 0.8,
        }))
      );
    };

    const interval = setInterval(animateStars, 50);
    return () => clearInterval(interval);
  }, [mounted, theme]);

  // Animate birds
  useEffect(() => {
    if (!mounted || theme === "dark") return;

    const animateBirds = () => {
      setBirds((prevBirds) =>
        prevBirds.map((bird) => ({
          ...bird,
          x: bird.x + bird.speed,
          y: bird.y + Math.sin(Date.now() * 0.001 + bird.id * 0.5) * 2,
          wingPhase: bird.wingPhase + 0.3,
          ...(bird.x > window.innerWidth + 100 ? { 
            x: -100, 
            y: Math.random() * 120 + 60
          } : {}),
        }))
      );
    };

    const interval = setInterval(animateBirds, 60);
    return () => clearInterval(interval);
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 text-[#f1fdfe]">
      {/* Moon for dark theme */}
      {theme === "dark" && (
        <div className="absolute top-24 right-24">
          {/* Realistic Moon */}
          <div className="relative w-20 h-20">
            {/* Soft Moon Glow */}
            <div className="absolute inset-0 w-24 h-24 -top-2 -left-2 bg-slate-300 rounded-full opacity-15 blur-lg"></div>
            
            {/* Main Moon Body */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="relative z-10">
              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="realMoonGradient" cx="0.35" cy="0.35" r="0.75">
                  <stop offset="0%" stopColor="#e8e8e8" />
                  <stop offset="40%" stopColor="#d4d4d4" />
                  <stop offset="70%" stopColor="#a8a8a8" />
                  <stop offset="100%" stopColor="#7a7a7a" />
                </radialGradient>
              </defs>
              
              {/* Main Moon Circle */}
              <circle cx="40" cy="40" r="38" fill="url(#realMoonGradient)" />
              
              {/* Realistic Irregular Mare (Dark Regions) */}
              <path d="M20 25 Q35 20, 45 28 Q50 35, 45 45 Q35 50, 25 45 Q15 35, 20 25 Z" 
                    fill="#969696" opacity="0.6" />
              <path d="M50 15 Q65 18, 70 30 Q68 40, 60 35 Q50 30, 50 15 Z" 
                    fill="#969696" opacity="0.4" />
              <path d="M15 55 Q30 60, 35 65 Q25 70, 15 65 Q10 60, 15 55 Z" 
                    fill="#969696" opacity="0.5" />
              
              {/* Natural Irregular Craters */}
              <ellipse cx="30" cy="30" rx="4" ry="3.5" fill="#888888" opacity="0.7" transform="rotate(25 30 30)" />
              <ellipse cx="55" cy="25" rx="3" ry="2.5" fill="#888888" opacity="0.6" transform="rotate(-15 55 25)" />
              <ellipse cx="25" cy="55" rx="2.5" ry="2" fill="#888888" opacity="0.5" transform="rotate(45 25 55)" />
              <ellipse cx="60" cy="50" rx="3.5" ry="3" fill="#888888" opacity="0.6" transform="rotate(-30 60 50)" />
              <ellipse cx="45" cy="45" rx="2" ry="1.5" fill="#888888" opacity="0.4" transform="rotate(60 45 45)" />
              
              {/* Small Surface Details */}
              <circle cx="35" cy="20" r="1" fill="#7a7a7a" opacity="0.4" />
              <circle cx="50" cy="35" r="0.8" fill="#7a7a7a" opacity="0.3" />
              <circle cx="20" cy="40" r="1.2" fill="#7a7a7a" opacity="0.4" />
              <circle cx="65" cy="40" r="0.6" fill="#7a7a7a" opacity="0.3" />
              <circle cx="40" cy="60" r="0.9" fill="#7a7a7a" opacity="0.3" />
              
              {/* Subtle Surface Variations */}
              <path d="M10 20 Q25 15, 35 25 Q30 30, 15 25 Q5 22, 10 20 Z" 
                    fill="#bcbcbc" opacity="0.3" />
              <path d="M55 55 Q70 50, 75 65 Q65 70, 55 65 Q50 60, 55 55 Z" 
                    fill="#bcbcbc" opacity="0.2" />
            </svg>
          </div>
        </div>
      )}

      {/* Stars */}
      {theme === "dark" &&
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
            }}
          />
        ))}

      {/* Sun */}
      {theme === "light" && (
        <div className="absolute top-20 right-20">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80"></div>
          </div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-gradient-to-t from-yellow-400 to-transparent origin-bottom animate-pulse"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-40px)`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Birds */}
      {theme === "light" &&
        birds.map((bird) => (
          <div
            key={bird.id}
            className="absolute text-gray-600 transition-all duration-100"
            style={{
              left: `${bird.x}px`,
              top: `${bird.y}px`,
              transform: `scale(${0.8 + Math.sin(bird.wingPhase) * 0.1})`,
            }}
          >
            {/* Realistic Bird Silhouette */}
            <svg width="24" height="16" viewBox="0 0 24 16" fill="currentColor">
              {/* Bird Body */}
              <ellipse cx="12" cy="8" rx="3" ry="2" opacity="0.9" />
              
              {/* Bird Head */}
              <circle cx="16" cy="7" r="2" opacity="0.9" />
              
              {/* Beak */}
              <polygon points="18,7 20,6.5 20,7.5" opacity="0.9" />
              
              {/* Wings with animation */}
              <g>
                {/* Left Wing */}
                <path
                  d="M9 8 Q4 6 2 8 Q4 10 9 9 Z"
                  opacity="0.8"
                  style={{
                    transform: `rotate(${Math.sin(bird.wingPhase) * 15}deg)`,
                    transformOrigin: "9px 8px",
                  }}
                />
                
                {/* Right Wing */}
                <path
                  d="M15 8 Q20 6 22 8 Q20 10 15 9 Z"
                  opacity="0.8"
                  style={{
                    transform: `rotate(${-Math.sin(bird.wingPhase) * 15}deg)`,
                    transformOrigin: "15px 8px",
                  }}
                />
              </g>
              
              {/* Tail */}
              <path d="M9 8 Q6 9 4 8 Q6 7 9 8 Z" opacity="0.7" />
            </svg>
          </div>
        ))}

      {/* Alternative: Add some variety with different bird types */}
      {theme === "light" &&
        birds.slice(0, 3).map((bird) => (
          <div
            key={`seagull-${bird.id}`}
            className="absolute text-gray-500 transition-all duration-150"
            style={{
              left: `${bird.x + 200}px`,
              top: `${bird.y + 40}px`,
              transform: `scale(${0.6 + Math.sin(bird.wingPhase + 1) * 0.08})`,
            }}
          >
            {/* Seagull-style Bird */}
            <svg width="28" height="14" viewBox="0 0 28 14" fill="currentColor">
              {/* Seagull Body */}
              <ellipse cx="14" cy="7" rx="4" ry="1.5" opacity="0.85" />
              
              {/* Seagull Head */}
              <circle cx="19" cy="6.5" r="1.8" opacity="0.85" />
              
              {/* Longer Beak */}
              <polygon points="21,6.5 24,6 24,7" opacity="0.85" />
              
              {/* Distinctive Seagull Wings */}
              <g>
                {/* Left Wing - more curved for seagull look */}
                <path
                  d="M10 7 Q3 5 1 7 Q3 8.5 10 7.5 Z"
                  opacity="0.75"
                  style={{
                    transform: `rotate(${Math.sin(bird.wingPhase + 1) * 20}deg)`,
                    transformOrigin: "10px 7px",
                  }}
                />
                
                {/* Right Wing */}
                <path
                  d="M18 7 Q25 5 27 7 Q25 8.5 18 7.5 Z"
                  opacity="0.75"
                  style={{
                    transform: `rotate(${-Math.sin(bird.wingPhase + 1) * 20}deg)`,
                    transformOrigin: "18px 7px",
                  }}
                />
              </g>
              
              {/* Seagull Tail */}
              <path d="M10 7 Q6 8 3 7 Q6 6 10 7 Z" opacity="0.65" />
            </svg>
          </div>
        ))}

      {/* Distant small birds for depth */}
      {theme === "light" &&
        birds.slice(0, 4).map((bird) => (
          <div
            key={`distant-${bird.id}`}
            className="absolute text-gray-400 transition-all duration-200"
            style={{
              left: `${bird.x - 150}px`,
              top: `${bird.y - 30}px`,
              transform: `scale(${0.3 + Math.sin(bird.wingPhase + 2) * 0.05})`,
            }}
          >
            {/* Simple distant bird silhouette */}
            <svg width="16" height="8" viewBox="0 0 16 8" fill="currentColor">
              {/* Simple V-shape for distant birds */}
              <path
                d="M2 4 Q6 2 8 4 Q10 2 14 4"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
                style={{
                  transform: `scaleY(${0.8 + Math.sin(bird.wingPhase + 2) * 0.3})`,
                }}
              />
            </svg>
          </div>
        ))}

      {/* Light Mode: More Clouds */}
      {theme === "light" && (
        <>
          {[
            // Left side clouds
            { top: "top-40", left: "left-16", delay: "3s", size: "medium" },
            { top: "top-72", left: "left-12", delay: "6s", size: "small" },
            { top: "top-28", left: "left-1/4", delay: "1s", size: "medium" },
            
            // Center clouds
            { top: "top-32", left: "left-1/3", delay: "0.5s", size: "medium" },
            { top: "top-64", left: "left-1/2", delay: "3.5s", size: "large" },
            { top: "top-12", left: "left-2/5", delay: "5s", size: "small" },
            { top: "top-48", left: "left-1/2", delay: "2s", size: "medium" },
            
            // Right side clouds (keeping some original ones)
            { top: "top-24", left: "right-1/4", delay: "1.5s", size: "large" },
            { top: "top-60", left: "right-10", delay: "1.5s", size: "small" },
            { top: "top-68", left: "right-20", delay: "5.5s", size: "small" },
            { top: "top-10", left: "right-1/3", delay: "0.8s", size: "medium" },
            
            // Additional scattered clouds for fullness
            { top: "top-52", left: "left-3/4", delay: "6.5s", size: "small" },
            { top: "top-8", left: "left-3/5", delay: "7s", size: "large" }

          ].map((cloud, idx) => (
            <div
              key={idx}
              className={`absolute ${cloud.top} ${cloud.left} animate-float`}
              style={{ animationDelay: cloud.delay }}
            >
              <div className={`bg-blue-50 rounded-full opacity-70 shadow-sm relative ${
                cloud.size === 'large' ? 'w-24 h-14' : 
                cloud.size === 'medium' ? 'w-20 h-12' : 
                'w-16 h-10'
              }`}>
                <div className={`absolute -top-2 bg-blue-50 rounded-full ${
                  cloud.size === 'large' ? 'left-5 w-14 h-10' : 
                  cloud.size === 'medium' ? 'left-4 w-12 h-8' : 
                  'left-3 w-10 h-6'
                }`}></div>
                <div className={`absolute -top-1 bg-blue-100 rounded-full ${
                  cloud.size === 'large' ? 'right-5 w-10 h-8' : 
                  cloud.size === 'medium' ? 'right-4 w-8 h-6' : 
                  'right-3 w-6 h-4'
                }`}></div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}