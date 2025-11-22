import { JobCard } from "./JobCard.jsx"

export function JobList({jobs}) {

  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="listing-jobs">
        {
        jobs.length === 0 && <p>No se encontraron empleos que coincidan con los criterios de búsqueda.</p>
        }
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}
