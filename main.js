var inquirer = require('inquirer');
var guessWordList = require('./game.js');
var checkForLetter = require('./word.js');
var lettersToDisplay = require('./letter.js');

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
								'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];      
var displayHangman;

var game = {

	wordBank : guessWordList,
	currentWrd : null,
	guessesRemaining : 10,


	startGame : function(){
		this.guessesRemaining = 10;

		var j = Math.floor(Math.random() * this.wordBank.length);
		this.currentWrd = this.wordBank[j];

		console.log('Eyyyy, guess the word!');
		console.log('Hint: types of fruit')

		displayHangman = new lettersToDisplay(this.currentWrd);
		displayHangman.parseDisplay();
		console.log('Guesses Left: ' + game.guessesRemaining);

		userPrompt();
	}

};

function userPrompt(){

	console.log('');

	if(game.guessesRemaining > 0){
		inquirer.prompt([
			{
				type: "value",
				name: "letter",
				message: "Guess a Letter: "
			}
		]).then(function(userInput){

			var inputLetter = userInput.letter.toLowerCase();
			
			if(alphabet.indexOf(inputLetter) == -1){

				console.log(inputLetter + ' is not a letter. Try again!');
				console.log('Guesses Left: ' + game.guessesRemaining);
				console.log('Letters already guessed: ' + lettersAlreadyGuessed);
				userPrompt();

			} else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

				console.log('You already guessed "' + inputLetter + '". Try again!');
				console.log('Guesses Left: ' + game.guessesRemaining);
				console.log('Letters already guessed: ' + lettersAlreadyGuessed);
				userPrompt();

			} else {

				lettersAlreadyGuessed.push(inputLetter);

				var letterInWord = checkForLetter(inputLetter, game.currentWrd);

				if(letterInWord){

					lettersCorrectlyGuessed.push(inputLetter);

					displayHangman = new lettersToDisplay(game.currentWrd, lettersCorrectlyGuessed);
					displayHangman.parseDisplay();

					if(displayHangman.winner){
						console.log('You win!')
						return;
					} else {
						console.log('Guesses Left: ' + game.guessesRemaining);
						console.log('Letters already guessed: ' + lettersAlreadyGuessed);
						userPrompt();
					}

				} else {
					game.guessesRemaining--;

					displayHangman.parseDisplay();
					console.log('Guesses Left: ' + game.guessesRemaining);
					console.log('Letters already guessed: ' + lettersAlreadyGuessed);
					userPrompt();
				}
			}
		});
		
	} else {
		console.log('No more guesses left.  The word was "' + game.currentWrd + '".');
		console.log('Try again!');
	}

}

game.startGame();