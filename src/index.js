const axios = require('axios').default;
console.log(axios)

import PhotoServiceApi from './photo-service';

const refs = {
    formEl:document.querySelector('.search-form'),
    galleryEl:document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('.load-more')
}

console.log(refs)

refs.formEl.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click',onLoadMore)


const photoServiceApi = new PhotoServiceApi()

function onLoadMore(){
    photoServiceApi.fetchApi()
}

function onSearch(e){
    e.preventDefault();

    photoServiceApi.sQuery = e.currentTarget.elements.searchQuery.value;
    
    photoServiceApi.resetPage();

    clearPhotoGallery();

    photoServiceApi.fetchApi()
    .then(hits=>createGallery(hits));
}



function createGallery(arr){
    const markUp= arr.map(items=>`<div class="photo-card">
    <img src="${items.previewURL}" alt="${items.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:${items.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${items.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${items.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${items.downloads}</b>
      </p>
    </div>
  </div>`
  ).join()

  refs.galleryEl.insertAdjacentHTML('beforeend',markUp)
}

function clearPhotoGallery(){
    refs.galleryEl.innerHTML='';
}



 