
const body = document.querySelector('body');
//endpoint pentru o singura bere
const aSingleBeer = 'https://api.punkapi.com/v2/beers/1';
//endpoint pentru mai multe beri
const beerArray = 'https://api.punkapi.com/v2/beers?page=1&per_page=5'
const content = document.querySelector('.content');



//metoda folosita pentru a face request la server 
//returneaza un promise
const sendHttpRequest = (met,endpoint) =>{

    const promise = new Promise((resolve,reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open(met,endpoint);

        xhr.responseType = 'json';
        
        xhr.onload = () =>{
            if(xhr.status == "200" && xhr.statusText == "OK"){
                resolve(xhr.response);
            }
            else{
                reject(xhr.onerror);
            }
        }

        xhr.send(null);
    })

    return promise;
}



const bottom = () =>{

    let page = 1;
    let perPage = 5;
    const beerArray = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;

    document.addEventListener('scroll', (event)=>{
        if(document.body.scrollHeight == 
            document.scrollingElement.scrollTop + window.innerHeight){
                perPage = perPage + 5;
                insertInTheDom(beerArray)
            }
    })
}

const redChar = (char) =>{
    let newString = null;
    if(char.length >= 25){
        console.log(char);
        newString = char.substring(1,25);
        newString += '...'
    }
    return newString;
}

const insertInTheDom = () =>{
    sendHttpRequest('GET',beerArray)
    .then(res=>{
        res.forEach(beer => {
            console.log(beer);
            let Element = `
            <div class="beer">
                <img src="${beer.image_url}" alt="${beer.tagline}" class="beer-image">
                <h4 class="beer-name">${beer.name}</h4>
                <p class="beer-description">${redChar(beer.description)}</p>
            </div>
            `
            content.insertAdjacentHTML('beforeend',Element);
        });
    })
    .catch(err=>{
        console.log(err);
    })
}



const main = () =>{
    const met='GET';
    insertInTheDom();
    bottom();

}

main();


