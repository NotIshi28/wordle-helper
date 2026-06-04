console.log("Wake Up");

const normalizeLetters = (value) =>
    [...new Set((value || "").toLowerCase().replace(/[^a-z]/g, "").split("").filter(Boolean))];

const misplacedLetters = [
    document.getElementById("misplacedLetters1"),
    document.getElementById("misplacedLetters2"),
    document.getElementById("misplacedLetters3"),
    document.getElementById("misplacedLetters4"),
    document.getElementById("misplacedLetters5")
];

let misplacedLettersArray = [[], [], [], [], []];

try {
    const saved = JSON.parse(localStorage.getItem('wordleHelperState') || 'null');
    if (saved) {
        if (Array.isArray(saved.misplacedLettersArray)) misplacedLettersArray = saved.misplacedLettersArray;
    }
} catch (e) {

}

misplacedLetters.forEach((element, index) => {
    element.addEventListener("input", () => {
        const misplacedArray = normalizeLetters(element.value);
        misplacedLettersArray[index] = misplacedArray;
        saveState();
        computeFilteredWords();
    });
});

const correctLetters = [
    document.getElementById("correctLetters1"),
    document.getElementById("correctLetters2"),
    document.getElementById("correctLetters3"),
    document.getElementById("correctLetters4"),
    document.getElementById("correctLetters5")
];

correctLetters.forEach((element, index) => {
    element.addEventListener("input", () => {
        if(element.value.length < 1) {
            document.getElementById(`outWordLetters${index + 1}`).innerHTML = "_";
            computeFilteredWords();
            return;
        }
        else{
            document.getElementById(`outWordLetters${index + 1}`).innerHTML = element.value.toUpperCase();
            saveState();
            computeFilteredWords();
        }
    });
});

let excludedLettersArray = [];
const excludedLetters = document.getElementById("excludedLetters");
excludedLetters.addEventListener("input", () => {
    excludedLettersArray = normalizeLetters(excludedLetters.value);
    document.getElementById("outExcludedLetters").innerHTML = excludedLettersArray;
    console.log(excludedLettersArray);
    saveState();
    computeFilteredWords();
});




let allWords = [];

try {
    if (typeof require === 'function') {
        allWords = require('./words');
    }
} catch (e) {

}

if ((!allWords || !allWords.length) && typeof window !== 'undefined' && Array.isArray(window.allWords)) {
    allWords = window.allWords;
}

const containsLetter = (word, letter) => word.includes(letter);
const doesNotContainLetter = (word, letter) => !word.includes(letter);
const hasLetterInPosition = (word, letter, position) => {
  if (!letter) return true;
  return word[position] === letter;
}
const doesNotHaveLetterInPosition = (word, letter, position) => {
  if (!letter) return true;
  return word[position] !== letter;
}

function computeFilteredWords() {
    if (!allWords || !allWords.length) {
        fetch('./words.json')
            .then(r => {
                if (!r.ok) throw new Error('Failed to fetch words.json');
                return r.json();
            })
            .then(data => { 
                allWords = data; 
                computeFilteredWords(); 
            })
            .catch(err => {
                console.error('Could not load words list', err);
                allWords = [];
            });
        return;
    }
    
    const hasLetters = [...new Set([
        ...correctLetters.map(element => (element.value || "").toLowerCase().replace(/[^a-z]/g, "")).filter(letter => letter),
        ...misplacedLettersArray.flat().map(letter => letter.toLowerCase())
    ])];
    
    const inWord = document.getElementById("inWord");
    if(inWord) inWord.innerHTML = hasLetters.join(", ");

    const mustNotHaveLetters = excludedLettersArray;
    const mustHaveLettersInPosition = correctLetters.map(el => (el.value || "").toLowerCase().replace(/[^a-z]/g, ""));
    const mustNotHaveLettersInPosition = misplacedLettersArray.map(arr => arr.map(l => l.toLowerCase()));

    const filteredWords = allWords.filter(word => {
        const normalizedWord = word.toLowerCase();

        return hasLetters.every(letter => containsLetter(normalizedWord, letter)) &&
        mustNotHaveLetters.every(letter => doesNotContainLetter(normalizedWord, letter)) &&
        mustHaveLettersInPosition.every((letter, index) => hasLetterInPosition(normalizedWord, letter, index)) &&
        mustNotHaveLettersInPosition.every((letters, index) => letters.every(letter => doesNotHaveLetterInPosition(normalizedWord, letter, index)));
    });

    console.log(filteredWords);
    console.log('possible words', filteredWords.length);
    const outputElement = document.getElementById("possibleWords");
    outputElement.innerHTML = filteredWords.join(", ");
}

function saveState() {
    try {
        const state = {
            misplacedLettersArray,
            correctLetters: correctLetters.map(el => (el.value || "").toLowerCase()),
            excludedLetters: (excludedLetters.value || "").toLowerCase()
        };
        localStorage.setItem('wordleHelperState', JSON.stringify(state));
    } catch (e) {

    }
}

function restoreInputs() {
    try {
        const saved = JSON.parse(localStorage.getItem('wordleHelperState') || 'null');
        if (!saved) return;
        if (Array.isArray(saved.misplacedLettersArray)) {
            saved.misplacedLettersArray.forEach((arr, i) => {
                if (misplacedLetters[i]) misplacedLetters[i].value = (arr || []).join("");
            });
            misplacedLettersArray = saved.misplacedLettersArray;
        }
        if (Array.isArray(saved.correctLetters)) {
            saved.correctLetters.forEach((val, i) => {
                if (correctLetters[i]) correctLetters[i].value = val || "";
                const out = document.getElementById(`outWordLetters${i+1}`);
                if (out) out.innerHTML = (val ? val.toUpperCase() : "_");
            });
        }
        if (saved.excludedLetters && excludedLetters) {
            excludedLetters.value = saved.excludedLetters;
            document.getElementById("outExcludedLetters").innerHTML = normalizeLetters(saved.excludedLetters);
            excludedLettersArray = normalizeLetters(saved.excludedLetters);
        }
    } catch (e) {
    
    }
}

restoreInputs();

computeFilteredWords();

document.getElementById("resetButton").addEventListener("click", () => {
    console.log("Resetting state and inputs");
    localStorage.removeItem('wordleHelperState');
    window.close();
    restoreInputs();
    computeFilteredWords();
})



document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["sharedData"], (result) => {
    console.log(result);
    console.log(result.sharedData.misplaced);
    misplacedLettersArray = result.sharedData.misplaced;
    for(let i = 0; i < misplacedLettersArray.length; i++) {
        if(misplacedLetters[i]){
            misplacedLetters[i].value = misplacedLettersArray[i].join("");
        }
    }
    correctLetters.forEach((element, index) => {
        if(correctLetters[index] != ""){
            element.value = result.sharedData.correct ? result.sharedData.correct[index] : "";
            document.getElementById(`outWordLetters${index + 1}`).innerHTML = element.value ? element.value.toUpperCase() : "_";
        }
    })
    excludedLetters.value = result.sharedData.wrong ? result.sharedData.wrong.join("") : "";
    document.getElementById("outExcludedLetters").innerHTML = excludedLetters.value;
    computeFilteredWords();
    saveState();
  });
});
