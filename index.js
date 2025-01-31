import {
  categorizePassword,
  paswordCategories,
  getInputs,
  generatePassword,
} from './helpers.js';
import { setStrenghtIndicator } from './view.js';

//  *****   Maunipulate the slider   *****  //
const sliderInput = document.getElementById('slider-input');
const sliderOutput = document.getElementById('slider-output');

sliderOutput.value = sliderInput.value;

sliderInput.addEventListener('input', (e) => {
  sliderOutput.value = e.target.value;

  const min = sliderInput.min;
  const max = sliderInput.max;
  const currentValue = sliderInput.value;

  sliderInput.style.backgroundSize = `${
    ((currentValue - min) / (max - min)) * 100
  }% 100%`;
});

// One of the checkboxes always have to be checked
const checkboxes = document.querySelectorAll('input[name="options"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    const checkedBoxes = document.querySelectorAll(
      'input[name="options"]:checked'
    );

    if (checkedBoxes.length === 0) {
      return (checkbox.checked = true);
    }
  });
});

// Manual password generation
const inputField = document.getElementById('password-input');

inputField.addEventListener('input', (e) => {
  const inputText = e.target.value.trim();
  e.target.value = inputText; // don't allow spaces

  if (inputText) {
    const result = categorizePassword(inputText);
    setStrenghtIndicator(result);
  }
});

// Automatic password generation
const generateButton = document.querySelector('.c-main__submit-button');

generateButton.addEventListener('click', () => {
  // clearToDefault()
  // const generatedPass = generatePassword(getInputs());
  const userInputs = getInputs();
  const password = generatePassword(userInputs);

  inputField.value = password;
  setStrenghtIndicator(categorizePassword(password));
});
