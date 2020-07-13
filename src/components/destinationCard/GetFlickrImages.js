const IMAGES_PER_PAGE = 25

const api_base =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search'
const forbiddenWords = [
  'police',
  'car',
  'truck',
  'bus',
  'transport',
  'transportation',
  'metro',
  'train',
  'localtrain',
  'trein',
  'rail',
  'railroad',
  'railway',
  'railogix',
  'railrunner',
  'captrain',
  'CSXT',
  'GNWR',
  'locomotive',
  'plane',
  'air',
  'airplane',
  'airline',
  'airways',
  'aircraft',
  'airport',
  'vessel',
  'ship',
  'fleet',
  'freight',
  'marine',
  'pano',
  'panorama',
  'product',
  'investment',
  'affairs',
  'embassy',
  'minister',
  'candidate',
  'president',
  'meeting',
  'manager',
  'defense',
  'defence',
  'force',
  'department',
  'guard',
  'navy',
  'naval',
  'military',
  'fighter',
  'gun',
  'attack',
  'emergency',
  'fire',
  'burning',
  'smoke',
  'brigade',
  'map',
  'selfie',
  'selfportrait',
  'insect',
  'bird',
  'model',
  'shirtless',
  'fashion',
  'anime',
  'design',
  'store',
  'singer',
  'flower',
  'plant',
  'galaxy',
  'astronomy',
  'stars',
  'cat',
  'katzen',
  'dog',
  'labrador',
  'buddies',
  'christmas',
]

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
const GetFlickrImages = text => {
  return fetch(
    api_base +
    '&api_key=' +
    process.env.REACT_APP_FLICKR_API_KEY +
    '&format=json&nojsoncallback=1' +
    '&per_page=' +
    IMAGES_PER_PAGE +
    '&page=1' +
    '&sort=interestingness-desc' +
    '&safe_search=1' +
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
