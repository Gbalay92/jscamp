import { readdir, stat } from 'node:fs/promises'
import { format } from 'node:path'

//1. Get directory from command line arguments or use current directory
const dir = process.argv.slice[2] ?? '.'

//2. Function to format bytes to human-readable string
const formatBytes = (bytes) => {
    if(bytes < 1024) return bytes + ' B'
    return formatBytes(bytes / 1024) + ' KB'
}

//3. Read directory contents, no info yet
const files = await readdir(dir)

//4. Get info about each file
const entries = Promise.all(
    files.map(async (file) => {
        const filePath = `${dir}/${file}`
        const fileStat = await stat(filePath)
        return {
            name: file,
            isDirectory: fileStat.isDirectory(),
            size: formatBytes(fileStat.size)
        }
    })
)

//5. Display file info
for (const entry of await entries) {
    console.log(`${entry.isDirectory ? '📁' : '📄'} ${entry.name.padEnd(25)} - ${entry.size}`)
}