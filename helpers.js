import _ from 'https://cdn.skypack.dev/lodash';

export const paswordCategories = {
  1: { text: 'TOO WEAK!', color: 'red' },
  2: { text: 'WEAK', color: 'orange' },
  3: { text: 'MEDIUM', color: 'yellow' },
  4: { text: 'STRONG', color: 'green' },
};

export function categorizePassword(text) {
  if (!text || typeof text !== 'string') {
    return;
  }

  //check lenght
  const passLength = text.length;

  //check how many char-types it has
  const typesCount = charTypeValue(text);

  //pick and return a category combining the 2 values

  if (typesCount === 1) {
    return 1;
  }

  if (typesCount === 2) {
    if (passLength <= 4) return 1;
    if (passLength <= 12) return 2;
    return 3;
  }

  if (typesCount === 3) {
    if (passLength <= 4) return 1;
    if (passLength <= 8) return 2;
    if (passLength <= 10) return 3;
    return 4;
  }

  if (typesCount === 4) {
    if (passLength <= 4) return 1;
    if (passLength <= 6) return 2;
    if (passLength <= 8) return 3;
    return 4;
  }

  throw new Error('Something went wong with password checking');
}

function charTypeValue(text) {
  const regexes = {
    lowercaseLetter: /[a-z]/,
    uppercaseLetter: /[A-Z]/,
    number: /[0-9]/,
    special: /[^a-zA-Z0-9]/,
  };

  let result = 0;

  const charArray = text.split('');

  const types = {
    lowercaseLetter: 0,
    uppercaseLetter: 0,
    number: 0,
    special: 0,
  };

  charArray.forEach((char) => {
    if (regexes.lowercaseLetter.test(char)) {
      types.lowercaseLetter++;
    } else if (regexes.uppercaseLetter.test(char)) {
      types.uppercaseLetter++;
    } else if (regexes.number.test(char)) {
      types.number++;
    } else if (regexes.special.test(char)) {
      types.special++;
    } else {
      return;
    }
  });

  for (let type in types) {
    if (types[type] > 0) {
      result++;
    }
  }

  return result;
}

//retrieve input conditions as an object
export function getInputs() {
  const slider = document.getElementById('slider-input');
  const length = Number(slider.value);

  const checkedFields = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  const conditions = [];

  checkedFields.forEach((field) => {
    conditions.push(field.dataset.id);
  });

  return {
    length: length,
    conditions: [...conditions],
  };
}

export function generatePassword(data) {
  let { length, conditions } = data;

  if (length < conditions.length) {
    length = conditions.length;
  }

  const genFunctions = createGenFunctions();
  let charArray = [];

  // first create one char of every type
  conditions.forEach((condition) => {
    let character = genFunctions[condition]();
    if (!character) {
      throw new Error('invalid or missing generation condition');
    }
    charArray.push(character);
  });

  // generate the remaining chars randomly
  const remainingLength = length - conditions.length;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * conditions.length);
    const randomChar = genFunctions[conditions[randomIndex]]();
    charArray.push(randomChar);
  }

  //return password
  const createdPass = _.shuffle(charArray).join('');
  return createdPass;
}

function createGenFunctions() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = `"!@#$%^&*()_+-=[]{}|;:',.<>?";`;

  const generateLowerCase = () => {
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const generateUpperCase = () => {
    return letters[Math.floor(Math.random() * letters.length)].toUpperCase();
  };

  const generateNumber = () => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const generateSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const genFunctions = {
    lowerCase: generateLowerCase,
    upperCase: generateUpperCase,
    numbers: generateNumber,
    symbols: generateSymbol,
  };

  return genFunctions;
}

export function copyToClipboard() {
  const text = document.getElementById('password-input').value;
  window.navigator.clipboard.writeText(text);
}
