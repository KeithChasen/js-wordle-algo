const wordToArray = word =>
    word.split('');

const makeHiddenWordObject = hiddenWordArray => {
    const obj = {};

    for (const i in hiddenWordArray) {
        if (!obj.hasOwnProperty(hiddenWordArray[i])) {
            obj[hiddenWordArray[i]] = [{ index: i, checked: false }]
        } else {
            obj[hiddenWordArray[i]].push({ index: i, checked: false })
        }
    }

    return obj;
}

const processLetterFound = (
    hiddenWordObjectCopy,
    userCurrentLetter,
    letterIndex,
    guessArray
) => {
    const lettersFound = hiddenWordObjectCopy[userCurrentLetter];

    let hintLetter = '';

    for (const i in lettersFound) {
        // EXACT COORDINATE
        if (
            parseInt(lettersFound[i].index) === parseInt(letterIndex) &&
            !lettersFound[i].checked
        ) {
            hiddenWordObjectCopy[userCurrentLetter][i].checked = true;
            hintLetter = 'G';
            break;
        }

        else if (
            parseInt(lettersFound[i].index) !==
            parseInt(letterIndex) && !lettersFound[i].checked
        ) {
            for (const index in lettersFound) {
                if (guessArray[lettersFound[index].index] === userCurrentLetter) {
                    hintLetter = 'B';
                    break;
                }
            }

            if (hintLetter === '') {
                [hiddenWordObjectCopy, hintLetter] = searchForOccurrence(
                    hiddenWordObjectCopy,
                    lettersFound,
                    userCurrentLetter,
                    hintLetter
                );
            }

        } else {
            [hiddenWordObjectCopy, hintLetter] = searchForOccurrence(
                hiddenWordObjectCopy,
                lettersFound,
                userCurrentLetter,
                hintLetter
            );

            if (hintLetter === '') {
                hintLetter = 'B';
            }
        }
    }

    return [hintLetter, hiddenWordObjectCopy];
}

const searchForOccurrence = (hiddenWordObjectCopy, lettersFound, userCurrentLetter, hintLetter) => {
    for (const index in lettersFound) {
        if (!lettersFound[index].checked) {
            hiddenWordObjectCopy[userCurrentLetter][index].checked = true;
            hintLetter = 'Y';
            break;
        }
    }

    return [hiddenWordObjectCopy, hintLetter];
}

const makeHint = (guessArray, hiddenWordArray) => {
    let hiddenWordObject = makeHiddenWordObject(hiddenWordArray);

    const hint = [];

    let hintLetter = 'B';

    for (const letterIndex in guessArray) {
        const userCurrentLetter = guessArray[letterIndex];

        if (hiddenWordObject.hasOwnProperty(userCurrentLetter)) {
            let [newHintLetter, hiddenWordObjectCopy] = processLetterFound(
                hiddenWordObject,
                userCurrentLetter,
                letterIndex,
                guessArray
            )

            hiddenWordObject = hiddenWordObjectCopy;
            hintLetter = newHintLetter;

        } else {
            hintLetter = 'B';
        }

        hint[letterIndex] = hintLetter;
    }

    return hint.join('');
}