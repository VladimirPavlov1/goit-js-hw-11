const axios = require('axios').default;
console.log(axios)

import PhotoServiceApi from './photo-service';
import LoadMoreBtn from './load-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import "simplelightbox/dist/simple-lightbox.min.css";





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
     return  Notiflix.Notify.info('Поле для вводу не заповнено');

    }
    photoServiceApi.resetPage();
    loadMoreBtn.show();
    loadMoreBtn.disabled();
    clearPhotoGallery();

   

    photoServiceApi.fetchApi()
    .then(hits=>{
      if(hits!==[]){
        createGallery(hits);
       
        loadMoreBtn.enable();  
        let gallery= new SimpleLightbox('.gallery a')
console.log(gallery)

        return
      }
      Notiflix.Notify.info('Нічого не знайдено');
     loadMoreBtn.hide()
     return
}
);
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
    <div class="thumb">
      <a href="${items.largeImageURL}">
        <img src="${items.webformatURL}" alt="${items.tags}" title="${items.tags}" loading="lazy"/>
      </a>
    </div>
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
  </div>`).join('')
 
  refs.galleryEl.insertAdjacentHTML('beforeend',markUp)
}

{/* <div class="gallery">
    <a href="images/image1.jpg"><img src="images/thumbs/thumb1.jpg" alt="" title=""/></a>
    <a href="images/image2.jpg"><img src="images/thumbs/thumb2.jpg" alt="" title="Beautiful Image"/></a>
</div> */}

function clearPhotoGallery(){
    refs.galleryEl.innerHTML='';
}



 