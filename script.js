import { LOWER, NUMBERS, SYMBOLS, UPPER } from './constants.js';

const pass = document.querySelector('#pass');
const btnGenerate = document.querySelector('.btnGenerate');
const range = document.querySelector('#inputRange');
const txtRange = document.querySelector('#textRange');
const upperInp = document.querySelector('#mayusculas');
const lowerInp = document.querySelector('#minusculas');
const numerosInp = document.querySelector('#numeros');
const simbolosInp = document.querySelector('#simbolos');

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

range.addEventListener('input', evt => {
	txtRange.value = Math.floor(range.value);
	pass.value = generatePass();
});

btnGenerate.addEventListener('click', evt => {
	pass.value = generatePass();
});

document.addEventListener('change', evt => {
	if (evt.target.matches('#mayusculas')) pass.value = generatePass();
	if (evt.target.matches('#minusculas')) pass.value = generatePass();
	if (evt.target.matches('#numeros')) pass.value = generatePass();
	if (evt.target.matches('#simbolos')) pass.value = generatePass();
});

window.addEventListener('DOMContentLoaded', evt => {
	txtRange.value = range.value;
	pass.value = generatePass();
});
