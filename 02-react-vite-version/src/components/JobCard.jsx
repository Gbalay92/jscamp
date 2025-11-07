import { useState } from 'react'

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false)

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
                <h3>{job.title}</h3>
                <h4>{job.company} | {job.location}</h4>
            </div>
            <p>{job.description}</p>
            <button 
            disabled={isApplied === true}
            className={`apply-button-job ${isApplied ? 'is-applied' : ''}`}
            onClick={handleApplyClick}>{buttonText}</button>
        </article>
    )
}