import axios from 'axios';
import qs from 'query-string';

const form = document.querySelector('[name="memes"]');
const main = document.querySelector('main');
const memeContainer = document.createElement('div');
memeContainer.classList.add('meme-container');
main.append(memeContainer);

const api = 'https://api.imgflip.com/get_memes';
const createMemeApi = 'https://api.imgflip.com/caption_image';

form.onsubmit = function(e) {
  e.preventDefault();
  const amount = document.querySelector('[name="amount"]').value;
  
  //Form validation
  
  if(amount === '' || isNaN(amount)) {
    const p = document.querySelector('.form-validation-error');
    p.innerHTML = 'Пожалуйста, введите число';
    document.querySelector('[name="amount"]').classList.add('form-validation');
    return false;
  } else {
    document.querySelector('.form-validation-error').innerHTML = '';
    document.querySelector('[name="amount"]').classList.remove('form-validation');
  }

  async function initApp(amount) {
    const {data: memes} = await getMemes(api); 
    renderMemes(memes.memes, amount);
    renderForm();
  }
 initApp(amount); 
};

async function getMemes(api) {
  const {data: memes} = await axios.get(api);
  return memes;
}

function renderMemes(memes, amount) {
  memeContainer.innerHTML = '';
  for (let i = 0; i < amount; i++) {
    const oneMeme = getOneMeme(memes[i]);
    memeContainer.append(oneMeme);
    // console.log(amount);
  }
}

function getOneMeme(meme) {
  const img = document.createElement('img');
  img.src = meme.url;
  img.width = 250;
  img.classList.add('images');
  img.onclick = function(e) {
    document.querySelector('.form-generate input').dataset.id = meme.id;
    img.style.opacity = .5;
    
  }
  return img;
}

function renderForm() {
  const formForMeme = document.createElement('form');
  formForMeme.classList.add('form-generate');
  const memeTextOne = document.createElement('input');
  memeTextOne.name = 'textOne';
  formForMeme.append(memeTextOne);
  const errorMessageFirst = document.createElement('p');
  errorMessageFirst.classList.add('form-validation-error');
  formForMeme.append(errorMessageFirst);
  const memeTextTwo = document.createElement('input');
  memeTextTwo.name = 'textTwo';
  formForMeme.append(memeTextTwo);
  const errorMessageSecond = document.createElement('p');
  errorMessageSecond.classList.add('form-validation-error');
  formForMeme.append(errorMessageSecond);
  const memeButton = document.createElement('button');
  memeButton.textContent = 'Сгенерировать';
  memeButton.classList.add('button-generator');
  formForMeme.append(memeButton);

  formForMeme.onsubmit = function(e) {
    e.preventDefault();
    const firstField = memeTextOne.value;
    const secondField = memeTextTwo.value;
    const clickedMeme = memeTextOne.dataset.id;

    if (memeTextOne.value === '') {
      errorMessageFirst.innerHTML = 'Пожалуйста, заполните поле';
      document.querySelector('[name="textOne"]').classList.add('form-validation');
      return false;
    } else if (memeTextTwo.value === '') {
      errorMessageSecond.innerHTML = 'Пожалуйста, заполните поле';
      document.querySelector('[name="textTwo"]').classList.add('form-validation');
      return false;
    }
    
    const newMeme = {
      template_id: clickedMeme,
      username: 'g_user_107257642549096835361',
      password: '1234',
      text0: firstField,
      text1: secondField
    }
    createMeme(newMeme);
    formForMeme.reset();
  }
  return main.append(formForMeme);
}

async function createMeme(newMeme) {
  const requestDatа = qs.stringify(newMeme);
  const {data: data} = await axios.post(createMemeApi, requestDatа);
  renderNewName(data.data);
}

function renderNewName(meme) {
  const imgWrapper = document.createElement('div');
  const img = document.createElement('img');
  img.src = meme.url;
  imgWrapper.append(img);
  main.append(imgWrapper);
  return imgWrapper;
}
