import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { buildImproveReviewPrompt } from '../../../services/aiService';

export default function ImproveReview({ onResult }) {
  const [text, setText] = useState('');
  const inputCls = "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm resize-none";

  return (
    <form onSubmit={e => { e.preventDefault(); onResult(buildImproveReviewPrompt({ reviewText: text }), 'improveReview'); }} className="space-y-3">
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Paste your book review</label>
        <textarea className={inputCls} rows={5} placeholder="Write your review here…" value={text} onChange={e => setText(e.target.value)} required minLength={20} />
      </div>
      <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
        <Wand2 size={16} /> Improve My Review
      </button>
    </form>
  );
}
