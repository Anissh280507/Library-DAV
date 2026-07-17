import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { BookOpen, CheckCircle2, GraduationCap, PencilLine, Search, Star, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { ReviewCard } from '../components/reviews/ReviewCard';
import { ReviewForm } from '../components/reviews/ReviewForm';
import { SkeletonCard } from '../components/reviews/SkeletonCard';

function StatsBar({ total, avgRating }) {
  const stats = [
    { label: 'Total Reviews', value: total, icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { label: 'Average Rating', value: total ? `${avgRating} / 5` : '-', icon: Star, color: 'bg-amber-50 text-amber-600' },
    { label: 'Moderated', value: 'Yes', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Open to All', value: 'Classes 1-10', icon: GraduationCap, color: 'bg-violet-50 text-violet-600' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm px-4 py-3 flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${color}`}>
            <Icon size={20} />
          </span>
          <div>
            <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ filtered }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
        {filtered ? <Search size={26} /> : <BookOpen size={26} />}
      </span>
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-1">
        {filtered ? 'No matching reviews' : 'No reviews yet'}
      </h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">
        {filtered
          ? 'Try a different search term or clear the filter.'
          : 'Be the first to share a review for your favourite book!'}
      </p>
    </div>
  );
}

export default function BookReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'reviews'), where('approved', '==', true));
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      docs.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
      setReviews(docs);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 5000);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = q
      ? reviews.filter((r) =>
          r.bookTitle?.toLowerCase().includes(q) ||
          r.author?.toLowerCase().includes(q)
        )
      : [...reviews];

    if (sort === 'oldest') list.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
    if (sort === 'highest') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [reviews, search, sort]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-1">DAV Virtual Library</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Book Reviews</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">Student-written reviews from our school community.</p>
          </div>
          <button
            onClick={() => {
              setShowForm((value) => !value);
              setSuccessMsg(false);
            }}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm"
          >
            {showForm ? <X size={16} /> : <PencilLine size={16} />}
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {successMsg && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 animate-fade-up">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <CheckCircle2 size={20} />
            </span>
            <div>
              <p className="font-bold text-green-800 text-sm">Review submitted successfully!</p>
              <p className="text-xs text-green-600 mt-0.5">It will appear here once approved by the librarian.</p>
            </div>
          </div>
        )}

        {showForm && (
          <div className="mb-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm p-5 sm:p-7">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-5">Share Your Thoughts</h2>
            <ReviewForm onSuccess={handleSuccess} />
          </div>
        )}

        <StatsBar total={reviews.length} avgRating={avgRating} />

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
          </select>
        </div>

        {!loading && (
          <p className="text-xs text-slate-400 mb-4 font-medium">
            {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'}
            {search ? ` for "${search}"` : ''}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : filtered.length
              ? filtered.map((review) => <ReviewCard key={review.id} review={review} />)
              : null}
        </div>

        {!loading && filtered.length === 0 && <EmptyState filtered={!!search} />}
      </div>
    </div>
  );
}
