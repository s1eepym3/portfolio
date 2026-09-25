import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

globalThis.prismaGlobal = globalThis.prismaGlobal ?? prismaClientSingleton()

export default globalThis.prismaGlobal

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = globalThis.prismaGlobal
