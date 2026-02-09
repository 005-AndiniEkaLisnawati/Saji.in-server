import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllPromos = () => {
  return prisma.promos.findMany()
}

export const createPromo = (data) => {
  return prisma.promos.create({ data })
}

export const updatesPromo = (id_promos, data) => {
  return prisma.promos.update({
    where: { id_promos },
    data
  })
}

export const deletePromo = (id_promos) => {
  return prisma.promos.delete({
    where: { id_promos }
  })
}