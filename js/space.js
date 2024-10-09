// Función para hacer la solicitud a la API de la NASA
function buscarImagenes(textoDeBusqueda) {
  const url = `https://images-api.nasa.gov/search?q=${textoDeBusqueda}`

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las imágenes de galaxias')
      }
      return response.json()
    })
    .then((data) => {
      mostrarDatos(data.collection.items)
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error)
    })
}

// Función para mostrar los resultados en la página
function mostrarDatos(...data) {  // Usamos rest para aceptar múltiples parámetros
  const resultadosContenedor = document.getElementById('resultados')
  resultadosContenedor.innerHTML = ''

  // Accedemos al primer array de datos que es lo que necesitamos por ahora
  data[0].forEach((item) => {    
    const datosGalaxia = { ...item.data[0] } // Usamos spread para copiar el objeto de los datos de la galaxia

    const { title, description, date_created } = datosGalaxia
    const imageUrl = item.links[0].href

    const card = `
      <div class="col-md-4 d-flex align-items-stretch">
        <div class="card mb-4 shadow-sm d-flex flex-column">
          <img src="${imageUrl}" class="card-img-top img-fluid w-100" alt="" style="height: 150px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${title}</h5>
            <p class="card-text text-start flex-grow-1 scroll">${description}</p>
            <p class="card-text mt-auto"><small class="text-muted">${new Date(date_created).toLocaleDateString()}</small></p>
          </div>
        </div>
      </div>
    `

    resultadosContenedor.innerHTML += card
  })
}

// Función para manejar la búsqueda del usuario
document.getElementById('buscarBtn').addEventListener('click', () => {
  const textoDeBusqueda = document.getElementById('textoDeBusqueda').value

  if (textoDeBusqueda.trim() !== '') {
    buscarImagenes(textoDeBusqueda)
  }
})
