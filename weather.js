const APP_ID = "ab4639f5754271e773ed6d3ffd73f327";
const storageKey = 'items';
const listEl = document.querySelector('#list');
const form = document.querySelector('form');
const items = readList();
//+
function getText(){
    const input = document.querySelector('#city');
    return input.value; 
}
async function getWeather(){
    let cityName = getText();
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${APP_ID}`);
    const date = result.json();
    console.log(date);
    return date
}

function addText(listEl){
    const weather = getWeather();
    listEl.innerHTML = `<ol>${`<li>${weather}</li>`}</ol>`;
}

function saveList(items){
    localStorage.setItem(items,JSON.stringify(storageKey));
}

function readList(){
    const data = localStorage.getItem(storageKey);
    return data === null ? [] : JSON.parse(data);
}

form.addEventListener('submit',(ev)=>{
//+
    ev.preventDefault();

    const formElement = ev.target;
    console.log(formElement)
    const input = formElement.querySelector('input');
    const value = input.value;
    input.value = '';
    console.log(value)
    items.push(value);

    addText(listEl,items);

    saveList(items);
}
)