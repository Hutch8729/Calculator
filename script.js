var calcArr = [];
var answer = 0;
var lastInputType = "";
var lastNumInput = 0;
var lastOperatorInput = "";
var currInput = "";

$('#btns').on('click', '.btn', this.id, function(){
	console.log(this.id);
	console.log("current answer " + answer);

	//check for button is mod
	if ($(this).hasClass('modsBtn')){
		//check not . || ce || c
		if (this.id !== "." && this.id !== "=" && this.id !== "C" && this.id !== "CE"){
			if (lastInputType === 'number'){
				lastNumInput = currInput;
				calcArr.push(lastNumInput);
				currInput = "";
				$('#currInput').html(this.id);
				lastInputType = 'operator';
				if (lastOperatorInput !== ""){
					answer = mod(lastNumInput, lastOperatorInput);
				}
				lastOperatorInput = this.id;
			}

			else if (lastInputType === 'operator'){
				console.log("i'm here");
				lastOperatorInput = this.id;
				$('#currInput').html(currInput);
				lastInputType = 'operator';
			}
		}

		else if (this.id === "=" && lastInputType !== ''){
			answer = mod(lastNumInput, lastOperatorInput);
			$('#answer').html(answer);
			lastOperatorInput = "";
			lastInputType = "operator";
		}
	}

	//check for numbtn
	if ($(this).hasClass('numBtn')){
		currInput += this.id;
		$('#currInput').html(currInput);
		lastInputType = 'number';
	}

	//update fullEQ on every button press
	$("#fullEq").html(calcArr.join(" "));
});


function mod(val, type){
	console.log(answer + " " + type + " " + val);
	if (type === "*"){
		return answer * val;
	}

	else if (type === "/"){
		if (val === 0){
			$('#answer').html("undefined");
			return 0;
		}
		return answer / val;
	}

	else if (type === "+"){
		return answer + val;
	}

	else if (type === "-"){
		return answer - val;
	}
}

function calculate(){
	if (typeof lastInput)
	for (i = 0; i < calcArr.length; i++){
		if (i === 0){
			answer += calcArr[i];
			$('#answer').html(answer);
		}
		if (typeof calcArr[i] === 'number' && i !== 0){
			answer = mod(calcArr[i], calcArr[i - 1]);
		}
	}
}

function checkDecimal(){
	//check for multiple decimals && first character decimal add leading 0
}