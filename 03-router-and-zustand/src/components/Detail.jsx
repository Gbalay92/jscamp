import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from "./Link"
import snarkdown from 'snarkdown'
import styles from './Detail.module.css'

function JobSection({ title, content }) {
	const htmlContent = snarkdown(content)
	return (
		<section className={styles.section}>
		<h2 className={styles.sectionTitle}>{title}</h2>
				<div className={`${styles.sectionContent} prose`} dangerouslySetInnerHTML={{ __html: htmlContent }}>
				</div>
		</section>
  )
}

export default function JobDetail({ isLoggedIn }) {
  	const { jobId } = useParams()
	const navigate = useNavigate()
  
	const [job, setJob] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
  useEffect(() => {
    // Fetch job details using jobId
    fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        } else {
        	return response.json()
		}	
      })
      .then(data => setJob(data))
			.catch(err => setError(err))
			.finally(() => setLoading(false))
  }, [jobId])

	if (loading) {
		return <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
			<div className={styles.loading}>
				<p className={styles.loadingText}>Loading...</p>
			</div>
		</div>
	}

	if (error) {
		return <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
			<div className={styles.error}>
				<p className={styles.errorTitle}>Error: Oferta no encontrada</p>
			</div>
			<button onClick={() => navigate('/')}
				className={styles.errorButton}>

			</button>
		</div>
	}
  return (
    <>
		<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
			<div className={ styles.container }>
				<nav className={ styles.breadcrumb}>
					<Link
						href="/search"
						className={ styles.breadcrumbButton}>
							Empleos
					</Link>
					<span className={ styles.breadcrumbSeparator}></span>
					<span className={ styles.breadcrumbCurrent }>{ job?.titulo }</span>
				</nav>
			</div>

			<header className={ styles.header }>
				<h1 className={ styles.title }>{ job?.titulo }</h1>
				<p className={ styles.meta }>{ job?.empresa } · { job?.ubicacion }</p>
			</header>

			<button disabled={!isLoggedIn} className={styles.applyButton}>
				{isLoggedIn ? "Aplicar" : "Inicia sesión para aplicar"}
			</button>

			
			<JobSection title="Descripción del puesto" content={job?.content?.description} />
			<JobSection title="Responsabilidades" content={job?.content?.responsibilities} />
			<JobSection title="Requisitos" content={job?.content?.requirements} />
			<JobSection title="Acerca de la empresa" content={job?.content?.about} />
		</div>
    </>
  )
}