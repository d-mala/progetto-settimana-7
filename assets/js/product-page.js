const addressBarParameters = new URLSearchParams(location.search)
const id = addressBarParameters.get('id')
console.log('id:', id)

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjc3NWYyNjBjYzAwMTVjYzBlMDAiLCJpYXQiOjE3MjE5ODQ4ODYsImV4cCI6MTcyMzE5NDQ4Nn0.HwAWXnMy17NTOce0k2hIkZsQG-H0NYIMAl_GnJVCm8g',
  },
})
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      throw new Error("Errore nell'ottenimento del prodotto")
    }
    return response.json()
  })
  .catch((error) => {
    console.log('error', error)
  })
  .then((data) => {
    console.log('product', data)
    console.log('product', data.imageUrl)

    document.getElementById('product-img').src = data.imageUrl
    document.getElementById('product-title').innerHTML = data.name
    document.getElementById('product-description').innerHTML = data.description
    document.getElementById('brand').innerHTML = data.brand
    document.getElementById('price').innerHTML = data.price
    document.getElementById('product-edit-button').href = `backoffice.html?id=${data._id}`
  })

  document.getElementById('product-delete-button').addEventListener('click', () => {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjc3NWYyNjBjYzAwMTVjYzBlMDAiLCJpYXQiOjE3MjE5ODQ4ODYsImV4cCI6MTcyMzE5NDQ4Nn0.HwAWXnMy17NTOce0k2hIkZsQG-H0NYIMAl_GnJVCm8g',
      },
    })
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del prodotto")
        }
        alert('Prodotto eliminato con successo')
        window.location.href = 'backoffice.html'
      })
      .catch((error) => {
        console.log('error', error)
      })
  })