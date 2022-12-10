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

function callAjaxData(ind) {
    const req = new XMLHttpRequest();
    req.open("GET", "https://jsonplaceholder.typicode.com/posts");
    req.send();
    req.onreadystatechange = function () {
        const res = JSON.parse(req.responseText)
        // console.log(res);
        if (this.readyState == 4 && this.status == 200) {
            for (let index = ind; index < 4; index++) {
                document.getElementById("ajaxHeader" + index % 3).innerText = res[index]["title"];
                document.getElementById("ajaxBody" + index % 3).innerText = res[index]["body"];
                console.log(res[index]["title"]);
            }

        }

    }
}

function addPost() {
    const header = document.getElementById("inputHeader").value
    const body = document.getElementById("inputBody").value
    if (header && body) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: header,
                body: body,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => { console.log(json); alert("Done") })
            .catch(_ => alert("something wrong"));
    } else {
        alert("your inputs empty");
    }
}

addBtn.onclick = _ => { showHideForm() }
submitBtn.onclick = _ => { showHideForm(); addPost(); }
cancelBtn.onclick = _ => { showHideForm() }

document.getElementById("more").onclick = _ => {
    callAjaxData(4)
}
callAjaxData(1)