import './css/styles.css';
import imageCard from './image-card.hbs'
import ImagesAPIService from './fetchImages.js'
import Notiflix from 'notiflix';
import LoadMoreBtn from './load-more-btn.js'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
}
const imageAPIService = new ImagesAPIService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

refs.form.addEventListener('submit', onFormSubmit)
loadMoreBtn.refs.button.addEventListener('click', onLoadMore)

function onFormSubmit(e) {
    e.preventDefault();
    imageAPIService.query = e.target.elements.searchQuery.value;
    
    if (imageAPIService.query === "") {
       return Notiflix.Notify.failure('Sorry, put some text in to area!');
    }
    loadMoreBtn.hide();
    clearImageContainer();
    imageAPIService.resetPage();
    imageAPIService.fetchImages().then(data => {
        if (parseInt(data.totalHits) <= 0) {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
        }
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); 
        renderImageCard(data);
        lightbox()
        loadMoreBtn.show();

    });
    
}


function renderImageCard(data) {
    const markup = imageCard(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    
}


function onLoadMore() {
    imageAPIService.fetchImages().then((data) => {
        
        renderImageCard(data);
        lightbox().refresh();
        pageScroll()
        
        const restOfHits = data.totalHits - imageAPIService.page * 40;
         if (restOfHits<=0) {
             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.",
            {
                timeout: 6000,
            },);
             loadMoreBtn.hide();
        }
    });
    
}

function clearImageContainer() {
    refs.gallery.innerHTML = '';
}
   
function lightbox() {
    let lightBox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: "250ms" });
    return lightBox;
}

function pageScroll() {
    const { height: formHeight } = refs.form.getBoundingClientRect();
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2 + formHeight*2,
  behavior: 'smooth',
});  
}
