// Interactive or display-only star rating
export function StarRating({ value, onChange, size = 'md' }) {
  const sizes = { sm: 'text-base', md: 'text-2xl', lg: 'text-3xl' };
  const stars = [1, 2, 3, 4, 5];

  if (onChange) {
    // Interactive
    return (
      <div className="flex gap-1" role="group" aria-label="Star rating">
        {stars.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`${sizes[size]} transition-transform hover:scale-125 focus:outline-none`}
            aria-label={`${s} star${s > 1 ? 's' : ''}`}
          >
            <span className={s <= value ? 'text-amber-400' : 'text-slate-300'}>★</span>
          </button>
        ))}
      </div>
    );
  }

  // Display only
  return (
    <div className={`flex gap-0.5 ${sizes[size]}`} aria-label={`${value} out of 5 stars`}>
      {stars.map(s => (
        <span key={s} className={s <= value ? 'text-amber-400' : 'text-slate-200'}>★</span>
      ))}
    </div>
  );
}
