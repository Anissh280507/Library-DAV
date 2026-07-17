import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { buildBookRecommendationPrompt } from '../../../services/aiService';

export default function BookRecommendation({ onResult }) {
  const [form, setForm] = useState({ classNum: '', genres: '', favouriteBooks: '', level: 'Beginner' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = buildBookRecommendationPrompt(form);
    await onResult(prompt, 'bookRecommendation');
  };

  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-white/70 font-semibold block mb-1">Your Class</label>
          <select className={`${inputCls} [color-scheme:dark]`} value={form.classNum} onChange={e => s('classNum', e.target.value)} required>
            <option className="bg-white text-slate-900" value="">Select</option>
            {Array.from({ length: 10 }, (_, i) => <option className="bg-white text-slate-900" key={i+1} value={i+1}>Class {i+1}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-white/70 font-semibold block mb-1">Reading Level</label>
          <select className={`${inputCls} [color-scheme:dark]`} value={form.level} onChange={e => s('level', e.target.value)}>
            <option className="bg-white text-slate-900">Beginner</option>
            <option className="bg-white text-slate-900">Intermediate</option>
            <option className="bg-white text-slate-900">Advanced</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Favourite Genres</label>
        <input className={inputCls} placeholder="e.g. Adventure, Science, Fantasy" value={form.genres} onChange={e => s('genres', e.target.value)} required />
      </div>
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Favourite Books</label>
        <input className={inputCls} placeholder="e.g. Wings of Fire, Matilda" value={form.favouriteBooks} onChange={e => s('favouriteBooks', e.target.value)} />
      </div>
      <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
        <Sparkles size={16} /> Get Recommendations
      </button>
    </form>
  );
}
