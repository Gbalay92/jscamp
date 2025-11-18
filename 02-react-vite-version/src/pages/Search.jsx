import { useState, useEffect } from 'react'
import { Pagination } from '../components/Pagination.jsx'
import { JobList } from '../components/JobList.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import jobsData from '../data.json'

const RESULTS_PER_PAGE = 5

export function SearchPage() {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experience: ''
  })
  const [textFilter, setTextFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredJobs =  textFilter === '' ? jobsData : jobsData.filter((job) => {
    return job.title.toLowerCase().includes(textFilter.toLowerCase())
  })
  

  const jobsAfterFilter = filteredJobs.filter((job) => {
    const matchesTechnology = filters.technology ? job.data.technology.toLowerCase() === filters.technology.toLowerCase() : true
    const matchesLocation = filters.location ? job.location.toLowerCase() === filters.location.toLowerCase() : true
    const matchesExperience = filters.experience ? job.data.nivel.toLowerCase() === filters.experience.toLowerCase() : true

    return matchesTechnology && matchesLocation && matchesExperience
  })

  const pagedResults = jobsAfterFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, //pagina 1: 0-4, pagina 2: 5-9
    currentPage * RESULTS_PER_PAGE //pagina 1: 5, pagina 2: 10
  )
  const totalPages = Math.ceil(jobsAfterFilter.length / RESULTS_PER_PAGE)


  function handlePageChange(newPage) {
    setCurrentPage(newPage)
  }

  const handleSearch = (searchParams) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...searchParams
    }))
    setCurrentPage(1) // Reiniciar a la primera página al cambiar los filtros de búsqueda
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextFilter(newTextToFilter)
    setCurrentPage(1) // Reiniciar a la primera página al cambiar el filtro de texto
  }

  useEffect(() => {
    console.log('effect...') 
    document.title = `DevJobs | Página ${currentPage}`
  }, [currentPage])

  return (
      <main>
          <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
          <section>
            <JobList jobs={pagedResults} />
          </section>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
  )
}

