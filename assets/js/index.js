const catalog = document.getElementById('catalog')

fetch('https://striveschool-api.herokuapp.com/api/product/', {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNjc3NWYyNjBjYzAwMTVjYzBlMDAiLCJpYXQiOjE3MjE5ODQ4ODYsImV4cCI6MTcyMzE5NDQ4Nn0.HwAWXnMy17NTOce0k2hIkZsQG-H0NYIMAl_GnJVCm8g',
  },
})
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      throw new Error("Errore nell'ottenimento del catalogo prodotti")
    }
    return response.json()
  })
  .catch((error) => {
    console.log('error', error)
  })
  .then((data) => {
    console.log('catalog', data)
    data.forEach((product) => {
      catalog.innerHTML += `
      <div class="col">
        <div class="card bg-dark" data-bs-theme="dark">
            <img src="${product.imageUrl}" class="card-img-top p-2" alt="" />
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">
                ${product.description}
              </p>
              <a href="product-page.html?id=${product._id}" class="btn btn-primary w-100">DETTAGLI</a>
            </div>
        </div>
      </div>

      `
    })
  })
