import jobs from '../jobs.json' with { type: 'json' }

export class Job {
    static async getAll({ text, title, level, limit = 10, technology, offset = 0}) {
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
          const limitNumber = Number(limit) || filteredJobs.length
          const offsetNumber = Number(offset) || 0
          const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)
          return { data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber }
    }
}
