//console.log('Hare krishna');

// selection

const textarea = document.querySelector('[name="text"]');
const translateBtn = document.querySelector('.translate-btn');
const outputDiv = document.querySelector('.output-text');
const refreshBtn = document.querySelector('.refresh');
const url = 'https://api.funtranslations.com/translate/chef.json';

// Using fetch() .then()

function handleError(error) {
  console.log(error);
}

function displayText(sentence, condn) {
  outputDiv.innerText = sentence;
  outputDiv.style.color = condn ? 'grey' : 'red';
  outputDiv.style.fontSize = condn ? '1rem' : '1.25rem';
  outputDiv.style.fontWeight = condn ? '500' : '800';
}

function translateText(myUrl) {
  fetch(myUrl)
    .then(function (response) {
      if (!response.ok) {
        if (response.status === 429) {
          displayText(
            `Error ${response.status}, rate limited, try after 1 hour.`,
            false
          );
          throw new Error(
            `${response.status}, rate limited, try after 1 hour.`
          );
        }
        throw new Error('Cant fetch Data');
      }
      return response.json();
    })
    .then(function (data) {
      const {
        contents: { translated: translatedSent },
      } = data;
      displayText(translatedSent, true);
    })
    .catch(handleError);
}

function handleTranslateBtnClick() {
  const inputValue = textarea.value;
  if (!inputValue) {
    displayText('Please enter your msg', false);
    return;
  }
  translateText(`${url}?text=${inputValue}`);
}

function defaultOutput() {
  displayText('Translated text will be here...', true);
}

translateBtn.addEventListener('click', handleTranslateBtnClick);

refreshBtn.addEventListener('click', () => {
  textarea.value = '';
  defaultOutput();
});

textarea.addEventListener('click', () => {
  defaultOutput();
});
