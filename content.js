let correct = [[], [], [], [], []];
let wrong = [];
let misplaced = [[], [], [], [], []];
function evalWordGrid() {
    const rows = document.getElementsByClassName("Row-module_row__pwpBq");
    // document.body.appendChild(document.createElement("button")).setAttribute("style", "width:200px; height:100px; position:absolute;");
    let data = []
    // data.push(rows[0].children[0].children[0].innerText);
    
    //collecting data from grid
    for (let i = 0; i < rows.length; i++) {
        if( rows[i].children[0].children[0].innerText == "") {
            continue;
        }
        
        for (let j = 0; j < rows[i].children.length; j++) {
            data.push(rows[i].children[j].children[0].ariaLabel);
        }
    }
    console.log(data);
    //sorting collected data into their respective types
    for (let i = 0; i < data.length; i++) {
        if(data[i].length < 21){
            break;
        }
        if (data[i].includes("correct")) {
            if(correct[i % 5].length ===1){
                continue;
            }
            else{
                correct[i % 5].push(data[i][12]);
            }
        } else if (data[i].length > 25) {
            //need2fix
            if(misplaced[i%5].length === 1 ){
                continue;
            }
            else{
                misplaced[i%5].push(data[i][12]);     
            }
        } else if(wrong.includes(data[i][12])){
                continue;
        } else{
                wrong.push(data[i][12]);
        }
    }
    // data.push(rows[0].children[1].children[0].innerText);
    // data.push(rows[0].children[2].children[0].innerText);
    // data.push(rows[0].children[3].children[0].innerText);
    // data.push(rows[0].children[4].children[0].innerText);
    
    // console.log(data);
    console.log(correct[0].length);
    console.log(misplaced);
    console.log(wrong);

}




function sendData(){
    chrome.storage.local.set({sharedData: {correct: correct, misplaced: misplaced, wrong: wrong}}, () => {
        console.log("Data saved to local storage");
        console.log(misplaced);
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        setTimeout(() => {
            evalWordGrid();
            sendData();
            
        }, 1500);
    }
});

setTimeout(() => {
    evalWordGrid();
    sendData();
}, 5000);