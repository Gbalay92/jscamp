import  os  from 'node:os'
import ms from 'ms'

console.log('Platform:', os.platform())
console.log('CPU Architecture:', os.arch())
console.log('Number of CPUs:', os.cpus().length)
console.log('Uptime (ms):', os.uptime())
console.log('Uptime (formatted):', ms(os.uptime() * 1000))
console.log('Total Memory (MB):', os.totalmem() / (1024 * 1024))
console.log('Free Memory (MB):', os.freemem() / (1024 * 1024))