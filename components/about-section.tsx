"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Zap, Users } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const highlights = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Expertise in modern web technologies including React, Node.js, and cloud platforms"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating beautiful, user-friendly interfaces with attention to detail and accessibility"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Building fast, scalable applications with optimal user experience"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Strong communication skills and experience working in agile development teams"
  }
];

const technologies = [
  "JavaScript","Java","Python", "React", "Prompt Engineering","AI tools", "Next.js", "TypeScript", "Node.js", "PostgreSQL", 
  "MongoDB", "AWS", "Docker", "GraphQL", "Tailwind CSS", "Git"
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Section visibility observer
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    // Card visibility observer
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...Array.from(prev), index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      cardRefs.current.forEach((ref) => {
        if (ref) cardObserver.unobserve(ref);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate software developer with a strong foundation in modern web technologies. I love turning complex problems into simple, beautiful, and intuitive solutions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Story */}
          <div className={`space-y-6 ${isVisible ? 'fade-in-left stagger-2' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold mb-4">My Journey!!</h3>
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed transition-all duration-300 hover:text-foreground">
                With a strong academic background in computer science and hands-on experience in software development, I&apos;ve developed a comprehensive skill set that spans both frontend and backend technologies 🖥️.
              </p>
              <p className="text-muted-foreground leading-relaxed transition-all duration-300 hover:text-foreground">
                I&apos;m particularly passionate about creating applications that not only function 
                flawlessly but also provide exceptional user experiences. My approach combines 
                technical expertise with creative problem-solving to deliver solutions that 
                make a real impact 🚀
              </p>
              <p className="text-muted-foreground leading-relaxed transition-all duration-300 hover:text-foreground">
                When I&apos;m not coding, you can find me exploring new technologies, contributing
                to open-source projects, or you would see me in gym🏋️‍♀️.
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className={`${isVisible ? 'fade-in-right stagger-3' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold mb-6">My Tech Superpowers💪</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge 
                  key={tech} 
                  className="px-3 py-1 text-sm bg-gray-100 text-[#0a0a0a] dark:bg-gray-800 dark:text-[#f1fdfe] border border-gray-300 dark:border-gray-600 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default hover:scale-105 gpu-accelerated"
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease-out'
                  }}
                > 
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const isCardVisible = visibleCards.has(index);
            
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  isCardVisible ? 'scale-in' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="card-hover group h-full gpu-accelerated">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 mb-4 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <h4 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}