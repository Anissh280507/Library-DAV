import { useState } from 'react';
import { Send } from 'lucide-react';
import { buildLibrarianPrompt } from '../../../services/aiService';

export default function AskLibrarian({ onResult }) {
  const [question, setQuestion] = useState('');
  const inputCls = "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm resize-none";

  return (
    <form onSubmit={e => { e.preventDefault(); onResult(buildLibrarianPrompt({ question }), 'librarian'); }} className="space-y-3">
      <div>
        <label className="text-xs text-white/70 font-semibold block mb-1">Ask your question</label>
        <textarea className={inputCls} rows={4} placeholder="e.g. What is the moral of The Jungle Book? Who is Mowgli?" value={question} onChange={e => setQuestion(e.target.value)} required />
      </div>
      <button type="submit" className="w-full py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2">
        <Send size={16} /> Ask the Librarian
      </button>
    </form>
  );
}
