/* eslint-disable no-console */
// Функция для проверки, является ли строка палиндромом. Палиндром —
// это слово или фраза, которые одинаково читаются
// и слева направо и справа налево.

const isPalindrome = (str) => {
  const cleanStr = str.toLowerCase().replaceAll(/[^a-zа-я]/g);
  const len = cleanStr.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (cleanStr[i] !== cleanStr[len - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log('Функция', +' 1');
console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN

const usNum = (str) => {
  const outNumber = str.match(/\d/g);
  return outNumber ? parseInt(outNumber.join(''), 10) : NaN;
};

console.log('Функция', +' 2');
console.log(usNum('2023 год')); // 2023 должно быть
console.log(usNum('ECMAScript 2022')); // 2022 должно быть
console.log(usNum('1 кефир, 0.5 батона')); // 105 должно быть
console.log(usNum('агент 007')); // 7 должно быть
console.log(usNum('а я томат')); // NaN должно быть

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// — и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
//  она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

const padString = (str, minLength, addChars) => {
  if (str.length >= minLength) {
    return str;
  } else {
    const numCharsNeed = minLength - str.length;
    const numAddChars = Math.floor(numCharsNeed / addChars.length);
    const remainingChars = numCharsNeed % addChars.length;
    return addChars.slice(0, remainingChars) + addChars.repeat(numAddChars) + str;
  }
};

console.log('Функция', +' 3');
console.log(padString('1', 2, '0')); // '01'
console.log(padString('1', 4, '0')); // '0001'
console.log(padString('q', 4, 'werty')); // 'werq'
console.log(padString('q', 4, 'we')); // 'wweq'
console.log(padString('qwerty', 4, '0')); // 'qwerty'

// Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
// и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее. Эта функция нам пригодится для валидации формы.

const isStrLengthValid = (str, maxLength) => str.length <= maxLength;

console.log('Функция', +' 4');
console.log(isStrLengthValid('проверяемая строка', 20)); // true
console.log(isStrLengthValid('проверяемая строка', 18)); // true
console.log(isStrLengthValid('проверяемая строка', 10)); // false
