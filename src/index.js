const PUPURL = 'http://localhost:3000/pups'



function goodButtonClicked(puppy) {
    if (puppy.isGoodDog === true) {
        puppy.isGoodDog = false
    } else { puppy.isGoodDog = true}
    return puppy
}

function goodBadLogic(puppy, goodButton) {
    if (puppy.isGoodDog === true) {
        goodButton.innerText = `Good Dog!`}
    else {goodButton.innerText = `Bad Dog!`}
}


function showInfo(puppy) {
    const divEl = document.querySelector('#dog-info')
    divEl.innerHTML = ""
    divEl.innerHTML = `
    <img src=${puppy.image}>
    <h2>${puppy.name}</h2>`
    let goodButton = document.createElement('button')
    goodBadLogic(puppy, goodButton)
    goodButton.addEventListener('click', e => {
        goodButtonClicked(puppy)
        fetch(`${PUPURL}/${puppy.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({isGoodDog: puppy.isGoodDog})
        }).then(goodBadLogic(puppy, goodButton))
    })
    divEl.append(goodButton)
}
    



function renderPups() {

    fetch(PUPURL)
    .then(resp => resp.json())
    .then(e => {
        let pupArray = e
        let filterButton = document.querySelector('#good-dog-filter')

        const dogBarEl = document.querySelector('#dog-bar')
        dogBarEl.innerHTML = ""
        pupArray.forEach(puppy => {
            if (filterButton.innerText === 'Filter good dogs: ON') 
            {
            let pupSpan = document.createElement('span')
            pupSpan.innerHTML = puppy.name
            pupSpan.addEventListener('click', function() {
                showInfo(puppy)})
                dogBarEl.append(pupSpan)
            } 
            else {
                if (puppy.isGoodDog === true) {
                    let pupSpan = document.createElement('span')
                    pupSpan.innerHTML = puppy.name
                     pupSpan.addEventListener('click', function() {
                    showInfo(puppy)})
                    dogBarEl.append(pupSpan)
            }
            }
            

        })}
    )
}

renderPups()



window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let filterButton = document.querySelector('#good-dog-filter')
    filterButton.addEventListener('click', e => {
    filterGoodDogs(e)
});
});

function filterGoodDogs(e) {
    // debugger;
    if (e.target.innerHTML === "Filter good dogs: OFF") {
        e.target.innerHTML =  "Filter good dogs: ON"
        renderPups()
    } else { 
        e.target.innerHTML = "Filter good dogs: OFF"
        renderPups()}
}

