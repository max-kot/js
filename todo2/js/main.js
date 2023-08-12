const form = document.querySelector('.app__form');
const input = document.querySelector('.app__input');
const list = document.querySelector('.app__list');
const app = document.querySelector('.app');

function createEditBtn(parent) {
	const editBtn = document.createElement('button');
	editBtn.setAttribute('type', 'button');
	editBtn.setAttribute('class', 'btn-edit');
	editBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M14.4508 0.549174C13.7186 -0.183058 12.5314 -0.183058 11.7992 0.549174L10.9726 1.37571L13.6243 4.02736L14.4508 3.20082C15.1831 2.46859 15.1831 1.28141 14.4508 0.549174Z" fill="#ADB5BD"/>
	<path d="M12.8667 4.78498L10.215 2.13333L1.53586 10.8125C1.0953 11.2531 0.771451 11.7964 0.593579 12.3936L0.0223084 14.3113C-0.0338487 14.4998 0.0178278 14.704 0.15692 14.8431C0.296013 14.9822 0.500146 15.0338 0.688666 14.9777L2.60644 14.4064C3.20356 14.2285 3.74696 13.9047 4.18752 13.4641L12.8667 4.78498Z" fill="#ADB5BD"/>
	</svg>`;

	parent.appendChild(editBtn);
}

function createCheckBtn(parent) {
	const checkBtn = document.createElement('button');
	checkBtn.setAttribute('type', 'button');
	checkBtn.setAttribute('class', 'btn-check');
	checkBtn.innerHTML = `<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M2 7L7.54286 13L17.5 2" stroke="#F8F9FA" stroke-width="3" stroke-linecap="round"/>
	</svg>`;

	parent.prepend(checkBtn);
}

function createDeleteBtn(parent) {
	const deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('type', 'button');
	deleteBtn.setAttribute('class', 'btn-delete');
	deleteBtn.innerHTML = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M3.21389 0.43934C2.6281 -0.146447 1.67835 -0.146447 1.09257 0.43934C0.506779 1.02513 0.506779 1.97487 1.09257 2.56066L6.37868 7.84678L1.03002 13.1954C0.444236 13.7812 0.444236 14.731 1.03002 15.3168C1.61581 15.9025 2.56556 15.9025 3.15134 15.3168L8.5 9.9681L13.8487 15.3168C14.4345 15.9025 15.3842 15.9025 15.97 15.3168C16.5558 14.731 16.5558 13.7812 15.97 13.1954L10.6213 7.84678L15.9074 2.56066C16.4932 1.97487 16.4932 1.02513 15.9074 0.43934C15.3217 -0.146446 14.3719 -0.146447 13.7861 0.43934L8.5 5.72546L3.21389 0.43934Z" fill="#ADB5BD"/>
	</svg>`;

	parent.appendChild(deleteBtn);
}

function saveData() {
	localStorage.setItem('data', list.innerHTML)
}

function showData() {
	list.innerHTML = localStorage.getItem('data');
}

function addHoverClass() {
	const allBtns = document.querySelectorAll('button');
	const allLinks = document.querySelectorAll('a');

	if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
		document.body.classList.add('touch');

		allBtns.forEach(function (btn) {
			btn.classList.remove('hover');
		})

		allLinks.forEach(function (link) {
			link.classList.remove('hover');
		})
	} else {
		document.body.classList.add('no-touch');

		allBtns.forEach(function (btn) {
			btn.classList.add('hover');
		})

		allLinks.forEach(function (link) {
			link.classList.add('hover');
		})
	}
}

/* --- ADD TASK ---*/
form.addEventListener('submit', function (e) {
	e.preventDefault();
	if (input.value === '') {
		alert('Please enter your task');
	} else {
		const li = document.createElement('li');
		const p = document.createElement('p');
		p.innerHTML = input.value;
		li.appendChild(p);
		list.appendChild(li);

		createCheckBtn(li);
		createEditBtn(li);
		createDeleteBtn(li);

		addHoverClass();
		input.value = '';
		saveData();
	}

})

/*--- ADD OVERLAY ---*/
let overlay = document.createElement('div');
overlay.setAttribute('class', 'overlay');
document.body.appendChild(overlay);

overlay.addEventListener('click', function () {
	const textElement = document.querySelector('p.edit');
	const btnEdit = document.querySelector('.btn-edit.active');

	textElement.classList.remove('edit');
	textElement.contentEditable = 'false';
	overlay.classList.remove('active');
	btnEdit.classList.remove('active');
})

/*--- CLICK FOR TASK LIST ELEMENTS ---*/
list.addEventListener('click', function (e) {
	if (e.target.className.includes('btn-check')) {
		e.target.parentElement.classList.toggle('checked');
		let textElement = e.target.nextElementSibling;
		let editBtn = textElement.nextElementSibling;

		if (textElement.className.includes('edit')) {
			textElement.classList.remove('edit');
			textElement.contentEditable = 'false';
			editBtn.classList.remove('active');
		}

		saveData();
	}

	if (e.target.className.includes('btn-delete')) {
		e.target.parentElement.remove();

		saveData();
	}

	if (e.target.className.includes('btn-edit')) {

		let btnEdit = e.target;
		let textElement = e.target.previousElementSibling;
		btnEdit.classList.toggle('active');

		if (btnEdit.className.includes('active')) {
			textElement.classList.add('edit');
			textElement.contentEditable = 'true';
			textElement.focus();
			overlay.classList.add('active');
		} else {
			textElement.classList.remove('edit');
			textElement.contentEditable = 'false';
			overlay.classList.remove('active');
		}
	}
})

/*--- DBLCLICK TO EDIT TEXT ---*/
list.addEventListener('dblclick', function (e) {
	if (e.target.tagName === 'P' && !e.target.parentElement.className.includes('check')) {
		let textElement = e.target;
		let btnEdit = e.target.nextElementSibling;
		btnEdit.classList.toggle('active');

		if (btnEdit.className.includes('active')) {
			textElement.classList.add('edit');
			textElement.contentEditable = 'true';
			textElement.focus();
			overlay.classList.add('active');
		} else {
			textElement.classList.remove('edit');
			textElement.contentEditable = 'false';
			overlay.classList.remove('active');
		}
	}
});

showData();
