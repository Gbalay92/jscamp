import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { JobList } from './components/JobList.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'


function App() {
  const [currentPage, setCurrentPage] = useState(1)

  
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
            <JobList />
          </section>
          <Pagination currentPage={currentPage} totalPages={7} onPageChange={handlePageChange} />
      </main>
      <Footer />
    </>
  )
}

export default App
