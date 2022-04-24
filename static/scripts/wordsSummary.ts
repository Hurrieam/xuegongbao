const inputElem:HTMLInputElement = <HTMLInputElement>document.getElementsByClassName("input")[0];
const summaryElem:HTMLElement = <HTMLElement>document.getElementsByClassName("words-summary")[0];

function inputElemOnChange(){
    summaryElem.innerHTML = inputElem.value.length.toString() + "/" + inputElem.maxLength.toString() + "字";
}
inputElemOnChange();

inputElem.addEventListener("input", inputElemOnChange);

// created by Hurrieam on 20220424