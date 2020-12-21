if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    //let cards = Array.from(document.getElementsByClassName('card'));
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let timerText = document.getElementById("hp-remaining");
    
    
    function gameOver(){
        const gameOver = document.getElementById("game-over-text");
        gameOver.classList.add("visible");  
    }
    
    let count = 100;
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            setInterval(() => {
            if (count === 0) return;
            count -= 1;
            timerText.textContent = count;
                if (count === 0)
                    gameOver();
            }, 1000);
        }); 
    });
}



let cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = [];
let i;

function flipCard(){
    if(lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add("flip");
    
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;   
        return;  
    } 
     secondCard = this;
    
    matchedCards.push(firstCard);    
    matchedCards.push(secondCard);
    
    if (matchedCards.length === cards.length)
        victory();          
    
    checkForMatch();
}


function victory(){
    const victory = document.getElementById("victory-text");
    victory.classList.add("visible");
}



function checkForMatch() {
    let isMatch = firstCard.dataset.hero ===
    secondCard.dataset.hero;
    isMatch ? disableCards() : unflipCards()
    
}


function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
}


function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove ("flip");
        secondCard.classList.remove ("flip");
        resetBoard();
    }, 1500);
}


function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();*/

cards.forEach(card => card.addEventListener("click", flipCard));