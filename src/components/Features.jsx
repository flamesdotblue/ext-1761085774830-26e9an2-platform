import React from 'react';
import { Sparkles, Shield, Zap, FileText } from 'lucide-react';

const items = [
  {
    icon: Sparkles,
    title: 'Detecção em tempo real',
    desc: 'Transcrição contínua com resultados intermediários para feedback instantâneo.'
  },
  {
    icon: FileText,
    title: 'Exportação fácil',
    desc: 'Copie ou baixe sua transcrição em um clique para usar em qualquer lugar.'
  },
  {
    icon: Zap,
    title: 'Rápido e leve',
    desc: 'Roda no navegador sem servidores. Ideal para notas e reuniões.'
  },
  {
    icon: Shield,
    title: 'Privacidade local',
    desc: 'Seu áudio fica no seu dispositivo enquanto usa a API de fala do navegador.'
  }
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-400/20 flex items-center justify-center text-indigo-300">
            <Icon size={18} />
          </div>
          <h3 className="mt-4 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-gray-300 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  );
}
