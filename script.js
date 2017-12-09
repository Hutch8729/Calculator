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
				lastNumInput = parseInt(currInput);
				calcArr.push(lastNumInput);
				currInput = "";
				$('#currInput').html(this.id);
				lastInputType = 'operator';
				if (lastOperatorInput !== ""){
					answer = mod(lastNumInput, lastOperatorInput);
				}
				else{
					answer = lastNumInput;
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
			lastNumInput = parseInt(currInput);
			calcArr.push(lastNumInput);
			calcArr.push("=");
			currInput = "";
			answer = mod(lastNumInput, lastOperatorInput);
			calcArr.push(answer);
			$('#answer').html(answer);
			lastOperatorInput = "";
			lastInputType = "operator";
		}

		else if (this.id === "CE"){
			calcArr = [];
			answer = 0;
			lastInputType = "";
			lastNumInput = 0;
			lastOperatorInput = "";
			currInput = "";
			$('#answer').html(answer);
			$('#currInput').html(currInput);

		}
		else if (this.id === "AC"){
			if (lastInputType === 'operator'){
				
			}
		}
	}

	//check for numbtn
	if ($(this).hasClass('numBtn')){
		if (lastInputType === 'operator'){
			calcArr.push(lastOperatorInput);
		}
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

function checkDecimal(){
	//check for multiple decimals && first character decimal add leading 0
}