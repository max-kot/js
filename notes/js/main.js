const btnAdd = document.querySelector('.btn-add');
const noteContainer = document.querySelector('.main-container');

function getCurrentDate() {
	let date = new Date();
	return `<span>${date.getDate()< 10 ? '0' + (date.getDate()) : date.getDate()}.${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}</span><span>${date.getHours() < 10 ? '0' + (date.getHours() + 1) : date.getHours() + 1}:${date.getMinutes() < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1}</span>`;
}

function createNote() {
	let note = document.createElement('article');
	note.classList.add('note');
	note.innerHTML = `<div class="note__header">
			<p class="note__title" contenteditable="true"><span class="placeholder">Note title</span></p>
			<div class="note__date">${getCurrentDate()}</div>
		</div>
		<div class="note__content" contenteditable="true">
			<span class="placeholder">Enter your text</span>
		</div>
		<div class="note__btn-box">
			<div class="note__btn-color-wrapper">
				<button class="note__btn btn-color" type="button">
					<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
						d="M25.7482 1.875C25.279 1.875 24.8203 2.01389 24.4298 2.27417L18.0811 6.50666C16.4086 7.62163 14.8926 8.94302 13.5664 10.4347C16.21 11.6552 18.3448 13.79 19.5653 16.4336C21.0569 15.1073 22.3783 13.5913 23.4933 11.9188L27.7258 5.57011C27.9861 5.17969 28.1249 4.72096 28.1249 4.25173C28.1249 2.9391 27.0608 1.875 25.7482 1.875ZM15.3744 19.4061C16.2717 18.9076 17.1327 18.3521 17.9526 17.7441C16.9124 15.1544 14.8456 13.0876 12.2558 12.0473C11.6478 12.8672 11.0923 13.7282 10.5938 14.6256L10.2457 15.2523C12.4163 15.8731 14.1268 17.5837 14.7477 19.7543L15.3744 19.4061ZM8.43744 16.875C5.84858 16.875 3.74994 18.9736 3.74994 21.5625C3.74994 22.598 2.91048 23.4375 1.87494 23.4375C1.83249 23.4375 1.79023 23.4361 1.74825 23.4333C1.40306 23.4105 1.07335 23.5796 0.890522 23.8733C0.707693 24.167 0.701457 24.5375 0.874301 24.8372C2.00655 26.8002 4.12921 28.125 6.56244 28.125C10.1868 28.125 13.1249 25.1869 13.1249 21.5625C13.1249 18.9736 11.0263 16.875 8.43744 16.875Z" />
					</svg>
				</button>
				<div class="btn-color-box hide">
					<button type="button" style="background-color: var(--light);" class="active"></button>
					<button type="button" style="background-color: var(--yellow);"></button>
					<button type="button" style="background-color: var(--green);"></button>
					<button type="button" style="background-color: var(--red);"></button>
					<button type="button" style="background-color: var(--blue);"></button>
				</div>
			</div>
			<button class="note__btn btn-remove" type="button">
				<svg width="25" height="30" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd"
					d="M18.7499 4.13631V4.4513C20.0759 4.57268 21.3909 4.73231 22.6938 4.92907C23.1762 5.00192 23.6569 5.07986 24.136 5.16284C24.7028 5.26103 25.0827 5.80015 24.9845 6.367C24.8864 6.93385 24.3472 7.31377 23.7804 7.21558C23.6837 7.19883 23.587 7.1823 23.4902 7.16597L22.0937 25.3192C21.9268 27.49 20.1166 29.1663 17.9394 29.1663H7.06059C4.88338 29.1663 3.07324 27.49 2.90625 25.3192L1.50985 7.16597C1.41303 7.1823 1.31629 7.19883 1.21961 7.21558C0.652766 7.31377 0.113646 6.93385 0.0154554 6.367C-0.0827357 5.80015 0.297185 5.26103 0.864032 5.16284C1.34305 5.07986 1.82379 5.00192 2.30619 4.92907C3.60909 4.73231 4.92409 4.57268 6.25009 4.4513V4.13631C6.25009 1.96347 7.93413 0.108585 10.1604 0.0373704C10.9372 0.0125191 11.7172 0 12.5 0C13.2828 0 14.0628 0.0125191 14.8396 0.0373704C17.0659 0.108585 18.7499 1.96347 18.7499 4.13631ZM10.227 2.11961C10.9816 2.09547 11.7394 2.0833 12.5 2.0833C13.2606 2.0833 14.0184 2.09547 14.773 2.11961C15.8211 2.15314 16.6666 3.0332 16.6666 4.13631V4.29275C15.2883 4.20906 13.8991 4.16661 12.5 4.16661C11.1009 4.16661 9.71165 4.20906 8.33339 4.29275V4.13631C8.33339 3.0332 9.1789 2.15314 10.227 2.11961ZM9.7342 10.3765C9.71209 9.80163 9.22815 9.35353 8.65329 9.37564C8.07842 9.39775 7.63033 9.88169 7.65244 10.4566L8.1332 22.9564C8.15531 23.5313 8.63926 23.9793 9.21412 23.9572C9.78898 23.9351 10.2371 23.4512 10.215 22.8763L9.7342 10.3765ZM17.3463 10.4566C17.3684 9.88169 16.9203 9.39775 16.3454 9.37564C15.7706 9.35353 15.2866 9.80163 15.2645 10.3765L14.7838 22.8763C14.7616 23.4512 15.2097 23.9351 15.7846 23.9572C16.3595 23.9793 16.8434 23.5313 16.8655 22.9564L17.3463 10.4566Z" />
				</svg>
			</button>
		</div>`;
	return note;
}

