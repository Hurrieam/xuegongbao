const messageElem:HTMLElement = <HTMLElement>document.getElementsByClassName("message")[0];
const contentElem:HTMLElement = <HTMLElement>document.getElementsByClassName("content")[0];
const closeElem:HTMLElement = <HTMLElement>document.getElementsByClassName("close")[0];

messageElem.addEventListener("click", function () {
    contentElem.style.visibility = "visible";
});

closeElem.addEventListener("click", function () {
    contentElem.style.visibility = "hidden";
});

// created by Hurrieam on 20220424