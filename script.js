import { LOWER, NUMBERS, SYMBOLS, UPPER } from './constants.js';

const pass = document.querySelector('#pass');
const range = document.querySelector('#inputRange');
const txtRange = document.querySelector('#textRange');
const upperInp = document.querySelector('#mayusculas');
const lowerInp = document.querySelector('#minusculas');
const numerosInp = document.querySelector('#numeros');
const simbolosInp = document.querySelector('#simbolos');
const listCheckbox = document.querySelectorAll('input[type=checkbox]');

const generatePass = () => {
	alwaysChecked();
	let size = Math.floor(range.value);
	let pass = '';

	const { uppCh, lowCh, numCh, symCh } = chechInputsStates();
	const arrayFilter = filterChecked(uppCh, lowCh, numCh, symCh);

	for (let i = 0; i < size; i++) {
		pass += String.fromCharCode(randomInteger(33, 126, arrayFilter));
	}
	return pass;
};

const randomInteger = (min, max, exclude = []) => {
	let randomNum = Math.floor(
		Math.random() * (max - min + 1 - exclude.length) + min
	);
	exclude
		.slice()
		.sort((a, b) => a - b)
		.every(exeption => exeption <= randomNum && (randomNum++, true));
	return randomNum;
};

const filterChecked = (upper, lower, numb, symb) => {
	if (upper && lower && numb && symb) return [];

	if (upper && lower && numb) return [...SYMBOLS];
	if (upper && lower && symb) return [...NUMBERS];
	if (upper && numb && symb) return [...LOWER];
	if (lower && numb && symb) return [...UPPER];

	if (upper && lower) return [...NUMBERS, ...SYMBOLS];
	if (upper && numb) return [...LOWER, ...SYMBOLS];
	if (upper && symb) return [...LOWER, ...NUMBERS];
	if (lower && numb) return [...UPPER, ...SYMBOLS];
	if (lower && symb) return [...UPPER, ...NUMBERS];
	if (numb && symb) return [...UPPER, ...LOWER];

	if (upper) return [...LOWER, ...NUMBERS, ...SYMBOLS];
	if (lower) return [...UPPER, ...NUMBERS, ...SYMBOLS];
	if (numb) return [...UPPER, ...LOWER, ...SYMBOLS];
	if (symb) return [...UPPER, ...LOWER, ...NUMBERS];
};

const chechInputsStates = () => {
	return {
		uppCh: upperInp.checked,
		lowCh: lowerInp.checked,
		numCh: numerosInp.checked,
		symCh: simbolosInp.checked
	};
};

const alwaysChecked = () => {
	const { uppCh, lowCh, numCh, symCh } = chechInputsStates();
	if (uppCh && lowCh && numCh && symCh) {
		const list = document.querySelectorAll('input[type=checkbox]');
		for (let i = 0; i < list.length; i++) {
			list[i].checked = false;
		}
	}
};

const copyPass = () => {
	const pass = document.querySelector('#pass');
	navigator.clipboard.writeText(pass.value);
	alertFloating();
};

const alertFloating = () => {
	const $alertFloating = document.querySelector('.info_floating');
	$alertFloating.classList.add('visible');
	setTimeout(() => {
		$alertFloating.classList.remove('visible');
	}, 1600);
};

document.addEventListener('click', evt => {
	if (evt.target.matches('.icon_refresh')) {
		pass.value = generatePass();
	}
	if (evt.target.matches('.icon_copy')) return copyPass();
	if (evt.target.matches('.btn_theme')) return fnTheme();
});

range.addEventListener('input', evt => {
	txtRange.value = Math.floor(range.value);
	pass.value = generatePass();
});

for (const node of listCheckbox) {
	node.addEventListener('change', evt => {
		pass.value = generatePass();
	});
}

const fnTheme = () => {
	const $btn_theme = document.querySelector('.btn_theme');
	let sun = '☀️';
	let moon = '🌙';

	if ($btn_theme.textContent === moon) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('data-theme', 'dark');
		$btn_theme.textContent = sun;
		return;
	}

	if ($btn_theme.textContent === sun) {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('data-theme', 'light');
		$btn_theme.textContent = moon;
		return;
	}
};

const checkThemeStorage = () => {
	const $btn_theme = document.querySelector('.btn_theme');
	let storageTheme = localStorage.getItem('data-theme');
	let sun = '☀️';
	let moon = '🌙';

	if (!storageTheme) return;

	if (storageTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'dark');
		$btn_theme.textContent = sun;
	}

	if (storageTheme === 'light') {
		document.documentElement.setAttribute('data-theme', 'light');
		$btn_theme.textContent = moon;
	}
};

window.addEventListener('DOMContentLoaded', evt => {
	txtRange.value = range.value;
	pass.value = generatePass();
	checkThemeStorage();
});
