import prisma from '../lib/prisma'
import { initialData } from './seed'

// !la base datos debe estar vacía y las  secuencias de autoincrement en 1
async function main() {
  await prisma.tag.createMany({
    data: initialData.tags,
  })
  await prisma.sello.createMany({
    data: initialData.sellos,
  })
  await prisma.region.createMany({
    data: initialData.regiones,
  })
  await prisma.user.createMany({
    data: initialData.users,
  })
  await prisma.imagen.createMany({
    data: initialData.images,
  })
  await prisma.convenio.createMany({
    data: initialData.convenios,
  })
  await prisma.autor.createMany({
    data: initialData.autores,
  })
  await prisma.linea.createMany({
    data: initialData.lineas,
  })
  await prisma.programa.createMany({
    data: initialData.programas,
  })
  await prisma.proyecto.createMany({
    data: initialData.proyectos,
  })

  

  console.log('Seed ejecutado correctamente')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
})()
