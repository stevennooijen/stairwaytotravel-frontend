const fetchWikivoyageLinks = pageid => {
  return fetch(
    'https://en.wikivoyage.org/w/api.php?' +
      'origin=*' +
      '&action=query' +
      '&format=json' +
      '&prop=info' +
      '&inprop=url' +
      '&pageids=' +
      pageid,
    {
      method: 'GET',
    },
  )
    .then(response => response.json())
    .then(data => {
      return {
        pageUrl: data.query.pages[pageid].fullurl,
        revisionUrl: data.query.pages[pageid].editurl.slice(0, -4) + 'history',
      }
    })
}

export default fetchWikivoyageLinks
