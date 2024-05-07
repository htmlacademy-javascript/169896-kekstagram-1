// Функция для проверки, является ли строка палиндромом. Палиндром —
// это слово или фраза, которые одинаково читаются
// и слева направо и справа налево.

function palindrome(str){
  let chars = new Set(str),
      wasOdd = false;

  for(let char of chars)
      if(str.match(new RegExp(char, 'gi')).length % 2)
          if(wasOdd)
              return false;
          else
              wasOdd = true;
  return true;
}

// Строка является палиндромом
console.log(palindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(palindrome('ДовОд')); // true
// Это не палиндром
console.log(palindrome('Кекс'));  // false

console.log('next' + ' функция')


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN

function posi(str) {
  const x = str.match(/\d/g);
  if (x) {
    return parseInt(x.join(''), 10);
  } else {
    return NaN;
  }
}

console.log(posi('2023 год'));            // 2023 должно быть
console.log(posi('ECMAScript 2022'));     // 2022 должно быть
console.log(posi('1 кефир, 0.5 батона')); // 105 должно быть
console.log(posi('агент 007'));           // 7 должно быть
console.log(posi('а я томат'));           // NaN должно быть

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// — и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
//  она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.

function padString(original, minLength, additional) {
  if (original.length >= minLength) {
      return original;
  } else {
      return additional.slice(0, minLength - original.length) + original;
  }
}


// Добавочный символ использован один раз
console.log(padString('1', 2, '0'));      // '01'

// Добавочный символ использован три раза
console.log(padString('1', 4, '0'));      // '0001'

// Добавочные символы обрезаны с конца
console.log(padString('q', 4, 'werty'));  // 'werq'

// Добавочные символы использованы полтора раза
console.log(padString('q', 4, 'we'));     // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
console.log(padString('qwerty', 4, '0')); // 'qwerty'


// Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
// и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее. Эта функция нам пригодится для валидации формы.



function checkStrLen(inputString, maxLength) {
  return inputString.trim().length <= maxLength;
}

console.log(checkStrLen('проверяемая строка', 20)); // true
console.log(checkStrLen('проверяемая строка', 18)); // true
console.log(checkStrLen('проверяемая строка', 10)); // false
