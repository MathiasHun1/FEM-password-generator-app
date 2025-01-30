import { categorizePassword } from './helpers.js';

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
//   ******************************   //
const inputField = document.getElementById('password-input');

// password strenght criterions:
// TOO WEAK: <= 4
// WEAK: ( 5 <= pass < 8 AND 2type atl ) OR ( >= 8 AND 1type )
// MEDIUM: (8 <= pass < 12 AND 3type atl) OR ( >= 12 AND 2type )
// STRONG: (8 <= pass < 12 AND 4type) OR ( >= 12 AND 3type)

// don't allow space to input
inputField.addEventListener('input', (e) => {
  const inputText = e.target.value.trim();
  e.target.value = inputText;

  if (inputText) {
    console.log(categorizePassword(inputText));
  }
});
