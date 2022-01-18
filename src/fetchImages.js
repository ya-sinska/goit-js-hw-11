const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '25289922-76fc98c8dd80f80668ef47aa3'
const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: "horizontal",
    safesearch: 'true'
});

export function fetchImages (imageName) {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${imageName}&${searchParams}`)
    .then(response => {
      if (response.ok) {
        return response.json() 
      }
    })
}
