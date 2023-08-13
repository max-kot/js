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



let modalBox = document.createElement('div');
modalBox.classList.add('modal-box');
modalBox.classList.add('hide');
document.body.appendChild(modalBox);
modalBox.innerHTML = 'Password copied';

function copyInput() {
	input.select();
	document.execCommand('copy');

	modalBox.classList.remove('hide');
	setTimeout(function() {
		modalBox.classList.add('hide');
	}, 1500)
}

btnStart.addEventListener('click', generatePassword);
btnCopy.addEventListener('click', copyInput);