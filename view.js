import { paswordCategories } from './helpers.js';

function clearToDefault() {}

export function setStrenghtIndicator(value) {
  setIndicatorText(value);
  setIndicatorDisplay(value);
}

function setIndicatorText(value) {
  const indicatorText = document.querySelector('.c-main__indicator-text');

  switch (value) {
    case 1:
      indicatorText.innerText = paswordCategories[1].text;
      break;
    case 2:
      indicatorText.innerText = paswordCategories[2].text;
      break;
    case 3:
      indicatorText.innerText = paswordCategories[3].text;
      break;
    case 4:
      indicatorText.innerText = paswordCategories[4].text;
      break;
    default:
      break;
  }
}

function setIndicatorDisplay(value) {
  const displayElements = document.querySelectorAll('.c-main__strenght-icon');
  const color = paswordCategories[value].color;
  const removeAllColors = (element) => {
    for (let key in paswordCategories) {
      element.classList.remove(paswordCategories[key].color);
    }
  };

  displayElements.forEach((element) => {
    if (Number(element.dataset.id) <= value) {
      element.classList.remove('default');
      removeAllColors(element);
      element.classList.add(color);
    } else {
      //reset display to default
      removeAllColors(element);
      element.classList.add('default');
    }
  });
}
