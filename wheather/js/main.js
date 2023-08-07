
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
	const { 
		name,
		country,
		isDay,
		condition,
		time,
		temp,
		feelslike,
		humidity,
		pressure
	} = data;

	const html = `<div class="container">
	<article class="card">
		<div class="card__body">
			<header class="card__header">
				<h2 class="card__city">
					${name} <span class="card__country">${country}</span>
				</h2>
			</header>
			<main class="card__main">
				<div class="card__icon-box">
					<div class="card__icon">
					<picture>
						<source srcset="./images/${isDay ? 'day' : 'night'}/${getIcon(condition)}.avif" type="image/avif">
						<source srcset="./images/${isDay ? 'day' : 'night'}/${getIcon(condition)}.webp" type="image/webp">
						<img src="./images/${isDay ? 'day' : 'night'}/${getIcon(condition)}.png" alt="${condition}">
					</picture>
					</div>
					<p class="card__icon-text">${condition}</p>
				</div>
				<div class="card__temp-box">
					<p class="card__time">Сейчас ${getTime(time)}</p>
					<p class="card__temp">${Math.floor(temp)}°C</p>
				</div>
			</main>
			<ul class="card__addition-list addition">
				<li class="addition__item">
					<p class="addition__text">
						По ощущению
					</p>
					<p class="addition__value">
						${Math.floor(feelslike)}°C
					</p>
				</li>
				<li class="addition__item">
					<p class="addition__text">
						Влажность
					</p>
					<p class="addition__value">
					${humidity} %
					</p>
				</li>
				<li class="addition__item">
					<p class="addition__text">
						Давление
					</p>
					<p class="addition__value">
					${pressure} mb
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
			<h2 class="card__city" style="text-align: center;">
				${data}
			</h2>
		</div>
	</article>
	</div>`;
	parent.insertAdjacentHTML("afterbegin", html);
}

// определяем язык браузера
let userLang = navigator.language || navigator.userLanguage; 
userLang = userLang.substr(0, 2).toLowerCase();

async function getWeather(url) {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	return data;
}

form.addEventListener('submit', async function (e) {
	// отменяем отправку формы
	e.preventDefault();

	// помещяем значение инпута и обрезаем пробелы
	const city = input.value.trim();
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

	header.classList.remove('active');

	// делаем запрос на сервер
	const data = await getWeather(url);

	// подключаем словарь для отображения погоды на языке который стоит в браузере
	const conditions = await fetch('../data/conditions.json');
	const conditionsData = await conditions.json();
	console.log(conditionsData);

	if (!data.error) {
		// Удаляем все дочерние элементы
		removeCards(main)

		const info = conditionsData.find((obj) => obj.code === data.current.condition.code);
		
		const infoCurrentLang = info.languages.find((obj) => obj['lang_iso'] === userLang);

		const currentLangConditionDay = infoCurrentLang['day_text'];
		const currentLangConditionNight = infoCurrentLang['night_text'];

		const weatherData = {
			name: data.location.name,
			country: data.location.country,
			time:data.location.localtime,
			isDay: data.current.is_day,
			condition: data.current.is_day? currentLangConditionDay : currentLangConditionNight,
			temp: data.current.temp_c,
			feelslike: data.current.feelslike_c,
			humidity: data.current.humidity,
			pressure: data.current.pressure_mb,
		}
		// Выводим новую карточку
		showCard(main, weatherData);

	} else {
		// Удаляем все дочерние элементы
		removeCards(main)
		// Выводим новую карточку
		showErrorCard(main, data.error.message);
	}
})