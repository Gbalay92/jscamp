import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

let content = ''
if(process.permissions.has('fs-read', './file.txt')) {
    content = await readFile('./file.txt', 'utf-8')
} else {
    throw new Error('No permission to read file.txt')
}


if(!process.permissions.has('fs-write', './outputDir')) {
    throw new Error('No permission to write to outputDir')
} else {
    const outputDir = join('outputDir', 'files', 'docs')
    await mkdir(outputDir, { recursive: true })

    await writeFile(join(outputDir, 'file2.txt'), content.toUpperCase())
}
    