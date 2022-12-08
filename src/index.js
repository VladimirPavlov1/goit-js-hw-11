const axios = require('axios').default;
console.log(axios)

import PhotoServiceApi from './photo-service';
import LoadMoreBtn from './load-btn';


const refs = {
    formEl:document.querySelector('.search-form'),
    galleryEl:document.querySelector('.gallery'),
   
}
const loadMoreBtn = new LoadMoreBtn({selector:'.load-more', hidden:true});
console.log(loadMoreBtn)
const photoServiceApi = new PhotoServiceApi();

console.log(refs)

refs.formEl.addEventListener('submit', onSearch)
loadMoreBtn.refs.button.addEventListener('click',onLoadMore)





function onSearch(e){
    e.preventDefault();

    photoServiceApi.sQuery = e.currentTarget.elements.searchQuery.value;
    if(photoServiceApi.sQuery===''){
     return  alert('Oй')
    }
    photoServiceApi.resetPage();
    loadMoreBtn.show();
    loadMoreBtn.disabled();
    clearPhotoGallery();

    photoServiceApi.fetchApi()
    .then(hits=>{
      createGallery(hits);
      loadMoreBtn.enable();
    });
}

function onLoadMore(){
  loadMoreBtn.disabled();
  photoServiceApi.fetchApi().then(hits=>{
    createGallery(hits);
    loadMoreBtn.enable();
  })
}

function createGallery(arr){
    const markUp= arr.map(items=>`<div class="photo-card">
    <img src="${items.previewURL}" alt="${items.tags}" loading="lazy"/>
    <div class="info"><p class="info-item"><b>Likes:${items.likes}</b></p><p class="info-item"><b>Views:${items.views}</b></p><p class="info-item"><b>Comments:${items.comments}</b></p><p class="info-item"><b>Downloads:${items.downloads}</b></p></div></div>`).join('')
 
  refs.galleryEl.insertAdjacentHTML('beforeend',markUp)
}

function clearPhotoGallery(){
    refs.galleryEl.innerHTML='';
}



 