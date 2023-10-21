(async function () {
    const APP_ID = "ab4639f5754271e773ed6d3ffd73f327";
    const storageKey = 'items';
    const listEl = document.querySelector('#list');
    const form = document.querySelector('form');
    const items = await readList();
    async function getWeather(items){
        // console.log(items)
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${items}&appid=${APP_ID}`);
        // console.log(result)
        const date = result.json();
        // console.log(date);
        return date;
    }

    async function addText(listEl,items){
        const weather = await getWeather(items);
        const getWeatherTemp = JSON.stringify(weather, null,2)
        console.log(getWeatherTemp.main.temp)//-----не выводится температура, пишет undefined
        listEl.innerHTML = `<ol>${`<li>${getWeatherTemp}</li>`}</ol>`;
    }

    function saveList(items){
        localStorage.setItem(items,JSON.stringify(storageKey));
    }

    async function readList(){
        try{
            const data = localStorage.getItem(storageKey);
            return data === null ? [] : JSON.parse(data);
        }catch(e){
            console.error(e);
            return [];
        }
        
        
    }

    form.addEventListener('submit',(ev)=>{
    //+
        ev.preventDefault();

        const formElement = ev.target;
        // console.log(formElement)
        const input = formElement.querySelector('input');
        const value = input.value;
        input.value = '';
        // console.log(value)
        items.push(value);


        addText(listEl,items);

        saveList(items);
    }
    )
})();