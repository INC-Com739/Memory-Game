'use strict';
const cardArray = [
    { name: 'card1', img: 'images/img1.png' },
    { name: 'card2', img: 'images/img2.png' },
    { name: 'card3', img: 'images/img3.png' },
    { name: 'card4', img: 'images/img4.png' },
    { name: 'card5', img: 'images/img5.png' },
    { name: 'card6', img: 'images/img6.png' },
    { name: 'card7', img: 'images/img7.png' },
    { name: 'card8', img: 'images/img8.png' }
];

let cardChosen = [];
let cardChosenId = [];
let cardsWon = [];

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    cardArray.sort(() => 0.5 - Math.random());
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    const selectedCard = this;
    const cardId = selectedCard.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenId.push(cardId);
    selectedCard.classList.add('flipped');
    selectedCard.style.backgroundImage = `url(${cardArray[cardId].img})`;
    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardChosenId;
    if (firstCardId === secondCardId) {
        alert("You clicked the same image!");
        cards[firstCardId].classList.remove('flipped');
        cards[firstCardId].style.backgroundImage = '';
    } else if (cardChosen[0] === cardChosen[1]) {
        alert("You found a match!");
        cards[firstCardId].classList.add('matched');
        cards[secondCardId].classList.add('matched');
        cards[firstCardId].removeEventListener('click', flipCard);
        cards[secondCardId].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
    } else {
        alert("Sorry, try again!");
        cards[firstCardId].classList.remove('flipped');
        cards[firstCardId].style.backgroundImage = '';
        cards[secondCardId].classList.remove('flipped');
        cards[secondCardId].style.backgroundImage = '';
    }
    cardChosen = [];
    cardChosenId = [];
    if (cardsWon.length === cardArray.length / 2) {
        alert("Congratulations! You've found all the matches!");
    }
}

document.getElementById('restartButton').addEventListener('click', () => {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cardChosen = [];
    cardChosenId = [];
    cardsWon = [];
    createBoard();
});

createBoard();