function saveData() {
	localStorage.setItem('notes', noteContainer.innerHTML);
}

function updateData() {
	noteContainer.innerHTML = localStorage.getItem('notes');
}

function createOverlay() {
	if (!document.querySelector('.overlay')) {
		const overlay = document.createElement('div');
		overlay.classList.add('overlay');
		document.querySelector('.wrapper').appendChild(overlay);
	} else {
		document.querySelector('.overlay').remove();
	}
}

btnAdd.addEventListener('click', function () {
	let note = createNote();
	noteContainer.appendChild(note);

	note.querySelector('.note__content').focus();
	saveData();
})


// остальные действия завязаны по клику на поле карточек
noteContainer.addEventListener('click', function (e) {
	/*
	const allNotes = document.querySelectorAll('.note');
	allNotes.forEach(function (note) {
		const noteTitle = note.querySelector('.note__title');
		const noteContent = note.querySelector('.note__content');

		noteContent.addEventListener('input', function () {
			const placeholder = noteContent.querySelector('.placeholder');

			if (noteContent.innerHTML.trim() === '') {
				noteContent.innerHTML = '<span class="placeholder">Enter your text</span>';
				saveData()
			}
			if (placeholder) placeholder.remove();
			saveData()
		})

		noteTitle.addEventListener('input', function () {
			const placeholder = noteTitle.querySelector('.placeholder');
			if (placeholder) placeholder.remove();
			saveData()
		})

		noteContent.addEventListener('click', function () {
			const placeholder = noteContent.querySelector('.placeholder');

			if (noteContent.innerHTML.trim() === '') {
				noteContent.innerHTML = '<span class="placeholder">Enter your text</span>';
				saveData()
			}
			if (placeholder) placeholder.remove();
			saveData()
		})

		noteTitle.addEventListener('click', function () {
			const placeholder = noteTitle.querySelector('.placeholder');
			if (placeholder) placeholder.remove();
			saveData()
		})


		// remove Note
		note.querySelector('.btn-remove').addEventListener('click', function () {
			note.remove();
			saveData();
		})


		// changeColor
		note.querySelector('.btn-color').addEventListener('click', function () {
			note.classList.toggle('active');
			const colorBox = this.nextElementSibling;
			colorBox.classList.toggle('hide');

			const allColorBtns = colorBox.querySelectorAll('button');

			allColorBtns.forEach(function (colorBtn) {
				colorBtn.addEventListener('click', function () {
					allColorBtns.forEach(function (colorBtn) {
						colorBtn.classList.remove('active');
					})
					colorBtn.classList.add('active');

					let bgColor = colorBtn.getAttribute('style');
					note.style.backgroundColor = `${bgColor.slice(18, -1)}`;
					saveData();
				})
			})

		})
	})
	*/

	if (e.target.className.includes('note__title')) {
		if (!e.target.className.includes('active')) {
			e.target.classList.add('active');

			if (e.target.innerHTML.trim() === '<span class="placeholder">Note title</span>') {
				e.target.innerHTML = '';
			}

			createOverlay();
			if (document.querySelector('.overlay')) {
				document?.querySelector('.overlay').addEventListener('click', function () {
					e.target.classList.remove('active');
					document?.querySelector('.overlay').remove();

					if (e.target.innerHTML.trim() === '') {
						e.target.innerHTML = '<span class="placeholder">Note title</span>';
					}
					saveData()
				})
			}
		}

	}

	if (e.target.className.includes('note__content')) {
		if (!e.target.className.includes('active')) {
			e.target.classList.add('active');

			if (e.target.innerHTML.trim() === '<span class="placeholder">Enter your text</span>') {
				e.target.innerHTML = '';
			}

			createOverlay();
			if (document.querySelector('.overlay')) {
				document?.querySelector('.overlay').addEventListener('click', function () {
					e.target.classList.remove('active');
					document?.querySelector('.overlay').remove();

					if (e.target.innerHTML.trim() === '') {
						e.target.innerHTML = '<span class="placeholder">Enter your text</span>';
					}

					saveData();
				})
			}
		}

	}

	if (e.target.className.includes('btn-color')) {
		e.target.classList.toggle('active');
		e.target.nextElementSibling.classList.toggle('hide');
		e.target.parentElement.classList.toggle('active');

		createOverlay();
		if (document.querySelector('.overlay')) {
			document.querySelector('.overlay').addEventListener('click', function () {
				e.target.classList.remove('active');
				e.target.nextElementSibling.classList.add('hide');
				e.target.parentElement.classList.remove('active');

				document.querySelector('.overlay').remove();
			})
		}

	}

	if (e.target.className.includes('btn-remove')) {
		e.target.parentElement.parentElement.remove();
		saveData();
	}

	
	const allColorBtns = document.querySelectorAll('.btn-color-box > button');

	allColorBtns.forEach(function (colorBtn) {
		colorBtn.addEventListener('click', function () {
			allColorBtns.forEach(function (colorBtn) {
				colorBtn.classList.remove('active');
			})
			colorBtn.classList.add('active');
			let thisNote = colorBtn.parentElement.parentElement.parentElement.parentElement;
			let bgColor = colorBtn.getAttribute('style');
			thisNote.style.backgroundColor = `${bgColor.slice(18, -1)}`;
			saveData();
		})
	})

})

/*

*/
updateData();

// На всякий случай закрываем все настройки цвета
if (document.querySelectorAll('.btn-color')) {
	document.querySelectorAll('.btn-color').forEach((btn) => {
		btn.classList.remove('active');
		btn.nextElementSibling.classList.add('hide');
	})
}