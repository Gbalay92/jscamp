import { useId } from "react"
import { useState } from "react"


let timeoutRef = null 

export function SearchFormSection({onSearch, onTextFilter, hasActiveFilters, handleClearFilters}) {
    const searchInputText = useId()
    const searchInputTecnology = useId()
    const searchInputLocation = useId()
    const searchInputExperience = useId()

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const filters = {
            technology: formData.get(searchInputTecnology),
            location: formData.get(searchInputLocation),
            experience: formData.get(searchInputExperience)
        }

        onSearch(filters)
    }

    const handleSearchFilter = (event) => {
        event.preventDefault()
        const {name, value} = event.target
        const filters = {
            [name]: value,
        }
        onSearch(filters)
    }

    const handleTextChange = (event) => {
        const inputValue = event.target.value
        console.log(inputValue)
        //Debounce logic - cancelar evento anterior
        if (timeoutRef) {
            clearTimeout(timeoutRef)
        }

        timeoutRef = setTimeout(() => {
            onTextFilter(inputValue)
        }, 500)
        //onTextFilter(inputValue)
    }

    const [experience, setExperience] = useState("");
    const [technology, setTechnology] = useState("");
    const [location, setLocation] = useState("");
    const clearFilers = () => {
        handleClearFilters()
        setExperience("");
        setTechnology("");
        setLocation("");
    }

  return (
    <>
        <section>
              <img src="./background.webp" alt="background"></img>
          <h1>Encuentra el trabajo de tus sueños</h1>
          <p>Únete a la comunidad más grande de desarrolladores y encuentra tu próxima oportunidad.</p>
          <form onSubmit={handleSubmit} id="empleos-search-form" role="search">
              <div className="search-bar">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" /></svg>
                  <input name={searchInputText} type="text" placeholder="Buscar empleos por título, habilidad o empresa" aria-label="Buscar empleos" id="search-input"
                    onChange={handleTextChange}/>
                  <button type="submit">Buscar</button>
              </div>
          
          
              <div className="search-filters">
                  <select value={technology} onChange={handleSearchFilter} name="technology" id={searchInputTecnology}>
                      <option value="">Tecnología</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="ruby">Ruby</option>
                  </select>
                  <select value={location} onChange={handleSearchFilter} name="location" id={searchInputLocation}>
                      <option value="">Ubicación</option>
                      <option value="remoto">Remoto</option>
                      <option value="madrid">Madrid, España</option>
                      <option value="barcelona">Barcelona, España</option>
                      <option value="valencia">Valencia, España</option>
                  </select>
                  <select value={experience} onChange={handleSearchFilter} name="experience" id={searchInputExperience}>
                      <option value="">Nivel de experiencia</option>
                      <option value="junior">Junior</option>
                      <option value="mid">Mid</option>
                      <option value="senior">Senior</option>
                  </select>
                  {
                    hasActiveFilters &&
                    <button type="button" onClick={clearFilers} className="clear-filters-button">Limpiar</button>
                  }
                  <span id="filter-message"></span>      
              </div>
          </form>
        </section>
    </>
  )}