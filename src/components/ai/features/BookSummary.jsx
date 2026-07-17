import { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { buildSummaryPrompt } from '../../../services/aiService';

export default function BookSummary({ onResult }) {
  const [form, setForm] = useState({ bookTitle: '', author: '', length: '50' });
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm";

  return (
    <form onSubmit={e => { e.preventDefault(); onResult(buildSummaryPrompt(form), 'summary'); }} className="space-y-3">
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Book Title</label>
        <input className={inputCls} placeholder="e.g. Wings of Fire" value={form.bookTitle} onChange={e => s('bookTitle', e.target.value)} required />
      </div>
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Author</label>
        <input className={inputCls} placeholder="e.g. A.P.J. Abdul Kalam" value={form.author} onChange={e => s('author', e.target.value)} required />
      </div>
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Summary Length</label>
        <div className="grid grid-cols-3 gap-2">
          {['50', '100', 'Detailed'].map(l => (
            <button key={l} type="button" onClick={() => s('length', l)}
              className={`py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${form.length === l ? 'bg-white text-indigo-700' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              {l === 'Detailed' ? <><FileText size={14} /> Detailed</> : `${l} words`}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
        <Sparkles size={16} /> Generate Summary
      </button>
    </form>
  );
}
