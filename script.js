const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find element ${selector}`);
}

const form = selectElement('form');
const input = selectElement('input');
const parentResult = selectElement('.link-result__container');

const result = document.createElement('div');
result.classList.add('result');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;
    
    const initialUrl = document.createElement('p');
    initialUrl.classList.add('initialUrl');
    initialUrl.innerHTML = url;

    shortenUrl(url);

    result.appendChild(initialUrl);

    parentResult.appendChild(result);
})

async function shortenUrl(url){
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data = res.json();

        console.log(data);

        let newUrlWrap = document.createElement('div');
        newUrlWrap.classList.add('newUrl-wrap');
        newUrlWrap.innerHTML = `
        <p class="newUrl">${data}</p>
        <button class="newUrl-btn">Copy</button>
        `

        result.appendChild(newUrlWrap);
    } catch (error) {
        console.log(error);
    }
}