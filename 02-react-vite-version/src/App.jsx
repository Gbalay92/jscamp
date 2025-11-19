import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { NotFoundPage } from './pages/404.jsx'
import { useRouter } from './hooks/useRouter.jsx'



function App() {
  const { currentPath } = useRouter()

  
  let page = null
  if (currentPath === '/') {
    page = <HomePage />
  } else if (currentPath === '/search') {
    page = <SearchPage />
  } else {
    page = <NotFoundPage />
  }


return (
    <>
      <Header />
        {page}
      <Footer />
    </>
  )
}

export default App
