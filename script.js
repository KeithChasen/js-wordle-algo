const colorizeWordle = (guessedWord, hiddenWord) => {
    if (guessedWord === hiddenWord) {
        return 'GGGGG'
    }

    //todo: implement here
    // correct letter in correct position     - G
    // correct letter but in a wrong position - Y
    // letter arent present in the word       - B

    // example:
    // when the hidden word is  "ahead"
    // user guesses             "alpha"
    //                          "GBBYY"

    const guessArray = wordToArray(guessedWord);
    const hiddenWordArray = wordToArray(hiddenWord);

    return makeHint(guessArray, hiddenWordArray)

//--------------------------------------
    // example
    // hidden word was          "bible"
    // user guessed             "elate"
    //                          "BYBBG"
//--------------------------------------

    // example:
    // hidden word was          "maxim"
    // the guess is             "mamma"
    //                          "GGYBB"

    //finish implementing here

    return "BBBBBB";
};

// console.log(colorizeWordle('alpha', 'ahead'))
// console.log(colorizeWordle('elate', 'bible'))
// console.log(colorizeWordle('mamma', 'maxim'))

// console.log(colorizeWordle('alpha', 'truck')) // BBBBB
// console.log(colorizeWordle('truck', 'truck')) // GGGGG
// console.log(colorizeWordle('truck', 'track')) // GGBGG

// console.log(colorizeWordle('track', 'crack')) // BGGGG

// console.log(colorizeWordle('mamma', 'maxim')) // GGYBB

// console.log(colorizeWordle('reeks', 'elder')) // YYYBB

// console.log(colorizeWordle('preen', 'alien')) // BBBGG

console.log(colorizeWordle('alpha', 'tacks')) // YBBBB

console.log(colorizeWordle('iiwis', 'swift')) // YBYBY

// console.log(colorizeWordle('toast', 'burnt')) // BBBBG
// console.log(colorizeWordle('soils', 'abbey')) // BBBBB
// console.log(colorizeWordle('toast', 'toast')) // GGGGG