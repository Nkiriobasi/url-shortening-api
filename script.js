const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Cannot find element ${selector}`);
}


const hambuger = selectElement(".hambuger");
const form = selectElement('#form');
const input = selectElement('#urlinput');
const linkRc = selectElement('#linkRc');


hambuger.addEventListener('click', () => {
    navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('hide');
});


form.addEventListener('submit', e => {
    e.preventDefault();
    const inputUrlValue = input.value;


    // send a POST request
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    let body = {
        "long_url": inputUrlValue,
        "domain": "https://t.ly/",
        "api_token": "57WpXH480Zc6hsr3Rf442NlQvHM3bEN7dS5wfu9Wu2Jr1Egoku3NmtPngbrW",
        "include_qr_code": false
    };


    fetch("https://t.ly/api/v1/link/shorten", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    })
    .then(response => {
        if (!response.ok) { throw response }
        return response.json()
    })
    .then(data => {
        const longUrl = document.createElement('p');
        longUrl.classList.add('longUrl');
        longUrl.innerHTML = data.long_url;
 
        const shortUrlWrap = document.createElement('div');
        shortUrlWrap.classList.add('shortUrl-wrap');
        shortUrlWrap.innerHTML = `
        <p class="shortUrl">${data.short_url}</p>
        <button class="shortUrl-btn">Copy</button>
        `

        const result = document.createElement('div');
        result.classList.add('result');
        result.appendChild(longUrl);
        result.appendChild(shortUrlWrap);

        linkRc.prepend(result);

        const copyBtn = selectElement('.shortUrl-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
            copyBtn.innerHTML = 'Copied!';
            copyBtn.style.backgroundColor = 'hsl(257, 27%, 26%)';
        });

        // clear input field
        form.reset();
    })
    .catch(error => {
        throw new Error(`Error: ${error}`);
    });
})