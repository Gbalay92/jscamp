export class JobsController {
    static async getAll(req, res) {
        console.log('req.query:', req.query) // Log query parameters, in the url after '?', example: /get-jobs?location=NYC&fulltime=true
          const { text, title, level, limit = 10, technology, offset = 0} = req.query
          let filteredJobs = jobs
          if (text) {
            const lowerText = text.toLowerCase()
            filteredJobs = filteredJobs.filter(job =>
              job.title.toLowerCase().includes(lowerText) ||
              job.company.toLowerCase().includes(lowerText) ||
              job.description.toLowerCase().includes(lowerText)
            )
          } 
          if (title) {
            const lowerTitle = title.toLowerCase()
            filteredJobs = filteredJobs.filter(job => 
              job.title.toLowerCase().includes(lowerTitle)
            )
          }
          if (technology) {
            const lowerTech = technology.toLowerCase()
            filteredJobs = filteredJobs.filter(job => 
              job.technologies.some(tech => tech.toLowerCase() === lowerTech)
            )
          }
          //etc...
        
          limitNumber = Number(limit) || filteredJobs.length
          offsetNumber = Number(offset) || 0
          paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)
          return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber })
    }
}