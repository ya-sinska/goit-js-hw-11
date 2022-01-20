const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '25289922-76fc98c8dd80f80668ef47aa3'
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: "horizontal",
  safesearch: 'true',
  per_page: 40
});

export default class ImagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
   }

  fetchImages() {
    console.log(this)
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${searchParams}&page=${this.page}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
      .then((data) => {
        this.incrementPage();
        return data;
        
    })
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

}

