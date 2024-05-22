// Функция для проверки, является ли строка палиндромом. Палиндром —
// это слово или фраза, которые одинаково читаются
// и слева направо и справа налево.

const isPalindrome = (str) => {
  const cleanStr = str.toLowerCase().replaceAll(' ', '');
  const length = Math.floor(cleanStr.length / 2);

  for (let i = 0; i < length; i++) {
    if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN

const keepNum = (str) => {
  const outNumber = str.match(/\d/g);

  return outNumber ? parseInt(outNumber.join(''), 10) : NaN;
};

keepNum('2023 год'); // 2023 должно быть
keepNum('ECMAScript 2022'); // 2022 должно быть
keepNum('1 кефир, 0.5 батона'); // 105 должно быть
keepNum('агент 007'); // 7 должно быть
keepNum('а я томат'); // NaN должно быть

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

padString('1', 2, '0'); // '01'
padString('1', 4, '0'); // '0001'
padString('q', 4, 'werty'); // 'werq'
padString('q', 4, 'we'); // 'wweq'
padString('qwerty', 4, '0'); // 'qwerty'

// Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
// и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее. Эта функция нам пригодится для валидации формы.

const isStrLengthValid = (str, maxLength) => str.length <= maxLength;

isStrLengthValid('проверяемая строка', 20); // true
isStrLengthValid('проверяемая строка', 18); // true
isStrLengthValid('проверяемая строка', 10); // false
