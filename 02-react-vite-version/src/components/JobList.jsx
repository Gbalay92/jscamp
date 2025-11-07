import jobsData from '../data.json'
import { JobCard } from "./JobCard.jsx"

export function JobList() {

  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="listing-jobs">
        {jobsData.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}
