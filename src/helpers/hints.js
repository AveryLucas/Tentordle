export const findRepeatingLetters = (word) => {
  let letters = word.split("");
  let letterMap = {};

  for (let i = 0; i < letters.length; i++) {
    let currentLetterCount = letterMap[letters[i]];
    let count = currentLetterCount ? currentLetterCount : 0;
    letterMap[letters[i]] = count + 1;
  }
  return letterMap;
};

export const getAllHints = (guesses, word, prev_hints = []) => {
  if (typeof guesses === "string") guesses = [guesses];
  let output = [...prev_hints];
  word.split("").map((letter, index) => {
    output = getHintsAtPos(guesses, word, index, output);
  });
  return output || [{}];
};

export const getHintsAtPos = (
  guesses = [],
  word,
  position,
  prev_hints = [],
) => {
  let output = [...prev_hints];

  const isHintThere = (letter, position, type, hints) => {
    let temp = hints || output;
    if (letter) temp = temp.filter((hint) => hint.letter === letter);
    if (position) temp = temp.filter((hint) => hint.position === position);
    if (type) temp = temp.filter((hint) => hint.type === type);
    return temp.length;
  };

  // Get all the guessed letter that aren't in the word.
  getPastGuessLetters(guesses).forEach(({ letter, index }) => {
    if (word.indexOf(letter) === -1 && !isHintThere(letter, -1, "incorrect"))
      output.push({ letter, position: -1, type: "incorrect" });
  });

  // Are there guesses with the right letter in position?
  if (guesses.findIndex((guess) => guess[position] === word[position]) !== -1) {
    // Check if this hint is already there first
    if (!isHintThere(word[position], position, "correct")) {
      output = output.filter(
        (hint) =>
          (hint.letter !== word[position] && hint.position !== position) ||
          hint.type === "correct",
      );
      output.push({ letter: word[position], position, type: "correct" });
    }
  } else {
    // Are there guesses with the right letter in wrong position?
    guesses
      .filter((guess) => word.indexOf(guess[position]) !== -1)
      .forEach((guess) => {
        if (
          !isHintThere(guess[position], position, "misplaced") &&
          isHintThere(guess[position], undefined, "correct") !==
            findRepeatingLetters(word)[guess[position]]
        ) {
          output.push({ letter: guess[position], position, type: "misplaced" });
        }
      });
  }

  return output;
};

export const getPastGuessLetters = (guesses = []) =>
  Array.from(
    new Set(
      guesses
        .map((g) => g.split("").map((letter, index) => ({ letter, index })))
        .flat(),
    ),
  );

export const getHintForLetter = (char, pastGuesses, correctWord) => {
  const pastGuessLetters = getPastGuessLetters(pastGuesses).filter(
    ({ letter }) => letter == char,
  );

  if (pastGuessLetters.length === 0) return false;

  // Check if letter was guessed correctly and in the right spot
  if (
    pastGuessLetters.filter(({ index }) => {
      const index2 = correctWord.indexOf(char);
      return index2 !== -1 && index == index2;
    }).length
  ) {
    return { correct: true };
  }

  // Check if letter was guessed but was put in the wrong spot
  if (pastGuessLetters.filter(() => correctWord.indexOf(char) !== -1).length)
    return { misplaced: true };

  // Check if letter is simply incorrect
  if (pastGuessLetters.filter(() => correctWord.indexOf(char) === -1).length)
    return { incorrect: true };

  return {};
};

export default {
  getAllHints,
  getHintsAtPos,
  getHintForLetter,
  findRepeatingLetters,
};
