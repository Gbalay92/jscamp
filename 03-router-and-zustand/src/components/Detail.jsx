import { useParams } from "react-router"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import styles from './Detail.module.css'

export function JobDetail() {
  const { jobId } = useParams()
	const navigate = useNavigate()
  
	const [job, setJob] = useState(null)
	const [loading, setLoading] = useState(false)
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
      <h2>Job Detail Page</h2>
      <p>Job ID: {jobId}</p>
    </>
  )
}