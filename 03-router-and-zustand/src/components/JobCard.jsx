import { useState } from 'react'
import { Link } from './Link'
import styles from './JobCard.module.css'
import { useFavoritesStore } from '../store/favoritesStore.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function JobCardFavoriteButton({ job }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  return (
        <button onClick={() => toggleFavorite(job.id)}> {isFavorite(job.id) ? '❤️' : '🤍'}</button> 
      )
}

function JobCardApplyButton({ jobId, isLoggedIn }) {
  const [isApplied, setIsApplied] = useState(false)
  const buttonClasses = (isApplied && isLoggedIn) ? 'apply-button-job is-applied' : 'apply-button-job'
  const buttonText = (isApplied && isLoggedIn) ? 'Aplicado' : 'Aplicar'
  const handleApplyClick = () => {
    setIsApplied(true)
  }
  return (
        <button 
        disabled={isApplied === true || !isLoggedIn}
        className={buttonClasses}
        onClick={handleApplyClick}>{buttonText}</button> 
  )
}

export function JobCard({ job }) {
  const { isLoggedIn } = useAuth();

    return (
        <article 
            data-modalidad={job.data?.modalidad}
            className="job">
            <div>
                <h3>
                  <Link className={styles.link} href={`/job/${job.id}`}>{job.titulo}</Link>
                </h3>
                <h4>{job.empresa} | {job.ubicacion}</h4>
            </div>
            <p>{job.descripcion}</p>  
            <JobCardApplyButton jobId={job.id} isLoggedIn={isLoggedIn} />   
            {
              isLoggedIn && <JobCardFavoriteButton job={job} />
            }
        </article>
    )
}