const svgCopy = `<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
						/>
						<path
							d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
						/>
					</svg>Copiar`;

/*

Checkboxes e Inputs

*/
const lowerCheckbox = document.querySelector("#checkbox__minuscula");
const upperCheckbox = document.querySelector("#checkbox__maiscula");
const numberCheckbox = document.querySelector("#checkbox__numero");
const symbolCheckbox = document.querySelector("#checkbox__simbolo");
const emojiChechbox = document.querySelector("#checkbox__emoji");
const rangeInput = document.querySelector("#input__range");
const valueRangeInput = document.querySelector("#input__range__value");

/* -- --  */

/* Senha e Entropia */
const spanEntropyText = document.querySelector("#span__entropy-password");
const passwordText = document.querySelector("#password__text");
const defaultSize = 50;
/* -- --  */

const buttonCopy = document.querySelector("#button__copy");
const buttonGeneratePassword = document.querySelector("#button__generate");

/*

Bits de Entropia

*/
const entropiaSenhaFraca = 8;
const entropiaSenhaModerada = 60;
const entropiaSenhaForte = 96;

const entropiaDeSenha = {
	weak: entropiaSenhaFraca,
	moderate: entropiaSenhaModerada,
	strong: entropiaSenhaForte,
};

/* -- --  */

/*

Envia quais opcoes de restricoes foram selecionados para gerador de senha

*/
buttonGeneratePassword.addEventListener("click", (e) => {
	e.preventDefault();
	let value = valueRangeInput.textContent;

	passwordText.innerHTML = gerarSenhar(
		value,
		upperCheckbox.checked,
		lowerCheckbox.checked,
		numberCheckbox.checked,
		symbolCheckbox.checked,
		emojiChechbox.checked
	);
});

/*

Botao de Copia

*/

buttonCopy.addEventListener("click", () => {
	buttonCopy.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-clipboard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-3.997 -2.17a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" /></svg>Copiado`;

	setTimeout(() => {
		buttonCopy.innerHTML = svgCopy;
	}, 2500);

	navigator.clipboard.writeText(`${passwordText.textContent}`).then(() => {});
});

/*

Input intervalo de tamanho. (Toda vez que o suario interege com intervalo, gere uma nova senha)

*/
rangeInput.addEventListener("input", (e) => {
	let value = e.target.value;
	valueRangeInput.textContent = value;
	buttonCopy.innerHTML = `<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
						/>
						<path
							d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
						/>
					</svg>Copiar`;

	passwordText.innerHTML = gerarSenhar(
		value,
		upperCheckbox.checked,
		lowerCheckbox.checked,
		numberCheckbox.checked,
		symbolCheckbox.checked,
		emojiChechbox.checked
	);
});

/*

Gerador de senha

*/
function gerarSenhar(
	size = 5,
	hasUpper = false,
	hasLower = false,
	hasNumber = false,
	hasSymbol = false,
	hasEmoji = false
) {
	let restPasswordSize = size;
	let generatedPassword = [];
	let passwordOptions = ["lower", "upper", "number", "symbol", "emoji"];

	const restPasswordCharacteres = [];
	const checkedOption = [hasLower, hasUpper, hasNumber, hasSymbol, hasEmoji];

	const [lowerArray, upperArray, symbolArray, emojiArray] = init();

	passwordOptions = passwordOptions.filter((e, index) => {
		if (!checkedOption[index]) {
			return false;
		}
		return true;
	});

	/* Garantindo que tenha pelo menos 1 caracter q o usuarioo selecionou */

	if (hasLower) {
		restPasswordSize--;
		generatedPassword.push(
			lowerArray[Math.floor(Math.random() * lowerArray.length)]
		);
	}
	if (hasUpper) {
		restPasswordSize--;
		generatedPassword.push(
			upperArray[Math.floor(Math.random() * upperArray.length)]
		);
	}
	if (hasNumber) {
		restPasswordSize--;
		generatedPassword.push(Math.floor(Math.random() * 10));
	}
	if (hasSymbol) {
		restPasswordSize--;
		generatedPassword.push(
			symbolArray[Math.floor(Math.random() * symbolArray.length)]
		);
	}
	if (hasEmoji) {
		restPasswordSize--;
		generatedPassword.push(
			emojiArray[Math.floor(Math.random() * emojiArray.length)]
		);
	}
	/* --- --  */

	generatedPassword = generatedPassword
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value);

	for (let i = 0; i < restPasswordSize; i++) {
		restPasswordCharacteres.push(
			passwordOptions[Math.floor(Math.random() * passwordOptions.length)]
		);
	}

	for (let i = 0; i < restPasswordCharacteres.length; i++) {
		if (restPasswordCharacteres[i] !== "number") {
			if (restPasswordCharacteres[i] === "lower") {
				generatedPassword.push(
					lowerArray[Math.floor(Math.random() * lowerArray.length)]
				);
			} else if (restPasswordCharacteres[i] === "upper") {
				generatedPassword.push(
					upperArray[Math.floor(Math.random() * upperArray.length)]
				);
			} else if (restPasswordCharacteres[i] === "symbol") {
				generatedPassword.push(
					symbolArray[Math.floor(Math.random() * symbolArray.length)]
				);
			} else {
				generatedPassword.push(
					emojiArray[Math.floor(Math.random() * emojiArray.length)]
				);
			}
		} else {
			generatedPassword.push(Math.floor(Math.random() * 10));
		}
	}

	calcularEntropiaSenha(
		size,
		hasLower,
		hasUpper,
		hasEmoji,
		hasNumber,
		hasSymbol
	);

	if (!hasLower && !hasUpper && !hasNumber && !hasSymbol && !hasEmoji) {
		return gerarSomenteMinuscula(size);
	}

	/* concatena a senha nova */
	return generatedPassword.reduce((previous, current) => {
		return previous + current;
	}, "");
}

