const topBar = document.querySelector("#dog-bar")
const pageBody = document.querySelector("#dog-info")
const filter = document.querySelector("#good-dog-filter")

document.addEventListener("DOMContentLoaded", loadDogs)

filter.addEventListener('click', e => { filterDogs(); toggleFilter(e)} )

function filterDogs() {
    if (topBar.childElementCount === 10) {
    return fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => goodDogs(json))
    }
    else {
        topBar.innerHTML = ""
        loadDogs()
    }
}

function goodDogs(dogs) {
    topBar.innerHTML = ""
    let goodDogs = dogs.filter(dog => dog.isGoodDog)
    goodDogs.forEach(dog => createBtn(dog))
}


function toggleFilter(e) {
    if (e.target.innerText === "Filter good dogs: OFF") {
        e.target.innerText = "Filter good dogs: ON"
    }
    else e.target.innerText = "Filter good dogs: OFF"
}

function loadDogs() {
    return fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(allDogs)
}

function allDogs(dogs) {
    dogs.forEach(dog => createBtn(dog))
}


function createBtn(dog) {
    let span = document.createElement("span")
    span.className = "top-button"
    span.innerText = `${dog.name}`
    span.id = `${dog.id}`
    span.addEventListener('click', e => showDog(e))
    topBar.append(span)
}


function showDog(e) {
    return fetch(`http://localhost:3000/pups/${e.target.id}`)
    .then(resp => resp.json())
    .then(showDogChoice)
}

function showDogChoice(dog) {
    pageBody.innerHTML = ""
    let divDog = document.createElement("div")
    divDog.innerHTML = `<img src=${dog.image}></img> <h2>${dog.name}</h2>`
    let button = document.createElement("button")
    button.className = "good-bad" 
    if (dog.isGoodDog === true) {
    button.innerText = "Good Dog!" }
    else button.innerText = "Bad Dog!"
    button.addEventListener('click', e => { updateDog(dog); toggle(e)} )
    divDog.append(button)
    pageBody.append(divDog)
}

// function updateDogStatus(dog) {
//     if (dog.isGoodDog === true) {
//     dog.isGoodDog = false;
// } 
//     else {dog.isGoodDog = true;
//     };  
//    return dog 
// }


function updateDog(dog) {
    if (dog.isGoodDog === true) {
        dog.isGoodDog = false;
    } 
        else {dog.isGoodDog = true;
        }; 
    fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH", 
    headers: {
        "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
        isGoodDog: dog.isGoodDog
    })}).then(resp => resp.json())
}

function toggle(e) {
    if (e.target.innerText === "Good Dog!") {
        e.target.innerText = "Bad Dog!"
    }
    else 
    e.target.innerText = "Good Dog!"
}

