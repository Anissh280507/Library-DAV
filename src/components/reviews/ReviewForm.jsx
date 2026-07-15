import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { StarRating } from './StarRating';

const INITIAL = {
  bookTitle: '', author: '', studentName: '', class: '', rating: 0, review: '',
};

// Defined OUTSIDE ReviewForm so React never remounts inputs on re-render
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError) {
  return `w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
    hasError ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
  }`;
}

export function ReviewForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.bookTitle.trim())           e.bookTitle   = 'Book title is required.';
    if (!form.author.trim())              e.author      = 'Author name is required.';
    if (!form.studentName.trim())         e.studentName = 'Your name is required.';
    if (!form.class)                      e.class       = 'Please select your class.';
    if (!form.rating)                     e.rating      = 'Please select a star rating.';
    if (form.review.trim().length < 50)   e.review      = 'Review must be at least 50 characters.';
    if (form.review.trim().length > 500)  e.review      = 'Review must be at most 500 characters.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        bookTitle:   form.bookTitle.trim(),
        author:      form.author.trim(),
        studentName: form.studentName.trim(),
        class:       form.class,
        rating:      Number(form.rating),
        review:      form.review.trim(),
        approved:    false,
        createdAt:   serverTimestamp(),
      });
      setForm(INITIAL);
      onSuccess?.();
    } catch (err) {
      console.error('Firestore write error:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const charCount = form.review.trim().length;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Book Title" error={errors.bookTitle}>
          <input
            className={inputCls(!!errors.bookTitle)}
            placeholder="e.g. Wings of Fire"
            value={form.bookTitle}
            onChange={e => set('bookTitle', e.target.value)}
          />
        </Field>

        <Field label="Author" error={errors.author}>
          <input
            className={inputCls(!!errors.author)}
            placeholder="e.g. A.P.J. Abdul Kalam"
            value={form.author}
            onChange={e => set('author', e.target.value)}
          />
        </Field>

        <Field label="Your Name" error={errors.studentName}>
          <input
            className={inputCls(!!errors.studentName)}
            placeholder="e.g. Priya Sharma"
            value={form.studentName}
            onChange={e => set('studentName', e.target.value)}
          />
        </Field>

        <Field label="Class" error={errors.class}>
          <select
            className={inputCls(!!errors.class)}
            value={form.class}
            onChange={e => set('class', e.target.value)}
          >
            <option value="">Select class</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Rating" error={errors.rating}>
        <div className="mt-1">
          <StarRating value={form.rating} onChange={v => set('rating', v)} size="lg" />
        </div>
      </Field>

      <Field label={`Your Review (${charCount}/500)`} error={errors.review}>
        <textarea
          className={`${inputCls(!!errors.review)} resize-none`}
          rows={4}
          placeholder="Share your thoughts about this book… (min 50 characters)"
          value={form.review}
          onChange={e => set('review', e.target.value)}
          maxLength={500}
        />
        <p className={`text-xs mt-0.5 ${charCount < 50 ? 'text-slate-400' : 'text-green-600'}`}>
          {charCount < 50 ? `${50 - charCount} more characters needed` : '✓ Minimum length reached'}
        </p>
      </Field>

      {errors.submit && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting…' : '📝 Submit Review'}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Your review will appear after moderation approval.
      </p>
    </form>
  );
}
