import React from 'react';
import { Globe } from 'lucide-react';

const LANGS = [
  { code: 'auto', label: 'Detectar automaticamente (usa idioma do navegador)' },
  { code: 'en-US', label: 'English (United States)' },
  { code: 'en-GB', label: 'English (United Kingdom)' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'pt-PT', label: 'Português (Portugal)' },
  { code: 'es-ES', label: 'Español (España)' },
  { code: 'es-MX', label: 'Español (México)' },
  { code: 'fr-FR', label: 'Français (France)' },
  { code: 'de-DE', label: 'Deutsch (Deutschland)' },
  { code: 'it-IT', label: 'Italiano (Italia)' },
  { code: 'ja-JP', label: '日本語 (日本)' },
  { code: 'ko-KR', label: '한국어 (대한민국)' },
  { code: 'zh-CN', label: '中文 (简体)' },
  { code: 'ru-RU', label: 'Русский (Россия)' },
  { code: 'ar-SA', label: 'العربية (السعودية)' },
  { code: 'hi-IN', label: 'हिन्दी (भारत)' },
];

export default function LanguageSelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-indigo-300">
        <Globe size={18} />
      </div>
      <select
        className="w-full md:w-auto min-w-[260px] appearance-none rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}

export function getInitialLanguage() {
  const navLang = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  const codes = new Set(['en-US','en-GB','pt-BR','pt-PT','es-ES','es-MX','fr-FR','de-DE','it-IT','ja-JP','ko-KR','zh-CN','ru-RU','ar-SA','hi-IN']);
  if (codes.has(navLang)) return navLang;
  const base = navLang?.split('-')?.[0] || '';
  for (const code of codes) {
    if (code.startsWith(base)) return code;
  }
  return 'en-US';
}
