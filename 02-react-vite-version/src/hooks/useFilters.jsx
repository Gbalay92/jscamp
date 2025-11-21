import { useEffect, useState } from 'react'


const RESULTS_PER_PAGE = 5

export const useFilters = () => {
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experience: ''
  })
  const [textFilter, setTextFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)


  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
        try {
            setLoading(true)
            const response = await fetch('https://jscamp-api.vercel.app/api/jobs')
            const json = await response.json()
            setJobs(json.data)
            setTotal(json.total)
        } catch (error) {
            console.error('Error fetching jobs:', error)
        } finally {
            setLoading(false)
        }
        }
    fetchJobs()
  }, [])

const filteredJobs =  textFilter === '' ? jobs : jobs.filter((job) => {
return job.title.toLowerCase().includes(textFilter.toLowerCase())
})


const jobsAfterFilter = filteredJobs.filter((job) => {

    const techList = Array.isArray(job.data.technology)
  ? job.data.technology
  : [job.data.technology];

    const matchesTechnology = filters.technology
    ? techList.some(t => t.toLowerCase() === filters.technology.toLowerCase())
    : true;
    const matchesLocation = filters.location ? job.ubicacion.toLowerCase() === filters.location.toLowerCase() : true
    const matchesExperience = filters.experience ? job.data.nivel.toLowerCase() === filters.experience.toLowerCase() : true

    return matchesTechnology && matchesLocation && matchesExperience
})

const pagedResults = jobsAfterFilter.slice(
(currentPage - 1) * RESULTS_PER_PAGE, //pagina 1: 0-4, pagina 2: 5-9
currentPage * RESULTS_PER_PAGE //pagina 1: 5, pagina 2: 10
)

  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)


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
  return {
    jobs: pagedResults,
    total,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}