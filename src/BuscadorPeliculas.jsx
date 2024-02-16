import { useState } from "react"

export const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'b5cbb3c7f7a1d076d2c99548eacdd4f9'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)
    }

    const fetchPeliculas = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()

            setPeliculas(data.results)
            
        } catch (error) {
            console.error("Ocurrio el siguiente error: " + error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchPeliculas()
    }

    return (
        <div className="container">
            <h1 className="title">Buscador de Peliculas</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Escribir una pelicula" value={busqueda} onChange={handleInputChange} />
                <button type="submit" className="search-button">Buscar</button>
            </form>

            <div className="movie-list">
                {peliculas.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
