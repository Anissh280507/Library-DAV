import { StarRating } from './StarRating';

const CLASS_COLORS = {
  '1': 'bg-pink-50 text-pink-700',
  '2': 'bg-rose-50 text-rose-700',
  '3': 'bg-orange-50 text-orange-700',
  '4': 'bg-amber-50 text-amber-700',
  '5': 'bg-yellow-50 text-yellow-700',
  '6': 'bg-lime-50 text-lime-700',
  '7': 'bg-green-50 text-green-700',
  '8': 'bg-teal-50 text-teal-700',
  '9': 'bg-cyan-50 text-cyan-700',
  '10': 'bg-blue-50 text-blue-700',
};

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function ReviewCard({ review }) {
  const { bookTitle, author, studentName, class: cls, rating, review: text, createdAt } = review;
  const colorClass = CLASS_COLORS[String(cls)] ?? 'bg-slate-50 text-slate-700';

  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 text-base leading-snug truncate">{bookTitle}</h3>
          <p className="text-sm text-slate-500 mt-0.5">by <span className="font-medium text-slate-700">{author}</span></p>
        </div>
        <StarRating value={rating} size="sm" />
      </div>

      {/* Review text */}
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{text}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {studentName?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">{studentName}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${colorClass}`}>
              Class {cls}
            </span>
          </div>
        </div>
        <time className="text-xs text-slate-400">{formatDate(createdAt)}</time>
      </div>
    </article>
  );
}
