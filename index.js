initPage()

function initPage(){
    initStartButton()
    bindClickToCards()

    //todo: remove
    initAddCardButton()
    initRemoveCardButton()
}

function initStartButton(){
    const startButton = document.getElementById("start-button")
    startButton.addEventListener('click', ()=>{
        removeStartBox()
        showGameBox()
    })
}

function removeStartBox(){
    //document.getElementById("start-box").style.display = "none"
    document.getElementById("start-box").classList.add("slid-up")
    document.getElementById("start-box").classList.add("vanished")
}

function showGameBox(){
    document.getElementById("game-box").classList.remove("slid-down")
    document.getElementById("game-box").classList.remove("vanished")
}

function bindClickToCards(){
    let containers = document.getElementsByClassName("card-container")
    let discard = document.getElementById("discard-container")
    
    for (var i = 0; i < containers.length; i++) {
        let elem = containers[i]

        // Arrow creates a closure of all vars used in it
        elem.addEventListener('click', ()=>{
            let newelem = elem.cloneNode(true)
            discard.replaceChildren()
            discard.appendChild(newelem)
        })
    }    

    // ALL THE BELOW STUFF
    // Adds the listener to newly created cards.
    // Might not be necessary, or maybe should replace the above.

    // Options for the observer (which mutations to observe)
    const config = {
        attributes: false,
        childList: true,
        subtree: false
    }

    const callback = function addEventToCardContainer(mutations, observer) {
        for(let mutation of mutations) {
            for(let i = 0; i < mutation.addedNodes.length; i++){
                if(mutation.addedNodes[i].classList.contains('card-container')){
                    console.log(i)
                }   
            }
        }
    }

    const playerHandObserver = new MutationObserver(callback)
    playerHandObserver.observe(document.getElementById("player-hand"), config)

    // Add listener to "player-hand" for dynamic elements
    // document.getElementById("player-hand").addEventListener('DOMNodeInserted', (event) => {
    //     if (event.target.classList.contains("card-container")) {
    //         let elem = event.target
    //         elem.addEventListener('click', ()=>{
    //             let newelem = elem.cloneNode(true)
    //             discard.replaceChildren()
    //             discard.appendChild(newelem)
    //         })
    //     }
    // })
}

function initAddCardButton(){
    const button = document.getElementById("add-card-button")
    button.addEventListener('click', ()=>{
        const containers = document.getElementsByClassName("card-container")
        const elem = containers[0]
        const hand = document.getElementById("player-hand")
        const newelem = elem.cloneNode(true)
        hand.appendChild(newelem)
    })
}

function initRemoveCardButton(){
    const button = document.getElementById("remove-last-card-button")
    button.addEventListener('click', ()=>{
        const hand = document.getElementById("player-hand")
        hand.removeChild(hand.lastChild)
    })
}