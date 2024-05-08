/* eslint-disable no-console */
// Функция для проверки, является ли строка палиндромом. Палиндром —
// это слово или фраза, которые одинаково читаются
// и слева направо и справа налево.

const isPalindrome = (str) => {
  const cleanStr = str.toLowerCase().replace(/[^a-zа-я]/g, '');
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;
};

console.log('Функция', + ' 1');
// Строка является палиндромом
console.log(isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('mama')); // false


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN

const canNum = (str) => {
  const outNumber = str.match(/\d/g);
  return outNumber ? parseInt(outNumber.join(''), 10) : NaN;
};

console.log('Функция', + ' 2');
console.log(canNum('2023 год')); // 2023 должно быть
console.log(canNum('ECMAScript 2022')); // 2022 должно быть
console.log(canNum('1 кефир, 0.5 батона')); // 105 должно быть
console.log(canNum('агент 007'));// 7 должно быть
console.log(canNum('а я томат'));// NaN должно быть


// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// — и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
//  она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

function padString(str, minLength, addChars) {
  if (str.length >= minLength) {
    return str;
  } else {
    const numCharsNeed = minLength - str.length;
    const numAddChars = Math.floor(numCharsNeed / addChars.length);
    const remainingChars = numCharsNeed % addChars.length;
    const paddStr = addChars.slice(0, remainingChars) + addChars.repeat(numAddChars) + str;
    return paddStr;
  }
}

console.log('Функция', + ' 3');
// Добавочный символ использован один раз
console.log(padString('1', 2, '0'));// '01'
// Добавочный символ использован три раза
console.log(padString('1', 4, '0'));// '0001'
// Добавочные символы обрезаны с конца
console.log(padString('q', 4, 'werty'));// 'werq'
// Добавочные символы использованы полтора раза
console.log(padString('q', 4, 'we')); // 'wweq'
// Добавочные символы не использованы, исходная строка не изменена
console.log(padString('qwerty', 4, '0')); // 'qwerty'

// Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
// и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее. Эта функция нам пригодится для валидации формы.


function isStrLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

console.log('Функция', + ' 4');
console.log(isStrLengthValid('проверяемая строка', 20)); // true
console.log(isStrLengthValid('проверяемая строка', 18)); // true
console.log(isStrLengthValid('проверяемая строка', 10)); // false
