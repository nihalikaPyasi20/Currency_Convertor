const BASE_URL=  "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


//sare countries ke option le aaye / add kr diye
for(let select of dropdown){
  for(currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;

    //default  me usd to inr kar diya set
    if( select.name === "from" && currcode === "USD"){
        newOption.selected="selected";
    }else if( select.name  === "to" && currcode === "INR"){
        newOption.selected="selected";
    }
    select.append(newOption);

    select.addEventListener("change" ,(evt) => {
        updateFlag(evt.target);
    });
}
}

//flag updation ke liye
 const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");   //element select h aur select ke parent ke pass h img
    img.src = newSrc;
 }

 //btn click krne par ans
 btn.addEventListener("click",  async (evt) => {
    evt.preventDefault(); //click krne pe by default jo bhi ho rha tha refresh submit etc vo ni hoga ab
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if( amtVal === " " || amtVal < 1){ // agar khali h ya negetive h to by def 1 aa jaega 
        amtVal = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = await data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmnt = amtVal*rate;

    msg.innerText = ` ${amtVal} ${fromCurr.value} = ${finalAmnt} ${toCurr.value}`;
    console.log(rate);
     });
