import './css/styles.css';
import { fetchImages } from './fetchImages.js'
import Notiflix from 'notiflix';
import imageCard from './image-card.hbs'


const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onFormSubmit)


function onFormSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.elements.searchQuery.value

    fetchImages(inputValue)
        .then(data => {
            if (parseInt(data.totalHits) > 0) {
                renderImageCard(data)
            } else { Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); }
    })
}


function renderImageCard(data) {
    const markup = imageCard(data.hits)
    refs.gallery.innerHTML = markup;
    
}



   

