import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { DAILY_DICTIONARY_DATA, MONTHLY_CURATION_DATA } from '../data/libraryData';

export default function DailyReads() {
  const [dayOfYear, setDayOfYear] = useState(1);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [displayDate, setDisplayDate] = useState('');
  const [displayDayName, setDisplayDayName] = useState('');

  const updateDateFromDayOfYear = (dayNum) => {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 0, dayNum);
    setDisplayDate(targetDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }));
    setDisplayDayName(targetDate.toLocaleDateString('en-IN', { weekday: 'long' }));
    setCurrentMonthIndex(targetDate.getMonth());
  };

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now - start) / 86400000);
    setDayOfYear(day);
    updateDateFromDayOfYear(day);
  }, []);

  const handleDayShift = (newDay) => {
    setDayOfYear(newDay);
    updateDateFromDayOfYear(newDay);
  };

  const daily = DAILY_DICTIONARY_DATA[Math.min(dayOfYear, 365) - 1] || DAILY_DICTIONARY_DATA[0];
  const monthly = MONTHLY_CURATION_DATA[currentMonthIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Daily Reads</h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
              {displayDayName},{' '}
              <span className="text-blue-600 font-semibold">{displayDate}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full font-semibold">
              Day <span className="text-slate-900 dark:text-white font-bold">{dayOfYear}</span> of 365
            </span>
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full font-bold uppercase tracking-wide">
              {monthly?.month || 'Edition'} Edition
            </span>
          </div>
        </header>

        {/* ── Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

          {/* SECTION 1 — Word of the Day */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-500">Vocabulary Expansion</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-2 mb-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{daily.word}</h2>
                <span className="text-sm italic text-slate-500 font-medium">({daily.type})</span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-3 mb-5 pl-4 border-l-4 border-blue-500 font-medium">
                {daily.meaning}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="bg-green-50 rounded-xl px-4 py-3">
                <strong className="block text-[11px] uppercase tracking-wider text-green-700 mb-1">Synonyms</strong>
                <span className="text-sm text-green-900 font-semibold">{daily.synonyms.join(', ')}</span>
              </div>
              <div className="bg-red-50 rounded-xl px-4 py-3">
                <strong className="block text-[11px] uppercase tracking-wider text-red-700 mb-1">Antonyms</strong>
                <span className="text-sm text-red-900 font-semibold">{daily.antonyms.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* SECTION 2 — Phrase & Idiom */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 sm:p-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-500">Idiomatic Expressions</span>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phrase of the Day</h3>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white italic">"{daily.phrase}"</p>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 p-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Idiom of the Day</h3>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white italic">"{daily.idiom}"</p>
            </div>
          </div>

          {/* SECTION 3 — Author of the Month */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-500">Featured Indian Author</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">{monthly.author.name}</h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{monthly.author.bio}</p>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-100 px-4 py-4">
              <strong className="block text-[11px] uppercase tracking-wider text-amber-700 mb-2">Essential Literary Works</strong>
              <ul className="list-disc list-inside space-y-1">
                {monthly.author.works.map((work, idx) => (
                  <li key={idx} className="text-sm italic text-amber-900 font-semibold">{work}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 4 — Book of the Month */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 sm:p-7 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-violet-500">Monthly Curated Reading</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{monthly.book.title}</h2>
            <span className="text-sm text-slate-500 font-semibold mt-1 mb-4">By {monthly.book.author}</span>
            <div className="bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 p-4 flex-1">
              <strong className="block text-[11px] uppercase tracking-wider text-slate-500 mb-2">Synopsis</strong>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{monthly.book.summary}</p>
            </div>
          </div>

        </div>

        {/* ── Footer Nav ── */}
        <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleDayShift(Math.max(1, dayOfYear - 1))}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <ChevronLeft size={16} /> Previous Day
            </button>
            <button
              onClick={() => handleDayShift(Math.min(365, dayOfYear + 1))}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Next Day <ChevronRight size={16} />
            </button>
          </div>
          <button
            onClick={() => {
              const d = new Date();
              handleDayShift(Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000));
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Reset to Today
          </button>
        </footer>

      </div>
    </div>
  );
}
