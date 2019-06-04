const api_key = '5858b1c4c74d4d00bd389247affb51ff'
// api: https://www.flickr.com/services/api/flickr.photos.search.html
const api_base =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='

// assemble image URL from fetched photos.search result
const imageURL = item => {
  return (
    'http://farm' +
    item.farm +
    '.staticflickr.com/' +
    item.server +
    '/' +
    item.id +
    '_' +
    item.secret +
    '.jpg'
  )
}

// Create JavaScript Promise by returning the call to `fetch()`
const GetFlickrImage = text => {
  return fetch(
    api_base +
      api_key +
      '&format=json&nojsoncallback=1' +
      '&per_page=5' +
      '&sort=interestingness-desc' +
      '&safe_search=2' +
      '&licence=4,5,6,7' +
      '&content_type=1' +
      '&media=photos' +
      '&text=' +
      // search = self.name + " " + self.country
      text,
  )
    .then(response => response.json())
    .then(result => imageURL(result.photos.photo[0]))
}

export default GetFlickrImage
