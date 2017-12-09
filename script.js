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
		if (this.id !== "=" && this.id !== "C" && this.id !== "CE"){
			if (lastInputType === 'number'){
				if (currInput.indexOf(".") === -1){
					lastNumInput = parseInt(currInput);
				}
				else if (currInput.indexOf(".") > -1){
					lastNumInput = parseFloat(currInput);
				}
				calcArr.push(lastNumInput);
				currInput = "";
				$('#answer').html(this.id);
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
				$('#answer').html(currInput);
				lastInputType = 'operator';
			}
		}

		else if (this.id === "=" && lastInputType !== ''){
			if (currInput.indexOf(".") === -1){
				lastNumInput = parseInt(currInput);
			}
			else if (currInput.indexOf(".") > -1){
				lastNumInput = parseFloat(currInput);
			}
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
			// $('#currInput').html(currInput);

		}
		else if (this.id === "AC"){
			if (lastInputType === 'number'){
				$('#answer').html("0");
				currInput = "";
			}
		}
	}

	//check for numbtn
	if ($(this).hasClass('numBtn')){
		if (this.id !== "."){
			if (lastInputType === 'operator'){
				calcArr.push(lastOperatorInput);
			}
			currInput += this.id;
			$('#answer').html(currInput);
			lastInputType = 'number';
		}

		else if (this.id === "."){
			if (checkDecimal()){
				if (currInput === ""){
					currInput += "0";
				}
				currInput += ".";
				$('#answer').html(currInput);
				lastInputType = 'number';
			}
		}
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
			return;
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
	if (currInput.indexOf(".") !== -1){
		return false;
	}
	return true;
}