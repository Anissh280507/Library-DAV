// useCrosswordGenerator.js
import { useState, useCallback } from 'react';

const WORD_BANK = {
  easy: [
    { word: "CAT", clue: "A common household pet that meows" },
    { word: "DOG", clue: "A loyal pet that barks" },
    { word: "SUN", clue: "The star at the center of our solar system" },
    { word: "MAP", clue: "A diagram that shows locations" },
    { word: "PEN", clue: "A tool used for writing with ink" },
    { word: "BUS", clue: "A vehicle that carries many students to school" },
    { word: "ANT", clue: "A tiny insect that works in colonies" },
    { word: "CUP", clue: "A small container for drinking" },
    { word: "HAT", clue: "Worn on the head to block the sun" },
    { word: "JAM", clue: "A sweet spread made from fruit" },
    { word: "NET", clue: "Used in badminton or tennis to divide the court" },
    { word: "OAK", clue: "A tall tree that produces acorns" },
    { word: "PIE", clue: "A baked dish with a pastry crust" },
    { word: "RAT", clue: "A small rodent often seen in science labs" },
    { word: "TIN", clue: "A type of metal used for food cans" },
    { word: "COW", clue: "A farm animal that gives us milk" },
    { word: "OWL", clue: "A nocturnal bird that hoots" },
    { word: "FOX", clue: "A clever wild animal with a bushy tail" },
    { word: "BOX", clue: "A square or rectangular container" },
    { word: "TOY", clue: "Something a child plays with" },
    // Append these inside your easy: [...] array
  { word: "BIRD", clue: "An animal with feathers and wings that can fly" },
  { word: "FISH", clue: "An animal that swims in water and breathes through gills" },
  { word: "FROG", clue: "A small green animal that hops and lives near ponds" },
  { word: "DUCK", clue: "A swimming water bird that says quack" },
  { word: "BEAR", clue: "A large furry wild animal that loves honey" },
  { word: "MOON", clue: "It shines brightly in the night sky and changes shape" },
  { word: "STAR", clue: "A tiny twinkling light far away in space" },
  { word: "TREE", clue: "A tall plant with a wooden trunk and green leaves" },
  { word: "ROSE", clue: "A beautiful red flower with sharp thorns on its stem" },
  { word: "BOOK", clue: "Something filled with pages and stories that you read" },
  { word: "DESK", clue: "A school table where students sit to work" },
  { word: "MILK", clue: "A healthy white drink we get from cows" },
  { word: "RED", clue: "The color of a strawberry or a stop sign" },
  { word: "BLUE", clue: "The color of the sky on a clear sunny day" },
  { word: "BOAT", clue: "A small vehicle used for traveling across water" },
  { word: "BIKE", clue: "A vehicle with two wheels that you move by pedaling" },
  { word: "HOME", clue: "The warm place where you live with your family" },
  { word: "BABY", clue: "A very young child who cannot walk or talk yet" },
  { word: "HAND", clue: "The part of your body used for holding pencils" },
  { word: "FOOT", clue: "The part of your body inside your shoe" }

  ],
  medium: [
    { word: "APPLE", clue: "A red or green fruit that keeps the doctor away" },
    { word: "BRAIN", clue: "The organ inside your skull that controls thinking" },
    { word: "CLOUD", clue: "A mass of water vapour floating in the sky" },
    { word: "DANCE", clue: "Moving rhythmically to music" },
    { word: "EARTH", clue: "The third planet from the Sun" },
    { word: "FLAME", clue: "The visible part of fire" },
    { word: "GLOBE", clue: "A spherical model of the Earth" },
    { word: "HONEY", clue: "A sweet substance made by bees" },
    { word: "INDEX", clue: "An alphabetical list at the back of a book" },
    { word: "JUDGE", clue: "A person who makes decisions in a court of law" },
    { word: "KNIFE", clue: "A sharp-edged tool used for cutting food" },
    { word: "LIGHT", clue: "Electromagnetic radiation that makes things visible" },
    { word: "MUSIC", clue: "Arranged sounds that create melody and rhythm" },
    { word: "NORTH", clue: "The direction toward the North Pole" },
    { word: "OCEAN", clue: "A vast body of salt water covering most of Earth" },
    { word: "PLANT", clue: "A living organism that photosynthesises sunlight" },
    { word: "QUEEN", clue: "The female ruler of a kingdom" },
    { word: "RIVER", clue: "A large natural stream of water flowing to the sea" },
    { word: "SOLAR", clue: "Relating to the energy of the Sun" },
    { word: "TIGER", clue: "A large striped wild cat native to Asia" },
    { word: "UNCLE", clue: "The brother of your mother or father" },
    { word: "VERSE", clue: "A line or group of lines in a poem" },
    { word: "WATER", clue: "A transparent liquid essential for survival" },
    { word: "XENON", clue: "A noble gas used in specialized lighting" },
    { word: "YOUNG", clue: "Not old; in an early stage of life" },
    { word: "ZONES", clue: "Areas divided by distinct geographical limits" },
    // Append these inside your medium: [...] array
  { word: "ANATOMY", clue: "The scientific study of the structure of living bodies" },
  { word: "BACTERIA", clue: "Tiny single-celled organisms visible only under a microscope" },
  { word: "DESERT", clue: "A very dry, sandy region that receives little rainfall" },
  { word: "VOLCANO", clue: "A mountain that erupts with hot lava, ash, and gases" },
  { word: "CLIMATE", clue: "The long-term pattern of weather conditions in an area" },
  { word: "GLACIER", clue: "A massive, slow-moving river of solid ice and snow" },
  { word: "EQUATOR", clue: "An imaginary line dividing Earth into Northern and Southern halves" },
  { word: "COMPASS", clue: "A magnetic tool used to find the direction of North" },
  { word: "NOUN", clue: "A grammar word that names a person, place, thing, or idea" },
  { word: "VERB", clue: "A grammar word that describes an action, state, or occurrence" },
  { word: "PRONOUN", clue: "A short word like he, she, or it used to replace a noun" },
  { word: "ANTONYM", clue: "A word that means the exact opposite of another word" },
  { word: "SYNONYM", clue: "A word that means nearly the same as another word" },
  { word: "POETRY", clue: "Literature written in verse, often using rhythm and rhyme" },
  { word: "CHAPTER", clue: "A numbered section or division of a story book" },
  { word: "CRICKET", clue: "A popular bat-and-ball sport played on an oval field" },
  { word: "SOCCER", clue: "A sport where two teams kick a round ball into a goal" },
  { word: "INTERNET", clue: "A global computer network providing worldwide information" },
  { word: "MONITOR", clue: "The electronic screen used to display visual data from a computer" },
  { word: "KEYBOARD", clue: "The panel of buttons used to type text into a computer" }
  ],

  hard: [
    { word: "ALGEBRA", clue: "Branch of mathematics using symbols and equations" },
    { word: "BIOLOGY", clue: "The scientific study of living organisms" },
    { word: "CAPITAL", clue: "The city that serves as the seat of government" },
    { word: "DENSITY", clue: "Mass per unit volume of a substance" },
    { word: "ELEMENT", clue: "A pure substance that cannot be broken down further" },
    { word: "FICTION", clue: "Literature that describes imaginary events" },
    { word: "GRAVITY", clue: "The force that attracts objects toward the Earth" },
    { word: "HISTORY", clue: "The study of past events and civilizations" },
    { word: "INTEGER", clue: "A whole number, positive, negative, or zero" },
    { word: "JOURNEY", clue: "An act of travelling from one place to another" },
    { word: "KINGDOM", clue: "The highest classification rank in biology fields" },
    { word: "LIBRARY", clue: "A place where books and resources are kept for use" },
    { word: "MINERAL", clue: "A naturally occurring inorganic crystal substance" },
    { word: "NUCLEUS", clue: "The core control center of a living cell" },
    { word: "ORBITAL", clue: "Relating to the path of a planet or electron" },
    { word: "PHYSICS", clue: "The science of matter, energy, and forces" },
    { word: "PROTEIN", clue: "A large molecule made of organic amino acids" },
    { word: "QUARTER", clue: "One of four equal split parts of something" },
    { word: "REPTILE", clue: "A cold-blooded vertebrate such as a lizard" },
    { word: "SCIENCE", clue: "Systematic study of the structure of the world" },
    { word: "THEOREM", clue: "A mathematical statement that has been proved" },
    { word: "UNIFORM", clue: "Remaining the same in all cases; school clothing" },
    { word: "VACCINE", clue: "A substance used to stimulate immunity to a disease" },
    { word: "WEATHER", clue: "The atmospheric conditions at a given time" },
    { word: "XYLEM", clue: "Vascular tissue in plants that transports water" },
    { word: "YEARBOOK", clue: "An annual publication about a school's activities" },
    { word: "ZOOLOGY", clue: "The branch of biology that studies animals" },
    // Append these inside your hard: [...] array
  { word: "GEOMETRY", clue: "Branch of mathematics dealing with points, lines, angles, and shapes" },
  { word: "CALCULUS", clue: "Advanced branch of mathematics dealing with rates of change" },
  { word: "EQUATION", clue: "A mathematical statement showing that two expressions are equal" },
  { word: "EVOLUTION", clue: "The process by which living organisms developed from earlier forms" },
  { word: "PHOTOSYNTHESIS", clue: "Process by which green plants make food using sunlight energy" },
  { word: "CHLOROPHYLL", clue: "The green pigment in plants that absorbs sunlight for food production" },
  { word: "ATMOSPHERE", clue: "The protective envelope of gases surrounding a planet" },
  { word: "METEORITE", clue: "A rock from outer space that survives passage to hit Earth's surface" },
  { word: "CONSTELLATION", clue: "A recognizable group of stars forming a pattern in the night sky" },
  { word: "THERMODYNAMICS", clue: "The branch of physics that deals with heat and mechanical energy" },
  { word: "MIGRATION", clue: "Seasonal movement of animals from one region to another" },
  { word: "ECOSYSTEM", clue: "A community of interacting living organisms and their environment" },
  { word: "SHAKESPEARE", clue: "Famous English playwright who wrote Romeo and Juliet" },
  { word: "PREMCHAND", clue: "Celebrated Indian author known for his realistic Hindi literature" },
  { word: "METAPHOR", clue: "A figure of speech comparing two things by saying one IS the other" },
  { word: "ALLITERATION", clue: "Repetition of the same starting consonant sound in close words" },
  { word: "HERMIONE", clue: "The brilliant and book-smart witch from the Harry Potter series" },
  { word: "DUMBLEDORE", clue: "The wise, long-bearded Headmaster of Hogwarts School" },
  { word: "CRYPTOGRAPHY", clue: "The practice of securing digital information using complex codes" },
  { word: "ENCRYPTION", clue: "Converting text data into scrambled code to prevent unauthorized access" }
  ]
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function canPlace(grid, size, word, row, col, direction) {
  if (direction === 'across' && col + word.length > size) return false;
  if (direction === 'down' && row + word.length > size) return false;

  let hasIntersection = false;

  for (let i = 0; i < word.length; i++) {
    const r = direction === 'across' ? row : row + i;
    const c = direction === 'across' ? col + i : col;
    const cell = grid[r][c];

    if (cell.filled) {
      if (cell.letter !== word[i]) return false;
      hasIntersection = true;
    }
  }
  return hasIntersection;
}

function placeWord(grid, word, row, col, direction, wordId) {
  for (let i = 0; i < word.length; i++) {
    const r = direction === 'across' ? row : row + i;
    const c = direction === 'across' ? col + i : col;
    grid[r][c] = {
      letter: word[i],
      filled: true,
      wordIds: [...(grid[r][c]?.wordIds || []), wordId]
    };
  }
}

export function generateCrossword(difficulty = 'medium') {
  let size = 12;
  let targetCount = 6;
  
  if (difficulty === 'medium') {
    size = 14;
    targetCount = 8;
  } else if (difficulty === 'hard') {
    size = 16;
    targetCount = 12;
  }

  const allWords = shuffle(WORD_BANK[difficulty]);
  const words = allWords.slice(0, Math.min(targetCount + 8, allWords.length));

  for (let attempt = 0; attempt < 50; attempt++) {
    const grid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ letter: '', filled: false, wordIds: [] }))
    );
    const placed = [];

    const firstWordObj = words[0];
    const startCol = Math.floor((size - firstWordObj.word.length) / 2);
    const startRow = Math.floor(size / 2);
    placeWord(grid, firstWordObj.word, startRow, startCol, 'across', 0);
    placed.push({ ...firstWordObj, id: 0, row: startRow, col: startCol, direction: 'across', number: 0 });

    for (let wi = 1; wi < words.length && placed.length < targetCount; wi++) {
      const wordObj = words[wi];
      const word = wordObj.word;
      let placementFound = null;

      outer:
      for (const dir of shuffle(['down', 'across'])) {
        for (const placedWord of shuffle(placed)) {
          for (let li = 0; li < word.length; li++) {
            for (let pi = 0; pi < placedWord.word.length; pi++) {
              if (placedWord.word[pi] !== word[li]) continue;

              let r, c;
              if (dir === 'across') {
                if (placedWord.direction === 'across') continue;
                r = placedWord.row + pi;
                c = placedWord.col - li;
              } else {
                if (placedWord.direction === 'down') continue;
                r = placedWord.row - li;
                c = placedWord.col + pi;
              }

              if (r < 0 || c < 0 || r >= size || c >= size) continue;

              if (canPlace(grid, size, word, r, c, dir)) {
                placementFound = { r, c, dir };
                break outer;
              }
            }
          }
        }
      }

      if (placementFound) {
        const id = placed.length;
        placeWord(grid, word, placementFound.r, placementFound.c, placementFound.dir, id);
        placed.push({ ...wordObj, id, row: placementFound.r, col: placementFound.c, direction: placementFound.dir, number: 0 });
      }
    }

    if (placed.length >= Math.min(targetCount, 4)) {
      const sortedPositions = [...placed].sort((a, b) => a.row - b.row || a.col - b.col);
      let runningNumber = 1;
      const assignmentMap = {};

      sortedPositions.forEach(w => {
        const key = `${w.row}-${w.col}`;
        if (!assignmentMap[key]) {
          assignmentMap[key] = runningNumber++;
        }
        w.number = assignmentMap[key];
      });

      return { grid, words: placed, gridSize: size };
    }
  }

  return generateCrossword('easy');
}

export function useCrosswordGenerator(initialDifficulty = 'medium') {
  const [difficulty, setDiffState] = useState(initialDifficulty);
  const [puzzle, setPuzzle] = useState(() => generateCrossword(initialDifficulty));

  const regenerate = useCallback((selectedDiff) => {
    const nextDiff = selectedDiff || difficulty;
    setDiffState(nextDiff);
    setPuzzle(generateCrossword(nextDiff));
  }, [difficulty]);

  return { puzzle, difficulty, regenerate };
}