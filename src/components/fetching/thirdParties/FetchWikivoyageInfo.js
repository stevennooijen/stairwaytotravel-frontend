const fetchWikivoyageInfo = pageid => {
  return fetch(
    'https://en.wikivoyage.org/w/api.php?' +
      'origin=*' +
      '&action=query' +
      '&format=json' +
      '&prop=extracts' +
      '&explaintext' +
      '&exlimit=1' +
      '&pageids=' +
      pageid,
    {
      method: 'GET',
    },
  )
    .then(response => response.json())
    .then(data => {
      return data.query.pages[pageid].extract.split('==')[0]
    })
}

export default fetchWikivoyageInfo
