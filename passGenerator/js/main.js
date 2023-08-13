const input = document.querySelector('.app__input');
const btnStart = document.querySelector('.app__btn');
const btnCopy = document.querySelector('.app__btn-copy');
let length = 12;

function generatePassword(){
	let password = '';

	const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const symbols = '!@#$%^&*?';
	const allSymbols = upperLetters + lowerLetters + numbers + symbols;

	password+= upperLetters[Math.floor(Math.random() * upperLetters.length)];
	password+= lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
	password+= numbers[Math.floor(Math.random() * numbers.length)];
	password+= symbols[Math.floor(Math.random() * symbols.length)];

	while(password.length < length) {
		password+= allSymbols[Math.floor(Math.random() * allSymbols.length)];
	}

	input.value = password;
}

function copyInput() {
	input.select();
	document.execCommand('copy');
}

btnStart.addEventListener('click', generatePassword);
btnCopy.addEventListener('click', copyInput);