'use server'

export const getAllInvestigadoresForm = async () => {
  try {
    const users = await prisma.autor.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return users
  } catch (error) {
    throw new Error(`getAllInvestigadoresForm ${error}`)
  }
}
