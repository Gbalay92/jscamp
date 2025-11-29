import { useParams } from "react-router"

export function JobDetail() {
  const { jobId } = useParams()

  return (
    <>
      <h2>Job Detail Page</h2>
      <p>Job ID: {jobId}</p>
    </>
  )
}