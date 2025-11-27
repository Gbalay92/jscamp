import { use, useEffect, useState } from 'react'
import { useRouter } from './useRouter.jsx'



const RESULTS_PER_PAGE = 5

export const useFilters = () => {
    const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return {
        technology: params.get('technology') || '',
        location: params.get('location') || '',
        experience: params.get('experience') || '' 
    }})

  const [textFilter, setTextFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('text') || ''
  })

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = parseInt(params.get('page') || '1', 10)
    return isNaN(page) || page < 1 ? 1 : page
  })

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || textFilter !== ''
  const handleClearFilters = () => {
    setFilters({
        technology: '',
        location: '',
        experience: ''
    })
    setTextFilter('')
    setCurrentPage(1)
  }

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
        try {
            setLoading(true)

            const params = new URLSearchParams()
            if (textFilter) params.append('text', textFilter)
            if (filters.technology) params.append('technology', filters.technology)
            if (filters.location) params.append('type', filters.location)
            if (filters.experience) params.append('level', filters.experience)

            const offset = (currentPage - 1) * RESULTS_PER_PAGE
            params.append('limit', RESULTS_PER_PAGE)
            params.append('offset', offset)
            const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${params.toString()}`)
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
  }, [textFilter, filters, currentPage])

/*const filteredJobs =  textFilter === '' ? jobs : jobs.filter((job) => {
return job.titulo.toLowerCase().includes(textFilter.toLowerCase())
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

const pagedResults = jobs.slice(
(currentPage - 1) * RESULTS_PER_PAGE, //pagina 1: 0-4, pagina 2: 5-9
currentPage * RESULTS_PER_PAGE //pagina 1: 5, pagina 2: 10
)
*/
  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)


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

  const { navigateTo } = useRouter()
  useEffect(() => {
    const params = new URLSearchParams()
    if (textFilter) params.append('text', textFilter)
    if (filters.technology) params.append('technology', filters.technology)
    if (filters.location) params.append('location', filters.location)
    if (filters.experience) params.append('experience', filters.experience)
    if (currentPage>1) params.append('page', currentPage)

    const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : `${window.location.pathname}`
    navigateTo(newURL)
  }, [filters, textFilter, currentPage, navigateTo])


  return {
    jobs,
    total,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    hasActiveFilters,
    handleClearFilters,
    textFilter
  }
}