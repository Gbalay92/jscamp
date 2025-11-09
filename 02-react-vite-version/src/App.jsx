import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { JobList } from './components/JobList.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import jobsData from './data.json'

const RESULTS_PER_PAGE = 5

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)
  
  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, //pagina 1: 0-4, pagina 2: 5-9
    currentPage * RESULTS_PER_PAGE //pagina 1: 5, pagina 2: 10
  )

function handlePageChange(newPage) {
  console.log('Página cambiada a:', newPage)
  setCurrentPage(newPage)
}
  return (
    <>
      <Header />
      <main>
          <SearchFormSection />
          <section>
            <JobList jobs={pagedResults} />
          </section>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
      <Footer />
    </>
  )
}

export default App
