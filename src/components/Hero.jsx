import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 border border-white/10">
            <Rocket size={16} className="text-indigo-300" />
            <span className="text-sm text-gray-200">AI Voice Agent • Multilingual Speech-to-Text</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Transcreva sua voz em texto em qualquer idioma
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl">
            Comece a falar e veja a magia acontecer em tempo real. Ideal para notas, legendas, reuniões e acessibilidade.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#record" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25">
              Começar agora
            </a>
            <a href="#features" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 transition">
              Ver recursos
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
