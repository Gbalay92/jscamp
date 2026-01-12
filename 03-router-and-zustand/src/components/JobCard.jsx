import { useState } from 'react'
import { Link } from './Link'
import styles from './JobCard.module.css'
import { useFavoritesStore } from '../store/favoritesStore.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false)
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { isLoggedIn } = useAuth();
  const handleApplyClick = () => {
    setIsApplied(true)
  }

  const buttonClasses = isApplied ? 'apply-button-job is-applied' : 'apply-button-job'
  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

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
            <button 
            disabled={isApplied === true}
            className={buttonClasses}
            onClick={handleApplyClick}>{buttonText}</button>            
            {
             isLoggedIn ? 
             <button onClick={() => toggleFavorite(job.id)}> {isFavorite(job.id) ? '❤️' : '🤍'}</button> : null
            }
        </article>
    )
}