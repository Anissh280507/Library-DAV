import React, { useState, useEffect } from 'react';
import { DAILY_DICTIONARY_DATA, MONTHLY_CURATION_DATA } from '../data/libraryData';

export default function DailyReads() {
  const [dayOfYear, setDayOfYear] = useState(1);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [displayDate, setDisplayDate] = useState('');
  const [displayDayName, setDisplayDayName] = useState('');

  const updateDateFromDayOfYear = (dayNum) => {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 0, dayNum);
    
    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    setDisplayDate(targetDate.toLocaleDateString('en-IN', dateOptions));

    const dayNameOptions = { weekday: 'long' };
    setDisplayDayName(targetDate.toLocaleDateString('en-IN', dayNameOptions));
    
    setCurrentMonthIndex(targetDate.getMonth());
  };

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    
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
    <div style={{ 
      maxWidth: '1200px', 
      margin: '40px auto', 
      padding: '32px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      backgroundColor: '#f8fafc', 
      color: '#0f172a',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}>
      
      {/* Enhanced Header Banner */}
      <header style={{ 
        borderBottom: '1px solid #e2e8f0', 
        paddingBottom: '24px', 
        marginBottom: '40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', margin: 0, color: '#1e293b' }}>
            Daily Reads
          </h1>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '16px', fontWeight: '500' }}>
            {displayDayName}, <span style={{ color: '#3b82f6', fontWeight: '600' }}>{displayDate}</span>
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '14px', backgroundColor: '#f1f5f9', color: '#475569', padding: '8px 16px', borderRadius: '9999px', fontWeight: '600', border: '1px solid #e2e8f0' }}>
            Day <span style={{ color: '#0f172a', fontWeight: '700' }}>{dayOfYear}</span> of 365
          </div>
          <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '8px 20px', borderRadius: '9999px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.02em', textTransform: 'uppercase', border: '1px solid #bfdbfe' }}>
            {monthly?.month || "Edition"} Edition
          </div>
        </div>
      </header>

      {/* Modern Card Workspace Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '32px' }}>
        
        {/* SECTION 1: WORD OF THE DAY */}
        <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3b82f6', fontWeight: '800', letterSpacing: '0.1em' }}>Vocabulary Expansion</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>{daily.word}</h2>
              <span style={{ color: '#64748b', fontSize: '14px', fontStyle: 'italic', fontWeight: '500' }}>({daily.type})</span>
            </div>
            
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#334155', margin: '16px 0 24px 0', paddingLeft: '16px', borderLeft: '4px solid #3b82f6', fontWeight: '500' }}>
              {daily.meaning}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ backgroundColor: '#f0fdf4', padding: '12px 16px', borderRadius: '12px' }}>
              <strong style={{ display: 'block', fontSize: '12px', color: '#166534', textTransform: 'uppercase', marginBottom: '4px' }}>Synonyms</strong>
              <span style={{ fontSize: '14px', color: '#14532d', fontWeight: '600' }}>{daily.synonyms.join(', ')}</span>
            </div>
            <div style={{ backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '12px' }}>
              <strong style={{ display: 'block', fontSize: '12px', color: '#991b1b', textTransform: 'uppercase', marginBottom: '4px' }}>Antonyms</strong>
              <span style={{ fontSize: '14px', color: '#7f1d1d', fontWeight: '600' }}>{daily.antonyms.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: PHRASES & IDIOMS */}
        <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#10b981', fontWeight: '800', letterSpacing: '0.1em' }}>Idiomatic Expressions</span>
            </div>
            
            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.05em' }}>Phrase of the Day</h3>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0, fontStyle: 'italic' }}>“{daily.phrase}”</p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.05em' }}>Idiom of the Day</h3>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0, fontStyle: 'italic' }}>“{daily.idiom}”</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: AUTHOR OF THE MONTH */}
        <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#f59e0b', fontWeight: '800', letterSpacing: '0.1em' }}>Featured Indian Author</span>
            </div>
            
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', marginTop: '4px', marginBottom: '12px', letterSpacing: '-0.01em' }}>{monthly.author.name}</h2>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>{monthly.author.bio}</p>
          </div>
          
          <div style={{ backgroundColor: '#fffbeb', padding: '16px 20px', borderRadius: '16px', border: '1px solid #fef3c7' }}>
            <strong style={{ display: 'block', fontSize: '12px', color: '#b45309', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Essential Literary Works</strong>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {monthly.author.works.map((work, idx) => (
                <li key={idx} style={{ fontStyle: 'italic', color: '#78350f', fontWeight: '600', fontSize: '14px' }}>{work}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION 4: BOOK OF THE MONTH */}
        <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8b5cf6', fontWeight: '800', letterSpacing: '0.1em' }}>Monthly Curated Reading</span>
            </div>
            
            <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b', marginTop: '4px', marginBottom: '4px', letterSpacing: '-0.01em' }}>{monthly.book.title}</h2>
            <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', display: 'block', marginBottom: '16px' }}>By {monthly.book.author}</span>
            
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', margin: 0, backgroundColor: '#fafafa', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px', fontSize: '13px', textTransform: 'uppercase' }}>Synopsis</strong> 
              {monthly.book.summary}
            </p>
          </div>
        </div>

      </div>

      {/* Modern Sim Navigation Control Footer */}
      <footer style={{ 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        gap: '16px' 
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => { handleDayShift(Math.max(1, dayOfYear - 1)); }} 
            style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            ← Previous Day
          </button>
          <button 
            onClick={() => { handleDayShift(Math.min(365, dayOfYear + 1)); }} 
            style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            Next Day →
          </button>
        </div>
        
        <button 
          onClick={() => { 
            const d = new Date(); 
            const todayNum = Math.floor((d - new Date(d.getFullYear(),0,0)) / 86400000); 
            handleDayShift(todayNum); 
          }} 
          style={{ padding: '10px 24px', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
        >
          Reset to Today
        </button>
      </footer>

    </div>
  );
}