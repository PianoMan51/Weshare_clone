let statsbtn = document.getElementById("statsbtn");
let classStats = document.getElementById("classStats")




statsbtn.addEventListener("click", function () {
    if (settings.style.display === "block") {
        alert("finish what your doing");
    } else {
        if (classStats.style.display != "block") {
            if (classNames.style.display = "block") {
                classNames.style.display = "none";
            }
            classStats.style.display = "block";
            invoiceDivList.style.opacity = "0";
        } else {
            classStats.style.display = "none";
            invoiceDivList.style.opacity = "1";
        }
    }
})
