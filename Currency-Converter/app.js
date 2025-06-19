import countryList from './countryCode.js';

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns) {
    for(let currCode in countryList) {
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if(select.name==="from" && currCode==="USD" || select.name==="to" && currCode==="PKR") {
        newOption.selected = "selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
 };

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    fromCurr.disabled = true;
    toCurr.disabled = true;
    btn.disabled = true;
    msg.innerText = "Loading..."

    let fromCode = fromCurr.value.toLowerCase();
    let toCode = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}${fromCode}.json`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(fromCode,toCode);
        let rate = data[fromCode][toCode];
        console.log(rate);
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    }
    catch (err) {
        msg.innerText = "Error Fetching Data.";
        console.log(err);
    }
    finally {
        fromCurr.disabled = false;
        toCurr.disabled = false;
        btn.disabled = false;
    }
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

