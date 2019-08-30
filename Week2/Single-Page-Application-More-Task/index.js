/**
 * get participants from
 * https://raw.githubusercontent.com/HackYourFutureMalmoe/General-Teaching/master/conference%20challenge/participants.json,
 * call renderNameTags, renderFoodPreferences and renderTalkOverview in case of success
 * and inform the user otherwise about the problem
 */

/**
 * make sure, every participant has a (HTML) name tag like this:
 *    ----------------------------------------
 *    |                                        |
 *    |            NAME                        |
 *    |            PROFESSION                    |
 *    |            COMPANY                        |
 *    |                                        |
 *    ----------------------------------------
 **/
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.send();
  });
}

function main(url) {
  fetchJSON(url)
    .catch(reject => {})
    .then(data => {
      renderNameTags(data);
      renderFoodPreferences(data);
      renderTalkOverview(data);
      // console.log(data);
    });
}
const GET_PARTICIPANT_URL =
  'https://raw.githubusercontent.com/HackYourFutureMalmoe/General-Teaching/master/conference%20challenge/participants.json';

window.onload = () => main(GET_PARTICIPANT_URL);

function renderNameTags(participants) {
  const nameTagsElement = document.getElementById('nameTags');
  participants.forEach(participant => {
    const nameTagElement = document.createElement('div');
    nameTagElement.setAttribute('class', 'nameTag');
    createAndAppendPara(nameTagElement, participant.name);
    createAndAppendPara(nameTagElement, participant.profession);
    createAndAppendPara(nameTagElement, participant.company);
    nameTagsElement.appendChild(nameTagElement);
  });
}

function createAndAppendPara(tagNameElement, text) {
  const pElement = document.createElement('p');
  pElement.innerText = text;
  tagNameElement.appendChild(pElement);
}

// create html, that shows an overview over food preferences:
function renderFoodPreferences(participants) {
  const foodPreferencesElement = document.getElementById('foodPreferences');

  const vegetarianElement = createFoodPreferenceElement('Vegetarian: ', 'vegetarian', participants);
  foodPreferencesElement.appendChild(vegetarianElement);
  const veganElement = createFoodPreferenceElement('Vegan: ', 'vegan', participants);
  foodPreferencesElement.appendChild(veganElement);
  const meatElement = createFoodPreferenceElement('Meat: ', 'meat', participants);
  foodPreferencesElement.appendChild(meatElement);
}

function createFoodPreferenceElement(title, searchWord, participants) {
  const foodPreferenceElement = document.createElement('p');
  foodPreferenceElement.innerText = title;
  const numberOfDishes = document.createElement('span');
  numberOfDishes.innerText = countDishes(searchWord, participants);
  foodPreferenceElement.appendChild(numberOfDishes);
  return foodPreferenceElement;
}

function countDishes(foodPreference, participants) {
  let numberOfDishes = 0;
  participants.forEach(participant => {
    if (participant.foodPreference === foodPreference) {
      numberOfDishes++;
    }
  });
  return numberOfDishes;
}

//list registered names for each talk
function renderTalkOverview(participants) {
  const talksElement = document.getElementById('talks');

  const talk1Element = createTalkElement('Talk 1: ', 'talk1', participants);
  talksElement.appendChild(talk1Element);
  const talk2Element = createTalkElement('Talk 2: ', 'talk2', participants);
  talksElement.appendChild(talk2Element);
  const talk3Element = createTalkElement('Talk 3: ', 'talk3', participants);
  talksElement.appendChild(talk3Element);
  const talk4Element = createTalkElement('Talk 4: ', 'talk4', participants);
  talksElement.appendChild(talk4Element);
  const talk5Element = createTalkElement('Talk 5: ', 'talk5', participants);
  talksElement.appendChild(talk5Element);
  const talk6Element = createTalkElement('Talk 6: ', 'talk6', participants);
  talksElement.appendChild(talk6Element);
}

function createTalkElement(title, searchWord, participants) {
  const talkElement = document.createElement('div');
  talkElement.innerText = title;
  const listElement = document.createElement('ul');
  talkElement.appendChild(listElement);
  participants.forEach(participant => {
    if (participant.registerToTalks.indexOf(searchWord) >= 0) {
      const liElement = document.createElement('li');
      liElement.innerText = participant.name;
      listElement.appendChild(liElement);
    }
  });
  return talkElement;
}
