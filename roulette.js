// array of outcome numbers 
const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
const green = [0];
const playButton = document.getElementsByClassName('btn btn-success btn-lg')[0];
const bank = document.getElementsByClassName('cashAmount');
const initalInputSection = document.querySelectorAll('.bank-section');
const betChoiceButtons = document.querySelectorAll('[data-bet-choice]');
const betAmountButtons = document.querySelectorAll('[data-bet-amount]');
const betSubmitButton = document.getElementById('bet-submit-button');
const resetButton = document.querySelector('[data-bet-reset]');
const betchoice = document.getElementById('bet-choice');
const betamount = document.getElementById('bet-amount');
const resultDisplay = document.getElementById('result-display');
const winStatus = document.getElementsByClassName('win-status');
const lowerContainer = document.getElementsByClassName('roulette-lower-container');
lowerContainer[0].style.display = "none";
let bet = 0;
let cash = 0;
let additional;
let current = 0;
let resultNum;

const rollBall = () => {
    resultNum = getRandomInt(0, 37)
}
// press play button to start
playButton.addEventListener("click", () => {
    cash = prompt('How much money would you like to change up?');
    bank[0].innerText = cash;
    playButton.style.display = "none";
    lowerContainer[0].style.display = "";
})

// click bet choice
betChoiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        betchoice.innerText = button.innerText;
    })
})

// bet amount buttons +25, +50
betAmountButtons.forEach(button => {
    button.addEventListener("click", () => {
        let current = parseInt(betamount.innerText)
        additional = parseInt(button.innerText.slice(1));
        betamount.innerText = current + additional; 
      })
    })

// bet amount RESET
resetButton.addEventListener("click", () => {
    betamount.innerText = "0"
})

// BET SUBMIT
betSubmitButton.addEventListener("click", () => {
    bank[0].innerText -= parseInt(betamount.innerText);
    if (betchoice.innerText != "none" && parseInt(betamount.innerText) > 0) {
        rollBall();
        setTimeout(printResult, 1000);
        //printResult();
        checkResult();
        setTimeout(incrementBank, 2500);
        youLose();} 
    else { alert('Please select a bet and a stake amount')};
})

const printResult = () => {
    resultDisplay.innerText = `${resultNum} ${checkWinColour()}`;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

const checkWinOdd = () => {
    if (resultNum == 0) {
        return 'Zero, house wins'
    } else if (resultNum % 2 == 0) {
        return 'Even'}
        else {return 'Odd'}
}

const checkWinColour = () => {
    if (green.includes(resultNum)) {
        return 'Green, house wins';
    } else if (red.includes(resultNum)) {
        return 'Red';}
        else {return 'Black';}
}

const checkResult = () => {
    let stake = parseInt(betamount.innerText);
    if (betchoice.innerText == "RED" && checkWinColour() == "Red") {
        return [`You win ${stake * 2} euros!`, true]} else if 
    (betchoice.innerText == "BLACK" && checkWinColour() == "Black") {
        return [`You win ${stake * 2} euros!`, true]} else if 
        (betchoice.innerText == "ODD" && checkWinOdd() == "Odd") {
            return [`You win ${stake * 2} euros!`, true]} else if 
            (betchoice.innerText == "EVEN" && checkWinOdd() == "Even") {
                return [`You win ${stake * 2} euros!`, true]} else {
                    return ["LOST!", false]
                };
            } 
const incrementBank = () => {
    if (checkResult()[1] == true) {
        bank[0].innerText = (parseInt(bank[0].innerText) + (parseInt(betamount.innerText)) * 2);
        winStatus[0].innerText = 'WIN!'
    } else { winStatus[0].innerText = 'LOSE!'};
}

const youLose = () => {
    if (parseInt(bank[0].innerText) < 1) 
    {let playAgain = confirm(`YOU LOSE!!!! Play Again?`);
    if (playAgain) {location.reload();};
}}
// 

// switch(checkResult) {
//     case betchoice == "Red" && checkWinColour() == "Red":
//         return `You win ${bet * 2} euros!`
//         break;
//     case betchoice == "Black" && checkWinColour() == "Black":
//         return `You win ${bet * 2} euros!`
//         break;
//     case betchoice == "Odd" && checkWinOdd() == "Odd":
//         return `You win ${bet * 2} euros!`
//         break;
//     case betchoice == "Even" && checkWinOdd() == "Even":
//         return `You win ${bet * 2} euros!`
//         break;
//         default:
//         return "LOST!";
// }

