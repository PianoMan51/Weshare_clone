let amountinput = document.getElementById("amount-input");
var invoiceDivList = document.getElementById("invoiceDivList");
let addInvoicebtn = document.getElementById("addInvoice");
let description = document.getElementById("description");
let liste = document.getElementById("nameSetting");
let namesettings = document.getElementById("nameSetting");
let settings = document.getElementById("settings");
let totalChecker = document.getElementById("totalChecker");
let formbutton = document.getElementById("formbutton");
let inputEditButton = document.getElementById("inputEditButton");
let settingsDeleteButton = document.getElementById("settingsDeleteButton");
let settingsSizeButton = document.getElementById("settingsSizeButton");
let inputButtons = document.getElementById("inputButtons");
let classInput = document.getElementById("classInput");
let invoiceList = [];
let nameAmounts = [];
let invoiceAmounts = [];



function centerLastChild() {
    let children = invoiceDivList.children;
    if (children.length % 2 !== 0) {
        children[children.length - 1].classList.add("last-child");
    }
}

function sofie() {
    invoiceList = JSON.parse(localStorage.getItem("invoiceList"));

    const height = invoiceList === null || invoiceList.length < 1 ? 0 : invoiceList.length <= 2 ? 240 : 480;
    const width = invoiceList === null || invoiceList.length < 2 ? 340 : 680;

    invoiceDivList.classList.add("height-transition", "width-transition");
    invoiceDivList.style.height = `${height}px`;
    invoiceDivList.style.width = `${width}px`;
    invoiceDivList.style.transition = "height 0.5s ease-in-out, width 0.5s ease-in-out";
}

sofie();


invoiceAmounts = JSON.parse(localStorage.getItem("invoiceAmounts")) || [];
formbutton.addEventListener("click", function() {
    addAmount();
});
amountinput.addEventListener("keydown", function() {
    if (event.keyCode === 13) {
        addAmount();

    }
});

description.addEventListener("keydown", function() {
    if (event.keyCode === 13) {
        addInvoice();
        centerLastChild();
    }
});

settingsDeleteButton.addEventListener("click", function() {
    amountinput.value = "";
    description.value = "";
    settings.style.display = "none";
    invoiceDivList.style.opacity = "1";
})




function addAmount() {
    if (nameList.length != 0) {
        if (amountinput.value != "") {
            if (classNames.style.display === "block") {
                classNames.style.display = "none";
                nameSettings();
                calculateTotal();
            } else {
                nameSettings();
                calculateTotal();
            }
        } else {
            alert("No amount");
        }
    } else {
        alert("No Names");
    }
}

function nameSettings() {
    settings.style.display = "block";
    invoiceDivList.style.opacity = "0";

    while (namesettings.firstChild) {
        namesettings.removeChild(namesettings.firstChild);
    }
    for (let i = 0; i < nameList.length; i++) {
        let nameSettingAmount = document.createElement("div");
        let nameSetting = document.createElement("span");
        let nameAmount = document.createElement("input");
        nameSetting.innerHTML = nameList[i].text;
        nameAmount.value = (amountinput.value / nameList.length).toFixed(2);
        nameAmounts.push(nameAmount.value);
        namesettings.append(nameSettingAmount);
        nameSettingAmount.append(nameSetting);
        nameSettingAmount.append(nameAmount);
        nameAmount.addEventListener("input", updateNameAmounts);
    }
}

function updateNameAmounts() {
    let total = 0;
    let inputs = document.querySelectorAll("#nameSetting input");
    for (let i = 0; i < inputs.length; i++) {
        total += parseFloat(inputs[i].value);
    }
    let difference = amountinput.value - total;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] != this) {
            inputs[i].value = (parseFloat(inputs[i].value) + difference / (inputs.length - 1)).toFixed(2);
        }
    }
}



function calculateTotal() {
    let inputElements = namesettings.querySelectorAll("input");
    let total = 0;
    for (let i = 0; i < inputElements.length; i++) {
        total += parseFloat(inputElements[i].value);
    }
}



function addInvoice() {
    if (description.value != "") {
        let invoice = [];
        let amount = amountinput.value;
        let descriptiontext = description.value;

        invoice.push(amount);
        invoice.push(descriptiontext);
        invoice.push(nameAmounts);
        invoiceList.push(invoice);
        invoiceAmounts.push(nameAmounts);



        settings.style.display = "none";
        invoiceDivList.style.opacity = "1";

        localStorage.setItem("invoiceList", JSON.stringify(invoiceList));
        localStorage.setItem("invoiceAmounts", JSON.stringify(invoiceAmounts));


        amountinput.value = "";
        description.value = "";
        nameAmounts = [];

        showInvoices();
        showNameSettings();
        sofie();
    } else {
        alert("Empty")
    }
}


