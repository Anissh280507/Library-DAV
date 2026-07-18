import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const { bookTitle, author, studentName, class: cls, rating, review: text, createdAt } = review;
  const colorClass = CLASS_COLORS[String(cls)] ?? 'bg-slate-50 text-slate-700';

  return (
    <>
      {/* 1. Main Review Card Item */}
      <article 
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col gap-3 cursor-pointer select-none"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-base leading-snug truncate">{bookTitle}</h3>
            <p className="text-sm text-slate-500 mt-0.5">by <span className="font-medium text-slate-700">{author}</span></p>
          </div>
          <StarRating value={rating} size="sm" />
        </div>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{text}</p>

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

      {/* 2. Modal Overlay & Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
          
          {/* Backdrop click target to close the modal */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto transform scale-100 transition-transform duration-300 animate-scaleUp">
            
            {/* Close Cross Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              aria-label="Close review"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-8 pr-6">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-lg sm:text-xl leading-snug">{bookTitle}</h3>
                <p className="text-sm text-slate-500 mt-1">by <span className="font-medium text-slate-700">{author}</span></p>
              </div>
              <div className="flex-shrink-0 pt-1">
                <StarRating value={rating} size="sm" />
              </div>
            </div>

            {/* Modal Scrollable Body Text */}
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed pr-1">
              {text}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {studentName?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{studentName}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${colorClass}`}>
                    Class {cls}
                  </span>
                </div>
              </div>
              <time className="text-xs text-slate-400">{formatDate(createdAt)}</time>
            </div>
          </div>
        </div>
      )}
    </>
  );
}