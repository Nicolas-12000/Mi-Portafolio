"use client";
import React from 'react';
import { 
  HeroSection,
  CaseStudiesSection,
  TechStackSection,
  ProfileSection,
  ContactSection
} from '@/components/sections';

const Portfolio = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="min-h-screen text-text-primary relative bg-gradient-to-b from-background via-surface to-background">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[128px]" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <HeroSection onNavigate={scrollToSection} />
          <CaseStudiesSection onNavigate={scrollToSection} />
          <TechStackSection />
          <ProfileSection />
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
