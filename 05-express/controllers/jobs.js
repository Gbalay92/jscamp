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

    static async getById(req, res) {
      const jobId = parseInt(req.params.id, 10)
        const job = jobs.find(job => job.id === jobId)
        if (!job) {
          return res.status(404).json({ error: 'Job not found' })
        }
        return res.json(job)
    }

    static async deleteById(req, res) {
      //TODO
    }

    static async create(req, res) {
      const { title, company, description, technologies, data } = req.body
      const newJob = {
        id: crypto.randomUUID(),
        title,
        company,
        description,
        technologies,
        data
      }
    
      jobs.push(newJob)
      return res.status(201).json(newJob)
    }

    static async updateById(req, res) {
      const jobId = req.params.id
      const jobIndex = jobs.findIndex(job => job.id === jobId)
      if (jobIndex === -1) {
        return res.status(404).json({ error: 'Job not found' })
      }
      const { title, company, description, technologies, data } = req.body
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        title,
        company,
        description,
        technologies,
        data
      }
      return res.json(jobs[jobIndex])
    }

    static async patchById(req, res) {
      const jobId = req.params.id
      const jobIndex = jobs.findIndex(job => job.id === jobId)
      if (jobIndex === -1) {
        return res.status(404).json({ error: 'Job not found' })
      }
      const { title, company, description, technologies, data } = req.body
      jobs[jobIndex] = {
        ...jobs[jobIndex],
        ...(title && { title }),
        ...(company && { company }),
        ...(description && { description }),
        ...(technologies && { technologies }),
        ...(data && { data })
      }
      return res.json(jobs[jobIndex])
    }

}