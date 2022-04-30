const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');


startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

let buttonIntervalId = null;

function onStartButtonClick() {
    
    buttonIntervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
 
    startButton.disabled = true;
    stopButton.disabled = false;
}

function onStopButtonClick() {
    clearInterval(buttonIntervalId);

    startButton.disabled = false;
    stopButton.disabled = true;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}