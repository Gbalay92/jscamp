import { useState } from "react"

export function JobList({ job }) {
  const [isApplied, setIsApplied] = useState(false)

  const handleApplyClick = () => {
    setIsApplied(true)
  }

  const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
  const buttonText = isApplied ? 'Aplicado' : 'Aplicar'

  return (
    <>
      <h2>Resultados de búsqueda</h2>
      <div className="listing-jobs">
        
      </div>
    </>
  )
}