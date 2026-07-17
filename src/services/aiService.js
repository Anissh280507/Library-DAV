// aiService.js
// Uses Groq API (llama-3.3-70b) — 30 RPM / 14,400 RPD free tier.
// Much more generous than Gemini free tier.
// In production (Vercel), swap callAI to hit /api/ai serverless function.

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

export async function callAI(_feature, prompt) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a smart, friendly AI assistant for DAV Public School Airoli Virtual Library. Help students with books, reading, vocabulary, and learning. Keep all responses school-appropriate, educational, and encouraging.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 429) throw new Error('RATE_LIMIT');
    throw new Error(err?.error?.message ?? `Groq error ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'No response received.';
}

// ─── Prompt builders (unchanged — UI never needs to change) ──────────────────

export function buildBookRecommendationPrompt({ classNum, genres, favouriteBooks, level }) {
  return `Recommend exactly 4 books for a Class ${classNum} school student.
Favourite genres: ${genres}.
Favourite books they already love: ${favouriteBooks || 'not specified'}.
Reading level: ${level}.
For each book provide: Title, Author, genre tag, and a 2-sentence reason why this student will love it.
Format as a numbered list. Keep it friendly and school-appropriate.`;
}

export function buildImproveReviewPrompt({ reviewText }) {
  return `Improve the following book review written by a school student:

"${reviewText}"

Provide:
1. Improved version of the review (better grammar, vocabulary, and structure)
2. Key changes made (bullet points)
3. Review quality score out of 10 with a one-line reason

Keep the tone encouraging and school-friendly.`;
}

export function buildSummaryPrompt({ bookTitle, author, length }) {
  const wordCount = length === '50' ? '50' : length === '100' ? '100' : '200-250';
  return `Write a ${wordCount}-word summary of the book "${bookTitle}" by ${author}.
Make it engaging, accurate, and suitable for school students. Avoid spoiling the ending.`;
}

export function buildQuizPrompt({ bookTitle, author, quizType }) {
  return `Create a ${quizType} quiz with 5 questions about the book "${bookTitle}" by ${author}.
Number each question clearly and provide the answer key at the end.
Make it educational and suitable for school students.`;
}

export function buildVocabularyPrompt({ word }) {
  return `For the English word "${word}", provide:
1. Meaning (simple, school-friendly definition)
2. Part of speech
3. Pronunciation guide (phonetic)
4. 3 Synonyms
5. 3 Antonyms
6. One example sentence set in a school or library context`;
}

export function buildReadingChallengePrompt({ classNum, level, genres }) {
  return `Create a fun 7-day reading challenge for a Class ${classNum} student.
Reading level: ${level}. Favourite genres: ${genres}.
For each day: a reading activity, a short task, and a motivational tip.
Use emojis and keep it school-friendly and exciting.`;
}

export function buildLibrarianPrompt({ question }) {
  return `Answer this book-related question for a school student:

"${question}"

Explain themes, characters, morals, or important events if relevant.
Keep the answer educational, engaging, and age-appropriate.`;
}
