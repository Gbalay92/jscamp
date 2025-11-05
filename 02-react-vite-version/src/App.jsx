import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
          <section>
              <img src="./background.webp" alt="background"></img>
          <h1>Encuentra el trabajo de tus sueños</h1>
          <p>Únete a la comunidad más grande de desarrolladores y encuentra tu próxima oportunidad.</p>
          <form id="empleos-search-form" role="search">
              <div>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" viewBox="0 0 24 24" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" /></svg>
                  <input type="text" placeholder="Buscar empleos por título, habilidad o empresa" aria-label="Buscar empleos" id="search-input"/>
                  <button type="submit">Buscar</button>
              </div>
          
          
              <div className="search-filters">
                  <select name="technology" id="filter-technology">
                      <option value="">Tecnología</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="ruby">Ruby</option>
                  </select>
                  <select name="location" id="filter-location">
                      <option value="">Ubicación</option>
                      <option value="remoto">Remoto</option>
                      <option value="madrid">Madrid, España</option>
                      <option value="barcelona">Barcelona, España</option>
                      <option value="valencia">Valencia, España</option>
                  </select>
                  <select name="experience" id="filter-experience">
                      <option value="">Nivel de experiencia</option>
                      <option value="junior">Junior</option>
                      <option value="mid">Mid</option>
                      <option value="senior">Senior</option>
                  </select><br/>
                  <span id="filter-message"></span>      
              </div>
          </form>
          </section>
          <section>
              <h1>Ofertas de empleo para desarrolladores</h1>
              <p>Explora las últimas oportunidades laborales en el mundo del desarrollo web y móvil.</p>
              <div className="listing-jobs">
                      
              </div>
          </section>
          <nav className="pagination" aria-label="pagination">
              <a href="#">&lt;</a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">&gt;</a>
          </nav>
      </main>
      <Footer />
    </>
  )
}

export default App
