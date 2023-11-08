import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

// prisma.$on('query', async e => {
//   console.log(`${e.query} ${e.params}`)
// })

export { prisma }
