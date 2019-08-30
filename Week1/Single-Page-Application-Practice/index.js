function fetchJSON(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.status < 400) {
      cb(null, xhr.response);
    } else {
      cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
    }
  };
  xhr.onerror = () => cb(new Error('Network request failed'));
  xhr.send();
}
function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.keys(options).forEach(key => {
    const value = options[key];
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function main(url) {
  fetchJSON(url, (err, data) => {
    const root = document.getElementById('root');
    if (err) {
      createAndAppend('div', root, { text: err.message, class: 'alert-error' });
    } else {
      createAndAppend('header', root, { id: 'divHead', class: 'header' });
      createAndAppend('p', divHead, { text: 'Select ID' });

      createAndAppend('select', divHead, {
        id: 'selectElem',
        class: 'repo-selector',
      });

      createAndAppend('div', root, { id: 'container' });

      createOptions(data);

      displayInformation(data[0]);
      document.getElementById('selectElem').onchange = function() {
        let selectedItemIndex = this.options[this.selectedIndex].value;
        let infoDiv = document.getElementById('divLeft');
        infoDiv.parentNode.removeChild(infoDiv);
        displayInformation(data[selectedItemIndex]);
      };
    }
  });
}

const DETAILS_URL = 'http://ec2-3-89-131-59.compute-1.amazonaws.com:8080/users';

window.onload = () => main(DETAILS_URL);
function createOptions(wholeData) {
  for (let i = 0; i < wholeData.length; i++) {
    createAndAppend('option', selectElem, {
      value: i,
      text: wholeData[i].id,
      class: 'optionsClass',
    });
  }
}
function displayInformation(element) {
  let infoDiv = createAndAppend('div', container, {
    id: 'divLeft',
    class: 'left-div whiteframe',
  });
  createAndAppend('table', infoDiv, { id: 'table' });
  createAndAppend('tbody', table, { id: 'tbody' });

  function createRow(label, description) {
    let tRow = createAndAppend('tr', table);
    createAndAppend('td', tRow, { text: label, class: 'label' });
    createAndAppend('td', tRow, { text: description });
  }
  createRow('ID: ', element.id);
  createRow('Name: ', element.name);
  createRow('Birthday : ', element.birthdate);
}
