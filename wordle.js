console.log("Wake Up")
const element = setTimeout(() => {
    document.getElementById("Head").innerHTML = "WOKE UP"
}, 2000);

const correctLetter1Element = document.getElementById("correctLetters1");
const correctLetter2Element = document.getElementById("correctLetters2");
const correctLetter3Element = document.getElementById("correctLetters3");
const correctLetter4Element = document.getElementById("correctLetters4");
const correctLetter5Element = document.getElementById("correctLetters5");

correctLetter1Element.addEventListener("input", () => {
    if(correctLetter1Element.value.length < 1) {
        document.getElementById("outWordLetters1").innerHTML = "_";
        return;
    }
    else{
        document.getElementById("outWordLetters1").innerHTML = correctLetter1Element.value;
    }
});


correctLetter2Element.addEventListener("input", () => {
    if(correctLetter2Element.value.length < 1) {
        document.getElementById("outWordLetters2").innerHTML = "_";
        return;
    }
    else{
        document.getElementById("outWordLetters2").innerHTML = correctLetter2Element.value;
    }
});

correctLetter3Element.addEventListener("input", () => {
    if(correctLetter3Element.value.length < 1) {
        document.getElementById("outWordLetters3").innerHTML = "_";
        return;
    }
    else{
        document.getElementById("outWordLetters3").innerHTML = correctLetter3Element.value;
    }
});


correctLetter4Element.addEventListener("input", () => {
    if(correctLetter4Element.value.length < 1) {
        document.getElementById("outWordLetters4").innerHTML = "_";
        return;
    }
    else{
        document.getElementById("outWordLetters4").innerHTML = correctLetter4Element.value;
    }
});


correctLetter5Element.addEventListener("input", () => {
    if(correctLetter5Element.value.length < 1) {
        document.getElementById("outWordLetters5").innerHTML = "_";
        return;
    }
    else{
        document.getElementById("outWordLetters5").innerHTML = correctLetter5Element.value;
    }
});


const excludedLetters = document.getElementById("excludedLetters");
excludedLetters.addEventListener("input", () => {
    const excludedLettersArray = excludedLetters.value.split("");
    document.getElementById("outExcludedLetters").innerHTML = excludedLettersArray;
    console.log(excludedLettersArray);
});