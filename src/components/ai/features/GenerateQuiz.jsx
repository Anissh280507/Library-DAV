import { useState } from 'react';
import { CheckCircle2, Circle, FilePenLine, ListChecks, Sparkles } from 'lucide-react';
import { buildQuizPrompt } from '../../../services/aiService';

const QUIZ_TYPES = [
  { id: 'MCQ', label: 'MCQ', icon: Circle },
  { id: 'True/False', label: 'True / False', icon: CheckCircle2 },
  { id: 'Fill in the Blanks', label: 'Fill Blanks', icon: FilePenLine },
  { id: 'Short Answer', label: 'Short Answer', icon: ListChecks },
];

export default function GenerateQuiz({ onResult }) {
  const [form, setForm] = useState({ bookTitle: '', author: '', quizType: 'MCQ' });
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputCls = "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm";

  return (
    <form onSubmit={e => { e.preventDefault(); onResult(buildQuizPrompt(form), 'quiz'); }} className="space-y-3">
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Book Title</label>
        <input className={inputCls} placeholder="e.g. Malgudi Days" value={form.bookTitle} onChange={e => s('bookTitle', e.target.value)} required />
      </div>
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Author</label>
        <input className={inputCls} placeholder="e.g. R.K. Narayan" value={form.author} onChange={e => s('author', e.target.value)} required />
      </div>
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Quiz Type</label>
        <div className="grid grid-cols-2 gap-2">
          {QUIZ_TYPES.map(q => {
            const Icon = q.icon;
            return (
            <button key={q.id} type="button" onClick={() => s('quizType', q.id)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${form.quizType === q.id ? 'bg-white text-indigo-700' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              <Icon size={14} /> {q.label}
            </button>
          )})}
        </div>
      </div>
      <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
        <Sparkles size={16} /> Generate Quiz
      </button>
    </form>
  );
}
