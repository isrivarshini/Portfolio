"use client";
import Image from 'next/image';
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Animated Name Component
function AnimatedName() {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fullText = 'SRI VARSHINI';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 150); // Adjust speed here

    return () => clearInterval(timer);
  }, []);

  return (
    <span 
      className={`
        font-BebasNeue underline-offset-4 font-extrabold drop-shadow-md
        text-primary
        ${isComplete && isHovered ? 'drop-shadow-lg scale-105' : ''}
        transition-all duration-500 cursor-default
        transform-gpu
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textShadow: isComplete && isHovered 
          ? '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)' 
          : 'none',
        // Keep it simple - just use primary color with effects
        color: isComplete 
          ? (isHovered ? '#a855f7' : 'hsl(var(--primary))')
          : 'hsl(var(--primary))'
      }}
    >
      {displayText}
      {!isComplete && (
        <span className="animate-pulse ml-1 text-primary">|</span>
      )}
    </span>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { theme, setTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Set visible immediately for hero section since it's the first thing users see
    setIsVisible(true);
    
    // Intersection Observer for smooth animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/SriVarshini_Resume.pdf';
    link.download = 'SriVarshini_Resume.pdf';
    link.click();
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
        {/* Logo */}
        <div className="mb-8 scale-in">
          <div className="flex justify-center items-center space-x-4">
            <Image 
              src="/logo.png" 
              alt="Sri Varshini Logo" 
              width={320}
              height={320}
              className="w-80 h-80 rounded-full shadow-lg smooth-image gpu-accelerated"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center fade-in-up">
          Hi, I&apos;m {''}
          <AnimatedName />
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 fade-in-up stagger-2">
          Software Developer & Mobile Application Developer
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed fade-in-up stagger-3">
          Creative and solutions-oriented developer passionate about building intuitive, high-impact web and mobile applications. Experienced across the full stack, with a strong focus on performance, scalability, and user-centric design. Adept at working with modern frameworks, cloud platforms, and emerging technologies to deliver robust digital experiences. Thrive in dynamic environments that encourage innovation, collaboration, and continuous growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in-up stagger-4">
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 gpu-accelerated"
            onClick={scrollToAbout}
          >
            Explore My Work
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 gpu-accelerated"
            onClick={downloadResume}
          >
            Download Resume
            <Download className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 fade-in-up stagger-5">
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full h-12 w-12 hover:bg-primary/10 transition-all duration-300 hover:scale-110 gpu-accelerated"
            asChild
          >
            <a href="https://github.com/isrivarshini" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full h-12 w-12 hover:bg-secondary/10 transition-all duration-300 hover:scale-110 gpu-accelerated"
            asChild
          >
            <a href="https://www.linkedin.com/in/sriinakollu07/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="rounded-full h-12 w-12 hover:bg-accent/10 transition-all duration-300 hover:scale-110 gpu-accelerated"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Button>
        </div>
      </div>
    </section>
  );
}