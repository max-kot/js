
const quiz = [
	{
		question: 'Какими бандитами называли себя Гарри и Марв в фильме «Один дома»?',
		image: 'homealone',
		answers: [
			{
				answer: 'Мелкими',
				correct: false,
			},
			{
				answer: 'Грязными',
				correct: false,
			},
			{
				answer: 'Мокрыми',
				correct: true,
			},
			{
				answer: 'Хитрыми',
				correct: false,
			},
		]
	},
	{
		question: 'Какого фильма нет в кинотрилогии «Властелин колец»?',
		image: 'lordoftherings',
		answers: [
			{
				answer: 'Две крепости',
				correct: false,
			},
			{
				answer: 'Битва пяти воинств',
				correct: true,
			},
			{
				answer: 'Братство кольца',
				correct: false,
			},
			{
				answer: 'Возвращение короля',
				correct: false,
			},
		]
	},
	{
		question: 'Что на самом деле представляет из себя легендарный зеленый код из «Матрицы»?',
		image: 'matrix',
		answers: [

			{
				answer: 'Рецепт суши',
				correct: true,
			},
			{
				answer: 'Рецепт пельменей',
				correct: false,
			},
			{
				answer: 'Рецепт жаркого',
				correct: false,
			},
			{
				answer: 'Рецепт Пад Тая',
				correct: false,
			},
		]
	},
	{
		question: 'В какую страну отправился Форрест Гамп в составе сборной США по настольному теннису?',
		image: 'forestgump',
		answers: [
			{
				answer: 'Во Вьетнам',
				correct: false,
			},
			{
				answer: 'В Швецию',
				correct: false,
			},
			{
				answer: 'В Китай',
				correct: true,
			},
			{
				answer: 'Во Францию',
				correct: false,
			},
		]
	},
	{
		question: 'Как называется вымышленная страна, где происходит действие в «Холодном сердце»?',
		image: 'frozen',
		answers: [
			{
				answer: 'Неаполь',
				correct: false,
			},
			{
				answer: 'Неверлэнд',
				correct: false,
			},
			{
				answer: 'Гримм',
				correct: false,
			},
			{
				answer: 'Эренделл',
				correct: true,
			},
		]
	},
];

const question = document.querySelector('.quiz__question');
const image = document.querySelector('.quiz__image-box');
const btnNext = document.querySelector('.quiz__btn-next');
const quizList = document.querySelector('.quiz__answers-list')
const allAnswers = document.querySelectorAll('.answer__btn');
const quizCounter = document.querySelector('.app__counter');
const quizDots = document.querySelector('.quiz__dots');

function showQuiz() {
	// выводим вопрос и фото
	question.innerHTML = quiz[index].question;
	image.innerHTML = `
	<picture>
		<source srcset="./images/${quiz[index].image}.avif" type="image/avif">
		<source srcset="./images/${quiz[index].image}.webp" type="image/webp">
		<img src="./images/${quiz[index].image}.jpg" alt="${quiz[index].question}">
	</picture>`;
	quizCounter.innerHTML = `${index + 1} / ${quiz.length}`;

	// выводим ответы
	for (let answerId = 0; answerId < quiz[index].answers.length; answerId++) {
		allAnswers[answerId].innerHTML = quiz[index].answers[answerId].answer;

		// запоминаем правильный ответ
		if (quiz[index].answers[answerId].correct === true) {
			correctAnswer = quiz[index].answers[answerId].answer;
		}
	}
}

// нажатие на кнопку ответа
allAnswers.forEach(function (answer) {
	answer.addEventListener('click', function (e) {
		// показываем кнопку
		btnNext.innerHTML = 'Next';
		btnNext.classList.remove('hide');

		// блокируем все ответы
		allAnswers.forEach(function (answer) {
			answer.disabled = true;
		})

		const allDots = document.querySelectorAll('.quiz__dots > *');

		if (e.target.innerHTML === correctAnswer) {
			e.target.classList.add('correct');
			score++;
			allDots[index].classList.add('correct');
		} else {
			e.target.classList.add('incorrect');
			allDots[index].classList.add('incorrect');
		}
	})
})


function resetAnswers() {
	allAnswers.forEach(function (answer) {
		answer.classList.remove('correct');
		answer.classList.remove('incorrect');
		answer.disabled = false;
	});
}

function removeDots() {
	document.querySelectorAll('.quiz__dots > *').forEach(function (dot) {
		dot.remove()
	})
}

function startQuiz() {
	index = 0;
	score = 0;
	correctAnswer = '';

	btnNext.innerHTML = '';
	btnNext.classList.add('hide');
	btnNext.removeEventListener('click', startQuiz);

	image.classList.remove('hide');
	quizList.classList.remove('hide');
	for (let i = 0; i < quiz.length; i++) {
		let dot = document.createElement('div');
		quizDots.appendChild(dot);
	}
	resetAnswers();
	showQuiz();
}

btnNext.addEventListener('click', function (e) {
	if (index < quiz.length - 1) {
		index++;
		// скрывае кнопку Next
		btnNext.classList.add('hide')
		resetAnswers(); //? может перенести в showQuiz()
		showQuiz();
	} else {
		question.innerHTML = `Congratulation! Your score is ${score} from ${quiz.length}`;
		image.classList.add('hide');
		quizList.classList.add('hide');
		btnNext.innerHTML = 'Try again';
		btnNext.addEventListener('click', startQuiz);

		removeDots();
	}

})

startQuiz();



