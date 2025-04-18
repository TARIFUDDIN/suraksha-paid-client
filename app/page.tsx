"use client"

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Demo from '@/components/Demo';
import Testimonials from '@/components/Testimonials';
import AboutUs from '@/components/AboutUs';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const HomePage = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Demo />
        <HowItWorks/>
        <Testimonials />
        <AboutUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;