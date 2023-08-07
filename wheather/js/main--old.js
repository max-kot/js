
const apiKey = 'd7e188fa46064590ba172934230308';

const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const main = document.querySelector('.main');
const header = document.querySelector('.header');

const getIcon = (text) => {
	let array = text.split(' ');
	text = array[array.length - 1].toLowerCase();

	if (text === 'sunny' || text === 'clear') {
		return 'sunny';
	}

	if (text === 'rain' || text === 'shower') {
		return 'rain';
	}

	if (text === 'cloudy' || text === 'overcast') {
		return 'cloudy';
	}

	if (text === 'thunder') {
		return 'thunder';
	}

	return 'thermometer';
}

const getTime = (time) => {
	let array = time.split(' ');
	time = array[array.length - 1];
	return time;
}

const removeCards = (cardParent) => {
	if (cardParent) {
		const cards = cardParent.children;
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];
			card.remove();
		}
	}
}

const showCard = (parent, data) => {
	const html = `<div class="container">
	<article class="card">
		<div class="card__body">
			<header class="card__header">
				<h2 class="card__city">
					${data.location.name} <span class="card__country">${data.location.country}</span>
				</h2>
			</header>
			<main class="card__main">
				<div class="card__icon-box">
					<div class="card__icon">
						<img src="./images/${data.current.is_day ? 'day' : 'night'}/${getIcon(data.current.condition.text)}.png" alt="${data.current.condition
			.text}">
					</div>
					<p class="card__icon-text">${data.current.condition
			.text}</p>
				</div>
				<div class="card__temp-box">
					<p class="card__time">Сейчас ${getTime(data.location.localtime)}</p>
					<p class="card__temp">${Math.floor(data.current.temp_c)}°C</p>
				</div>
			</main>
			<ul class="card__addition-list addition">
				<li class="addition__item">
					<p class="addition__text">
						По ощущению
					</p>
					<p class="addition__value">
						${Math.floor(data.current.feelslike_c)}°C
					</p>
				</li>
				<li class="addition__item">
					<p class="addition__text">
						Влажность
					</p>
					<p class="addition__value">
					${data.current.humidity} %
					</p>
				</li>
				<li class="addition__item">
					<p class="addition__text">
						Давление
					</p>
					<p class="addition__value">
					${data.current.pressure_mb} mb
					</p>
				</li>
			</ul>
		</div>
	</article>
	</div>`;

	parent.insertAdjacentHTML("afterbegin", html);
}

const showErrorCard = (parent, data) => {
	const html = `<div class="container">
	<article class="card">
		<div class="card__body">
			<h2 class="card__city">
				${data}
			</h2>
		</div>
	</article>
	</div>`;
	parent.insertAdjacentHTML("afterbegin", html);
}

form.addEventListener('submit', (e) => {
	// отменяем отправку формы
	e.preventDefault();

	// помещяем значение инпута и обрезаем пробелы
	const city = input.value.trim();

	header.classList.remove('active');
	// делаем запрос на сервер
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data)

			// проврка на ошибку 

			if (!data.error) {
				// Удаляем все дочерние элементы
				removeCards(main)
				// Выводим новую карточку
				showCard(main, data);
			} else {
				// Удаляем все дочерние элементы
				removeCards(main)
				// Выводим новую карточку
				showErrorCard(main, data.error.message);

			}
		})
})



