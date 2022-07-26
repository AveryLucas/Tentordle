const findRepeatingLetters = (word) => {
  let letters = word.split("");
  let letterMap = {};

  for (let i = 0; i < letters.length; i++) {
    let currentLetterCount = letterMap[letters[i]];
    let count = currentLetterCount ? currentLetterCount : 0;
    letterMap[letters[i]] = count + 1;
  }
  return letterMap;
};

const getAllHints = (guesses, word, prev_hints = []) => {
  if (typeof guesses === "string") guesses = [guesses];
  let output = [...prev_hints];
  word.split("").map((letter, index) => {
    output = getHintsAtPos(guesses, word, index, output);
  });
  return output;
};

const getHintsAtPos = (guesses = [], word, at_pos, prev_hints = []) => {
  let output = [...prev_hints];

  const isHintThere = (letter, at_pos, type, hints) => {
    let temp = hints || output;
    if (letter) temp = temp.filter((hint) => hint.letter === letter);
    if (at_pos) temp = temp.filter((hint) => hint.at_pos === at_pos);
    if (type) temp = temp.filter((hint) => hint.type === type);
    return temp.length;
  };

  // Are there guesses with the right letter in position?
  if (guesses.findIndex((guess) => guess[at_pos] === word[at_pos]) !== -1) {
    // Check if this hint is already there first
    if (!isHintThere(word[at_pos], at_pos, "correct")) {
      output = output.filter(
        (hint) =>
          (hint.letter !== word[at_pos] && hint.at_pos !== at_pos) ||
          hint.type === "correct",
      );
      output.push({ letter: word[at_pos], at_pos, type: "correct" });
    }
  } else {
    // Are there guesses with the right letter in wrong position?
    guesses
      .filter((guess) => word.indexOf(guess[at_pos]) !== -1)
      .forEach((guess) => {
        if (
          !isHintThere(guess[at_pos], at_pos, "misplaced") &&
          isHintThere(guess[at_pos], undefined, "correct") !==
            findRepeatingLetters(word)[guess[at_pos]]
        ) {
          output.push({ letter: guess[at_pos], at_pos, type: "misplaced" });
        }
      });
  }

  return output;
};

const getPastGuessLetters = (guesses = []) =>
  Array.from(
    new Set(
      guesses
        .map((g) => g.split("").map((letter, index) => ({ letter, index })))
        .flat(),
    ),
  );

const getHintTypes = (pastGuesses, correctWord, target) => {
  const pastGuessLetters = getPastGuessLetters(pastGuesses).filter(
    ({ letter }) => letter == target,
  );

  if (pastGuessLetters.length === 0) return false;

  // Check if letter was guessed correctly and in the right spot
  if (
    pastGuessLetters.filter(({ letter, index }) => {
      const index2 = correctWord.indexOf(target);
      return index2 !== -1 && index == index2;
    }).length
  ) {
    return { correct: true };
  }

  // Check if letter was guessed but was put in the wrong spot
  if (pastGuessLetters.filter(() => correctWord.indexOf(target) !== -1).length)
    return { misplaced: true };

  // Check if letter is simply incorrect
  if (pastGuessLetters.filter(() => correctWord.indexOf(target) === -1).length)
    return { incorrect: true };

  return {};
};

export default {
  getAllHints,
  getHintsAtPos,
  findRepeatingLetters,
  getHintTypes,
};
