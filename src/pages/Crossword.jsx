import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { generateCrossword } from '../hooks/useCrosswordGenerator';

// ─── CROSSWORD GRID (REFACTORED MINIMAL PALETTE & BOLD INPUTS) ───────────────
function CrosswordGrid({ grid, gridSize, words, userGrid, activeCell, activeWord, revealedCells, wrongCells, onCellClick, onKeyDown, onInputChange, inputRefs }) {
  const cellSize = Math.min(36, Math.floor(480 / gridSize));

  return (
    <div className="overflow-auto flex justify-center">
      <div
        className="inline-grid border border-slate-400 bg-slate-300"
        style={{ gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`, gap: '1px' }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            if (!cell.filled) {
              return (
                <div
                  key={`${r}-${c}`}
                  className="bg-slate-800"
                  style={{ width: cellSize, height: cellSize }}
                />
              );
            }

            const isActive = activeCell?.row === r && activeCell?.col === c;
            const inActiveWord = activeWord?.some(w => w.row === r && w.col === c);
            const isRevealed = revealedCells.has(`${r}-${c}`);
            const isWrong = wrongCells.has(`${r}-${c}`);

            // Background prioritization rule matrix
            let bgClass = 'bg-white';
            if (isActive) bgClass = 'bg-blue-300';
            else if (inActiveWord) bgClass = 'bg-blue-100';
            
            if (isRevealed) bgClass = 'bg-emerald-100';
            if (isWrong) bgClass = 'bg-rose-100';

            const wordAtCell = words.find(w => w.row === r && w.col === c);
            const cellNumber = wordAtCell?.number;

            const userLetter = userGrid[`${r}-${c}`] || '';
            let textColor = 'text-slate-900';
            if (isRevealed) textColor = 'text-emerald-700';
            if (isWrong) textColor = 'text-rose-600';

            return (
              <div
                key={`${r}-${c}`}
                className={`relative cursor-pointer select-none transition-colors duration-150 ${bgClass}`}
                style={{ width: cellSize, height: cellSize }}
                onClick={() => onCellClick(r, c)}
              >
                {cellNumber && (
                  <span
                    className="absolute top-0.5 left-0.5 text-slate-500 font-bold z-10 leading-none"
                    style={{ fontSize: Math.max(8, cellSize * 0.24) }}
                  >
                    {cellNumber}
                  </span>
                )}
                <input
                  ref={el => { if (inputRefs.current) inputRefs.current[`${r}-${c}`] = el; }}
                  className={`w-full h-full bg-transparent text-center font-black uppercase outline-none border-none caret-transparent ${textColor}`}
                  style={{ 
                    fontSize: Math.max(14, cellSize * 0.55), 
                    paddingTop: cellNumber ? '6px' : '0px'
                  }}
                  maxLength={1}
                  value={userLetter}
                  onChange={(e) => onInputChange(e, r, c)}
                  onKeyDown={e => onKeyDown(e, r, c)}
                  readOnly={isRevealed}
                  aria-label={`Cell row ${r + 1} column ${c + 1}`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── CLUE LIST ──────────────────────────────────────────────────────────────────
function ClueList({ words, activeWord, completedWords, onClueClick }) {
  const across = useMemo(() => words.filter(w => w.direction === 'across').sort((a, b) => a.number - b.number), [words]);
  const down   = useMemo(() => words.filter(w => w.direction === 'down').sort((a, b) => a.number - b.number), [words]);
  const activeIds = new Set(activeWord?.map(aw => aw.id) ?? []);

  const renderClue = (w) => {
    const isActive = activeIds.has(w.id);
    const isDone = completedWords.has(w.id);
    return (
      <li
        key={w.id}
        onClick={() => onClueClick(w)}
        className={`px-3 py-1.5 rounded-lg cursor-pointer text-sm transition-all duration-150
          ${isActive ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'hover:bg-slate-100 text-slate-700'}
          ${isDone ? 'line-through opacity-40' : ''}
        `}
      >
        <span className={`font-bold mr-1.5 ${isActive ? 'text-white' : 'text-blue-600'}`}>{w.number}.</span>
        {w.clue}
      </li>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-bold text-blue-600 mb-3 uppercase tracking-wider text-xs border-b pb-1 border-slate-200">Across</h3>
        <ul className="space-y-1">{across.map(renderClue)}</ul>
      </div>
      <div>
        <h3 className="font-bold text-indigo-600 mb-3 uppercase tracking-wider text-xs border-b pb-1 border-slate-200">Down</h3>
        <ul className="space-y-1">{down.map(renderClue)}</ul>
      </div>
    </div>
  );
}

// ─── GAME CONTROLS ──────────────────────────────────────────────────────────────
function GameControls({ score, timer, difficulty, setDifficulty, progress, onCheck, onReset, onReveal, onHint }) {
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6 text-base font-bold">
          <span className="text-amber-500">⭐ Score: {score}</span>
          <span className="text-blue-600">⏱️ Time: {fmt(timer)}</span>
        </div>
        <div>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="text-sm font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">🟢 Easy (Classes 1–3)</option>
            <option value="medium">🟡 Medium (Classes 4–7)</option>
            <option value="hard">🔴 Hard (Classes 8–10)</option>
          </select>
        </div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={onCheck} className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all shadow-sm">✅ Check Answers</button>
        <button onClick={onHint} className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all shadow-sm">💡 Get Hint (-5)</button>
        <button onClick={onReveal} className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm">👁️ Reveal Cell (-3)</button>
        <button onClick={onReset} className="px-4 py-2.5 rounded-xl bg-slate-500 hover:bg-slate-600 text-white text-sm font-bold transition-all shadow-sm">🔄 New Puzzle</button>
      </div>
    </div>
  );
}

// ─── SUCCESS MODAL ──────────────────────────────────────────────────────────────
function SuccessModal({ score, timer, difficulty, onPlayAgain }) {
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center border border-slate-100">
        <div className="text-6xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Puzzle Solved!</h2>
        <p className="text-slate-500 mb-6 text-sm font-medium">Exceptional work, structural scholar!</p>
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <p className="text-xl font-black text-amber-600">{score}</p>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Score</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
            <p className="text-xl font-black text-blue-600">{fmt(timer)}</p>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Time</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <p className="text-sm font-black text-indigo-600 capitalize mt-1">{difficulty}</p>
            <p className="text-xs text-slate-500 font-bold mt-1">Level</p>
          </div>
        </div>
        <button
          onClick={onPlayAgain}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all shadow-md"
        >
          🎮 Play Again
        </button>
      </div>
    </div>
  );
}

// ─── MAIN GAME ENGINE ──────────────────────────────────────────────────────────
export default function CrosswordGame() {
  const [difficulty, setDifficulty] = useState('medium');
  const [puzzle, setPuzzle] = useState(() => generateCrossword('medium'));
  const [userGrid, setUserGrid] = useState({});
  const [activeCell, setActiveCell] = useState(null);
  const [activeDirection, setActiveDirection] = useState('across');
  const [revealedCells, setRevealedCells] = useState(new Set());
  const [wrongCells, setWrongCells] = useState(new Set());
  const [completedWords, setCompletedWords] = useState(new Set());
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const inputRefs = useRef({});
  const timerRef = useRef(null);

  const { grid, words, gridSize } = puzzle;

  useEffect(() => {
    if (running && !showModal) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [running, showModal]);

  useEffect(() => {
    if (activeCell) {
      inputRefs.current[`${activeCell.row}-${activeCell.col}`]?.focus();
    }
  }, [activeCell]);

  const activeWord = useMemo(() => {
    if (!activeCell) return [];
    const matching = words.filter(w => {
      if (w.direction !== activeDirection) return false;
      if (activeDirection === 'across') {
        return w.row === activeCell.row && activeCell.col >= w.col && activeCell.col < w.col + w.word.length;
      } else {
        return w.col === activeCell.col && activeCell.row >= w.row && activeCell.row < w.row + w.word.length;
      }
    });
    if (!matching.length) return [];
    const w = matching[0];
    return Array.from({ length: w.word.length }, (_, i) => ({
      row: w.direction === 'across' ? w.row : w.row + i,
      col: w.direction === 'across' ? w.col + i : w.col,
      id: w.id,
    }));
  }, [activeCell, activeDirection, words]);

  const progress = useMemo(() => {
    const total = words.reduce((s, w) => s + w.word.length, 0);
    const filled = words.reduce((s, w) => {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.direction === 'across' ? w.row : w.row + i;
        const c = w.direction === 'across' ? w.col + i : w.col;
        if (userGrid[`${r}-${c}`]) s++;
      }
      return s;
    }, 0);
    return total === 0 ? 0 : (filled / total) * 100;
  }, [userGrid, words]);

  const startNew = useCallback((diff) => {
    const d = diff || difficulty;
    const newPuzzle = generateCrossword(d);
    setPuzzle(newPuzzle);
    setUserGrid({});
    setActiveCell(null);
    setRevealedCells(new Set());
    setWrongCells(new Set());
    setCompletedWords(new Set());
    setScore(0);
    setTimer(0);
    setRunning(true);
    setShowModal(false);
    inputRefs.current = {};
  }, [difficulty]);

  const handleDifficultyChange = useCallback((d) => {
    setDifficulty(d);
    startNew(d);
  }, [startNew]);

  const handleCellClick = useCallback((row, col) => {
    if (activeCell?.row === row && activeCell?.col === col) {
      setActiveDirection(d => d === 'across' ? 'down' : 'across');
    } else {
      setActiveCell({ row, col });
    }
  }, [activeCell]);

  const handleClueClick = useCallback((word) => {
    setActiveCell({ row: word.row, col: word.col });
    setActiveDirection(word.direction);
  }, []);

  const getNextCell = useCallback((row, col, dir) => {
    if (dir === 'across') return grid[row]?.[col + 1]?.filled ? { row, col: col + 1 } : null;
    return grid[row + 1]?.[col]?.filled ? { row: row + 1, col } : null;
  }, [grid]);

  const getPrevCell = useCallback((row, col, dir) => {
    if (dir === 'across') return col > 0 && grid[row]?.[col - 1]?.filled ? { row, col: col - 1 } : null;
    return row > 0 && grid[row - 1]?.[col]?.filled ? { row: row - 1, col } : null;
  }, [grid]);

  const checkCompletion = useCallback((newUserGrid, newRevealed) => {
    const allCorrect = words.every(w =>
      Array.from({ length: w.word.length }, (_, i) => {
        const r = w.direction === 'across' ? w.row : w.row + i;
        const c = w.direction === 'across' ? w.col + i : w.col;
        const key = `${r}-${c}`;
        return (newUserGrid[key] === w.word[i]) || newRevealed.has(key);
      }).every(Boolean)
    );

    if (allCorrect) {
      setRunning(false);
      setShowModal(true);
      confetti({ particleCount: 160, spread: 70, origin: { y: 0.6 } });
    }
  }, [words]);

  // Operational State Input Text Adjuster
  const handleInputChange = useCallback((e, row, col) => {
    const val = e.target.value.toUpperCase();
    const key = `${row}-${col}`;
    if (revealedCells.has(key) || !/^[A-Z]?$/.test(val)) return;

    const newGrid = { ...userGrid, [key]: val };
    setUserGrid(newGrid);
    setWrongCells(s => { const n = new Set(s); n.delete(key); return n; });

    if (val) {
      const next = getNextCell(row, col, activeDirection);
      if (next) setActiveCell(next);
    }
    checkCompletion(newGrid, revealedCells);
  }, [userGrid, revealedCells, activeDirection, getNextCell, checkCompletion]);

  const handleKeyDown = useCallback((e, row, col) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); setActiveDirection('across'); const n = getNextCell(row, col, 'across'); if (n) setActiveCell(n); return; }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); setActiveDirection('across'); const n = getPrevCell(row, col, 'across'); if (n) setActiveCell(n); return; }
    if (e.key === 'ArrowDown')  { e.preventDefault(); setActiveDirection('down');   const n = getNextCell(row, col, 'down');   if (n) setActiveCell(n); return; }
    if (e.key === 'ArrowUp')    { e.preventDefault(); setActiveDirection('down');   const n = getPrevCell(row, col, 'down');   if (n) setActiveCell(n); return; }

    if (e.key === 'Tab') {
      e.preventDefault();
      const allFilled = words.filter(w => grid[w.row]?.[w.col]?.filled);
      const idx = allFilled.findIndex(w => w.row === activeWord[0]?.row && w.col === activeWord[0]?.col);
      const next = allFilled[(idx + (e.shiftKey ? -1 : 1) + allFilled.length) % allFilled.length];
      if (next) { setActiveCell({ row: next.row, col: next.col }); setActiveDirection(next.direction); }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      const key = `${row}-${col}`;
      if (revealedCells.has(key)) return;
      
      if (userGrid[key]) {
        setUserGrid(g => { const n = { ...g }; delete n[key]; return n; });
        setWrongCells(s => { const n = new Set(s); n.delete(key); return n; });
      } else {
        const prev = getPrevCell(row, col, activeDirection);
        if (prev) setActiveCell(prev);
      }
    }
  }, [activeDirection, activeWord, userGrid, revealedCells, words, grid, getNextCell, getPrevCell]);

  const handleCheck = useCallback(() => {
    let gained = 0;
    const newWrong = new Set(wrongCells);
    words.forEach(w => {
      let wordCorrect = true;
      for (let i = 0; i < w.word.length; i++) {
        const r = w.direction === 'across' ? w.row : w.row + i;
        const c = w.direction === 'across' ? w.col + i : w.col;
        const key = `${r}-${c}`;
        if (revealedCells.has(key)) continue;
        const typed = userGrid[key];
        if (!typed) { wordCorrect = false; continue; }
        if (typed === w.word[i]) {
          newWrong.delete(key);
          gained += 10;
        } else {
          newWrong.add(key);
          gained -= 2;
          wordCorrect = false;
        }
      }
      if (wordCorrect) setCompletedWords(s => new Set([...s, w.id]));
    });
    setWrongCells(newWrong);
    setScore(s => s + gained);
  }, [words, userGrid, revealedCells, wrongCells]);

  const handleReveal = useCallback(() => {
    if (!activeCell) return;
    const key = `${activeCell.row}-${activeCell.col}`;
    const correct = grid[activeCell.row]?.[activeCell.col]?.letter;
    if (!correct) return;
    setRevealedCells(s => new Set([...s, key]));
    setUserGrid(g => ({ ...g, [key]: correct }));
    setWrongCells(s => { const n = new Set(s); n.delete(key); return n; });
    setScore(s => Math.max(0, s - 3));
    checkCompletion({ ...userGrid, [key]: correct }, new Set([...revealedCells, key]));
  }, [activeCell, grid, userGrid, revealedCells, checkCompletion]);

  const handleHint = useCallback(() => {
    const target = activeWord.find(({ row, col }) => !userGrid[`${row}-${col}`] && !revealedCells.has(`${row}-${col}`));
    if (!target) return;
    const key = `${target.row}-${target.col}`;
    const correct = grid[target.row]?.[target.col]?.letter;
    setRevealedCells(s => new Set([...s, key]));
    setUserGrid(g => ({ ...g, [key]: correct }));
    setScore(s => Math.max(0, s - 5));
    checkCompletion({ ...userGrid, [key]: correct }, new Set([...revealedCells, key]));
  }, [activeWord, userGrid, revealedCells, grid, checkCompletion]);

  const handleReset = useCallback(() => startNew(difficulty), [startNew, difficulty]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
        <h1 
    className="text-4xl font-black tracking-tight"
    style={{ color: '#0f172a' }} // Explicit hex override to force dark slate text
  >
    Virtual Library Crossword
  </h1>
          <p className="text-sm font-semibold text-slate-500 mt-1.5">Click cells to write your answers. Use arrow keys to navigate.</p>
        </div>

        <div className="mb-6">
          <GameControls
            score={score}
            timer={timer}
            difficulty={difficulty}
            setDifficulty={handleDifficultyChange}
            progress={progress}
            onCheck={handleCheck}
            onReset={handleReset}
            onReveal={handleReveal}
            onHint={handleHint}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-5 border border-slate-200">
            <CrosswordGrid
              grid={grid}
              gridSize={gridSize}
              words={words}
              userGrid={userGrid}
              activeCell={activeCell}
              activeWord={activeWord}
              revealedCells={revealedCells}
              wrongCells={wrongCells}
              onCellClick={handleCellClick}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              inputRefs={inputRefs}
            />
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm p-5 border border-slate-200 overflow-y-auto max-h-[720px]">
            <ClueList
              words={words}
              activeWord={activeWord}
              completedWords={completedWords}
              onClueClick={handleClueClick}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <SuccessModal
          score={score}
          timer={timer}
          difficulty={difficulty}
          onPlayAgain={() => startNew(difficulty)}
        />
      )}
    </div>
  );
}