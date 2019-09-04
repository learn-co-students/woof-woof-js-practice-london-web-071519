const allPups = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const filter = document.querySelector('#good-dog-filter')

///////////////////////////
///////Get Pups////////////
function renderPups() {
    return fetch(allPups)
        .then(resp => resp.json())
        .then(pups => pups.forEach(pup => renderPup(pup)))
}

function renderPup(pup){
    let span = document.createElement('span')
    span.innerText = pup.name
    ///////Event Listener//////////////////
    span.addEventListener('click', event => {
        dogInfo.innerHTML = "";
        let imgEl = document.createElement('img')
        imgEl.src = pup.image
        let h2El = document.createElement('h2')
        h2El.innerText = pup.name
        buttonEl = document.createElement('button')
        if (pup.isGoodDog === true) {
            buttonEl.innerText = "Good Dog!"
        } else {
            buttonEl.innerText = "Bad Dog!"
        }
        buttonEl.addEventListener('click', event => {
            if (event.target.innerText === "Good Dog!"){
                event.target.innerText = "Bad Dog!"
                makeBadDog(pup.id)
            } else if (event.target.innerText === "Bad Dog!") {
                event.target.innerText = "Good Dog!"
                makeGoodDog(pup.id)
            }
        })
        dogInfo.appendChild(imgEl)
        dogInfo.appendChild(h2El)
        dogInfo.appendChild(buttonEl)
    })
    //////////////////////////////////////
    dogBar.appendChild(span, pup)
}

////////////////////////////
////////////////////////////
function makeGoodDog(id) {
        return fetch(`${allPups}/${id}`,{
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
            },
            body: JSON.stringify({
            isGoodDog:true
            })
        })
}

function makeBadDog(id) {
    return fetch(`${allPups}/${id}`,{
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        },
        body: JSON.stringify({
        isGoodDog:false
        })
    })
}
////////////////////////////
////////////////////////////

////////////////////////////
filter.addEventListener('click', event => {
    if (filter.innerText != "Good Dogs"){
        filter.innerText = "Good Dogs"
        fetchGoodDogs()
    } else if (filter.innerText = "Good Dogs") {
        filter.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
        renderPups()
    }
})

///////////////////////////////
///////////////////////////////
function fetchGoodDogs(){
    dogBar.innerHTML = ""
    return fetch(allPups)
    .then(resp => resp.json())
    .then(pups => pups.forEach(pup => isGoodPup(pup)))
}

function isGoodPup(pup){
        if (pup.isGoodDog === true){
            let span = document.createElement('span')
            span.innerText = pup.name
        ///////Event Listener//////////////////
            span.addEventListener('click', event => {
            dogInfo.innerHTML = "";
            let imgEl = document.createElement('img')
            imgEl.src = pup.image
            let h2El = document.createElement('h2')
            h2El.innerText = pup.name
            buttonEl = document.createElement('button')
            if (pup.isGoodDog === true) {
                buttonEl.innerText = "Good Dog!"
            } else {
                buttonEl.innerText = "Bad Dog!"
            }
            buttonEl.addEventListener('click', event => {
                if (event.target.innerText === "Good Dog!"){
                    event.target.innerText = "Bad Dog!"
                    makeBadDog(pup.id)
                } else if (event.target.innerText === "Bad Dog!") {
                    event.target.innerText = "Good Dog!"
                    makeGoodDog(pup.id)
                }
            })
            dogInfo.appendChild(imgEl)
            dogInfo.appendChild(h2El)
            dogInfo.appendChild(buttonEl)
        })
        //////////////////////////////////////
        dogBar.appendChild(span, pup)
    }
}
///////////////////////////////
///////////////////////////////


renderPups()