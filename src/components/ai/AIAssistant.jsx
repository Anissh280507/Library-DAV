import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Clipboard,
  Copy,
  HelpCircle,
  Keyboard,
  Mic,
  MoreHorizontal,
  Paperclip,
  RefreshCcw,
  Send,
  Settings,
  Sparkles,
  Star,
  Target,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Volume2,
  X,
} from 'lucide-react';
import { callAI, buildLibrarianPrompt } from '../../services/aiService';
import BookRecommendation from './features/BookRecommendation';
import ImproveReview from './features/ImproveReview';
import BookSummary from './features/BookSummary';
import GenerateQuiz from './features/GenerateQuiz';
import VocabularyHelper from './features/VocabularyHelper';
import ReadingChallenge from './features/ReadingChallenge';
import AskLibrarian from './features/AskLibrarian';

const FEATURES = [
  { id: 'bookRecommendation', icon: BookOpen, title: 'Recommend Books', desc: 'Personalised picks for your class and reading taste.', accent: 'from-indigo-500 to-sky-500', component: BookRecommendation },
  { id: 'improveReview', icon: Clipboard, title: 'Improve Review', desc: 'Polish grammar, structure, vocabulary, and confidence.', accent: 'from-blue-500 to-cyan-500', component: ImproveReview },
  { id: 'summary', icon: BookOpen, title: 'Book Summary', desc: 'Create concise, student-friendly summaries in seconds.', accent: 'from-emerald-500 to-teal-500', component: BookSummary },
  { id: 'quiz', icon: Target, title: 'Quiz Generator', desc: 'Make MCQs, true or false, and answer keys for revision.', accent: 'from-orange-500 to-amber-500', component: GenerateQuiz },
  { id: 'vocabulary', icon: Keyboard, title: 'Vocabulary', desc: 'Meanings, synonyms, antonyms, and library examples.', accent: 'from-rose-500 to-pink-500', component: VocabularyHelper },
  { id: 'readingChallenge', icon: Star, title: 'Reading Challenge', desc: 'Build a fun 7-day plan for stronger reading habits.', accent: 'from-yellow-500 to-lime-500', component: ReadingChallenge },
  { id: 'librarian', icon: HelpCircle, title: 'Ask Librarian', desc: 'Ask about themes, morals, characters, or reading doubts.', accent: 'from-violet-500 to-fuchsia-500', component: AskLibrarian },
];

const quickHelp = [
  'Book Recommendations',
  'Improve Reviews',
  'Summaries',
  'Quizzes',
  'Vocabulary',
  'Reading Questions',
];

function AssistantMark({ size = 24, className = '' }) {
  const petal = 'fill-white/95 drop-shadow-sm';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="32" cy="32" r="5.5" className="fill-white/95" />
      <circle cx="32" cy="15" r="8.5" className={petal} />
      <circle cx="32" cy="49" r="8.5" className={petal} />
      <circle cx="15" cy="32" r="8.5" className={petal} />
      <circle cx="49" cy="32" r="8.5" className={petal} />
      <path
        d="M21.8 21.8 32 32m10.2-10.2L32 32m10.2 10.2L32 32M21.8 42.2 32 32"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        className="opacity-90"
      />
      <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="1.5" className="opacity-20" />
    </svg>
  );
}

