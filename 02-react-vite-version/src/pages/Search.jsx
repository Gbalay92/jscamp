import { useEffect } from 'react'
import { Pagination } from '../components/Pagination.jsx'
import { JobList } from '../components/JobList.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { useFilters } from '../hooks/useFilters.jsx'


export function SearchPage() {
  const {
    jobs,
    currentPage,
    loading,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    hasActiveFilters,
    handleClearFilters
  } = useFilters()

  useEffect(() => {
    document.title = `DevJobs | Página ${currentPage}`
  }, [currentPage])

  return (
      <main>
          <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} hasActiveFilters={hasActiveFilters} handleClearFilters={handleClearFilters} />
          <section>
            {
                loading ? <p>Cargando empleos...</p> : <JobList jobs={jobs} />
            }            
          </section>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
  )
}

