const allClearButton:HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName("all-clear")[0];
const submitButton:HTMLButtonElement = <HTMLButtonElement>document.getElementsByClassName("submit")[0];

allClearButton.addEventListener("click", function () {
    inputElem.value = "";
    inputElemOnChange();
});

submitButton.addEventListener("click", function (){
    console.log("向服务器发起提交请求：" + inputElem.value);
});

// created by Hurrieam on 20220424