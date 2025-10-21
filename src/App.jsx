import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Recorder from './components/Recorder';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-[#0b0b12] to-black text-white">
      <Hero />
      <main className="relative z-10">
        <section id="features" className="container mx-auto px-4 py-16">
          <Features />
        </section>
        <section id="record" className="container mx-auto px-4 py-16">
          <Recorder />
        </section>
      </main>
      <Footer />
    </div>
  );
}
