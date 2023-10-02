const inputEl = document.querySelector('.app__input');
const btnEl = document.querySelector('.app__btn');
const resultEl = document.querySelector('.app__result');

function getDaysInMonth(year, month) {
	return new Date(year, month, 0).getDate();
}
// ограничиваем по сегоднешней дате
inputEl.max = new Date().toISOString().split('T')[0]

btnEl.addEventListener('click', function() {
	// BIRTHDATE
	const birthDate = new Date(inputEl.value);

	const birthDay = birthDate.getDate();
	const birthMonth = birthDate.getMonth() + 1;
	const birthYear = birthDate.getFullYear();

	// CURRENTDATE
	const currentDate = new Date();

	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	// DIFFERNCE
	let differenceDay, differenceMonth, differenceYear;
	differenceYear = currentYear - birthYear;

	if (currentMonth >= birthMonth) {
		// если текущий месяц больше месяца рождения
		differenceMonth = currentMonth - birthMonth;
	} else {
		// если текущий месяц меньше месяца рождения
		differenceYear--;
		differenceMonth = 12 + currentMonth - birthMonth;
	}

	if (currentDay >= birthDay) {
		differenceDay = currentDay - birthDay;
	} else {
		differenceMonth--;
		differenceDay = getDaysInMonth(birthYear, birthMonth) + currentDay - birthDay;
	}

	if (differenceMonth < 0){
		differenceMonth = 11
		differenceYear--;	
	}
	resultEl.innerHTML = `You are <span>${differenceYear}</span> years, <span>${differenceMonth}</span> months and <span>${differenceDay}</span> days old.`;
})