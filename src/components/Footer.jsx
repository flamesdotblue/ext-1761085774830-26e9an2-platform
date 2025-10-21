import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Multilingual Speech to Text. Feito com Web Speech API.</p>
        <nav className="flex items-center gap-4">
          <a href="#features" className="hover:text-gray-200">Recursos</a>
          <a href="#record" className="hover:text-gray-2 00">Transcrever</a>
        </nav>
      </div>
    </footer>
  );
}
