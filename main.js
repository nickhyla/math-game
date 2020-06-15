var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

document.querySelector('.startReset').onclick = function(){
    // if playing, refresh the page on click
    if(playing == true){
        location.reload();
    // if not playing, set playing to true and set up the game
    } else {
        playing = true;
        score = 0;
        timeRemaining = 60;
        changeHTML('.scoreValue', score);
        show('.timer');
        changeHTML('.timerValue', timeRemaining);
        changeHTML('.startReset', 'Reset Game');
        hide('.gameOver');

        // start the timer countdown
        startCountdown();

        // get a question
        generateQA();
    }

}

// start the countdown
function startCountdown(){
    // causes the function to run every second
    action = setInterval(function(){
        timeRemaining--;
        changeHTML('.timerValue', timeRemaining);
        
        // when the game ends
        if(timeRemaining == 0){
            stopCountdown();
            show('.gameOver');
            changeHTML('.gameOver', `<p>Game Over!</p><p>Your score is ${score}</p>`);
            hide('.timer');
            hide('.correct');
            hide('.wrong');
            playing = false;
            changeHTML('.startReset', 'Start Game');
        }
    }, 1000);
}

// stop the counter
function stopCountdown(){
    clearInterval(action);
}

// set the innerHTML of a class with name equal to a value
function changeHTML(name, value){
    document.querySelector(name).innerHTML = value;
}

// hide elements
function hide(name){
    document.querySelector(name).style.display = 'none'
}

// show elements
function show(name){
    document.querySelector(name).style.display = 'block'
}

// generate a question and answers
function generateQA(){
    // get 2 numbers between 1 and 10
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());

    // place the numbers into the question box, and save the product
    correctAnswer = x*y;
    changeHTML('.question', `${x} x ${y}`);

    // generate a number between 1 and 4
    var correctPostion = 1 + Math.round(3*Math.random());

    // fill the random box with the correct answer
    document.querySelector('.box' + correctPostion).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    for(i = 1; i < 5; i++){
        if(i != correctPostion) {
            var wrongAnswer;

            // generate a wrong answer, and make sure it is not a duplicate
            do {
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
             // if the number has an index, it is already in the array, and a new number is selected
            }while (answers.indexOf(wrongAnswer) > -1)
           
            // place the answer into a box
            document.querySelector('.box' + i).innerHTML = wrongAnswer;

            // add the value to the array
            answers.push(wrongAnswer);
        }
    }

}


document.querySelectorAll('.box').forEach(function(event){
    event.onclick = function(){
        if(this.innerHTML == correctAnswer){
            score++;
            changeHTML('.scoreValue', score);
            hide('.wrong');
            show('.correct');
            setTimeout(function(){
                hide('.correct');
            }, 1500);
            generateQA();
        } else {
            hide('.correct');
            show('.wrong');
            setTimeout(function(){
                hide('.wrong');
            }, 1500);
        }
    } 
});


