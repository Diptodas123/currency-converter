const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon=document.querySelector("i");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.appendChild(newOption);
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = '1';
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    const response = await fetch(URL, {
        'Content-Type': "application/json",
        "method": 'GET'
    });
    
    const data = await response.json();        
    
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];    
    
    let finalAmount = rate * amountValue;
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.firstElementChild;
    img.src = newSrcLink;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

icon.addEventListener("click",(e)=>{
    e.preventDefault();
    let temp;
    const selectContainer=document.getElementsByClassName("select-container");
    temp=selectContainer[0].firstElementChild.src=`https://flagsapi.com/${countryList[fromCurr.value]}/flat/64.png`
    selectContainer[0].firstElementChild.src=selectContainer[1].firstElementChild.src;
    selectContainer[1].firstElementChild.src=temp;
    temp=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=temp;
})