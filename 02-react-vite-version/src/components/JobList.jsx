import { JobCard } from "./JobCard.jsx"

export function JobList({jobs}) {

  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="listing-jobs">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}
