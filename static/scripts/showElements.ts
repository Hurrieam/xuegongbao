const messageElem:HTMLElement = <HTMLElement>document.getElementsByClassName("message")[0];
const contentElem:HTMLElement = <HTMLElement>document.getElementsByClassName("content")[0];
const closeElem:HTMLElement = <HTMLElement>document.getElementsByClassName("close")[0];

const msgElem:HTMLElement = <HTMLElement>document.getElementsByClassName("msg")[0];
const statusElem:HTMLElement = <HTMLElement>document.getElementsByClassName("status")[0];
const tblElem:HTMLElement = <HTMLElement>document.getElementsByClassName("tbl")[0];

messageElem.addEventListener("click", function () {
    contentElem.style.visibility = "visible";
    msgElem.style.visibility = "hidden";
});

closeElem.addEventListener("click", function () {
    contentElem.style.visibility = "hidden";
    msgElem.style.visibility = "visible";
});

function showElementsMain():void {
    if (statusElem.innerHTML == "无留言") {
        tblElem.style.visibility = "hidden";
    }else{
        statusElem.style.visibility = "hidden";
    }
}
showElementsMain();

// created by Hurrieam on 20220424