function AssistantIconShell({ children, className = '', size = 'h-11 w-11' }) {
  return (
    <span
      className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#ff8a5c] via-[#f45491] to-[#6d5dfc] text-white shadow-lg shadow-fuchsia-500/25 ${className}`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.55),transparent_24%),radial-gradient(circle_at_78%_82%,rgba(34,211,238,0.42),transparent_34%)]" />
      <span className="absolute inset-px rounded-[17px] border border-white/25" />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function formatTime(ts) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(ts);
}

function MessageText({ text }) {
  const blocks = text.split('\n');

  return (
    <div className="space-y-1.5">
      {blocks.map((line, index) => {
        const trimmed = line.trim();
        const parts = line.split(/(\*\*[^*]+\*\*)/g);

        if (/^[-*]\s+/.test(trimmed)) {
          return (
            <div key={index} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
              <span>{trimmed.replace(/^[-*]\s+/, '')}</span>
            </div>
          );
        }

        return (
          <p key={index}>
            {parts.map((part, partIndex) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={partIndex} className="font-semibold text-slate-950 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

const ThinkingDots = memo(function ThinkingDots() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <motion.span
        className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20"
        animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-2 w-2 rounded-full bg-slate-400"
            animate={{ y: [0, -5, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
});

const VoiceStatus = memo(function VoiceStatus({ loading }) {
  const state = loading ? 'Thinking...' : 'Listening...';

  return (
    <div className="rounded-[22px] border border-white/60 bg-white/55 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <motion.span
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/25"
            animate={loading ? { rotate: 360 } : { scale: [1, 1.08, 1] }}
            transition={{ duration: loading ? 4 : 1.5, repeat: Infinity, ease: 'linear' }}
          >
            {loading ? <Brain size={15} /> : <Mic size={15} />}
          </motion.span>
          {state}
        </div>
        <Volume2 size={17} className={loading ? 'text-indigo-500' : 'text-slate-400'} />
      </div>
      <div className="flex h-12 items-center justify-center gap-1.5">
        {Array.from({ length: 22 }, (_, index) => (
          <motion.span
            key={index}
            className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 to-cyan-400"
            animate={{ height: loading ? [10, 28, 14] : [12, 38, 16] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.04, repeatType: 'mirror' }}
          />
        ))}
      </div>
    </div>
  );
});

const FeatureCard = memo(function FeatureCard({ feature, onClick }) {
  const Icon = feature.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-[22px] bg-gradient-to-br p-px text-left shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-70`} />
      <div className="relative h-full rounded-[21px] border border-white/60 bg-white/85 p-4 backdrop-blur-xl transition-colors group-hover:bg-white dark:border-white/10 dark:bg-slate-950/80 dark:group-hover:bg-slate-950">
        <motion.span
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}
          whileHover={{ rotate: -5 }}
        >
          <Icon size={24} />
        </motion.span>
        <h3 className="text-sm font-bold tracking-tight text-slate-950 dark:text-white">{feature.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{feature.desc}</p>
        <span className="mt-4 inline-flex text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-indigo-500">
          Open
        </span>
      </div>
    </motion.button>
  );
});

const MessageBubble = memo(function MessageBubble({ message, onCopy, onRegenerate, onRead }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <AssistantIconShell size="h-8 w-8" className="mt-1 rounded-full shadow-fuchsia-500/20">
          <AssistantMark size={18} />
        </AssistantIconShell>
      )}
      <div className={`group max-w-[84%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={
            isUser
              ? 'rounded-[22px] rounded-br-md bg-gradient-to-br from-indigo-600 to-blue-500 px-4 py-3 text-sm leading-relaxed text-white shadow-lg shadow-indigo-500/20'
              : 'rounded-[22px] rounded-bl-md border border-white/60 bg-white/75 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-slate-200'
          }
        >
          <MessageText text={message.text} />
        </div>
        <div className={`mt-1.5 flex items-center gap-1.5 text-[10px] text-slate-400 ${isUser ? 'justify-end' : ''}`}>
          <span>{formatTime(message.ts)}</span>
          {!isUser && (
            <div className="flex translate-y-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button type="button" onClick={() => onCopy(message.text)} className="rounded-full p-1 hover:bg-slate-200/70 dark:hover:bg-white/10" aria-label="Copy response">
                <Copy size={12} />
              </button>
              <button type="button" onClick={() => onRead(message.text)} className="rounded-full p-1 hover:bg-slate-200/70 dark:hover:bg-white/10" aria-label="Read response aloud">
                <Volume2 size={12} />
              </button>
              <button type="button" onClick={onRegenerate} className="rounded-full p-1 hover:bg-slate-200/70 dark:hover:bg-white/10" aria-label="Regenerate response">
                <RefreshCcw size={12} />
              </button>
              <button type="button" className="rounded-full p-1 hover:bg-slate-200/70 dark:hover:bg-white/10" aria-label="Like response">
                <ThumbsUp size={12} />
              </button>
              <button type="button" className="rounded-full p-1 hover:bg-slate-200/70 dark:hover:bg-white/10" aria-label="Dislike response">
                <ThumbsDown size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [activeFeature, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setTooltip] = useState(false);
  const [askText, setAskText] = useState('');
  const [voiceMode, setVoiceMode] = useState(false);
  const [lastRequest, setLastRequest] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const activeFeatureObj = useMemo(
    () => FEATURES.find((feature) => feature.id === activeFeature),
    [activeFeature]
  );
  const ActiveComponent = activeFeatureObj?.component;
  const ActiveIcon = activeFeatureObj?.icon;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, activeFeature]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
        window.setTimeout(() => inputRef.current?.focus(), 120);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const runPrompt = useCallback(async (prompt, feature) => {
    const preview = `${prompt.split('\n').find((line) => line.trim())?.slice(0, 100) || 'New request'}...`;
    const request = { prompt, feature, preview };

    setLastRequest(request);
    setMessages((current) => [...current, { role: 'user', text: preview, ts: Date.now() }]);
    setActive(null);
    setLoading(true);

    try {
      const result = await callAI(feature, prompt);
      setMessages((current) => [...current, { role: 'ai', text: result, ts: Date.now() }]);
    } catch (err) {
      const isRateLimit = err.message === 'RATE_LIMIT';
      const msg = isRateLimit
        ? 'The AI is busy right now. Please wait 30 seconds and try again.'
        : `Something went wrong: ${err.message}`;
      setMessages((current) => [...current, { role: 'ai', text: msg, ts: Date.now() }]);
    } finally {
      setLoading(false);
      setVoiceMode(false);
    }
  }, []);

  const handleResult = useCallback((prompt, feature) => runPrompt(prompt, feature), [runPrompt]);

  const handleAsk = useCallback(
    (event) => {
      event.preventDefault();
      const question = askText.trim();
      if (!question || loading) return;
      setAskText('');
      runPrompt(buildLibrarianPrompt({ question }), 'librarian');
    },
    [askText, loading, runPrompt]
  );

  const handleRegenerate = useCallback(() => {
    if (!lastRequest || loading) return;
    runPrompt(lastRequest.prompt, lastRequest.feature);
  }, [lastRequest, loading, runPrompt]);

  const copyText = useCallback((text) => {
    navigator.clipboard?.writeText(text);
  }, []);

  const readAloud = useCallback((text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setActive(null);
    setLastRequest(null);
    setVoiceMode(false);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans">
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="rounded-2xl border border-white/20 bg-slate-950/90 px-3.5 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl"
            >
              AI Reading Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => {
            setOpen((value) => !value);
            setTooltip(false);
          }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          aria-label="AI Reading Assistant"
          className="ai-orb relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
          animate={loading ? { rotate: 360, y: [0, -4, 0] } : { y: [0, -6, 0] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, y: { duration: 3, repeat: Infinity } }}
        >
          <span className="absolute inset-[-7px] rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-fuchsia-500 opacity-80 blur-sm" />
          <span className="absolute inset-0 rounded-full bg-slate-950" />
          <span className="absolute inset-1 rounded-full bg-gradient-to-br from-[#ff8a5c] via-[#f45491] to-[#6d5dfc]" />
          <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.5),transparent_24%),radial-gradient(circle_at_76%_84%,rgba(34,211,238,0.4),transparent_35%)]" />
          <span className="relative z-10">{open ? <X size={24} /> : <AssistantMark size={32} />}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[9997] bg-slate-950/20 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed bottom-0 right-0 top-0 z-[9998] flex w-full max-w-[450px] flex-col overflow-hidden rounded-none border-l border-white/50 bg-white/70 font-sans shadow-2xl shadow-slate-950/20 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75 md:rounded-l-[24px]"
              initial={{ x: '100%', opacity: 0.7 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.7 }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              aria-label="AI Reading Assistant panel"
            >
              <div className="border-b border-white/60 bg-white/60 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div
                      className="shrink-0"
                      animate={loading ? { rotate: [0, 360] } : { scale: [1, 1.04, 1] }}
                      transition={{ duration: loading ? 5 : 2.6, repeat: Infinity, ease: 'linear' }}
                    >
                      <AssistantIconShell>
                        <AssistantMark size={25} />
                      </AssistantIconShell>
                    </motion.div>
                    <div className="min-w-0">
                      <p className="m-0 truncate text-base font-extrabold tracking-tight text-slate-950 dark:text-white">
                        AI Reading Assistant
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Your Smart Digital Librarian
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" className="rounded-full p-2 text-slate-500 transition hover:bg-white/80 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Settings">
                      <Settings size={17} />
                    </button>
                    <button type="button" onClick={clearChat} className="rounded-full p-2 text-slate-500 transition hover:bg-white/80 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:hover:bg-white/10" aria-label="Clear chat">
                      <Trash2 size={17} />
                    </button>
                    <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-500 transition hover:bg-white/80 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Close assistant">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_30%)] px-4 py-5">
                <AnimatePresence mode="popLayout">
                  {!activeFeature && messages.length === 0 && !loading && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                      <div className="rounded-[24px] border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/40">
                        <AssistantIconShell size="mx-auto mb-4 h-20 w-20" className="rounded-[28px] shadow-xl shadow-fuchsia-500/25">
                          <AssistantMark size={46} />
                        </AssistantIconShell>
                        <h3 className="text-center text-2xl font-black tracking-tight text-slate-950 dark:text-white">Welcome!</h3>
                        <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          I can help you with books, reviews, summaries, quizzes, vocabulary, and reading questions.
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {quickHelp.map((item) => (
                            <span key={item} className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {FEATURES.map((feature) => (
                          <FeatureCard key={feature.id} feature={feature} onClick={() => setActive(feature.id)} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeFeature && ActiveComponent && (
                    <motion.div
                      key="feature"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 18 }}
                      className="space-y-4"
                    >
                      <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm backdrop-blur-xl transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
                      >
                        Back to tools
                      </button>
                      <div className={`rounded-[24px] bg-gradient-to-br ${activeFeatureObj.accent} p-px shadow-xl shadow-indigo-500/10`}>
                        <div className="rounded-[23px] bg-slate-950/80 p-5 text-white shadow-inner">
                          <div className="mb-4 flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                              {ActiveIcon ? <ActiveIcon size={24} /> : <Sparkles size={24} />}
                            </span>
                            <div>
                              <h3 className="text-base font-extrabold tracking-tight">{activeFeatureObj.title}</h3>
                              <p className="text-xs text-white/60">{activeFeatureObj.desc}</p>
                            </div>
                          </div>
                          <ActiveComponent onResult={handleResult} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {(messages.length > 0 || loading) && !activeFeature && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4 pb-2"
                    >
                      {messages.map((message, index) => (
                        <MessageBubble
                          key={`${message.ts}-${index}`}
                          message={message}
                          onCopy={copyText}
                          onRegenerate={handleRegenerate}
                          onRead={readAloud}
                        />
                      ))}
                      {loading && (
                        <>
                          <div className="rounded-[22px] border border-white/60 bg-white/45 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                            <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                            <div className="mt-2 h-3 w-1/2 animate-pulse rounded-full bg-slate-200 dark:bg-white/10" />
                          </div>
                          <div className="flex justify-start">
                            <div className="rounded-[22px] rounded-bl-md border border-white/60 bg-white/75 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
                              <ThinkingDots />
                            </div>
                          </div>
                        </>
                      )}
                      {voiceMode && <VoiceStatus loading={loading} />}
                      <div ref={bottomRef} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-white/60 bg-white/75 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
                {messages.length > 0 && !activeFeature && (
                  <div className="mb-3 grid grid-cols-2 gap-2">
                    {FEATURES.slice(0, 4).map((feature) => (
                      <button
                        type="button"
                        key={feature.id}
                        onClick={() => setActive(feature.id)}
                        className="truncate rounded-2xl border border-white/60 bg-white/60 px-3 py-2 text-left text-[11px] font-bold text-slate-600 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
                      >
                        {feature.title}
                      </button>
                    ))}
                  </div>
                )}
                <form onSubmit={handleAsk} className="flex items-end gap-2 rounded-[24px] border border-white/70 bg-white/85 p-2 shadow-lg shadow-slate-950/5 backdrop-blur-xl focus-within:ring-4 focus-within:ring-indigo-500/15 dark:border-white/10 dark:bg-white/10">
                  <button
                    type="button"
                    onClick={() => setVoiceMode((value) => !value)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition ${voiceMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'}`}
                    aria-label="Voice"
                  >
                    <Mic size={18} />
                  </button>
                  <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-slate-400 transition hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Attachment">
                    <Paperclip size={18} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={askText}
                    onChange={(event) => setAskText(event.target.value)}
                    placeholder="Ask anything about books..."
                    className="min-h-10 min-w-0 flex-1 bg-transparent px-1 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
                    disabled={loading}
                  />
                  <motion.button
                    type="submit"
                    disabled={!askText.trim() || loading}
                    whileHover={{ scale: askText.trim() && !loading ? 1.05 : 1 }}
                    whileTap={{ scale: askText.trim() && !loading ? 0.94 : 1 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 transition disabled:cursor-not-allowed disabled:opacity-45"
                    aria-label="Send"
                  >
                    {loading ? <MoreHorizontal size={18} /> : <Send size={18} />}
                  </motion.button>
                </form>
                <p className="mt-2 text-center text-[10px] font-medium text-slate-400">
                  Press Ctrl+K to focus the assistant. Responses are AI-generated for learning support.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
