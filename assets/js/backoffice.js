class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

const id = new URLSearchParams(location.search).get('id')

console.log('id:', id)

const toastAddProduct = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastAddProduct)

if (id) {
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
      document.getElementById('name').value = data.name
      document.getElementById('description').value = data.description
      document.getElementById('brand').value = data.brand
      document.getElementById('imageUrl').value = data.imageUrl
      document.getElementById('price').value = data.price
    })
}

const productForm = document.getElementById('product-form')

productForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = document.getElementById('name').value
  const description = document.getElementById('description').value
  const brand = document.getElementById('brand').value
  const imageUrl = document.getElementById('imageUrl').value
  const price = document.getElementById('price').value

  const newProduct = new Product(name, description, brand, imageUrl, price)

  console.log(newProduct)

  const fetchMode = id ? 'PUT' : 'POST'

  const url = id
    ? `https://striveschool-api.herokuapp.com/api/product/${id}`
    : 'https://striveschool-api.herokuapp.com/api/product'

  console.log('mode:', fetchMode)

  fetch(url, {
    method: fetchMode,
    body: JSON.stringify(newProduct),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjc3NWYyNjBjYzAwMTVjYzBlMDAiLCJpYXQiOjE3MjE5ODQ4ODYsImV4cCI6MTcyMzE5NDQ4Nn0.HwAWXnMy17NTOce0k2hIkZsQG-H0NYIMAl_GnJVCm8g',
    },
  })
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        throw new Error("Errore nell'inserimento del prodotto")
      }
      if (id) {
        document.getElementById('toast-message').innerHTML =
          'Prodotto modificato con successo'
          toastBootstrap.show()
      } else {
        document.getElementById('toast-message').innerHTML =
          'Prodotto creato con successo'
        toastBootstrap.show()
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
})
