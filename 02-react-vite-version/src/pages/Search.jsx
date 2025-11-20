import { useEffect } from 'react'
import { Pagination } from '../components/Pagination.jsx'
import { JobList } from '../components/JobList.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { useFilters } from '../hooks/useFilters.jsx'


export function SearchPage() {
  const {filters,
    textFilter,
    currentPage,
    pagedResults,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter} = useFilters()

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

