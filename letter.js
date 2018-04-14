var lettersToDisplay = function(word, goodGuesses){

	this.gameWord = word;
	this.lettersInWord = goodGuesses;
	this.displayText = '';
	this.winner = false;
	this.parseDisplay = function(){
		var shown = '';

		if(this.lettersInWord == undefined){
			for(var i = 0; i < this.gameWord.length; i++){
				shown += ' _ ';
			}
		} else {
			for(var i = 0; i < this.gameWord.length; i++){

				var letterWasFound = false;

				for(var j = 0; j < this.lettersInWord.length; j++){

					if(this.gameWord[i] == this.lettersInWord[j]){
						shown += this.lettersInWord[j];
						letterWasFound = true;
					}
				}

				if(!letterWasFound){
					shown += ' _ ';
				}
			}
		}

		this.displayText = shown.trim();
		console.log(this.displayText);

		if(this.displayText == this.gameWord){
			this.winner = true;
		}

	}
};

module.exports = lettersToDisplay;
