import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { ReviewForm } from '../components/reviews/ReviewForm';
import { SkeletonCard } from '../components/reviews/SkeletonCard';

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ total, avgRating }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[
        { label: 'Total Reviews', value: total, icon: '📚' },
        { label: 'Average Rating', value: total ? `${avgRating} / 5` : '—', icon: '⭐' },
        { label: 'Moderated', value: 'Yes', icon: '✅' },
        { label: 'Open to All', value: 'Classes 1–10', icon: '🎓' },
      ].map(s => (
        <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">{s.icon}</span>
          <div>
            <p className="text-lg font-extrabold text-slate-900 leading-none">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ filtered }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl mb-4">{filtered ? '🔍' : '📖'}</span>
      <h3 className="text-lg font-bold text-slate-700 mb-1">
        {filtered ? 'No matching reviews' : 'No reviews yet'}
      </h3>
      <p className="text-sm text-slate-400 max-w-xs">
        {filtered
          ? 'Try a different search term or clear the filter.'
          : 'Be the first to share a review for your favourite book!'}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BookReviews() {
  const [reviews, setReviews]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('newest');
  const [showForm, setShowForm]   = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'reviews'),
        where('approved', '==', true)
      );
      const snap = await getDocs(q);
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort newest first client-side — avoids needing a composite Firestore index
      docs.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
      setReviews(docs);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 5000);
  };

  // Filter + sort
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = q
      ? reviews.filter(r =>
          r.bookTitle?.toLowerCase().includes(q) ||
          r.author?.toLowerCase().includes(q)
        )
      : [...reviews];

    if (sort === 'oldest')  list.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
    if (sort === 'highest') list.sort((a, b) => b.rating - a.rating);
    // newest is default from Firestore
    return list;
  }, [reviews, search, sort]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-1">DAV Virtual Library</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Book Reviews</h1>
            <p className="text-sm text-slate-500 mt-1.5">Student-written reviews from our school community.</p>
          </div>
          <button
            onClick={() => { setShowForm(f => !f); setSuccessMsg(false); }}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm"
          >
            {showForm ? '✕ Cancel' : '✏️ Write a Review'}
          </button>
        </div>

        {/* ── Success Banner ── */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 animate-fade-in">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-bold text-green-800 text-sm">Review submitted successfully!</p>
              <p className="text-xs text-green-600 mt-0.5">It will appear here once approved by the librarian.</p>
            </div>
          </div>
        )}

        {/* ── Review Form ── */}
        {showForm && (
          <div className="mb-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
            <h2 className="text-lg font-extrabold text-slate-900 mb-5">Share Your Thoughts</h2>
            <ReviewForm onSuccess={handleSuccess} />
          </div>
        )}

        {/* ── Stats ── */}
        <StatsBar total={reviews.length} avgRating={avgRating} />

        {/* ── Search + Sort ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search by book title or author…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg">×</button>
            )}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="newest">⬇ Newest First</option>
            <option value="oldest">⬆ Oldest First</option>
            <option value="highest">⭐ Highest Rated</option>
          </select>
        </div>

        {/* ── Results label ── */}
        {!loading && (
          <p className="text-xs text-slate-400 mb-4 font-medium">
            {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'}
            {search ? ` for "${search}"` : ''}
          </p>
        )}

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length
            ? filtered.map(r => <ReviewCard key={r.id} review={r} />)
            : null
          }
        </div>

        {!loading && filtered.length === 0 && (
          <EmptyState filtered={!!search} />
        )}

      </div>
    </div>
  );
}