/*

Caso nenhuma opacao selecionada, entao gera senha minuscula

*/

function gerarSomenteMinuscula(size = 5) {
	const startLowerCaseAlphabetCode = 97;
	const endLowerCaseAlphabetCode = 122;
	const lowerAlphabets = [];
	let result = "";

	for (
		let i = startLowerCaseAlphabetCode;
		i <= endLowerCaseAlphabetCode;
		i++
	) {
		lowerAlphabets.push(String.fromCharCode(i));
	}

	while (size > 0) {
		result = result.concat(
			lowerAlphabets[Math.floor(Math.random() * lowerAlphabets.length)]
		);
		size--;
	}

	return result;
}

/*

Calculo de Entropia ( Com base na formula e no grafico da wikipedia)

*/
function calcularEntropiaSenha(
	tamanhoSenha = 5,
	hasLower = true,
	hasUpper = false,
	hasEmoji = false,
	hasNumber = false,
	hasSymbol = false
) {
	let tamanhoElementosPadrao = 26;

	if (hasUpper) {
		tamanhoElementosPadrao += 26;
	}
	if (hasEmoji) {
		tamanhoElementosPadrao += 30;
	}
	if (hasNumber) {
		tamanhoElementosPadrao += 10;
	}
	if (hasSymbol) {
		tamanhoElementosPadrao += 12;
	}

	const entropiaAtual = Math.log2(
		Math.pow(tamanhoElementosPadrao, tamanhoSenha)
	);
	// console.log(entropiaAtual);

	if (
		entropiaAtual >= entropiaDeSenha.weak &&
		entropiaAtual < entropiaDeSenha.moderate
	) {
		spanEntropyText.textContent = "Fraco";
		spanEntropyText.style.color = "rgb(255, 105, 105)";
	} else if (
		entropiaAtual >= entropiaDeSenha.moderate &&
		entropiaAtual < entropiaDeSenha.strong
	) {
		spanEntropyText.textContent = "Moderado";
		spanEntropyText.style.color = "rgb(255, 196, 105)";
	} else {
		spanEntropyText.textContent = "Forte";
		spanEntropyText.style.color = "rgb(105, 255, 113)";
	}
}

/*

Gera os arrays contendo caracteres que serao usados

*/

function init() {
	// Symbols = 14
	const startSymbolCode = 33;
	const endSymbolCode = 47;
	// Upper Case - 26
	const startUpperCaseAlphabetCode = 65;
	const endUpperCaseAlphabetCode = 90;
	// Lower Case = 26
	const startLowerCaseAlphabetCode = 97;
	const endLowerCaseAlphabetCode = 122;
	// Emoji = 30
	const startEmojiCode = 128512;
	const endEmojiCode = 128542;

	const lowerArray = [];
	const upperArray = [];
	const symbolArray = [];
	const emojiArray = [];

	for (let i = startEmojiCode; i < endEmojiCode; i++) {
		emojiArray.push(`&#${i};`);
	}

	for (let i = startSymbolCode; i <= endLowerCaseAlphabetCode; i++) {
		if (i >= startSymbolCode && i <= endSymbolCode) {
			symbolArray.push(String.fromCharCode(i));
		} else if (
			i >= startUpperCaseAlphabetCode &&
			i <= endUpperCaseAlphabetCode
		) {
			upperArray.push(String.fromCharCode(i));
		} else if (
			i >= startLowerCaseAlphabetCode &&
			i <= endLowerCaseAlphabetCode
		) {
			lowerArray.push(String.fromCharCode(i));
		}
	}

	return [lowerArray, upperArray, symbolArray, emojiArray];
}

/*

Gerar uma senha quando da load na pagina

*/
(function initialPassword() {
	passwordText.textContent = gerarSenhar(defaultSize);
})();
