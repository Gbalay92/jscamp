import { useEffect, useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { NotFoundPage } from './pages/404.jsx'

const RESULTS_PER_PAGE = 5

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)



  let page = null
  if (currentPath === '/') {
    page = <HomePage />
  } else if (currentPath === '/search') {
    page = <SearchPage />
  } else {
    page = <NotFoundPage />
  }

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  return (
    <>
      <Header />
        {page}
      <Footer />
    </>
  )
}

export default App