showInvoices();
showNameSettings();


function showInvoices() {

    invoiceList = JSON.parse(localStorage.getItem("invoiceList")) || [];
    invoiceAmounts = JSON.parse(localStorage.getItem("invoiceAmounts")) || [];

    invoiceDivList.innerHTML = '<div id="bannerList"></div>';
    for (let i = 0; i < invoiceList.length; i++) {
        let invoiceDiv = document.createElement("div");
        let invoiceData = document.createElement("div");
        let invoiceAmount = document.createElement("span");
        let invoiceDescription = document.createElement("p");
        let invoiceSpecs = document.createElement("div");
        let invoiceButtons = document.createElement("div");
        let invoiceDelete = document.createElement("button");
        let invoiceEdit = document.createElement("button");
        let invoiceSize = document.createElement("button");


        invoiceDiv.setAttribute("id", "invoice");
        invoiceData.setAttribute("id", "invoiceData");
        invoiceData.classList.add("invoiceData")
        invoiceSpecs.setAttribute("id", "invoiceSpecs");
        invoiceButtons.setAttribute("id", "invoiceButtons");
        invoiceDelete.setAttribute("id", "invoiceDelete");
        invoiceEdit.setAttribute("id", "invoiceEdit");
        invoiceSize.setAttribute("id", "invoiceSize");


        invoiceDelete.style.backgroundColor = "#e74c3c";
        invoiceEdit.style.backgroundColor = "#f1c40f";
        invoiceSize.style.backgroundColor = "#2ecc71";


        invoiceAmount.innerHTML = invoiceList[i][0];
        invoiceDescription.innerHTML = invoiceList[i][1];

        invoiceData.appendChild(invoiceButtons);
        invoiceData.appendChild(invoiceAmount);
        invoiceData.appendChild(invoiceDescription);
        invoiceDiv.appendChild(invoiceData);
        invoiceDivList.appendChild(invoiceDiv);
        invoiceButtons.appendChild(invoiceDelete)
        invoiceButtons.appendChild(invoiceEdit);
        invoiceButtons.appendChild(invoiceSize);

        let children = invoiceDivList.children;
        if (children.length % 2 === 0) {
            children[children.length - 1].classList.add("last-child");
        }


        invoiceSpecs.style.opacity = "0"
        invoiceSize.addEventListener("click", function() {
            if (invoiceSpecs.style.opacity != "1") {
                invoiceSpecs.style.opacity = "1"

                for (let j = 0; j < invoiceAmounts.length; j++) {
                    invoiceSpecs.innerHTML = ""

                    for (let i = 0; i < nameList.length; i++) {
                        let SpecDiv = document.createElement("div");
                        let nameDiv = document.createElement("p");
                        let amountDiv = document.createElement("span");

                        nameDiv.innerHTML = nameList[i].text;
                        amountDiv.innerHTML = invoiceAmounts[j][i]

                        SpecDiv.appendChild(nameDiv);
                        SpecDiv.appendChild(amountDiv);
                        invoiceSpecs.appendChild(SpecDiv);
                    }

                    invoiceDiv.appendChild(invoiceSpecs);
                }

            } else {
                invoiceSpecs.style.opacity = "0"
            }
        })
        invoiceDelete.addEventListener("click", function() {
            let index = invoiceList.indexOf(invoiceList[i]);

            invoiceList.splice(index, 1);
            invoiceAmounts.splice(index, 1)

            invoiceDivList.removeChild(invoiceDiv);

            localStorage.setItem("invoiceList", JSON.stringify(invoiceList));
            localStorage.setItem("invoiceAmounts", JSON.stringify(invoiceAmounts));

            sofie();
            centerLastChild();
        });
    }
    calculateTotal();
}


function showNameSettings() {
    nameList = JSON.parse(localStorage.getItem("nameList")) || [];
    while (namesettings.firstChild) {
        namesettings.removeChild(namesettings.firstChild);
    }
    for (let i = 0; i < nameList.length; i++) {
        let nameSettingAmount = document.createElement("li");
        let nameSetting = document.createElement("span");
        let nameAmount = document.createElement("input");
        nameSetting.innerHTML = nameList[i].text;
        nameAmount.placeholder = amountinput.value / nameList.length;
        namesettings.appendChild(nameSettingAmount);
        nameSettingAmount.appendChild(nameSetting);
        nameSettingAmount.appendChild(nameAmount);
    }
}