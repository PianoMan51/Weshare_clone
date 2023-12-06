let inputField = document.getElementById("inputField");
let textList = document.getElementById("textList");
let namebtn = document.getElementById("namebtn");
let classNames = document.getElementById("classNames");
let newNameSpan = document.getElementById("newNameSpan");
let nameList = [];

namebtn.addEventListener("click", function () {
    if (settings.style.display === "block") {
        alert("finish what your doing");
    } else {
        if (classNames.style.display != "block") {
            if (classStats.style.display = "block") {
                classStats.style.display = "none";
            }

            console.log(invoiceAmounts.length)
            classNames.style.display = "block";
            invoiceDivList.style.opacity = "0";
        } else {
            classNames.style.display = "none";
            invoiceDivList.style.opacity = "1";
        }
    }
})




function namesWidth() {
    nameList = JSON.parse(localStorage.getItem("nameList")) || [];

    const width = document.activeElement === inputField ? 480 : 340;

    classNames.classList.add("width");
    classNames.style.width = `${width}px`;
}




inputField.addEventListener("focus", function () {
    namesWidth();
});

inputField.addEventListener("blur", function () {
    namesWidth();
});


inputField.addEventListener("keydown", function () {
    if (event.keyCode === 13) {
        addName();
    }
});

function addName() {
    if (inputField.value != "") {
        let name = {};
        name.text = inputField.value;
        nameList.push(name);
        localStorage.setItem("nameList", JSON.stringify(nameList));
        inputField.value = "";
        showNames();

    } else {
        alert("Empty");
    }
}


showNames();

function showNames() {
    nameList = JSON.parse(localStorage.getItem("nameList")) || [];
    textList.innerHTML = "";
    for (let i = 0; i < nameList.length; i++) {
        let newName = document.createElement("div");
        let textDiv = document.createElement("span");
        let deleteBtn = document.createElement("button");
        textDiv.innerHTML = nameList[i].text;

        newName.setAttribute("id", "newName");
        textDiv.setAttribute("id", "newNameSpan");


        deleteBtn.addEventListener("click", function () {
            let index = nameList.indexOf(nameList[i]);
            nameList.splice(index, 1);
            textList.removeChild(newName);
            localStorage.setItem("nameList", JSON.stringify(nameList));
            namesWidth();
        });

        textList.appendChild(newName);
        newName.appendChild(textDiv);
        newName.appendChild(deleteBtn);

        deleteBtn.addEventListener("mouseover", function () {
            deleteBtn.innerHTML = '&#10006';
            deleteBtn.addEventListener("mouseout", function () {
                deleteBtn.innerHTML = "";
            })
        })
    }
}



namesWidth();