export function categorizePassword(text) {
  if (!text || typeof text !== 'string') {
    return;
  }

  //check lenght
  const passLength = text.length;

  //check how many char-types it has
  const typesCount = charTypeValue(text);

  //pick and return a category combining the 2 values

  // TOO WEAK 1: <= 4
  // WEAK 2: ( 4 < pass <= 8 AND 2type atl ) OR ( > 8 AND 1type )
  // MEDIUM 3: (8 < pass <= 12 AND 3type atl) OR ( > 12 AND 2type )
  // STRONG 4: (8 < pass <= 12 AND 4type) OR ( > 12 AND 3type)

  if (typesCount === 1) {
    return 1;
  }

  if (typesCount === 2) {
    if (passLength <= 4) return 1;
    if (passLength <= 12) return 2;
    return 3; // passLength > 12
  }

  if (typesCount === 3) {
    if (passLength <= 4) return 1;
    if (passLength <= 8) return 2;
    if (passLength <= 10) return 3;
    return 4; // passLength > 10
  }

  if (typesCount === 4) {
    if (passLength <= 4) return 1;
    if (passLength <= 6) return 2;
    if (passLength <= 8) return 3;
    return 4; // passLength > 8
  }

  throw new Error('Something went wong with password generation');
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
