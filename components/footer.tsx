"use client";

import { Button } from '@/components/ui/button';
import { Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Back to Top Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="mb-4"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>

          {/* Logo/Name */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gradient mb-2">
              Sri Varshini
            </h3>
            <p className="text-muted-foreground">
              Software Engineer & Mobile Application Developer
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              © {currentYear} Sri Varshini. Made with 
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}