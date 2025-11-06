import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { JobList } from './components/JobList.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'


function App() {
  return (
    <>
      <Header />
      <main>
          <SearchFormSection />
          <section>
            <JobList />
          </section>
          <Pagination currentPage={1} totalPages={5} onPageChange={(page) => console.log(page)} />
      </main>
      <Footer />
    </>
  )
}

export default App
