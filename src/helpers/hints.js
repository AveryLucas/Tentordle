export const TYPES = {
  CORRECT: "correct",
  MISPLACED: "misplaced",
  INCORRECT: "incorrect",
};

// Just counts how many times each letter in a word appears theres
// Example... "P" appears in "APPLE" twice. Returns 2.
export const findRepeats = (word) => {
  let letterMap = {};
  let letters = word.split("");

  for (let i = 0; i < letters.length; i++) {
    const count =
      letterMap[letters[i]] == undefined ? 0 : letterMap[letters[i]];
    letterMap[letters[i]] = count + 1;
  }
  return letterMap;
};

export const getAllHints = (guesses, word) => {
  const repeats = findRepeats(word);

  // This finds all the times a letter was used, and logs basic details like..
  // Where was it and when was it used?
  // What is it's relevance to the correct word? (correct, misplaced, incorrect)
  const getLetterOccurances = () => {
    let occurances = {};
    guesses.forEach((guess, guessIndex) =>
      guess.split("").forEach((letter, position) => {
        if (!occurances[letter]) occurances[letter] = [];
        occurances[letter].push({
          letter,
          guessIndex,
          position,
          type:
            word[position] === letter
              ? TYPES.CORRECT
              : repeats[letter] !== undefined
              ? TYPES.MISPLACED
              : TYPES.INCORRECT,
        });
      }),
    );
    return occurances;
  };

  const isHintThere = (letter, position, type, guessI) => {
    let temp = hints;
    if (letter) temp = temp.filter((hint) => hint.letter === letter);
    if (position) temp = temp.filter((hint) => hint.position === position);
    if (type) temp = temp.filter((hint) => hint.type === type);
    if (guessI) temp = temp.filter((hint) => hint.guessI !== guessI);
    return temp.length;
  };

  let hints = [];
  let occurances = getLetterOccurances();

  // Storing incorrect letters seperately and adding them back afterwards.
  // Kept running into weird issue of these being filtered out despite me not doing that D:
  let incorrect = [];

  Object.keys(occurances).forEach((letter) =>
    occurances[letter].forEach((occurance) => {
      // If this occurance is correct then remove all previous hints for this letter.
      if (occurance.type == TYPES.CORRECT) {
        // If this is a duplicate then check for repeats in correct word.
        if (isHintThere(letter, occurance.position, TYPES.CORRECT)) {
          // First, make sure there are actually repeats of this letter
          if (isHintThere(letter, undefined, TYPES.CORRECT) < repeats[letter]) {
            // If there are repeats then this hint is probably just misplaced
            // Make sure we aren't adding duplicates and push it through as such.
            if (!isHintThere(letter, occurance.position, TYPES.MISPLACED)) {
              hints.push({ ...occurance, type: TYPES.MISPLACED });
            }
          }
        } else {
          // Remove previously found hints for this letter before adding the occurance as a hint.
          // No real need to check for dups here.
          hints = hints.filter(
            (hint) => hint.letter !== letter || hint.type == TYPES.CORRECT,
          );
          hints.push(occurance);
        }
      } else if (occurance.type == TYPES.MISPLACED) {
        // Do we already have all the hints for this letter?
        if (isHintThere(letter, undefined, TYPES.CORRECT) < repeats[letter]) {
          // This is adding dups for some reason.
          // I think its a development build bug but I'm gonna add a check just in case
          if (!isHintThere(letter, occurance.position, TYPES.MISPLACED)) {
            // Gotta check that there isn't a solved one at same guessIndex
            // Without this, a guess with two A's in it would give two hints for the word "KAYAK" instead of one...
            // Even if one of those hints was correct and the other was misplaced.
            if (
              !hints.filter(
                (hint) =>
                  hint.letter === letter &&
                  hint.type === TYPES.CORRECT &&
                  hint.guessIndex === occurance.guessIndex,
              ).length
            ) {
              hints.push(occurance);
            }
          }
        }
      } else if (occurance.type == TYPES.INCORRECT) {
        // Lots of these. Just making sure no duplicate letters to make debugging a tad cleaner.
        // if (!incorrect.filter((hint) => hint.letter === letter).length)
        incorrect.push(occurance);
      }
    }),
  );

  return [...hints, ...incorrect];
};

export default getAllHints;
