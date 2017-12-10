var calcArr = [];
var answer = 0;
var lastInputType = "";
var lastNumInput = 0;
var lastOperatorInput = "";
var currInput = "";

$('#btns').on('click', '.btn', this.id, function(){
	//check for button is mod
	if ($(this).hasClass('modsBtn')){
		//check not . || ce || c
		if (this.id !== "=" && this.id !== "AC" && this.id !== "CE"){
			if (lastInputType === 'number'){
				if (currInput.indexOf(".") === -1){
					lastNumInput = parseInt(currInput);
				}
				else if (currInput.indexOf(".") > -1){
					lastNumInput = parseFloat(currInput);
				}
				calcArr.push(lastNumInput);
				currInput = "";
				$('#answer').text(this.id);
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
				lastOperatorInput = this.id;
				$('#answer').text(lastOperatorInput);
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
			$('#answer').text(answer);
			lastOperatorInput = "";
			lastInputType = "operator";
		}

		else if (this.id === "CE"){
			calcArr = [];
			answer = 0;
			lastInputType = "operator";
			lastNumInput = 0;
			lastOperatorInput = "";
			currInput = "";
			$('#answer').text(answer);

		}
		else if (this.id === "AC"){
			if (lastInputType === 'number'){
				$('#answer').text("0");
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
			$('#answer').text(currInput);
			lastInputType = 'number';
		}

		else if (this.id === "."){
			if (checkDecimal()){
				if (currInput === ""){
					currInput += "0";
				}
				currInput += ".";
				$('#answer').text(currInput);
				lastInputType = 'number';
			}
		}
	}

	//update fullEQ on every button press
	$("#fullEq").text(calcArr.join(" "));
});


function mod(val, type){
	if (type === "*"){
		return answer * val;
	}

	else if (type === "/"){
		if (val === 0){
			$('#answer').text("undefined");
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