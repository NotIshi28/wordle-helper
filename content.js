document.body.style.backgroundColor = "purple";

document.body.innerHTML = "<h1>Wordle Helper Active</h1>";





setTimeout(() => {
    const rows = document.getElementsByClassName("Row-module_row__pwpBq");
    let data = []
    data.push(rows[0].children[0].children[0].innerText);
    console.log(rows[0].children[0].children[0].ariaLabel[0]);
    // data.push(rows[0].children[1].children[0].innerText);
    // data.push(rows[0].children[2].children[0].innerText);
    // data.push(rows[0].children[3].children[0].innerText);
    // data.push(rows[0].children[4].children[0].innerText);
    
    console.log(data);
    // console.log(rows);
    
}, 3000);