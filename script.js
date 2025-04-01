const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 0;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let topScore = 1000;

const randNames = [
  "SirLaughsALot",
  "404NotFoundYou",
  "ChewbaccaSnacc",
  "PickleOverlord",
  "TacoNinja42",
  "SoggyNacho",
  "DramaLlamaDingDong",
  "UnicornOnDuty",
  "CtrlAltDelicious",
  "KeyboardWarrior69",
  "SpaghettiYeti",
  "CaptainCrunchWrap",
  "MemeQueenBee",
  "NotYourAverageJoe",
  "TofuTornado",
  "BurritoBandito",
  "QuackAttackJack",
  "SirSnortsALot",
  "PajamaPanda",
  "MooseOnTheLoose",
  "PenguinInDisguise",
  "NachoMama",
  "ChickNuggetWizard",
  "GiggleGoblin",
  "FunkyMonkey77",
  "WaffleOverlord",
  "NoChillPickle",
  "BananaPhoneBuzz",
  "CerealKiller007",
  "DonutDisturber"
];

function initTimer() {
    if(timeLeft >= 10000000) {
        return clearInterval(timer);
    }
    timeLeft++;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft >= 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }

}

const wrapper = document.getElementById('wrapper');

document.addEventListener('keydown', function(event) {
    function jump() {
        if (!wrapper.classList.contains('jump')) {
            wrapper.classList.add('jump');
        }

        setTimeout(() =>  {
            wrapper.classList.remove('jump');
        }, 360);
    }

    if (event.code === 'spacebar' || event.key === ' ') {
        event.preventDefault();
        jump();
    }
})

const victorySound = document.getElementById('victorySound');


function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;

        if(matchedCard == 6) {
            setTimeout(function() {
                alert("Congrats, " + userInput + " You finished in " + timeLeft + " seconds and " + flips + " flips! 🎉 but you still need to read a history book");
            }, 500);
            victorySound.play().catch((error) => {
                console.warn('Sound failed to play:', error)
            });
            setTopScore();
        }

        if(matchedCard == 6 && timeLeft > 0) {
            return clearInterval(timer);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);


        cardOne = cardTwo = "";
        return disableDeck = false;

    }



    setTimeout(() => {
        alert("Go read a history book");
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);



    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);


}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

let randomName = randNames[Math.floor(Math.random() * randNames.length)];
console.log("Your new username:", randomName);

function name() {
    userInput = prompt("What's your name?");
    if (userInput === null) {
        userInput = randomName;
    } else if (!userInput) {
            userInput = randomName;
        }
    
    document.getElementById("userName").innerHTML = userInput;
    alert("Hope you enjoy the game, " + userInput +"!");
} 


setTimeout(function() {
    window.onLoad = name();
}, 500);


// Top score
function setTopScore() {
    if (timeLeft <= topScore) {
        topScore = timeLeft;
    }
    document.getElementById("topScore").innerHTML = topScore;
    setTimeout(function() {
        
    }, 1000);
}

const mainArea = document.getElementById('mainArea');


document.addEventListener('keydown', function(event) {
    if (event.key === 'e') {
    rainbow();
    }

    function rainbow() {
        if (mainArea.classList.contains('rainbow')) {
            mainArea.classList.remove('rainbow');
        } else {
            mainArea.classList.add('rainbow')
        }
    };
});












