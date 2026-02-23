import * as zod from 'zod'

// TypeScript runs at compile time,
// Zod runs at runtime,
// so it's a good option to validate data at runtime, such as data we receive in a REST API
const jobSchema = zod.object({
    titulo: zod.string().min(1, 'Title is required'),
    empresa: zod.string().min(1, 'Company is required'),
    descripcion: zod.string().min(1, 'Description is required'),
    ubicacion: zod.string().min(1, 'Location is required'),
    data: zod.object({
        technologies: zod.array(zod.string()).min(1, 'At least one technology is required'),
        modalidad: zod.string().optional(),
        nivel: zod.boolean().optional()
    }).optional()
})

export function validateJob(data) {
    return jobSchema.safeParse(data)
}

// This function allows us to validate only some of the fields, for example when we want to update a job, we don't want to require all the fields, only the ones that are being updated
export function validateParcialJob(data) {
    return jobSchema.partial().safeParse(data)
}