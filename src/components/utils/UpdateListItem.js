// Adds or removes an item from a list
export default function updateListItem(list, id) {
  return list.includes(id) ? list.filter(item => item !== id) : [...list, id]
}
