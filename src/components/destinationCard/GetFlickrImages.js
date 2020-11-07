import forbiddenWords from 'assets/constants/ForbiddenFlickrWords'

const IMAGES_PER_PAGE = 25

const api_base =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search'

// assemble image URL from fetched photos.search result
const getFlickrImageURL = item => {
  return (
    'https://farm' +
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

// assemble an attribution link from fetched photos.search result
const getFlickrAttributionLink = item => {
  return 'https://www.flickr.com/photos/' + item.owner + '/' + item.id
}

// Create JavaScript Promise by returning the call to `fetch()`
const GetFlickrImages = (text, images_per_page = IMAGES_PER_PAGE) => {
  return fetch(
    api_base +
    '&api_key=' +
    process.env.REACT_APP_FLICKR_API_KEY +
    '&format=json&nojsoncallback=1' +
    '&per_page=' +
    images_per_page +
    '&page=1' +
    '&sort=interestingness-desc' +
    '&safe_search=1' +
    // '&license=4,5,7,8,9,10' + // commercial use & mods allowed
    // '&license=4,5,6,7,8,9,10' + // use commercial licenses only
    '&license=1,2,3,4,5,6,7,8,9,10' + // adding non-commercial licenses
      '&content_type=1' +
      '&media=photos' +
      '&extras=owner_name' +
      '&text=' +
      text +
      // exclude the following words from the text search:
      ' -' +
      forbiddenWords.join(' -'),
  )
    .then(response => response.json())
    .then(result => {
      if (result.photos.photo.length > 0) {
        return result.photos.photo.map(photo => {
          return {
            label: photo.title,
            imgPath: getFlickrImageURL(photo),
            owner: photo.ownername,
            attributionLink: getFlickrAttributionLink(photo),
          }
        })
      } else {
        return [
          {
            label: 'No images found for this destination',
            imgPath:
              'https://i5.walmartimages.com/asr/149cba03-f389-471b-bf4e-a00235d08b58_1.08ec992f931fa4be05c41bc664fdc6b1.jpeg',
            // owner not defined so that carousel caption isn't displayed
          },
        ]
      }
    })
}

export default GetFlickrImages
