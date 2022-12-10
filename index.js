const ajaxView = document.getElementById("ajax")
const addBtn = document.getElementById("addBtn")
const addBtnCont = document.getElementById("addBtnCont")

const addNew = document.getElementById("addNew")
const submitBtn = document.getElementById("submitBtn")
const cancelBtn = document.getElementById("cancelBtn")

var showed = false;
function showHideForm() {
    if (!showed) {
        addBtnCont.style.display = 'none';
        addNew.style.display = 'inline';
        window.scrollBy({
            top: window.innerWidth,
            behavior: 'smooth'
        });

    } else {
        addNew.style.display = 'none';
        addBtnCont.style.display = 'flex';

    }
    showed = !showed
}

function callAjaxData() {
    const req = new XMLHttpRequest();
    req.open("GET", "https://jsonplaceholder.typicode.com/posts");
    req.send();
    req.onreadystatechange = function () {
        const res = JSON.parse(req.responseText)
        console.log(res);
        if (this.readyState == 4 && this.status == 200) {
            for (let index = 1; index < 4; index++) {
                document.getElementById("ajaxHeader" + index).innerText = res[index]["title"];
                document.getElementById("ajaxBody" + index).innerText = res[index]["body"];
            }

        }

    }
}

function addPost() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: document.getElementById("inputHeader").value,
            body: document.getElementById("inputBody").value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => { console.log(json); alert("Done") })
        .catch(_ => alert("something wrong"));
}

addBtn.onclick = _ => { showHideForm() }
submitBtn.onclick = _ => { showHideForm(); addPost(); }
cancelBtn.onclick = _ => { showHideForm() }
callAjaxData()