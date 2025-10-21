import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Mic, Square, Copy, Download, RefreshCw, Trash2 } from 'lucide-react';
import LanguageSelector, { getInitialLanguage } from './LanguageSelector';

export default function Recorder() {
  const [isSupported, setIsSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState('auto');
  const [interim, setInterim] = useState('');
  const [finalText, setFinalText] = useState('');
  const recognitionRef = useRef(null);
  const autoStopTimeoutRef = useRef(null);

  const resolvedLang = useMemo(() => {
    if (lang !== 'auto') return lang;
    return getInitialLanguage();
  }, [lang]);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setIsSupported(false);
      return;
    }
    const recog = new SR();
    recog.continuous = true;
    recog.interimResults = true;
    recog.maxAlternatives = 1;
    recog.lang = resolvedLang;

    recog.onresult = (event) => {
      let interimTrans = '';
      let finalTrans = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) finalTrans += transcript;
        else interimTrans += transcript;
      }
      if (finalTrans) setFinalText((prev) => (prev ? prev + ' ' : '') + finalTrans.trim());
      setInterim(interimTrans.trim());
      resetAutoStop();
    };

    recog.onerror = (e) => {
      console.error('SpeechRecognition error', e);
      setListening(false);
    };

    recog.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recog;
    setIsSupported(true);

    return () => {
      try { recog.abort(); } catch {}
      recognitionRef.current = null;
      clearTimeout(autoStopTimeoutRef.current);
    };
  }, [resolvedLang]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.lang = resolvedLang;
      recognitionRef.current.start();
      setListening(true);
      resetAutoStop();
    } catch (e) {
      console.error(e);
    }
  }, [resolvedLang]);

  const stop = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setListening(false);
      clearTimeout(autoStopTimeoutRef.current);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const resetAutoStop = () => {
    clearTimeout(autoStopTimeoutRef.current);
    autoStopTimeoutRef.current = setTimeout(() => {
      // auto stop after inactivity to save resources
      if (recognitionRef.current && listening) {
        try { recognitionRef.current.stop(); } catch {}
      }
    }, 60000);
  };

  const copyText = async () => {
    const text = (finalText + (interim ? ' ' + interim : '')).trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error(e);
      alert('Falha ao copiar para a área de transferência');
    }
  };

  const downloadText = () => {
    const text = (finalText + (interim ? ' ' + interim : '')).trim();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const iso = now.toISOString().replace(/[:.]/g, '-');
    a.download = `transcript-${iso}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setFinalText('');
    setInterim('');
  };

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
          <h3 className="text-xl font-semibold text-red-300">Seu navegador não suporta reconhecimento de voz</h3>
          <p className="mt-2 text-red-200/90">Experimente no Chrome ou Edge mais recentes, ou ative permissões de microfone.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch gap-4 md:items-center justify-between">
        <LanguageSelector value={lang} onChange={setLang} />
        <div className="flex gap-2">
          {!listening ? (
            <button onClick={start} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20">
              <Mic size={18} /> Iniciar
            </button>
          ) : (
            <button onClick={stop} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 transition shadow-lg shadow-rose-600/20">
              <Square size={18} /> Parar
            </button>
          )}
          <button onClick={copyText} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">
            <Copy size={18} /> Copiar
          </button>
          <button onClick={downloadText} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10">
            <Download size={18} /> Baixar .txt
          </button>
          <button onClick={clearAll} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <Trash2 size={18} /> Limpar
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-300">Transcrição</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <RefreshCw size={14} className={"" + (listening ? ' animate-spin-slow' : '')} />
              {listening ? 'Ouvindo...' : 'Inativo'}
            </div>
          </div>
          <div className="rounded-xl bg-black/40 border border-white/5 p-4 min-h-[220px] whitespace-pre-wrap leading-relaxed">
            <span className="text-gray-100">{finalText}</span>
            {interim && <span className="text-gray-400 italic"> {interim}</span>}
            {!finalText && !interim && (
              <div className="text-gray-400">Clique em Iniciar e comece a falar. Sua transcrição aparecerá aqui.</div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Dica: mantenha o microfone próximo e fale claramente. Você pode mudar o idioma a qualquer momento.
      </p>
    </div>
  );
}
