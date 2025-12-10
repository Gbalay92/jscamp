import { lazy } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Contact } from './pages/Contact.jsx'
import { Routes, Route } from 'react-router'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const JobDetail = lazy(() => import('./components/Detail.jsx'))

function App() {

  return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/job/:jobId" element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </>
    )
  }

export default App
