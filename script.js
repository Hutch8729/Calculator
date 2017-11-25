var calcArr = [];
var answer = 0;
var lastInput = "";
var a = 0;
var b = 0;
var c = "";

$('#btns').on('click', '.btn', this.id, function(){
	console.log(this.id);
	if ($(this).hasClass('modsBtn')){
		calcArr.push(parseInt(lastInput));
		lastInput = "";
		$('#array').html(calcArr);
		calculate();
		calcArr.push(this.id);
		$('#array').html(calcArr);
	}

	if ($(this).hasClass('numBtn')){
		lastInput += this.id;
		$('#lastNum').html(lastInput);
	}
});


function mod(val, type){
	if (type === "*"){
		return answer * val;
	}

	else if (type === "/"){
		return answer / val;
	}

	else if (type === "+"){
		return answer + val;
	}

	else if (type === "-"){
		return answer - val;
	}

	else{
		return answer;
	}
}

function calculate(){
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