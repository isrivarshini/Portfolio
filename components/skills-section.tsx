"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./flipCard.css";

export function SkillsSection() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setFlippedCards((prev) => ({
                ...prev,
                [index]: true,
              }));
            }
          });
        },
        {
          threshold: 0.5, // Flip when 50% of card is visible
          rootMargin: "0px",
        }
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const workExperience = [
    {
      title: "Full Stack Developer",
      company: "ABE Scott Enterprises",
      date: "November 2025 - Present",
      responsibilities: [
        "Transitioned from web developer to PM role after 1 month, managing 70% development (OAuth, GTFS routing) and 30% PM duties.",
        "Implemented OAuth 2.0 authentication reducing login failures by 40% and improving user session security.",
        "Built GTFS-based transit routing system with real-time optimization using Dijkstra's algorithm in Node.js/Express/MySQL.",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Choovio",
      date: "May 2025 - November 2025",
      responsibilities: [
        "Developed React/Next.js frontend modules for IoT fleet management SaaS platform serving enterprise clients.",
        "Reduced API response times by 98% through performance optimization and resolved critical CORS blocking issues.",
        "Cut development cycles by 50% through AI tool integration and improved team workflow efficiency.",
      ],
    },
    {
      title: "Mobile Application Developer",
      company: "The University of Georgia",
      date: "August 2023 - May 2025",
      responsibilities: [
        "Led end-to-end development of HomePro Android app with Firebase Auth, Realtime DB, and Storage integration.",
        "Implemented MVVM architecture with Java, achieving 90% bug resolution rate during beta testing phase.",
        "Delivered modular UI using Java/XML through Agile sprints, ensuring stable releases and scalable codebase.",
      ],
    },
    {
      title: "Founding Engineer",
      company: "Pullulate",
      date: "May 2021 - July 2023",
      responsibilities: [
        "Built e-commerce platform with payment gateway integrations and OAuth 2.0 authentication services.",
        "Designed microservices architecture for scalable distributed systems handling high-traffic scenarios.",
        "Implemented RESTful APIs with comprehensive error handling and security best practices.",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Work Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A snapshot of my professional journey and academic background in technology and development.
          </p>
        </div>

        {/* Work Experience Cards */}
        <Card className="card-hover mb-16">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            {workExperience.map((job, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4">
                {/* Job Info Card */}
                <Card className="p-4">
                  <CardContent className="pt-0 flex flex-col items-center justify-center h-full min-h-[120px] space-y-3">
                    <h3 className="font-semibold text-lg text-center">{job.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{job.company}</p>
                    <p className="text-sm text-muted-foreground text-center">{job.date}</p>
                  </CardContent>
                </Card>

                {/* Flip Card for Responsibilities */}
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="flip-card-container"
                >
                  <div className={`flip-card-inner ${flippedCards[index] ? "flipped" : ""}`}>
                    {/* Front Side */}
                    <div className="flip-card-front p-4 rounded-lg bg-muted/20">
                      <p className="text-sm font-semibold text-lg text-center mt-8">
                        What did I do here? Scroll down to find out! 🎯
                      </p>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back p-4 rounded-lg bg-muted/10">
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {job.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Master's in Computer Science</h3>
              <p className="text-sm text-muted-foreground">University of Georgia — 2023–2025</p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Bachelor's in Information Technology</h3>
              <p className="text-sm text-muted-foreground">Malla Reddy Engineering College — 2019–2023</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
