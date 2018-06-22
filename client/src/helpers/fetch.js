export default function(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(data => callback(data))
    .catch(e => console.error(e));
}
