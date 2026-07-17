import { useState } from 'react';
import { BookText } from 'lucide-react';
import { buildVocabularyPrompt } from '../../../services/aiService';

export default function VocabularyHelper({ onResult }) {
  const [word, setWord] = useState('');
  const inputCls = "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm";

  return (
    <form onSubmit={e => { e.preventDefault(); onResult(buildVocabularyPrompt({ word }), 'vocabulary'); }} className="space-y-3">
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Enter a word</label>
        <input className={inputCls} placeholder="e.g. Tenacious, Ephemeral…" value={word} onChange={e => setWord(e.target.value)} required />
      </div>
      <p className="text-xs text-white/50">Get meaning, pronunciation, synonyms, antonyms, and an example sentence.</p>
      <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
        <BookText size={16} /> Explain This Word
      </button>
    </form>
  );
}
