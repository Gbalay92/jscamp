import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'


const content = await readFile('./file.txt', 'utf-8')

const outputDir = join('outputDir', 'files', 'docs')
await mkdir(outputDir, { recursive: true })

await writeFile(join(outputDir, 'file2.txt'), content.toUpperCase())