const pupsURL = "http://localhost:3000/pups"

const dogBar = document.querySelector('div#dog-bar')
const dogInfo = document.querySelector('div#dog-info')
const goodDogBtn = document.querySelector('button#good-dog-filter')


const getAllDogs = () => {
    fetch(pupsURL)
    .then(resp => resp.json())
    .then(parseDogs)
} 

const parseDogs = dogs => {
    dogs.forEach(addDog)
}

const addDog = dog => {
    const span = document.createElement('span')
    span.setAttribute('behaviour', `${dog.isGoodDog}`)
    span.innerText = `${dog.name}`
    span.addEventListener('click', e => displayDog(e, dog))
    dogBar.append(span)
}

const displayDog = (e, dog) => {
    dogInfo.innerHTML = `
    <img src='${dog.image}'> 
    <h2>${dog.name}</h2> 
    <button>${dog.isGoodDog === true ? "Good Dog!" : "Bad Dog!"}</button>
    `
    const behaviourButton = dogInfo.querySelector('button')
    behaviourButton.addEventListener('click', e => {dogBehaviourButtonEvent(e, dog, behaviourButton)})
}

const dogBehaviourButtonEvent = (e, dog, behaviourButton) => {
    let dogBehaviour = dog.isGoodDog
    if (dogBehaviour === true) {
        dogBehaviour = false
    } else {dogBehaviour = true}
    
    fetch(`${pupsURL}/${dog.id}`, {
        method: "PATCH",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({isGoodDog: dogBehaviour})
    }).then(resp => resp.json()).then(dog => {displayDog(e, dog)}).catch(error => alert(error.message))
}

goodDogBtn.addEventListener('click', event => filterGoodDogs())

const filterGoodDogs = () => {
    let dogs = dogBar.children
    dogsArr = [...dogs]

    if (event.target.innerText.includes('OFF')) {
        event.target.innerText = "Filter good dogs: ON"

        dogsArr.forEach(dog => {
            if (dog.attributes['behaviour'].value === 'true') {
                dogBar.append(dog)
            } else {
                dog.remove()
            }
        })
    } else {
        event.target.innerText = "Filter good dogs: OFF"
        dogBar.innerText = ''
        getAllDogs()
    }    
}

getAllDogs()
