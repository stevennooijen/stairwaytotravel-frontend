import queryString from 'query-string'

export default function pushUrlWithQueryParams(queryParams, props) {
  props.history.push(
    props.location.pathname + '?' + queryString.stringify(queryParams),
  )
}
