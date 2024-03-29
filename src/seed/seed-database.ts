import prisma from '../lib/prisma'
import { initialData } from './seed'

// !la base datos debe estar vacía y las  secuencias de autoincrement en 1
async function main() {
  // * 1. Imagenes destacadas
  await prisma.imagen.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Imagen_id_seq" RESTART WITH ${Number(
      initialData.images[0].id
    )}`
  )
  await prisma.imagen.createMany({
    data: initialData.images,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Imagen_id_seq" RESTART WITH ${Number(
      initialData.images[initialData.images.length - 1].id + 1
    )}`
  )

  //* 2. Tags
  await prisma.tag.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Tag_id_seq" RESTART WITH ${Number(
      initialData.tags[0].id
    )}`
  )
  await prisma.tag.createMany({
    data: initialData.tags,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Tag_id_seq" RESTART WITH ${Number(
      initialData.tags[initialData.tags.length - 1].id + 1
    )}`
  )

  //* 3. Sellos
  await prisma.sello.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Sello_id_seq" RESTART WITH ${Number(
      initialData.sellos[0].id
    )}`
  )
  await prisma.sello.createMany({
    data: initialData.sellos,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Sello_id_seq" RESTART WITH ${Number(
      initialData.sellos[initialData.sellos.length - 1].id + 1
    )}`
  )

  //* 4. Regiones
  await prisma.region.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Region_id_seq" RESTART WITH ${Number(
      initialData.regiones[0].id
    )}`
  )
  await prisma.region.createMany({
    data: initialData.regiones,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Region_id_seq" RESTART WITH ${Number(
      initialData.regiones[initialData.regiones.length - 1].id + 1
    )}`
  )

  //* 5. Users
  await prisma.user.deleteMany()
  await prisma.user.createMany({
    data: initialData.users,
  })

  //* 6. Aliados / convenios
  await prisma.convenio.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Convenio_id_seq" RESTART WITH ${Number(
      initialData.convenios[0].id
    )}`
  )
  await prisma.convenio.createMany({
    data: initialData.convenios,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Convenio_id_seq" RESTART WITH ${Number(
      initialData.convenios[initialData.convenios.length - 1].id + 1
    )}`
  )

  //* 7. Autores / investigadores
  await prisma.autor.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Autor_id_seq" RESTART WITH ${Number(
      initialData.autores[0].id
    )}`
  )
  await prisma.autor.createMany({
    data: initialData.autores,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Autor_id_seq" RESTART WITH ${Number(
      initialData.autores[initialData.autores.length - 1].id + 1
    )}`
  )

  //* 8. Lineas
  await prisma.linea.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Linea_id_seq" RESTART WITH ${Number(
      initialData.lineas[0].id
    )}`
  )
  await prisma.linea.createMany({
    data: initialData.lineas,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Linea_id_seq" RESTART WITH ${Number(
      initialData.lineas[initialData.lineas.length - 1].id + 1
    )}`
  )

  //* 9. Programas
  await prisma.programa.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Programa_id_seq" RESTART WITH ${Number(
      initialData.programas[0].id
    )}`
  )
  await prisma.programa.createMany({
    data: initialData.programas,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Programa_id_seq" RESTART WITH ${Number(
      initialData.programas[initialData.programas.length - 1].id + 1
    )}`
  )

  //* 10. Proyectos
  await prisma.proyecto.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Proyecto_id_seq" RESTART WITH ${Number(
      initialData.proyectos[0].id
    )}`
  )
  await prisma.proyecto.createMany({
    data: initialData.proyectos,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Proyecto_id_seq" RESTART WITH ${Number(
      initialData.proyectos[initialData.proyectos.length - 1].id + 1
    )}`
  )

  //* 11. Imagenes indicadores
  await prisma.imagenIndicadores.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "ImagenIndicadores_id_seq" RESTART WITH ${Number(
      initialData.imagenesIndicadores[0].id
    )}`
  )
  await prisma.imagenIndicadores.createMany({
    data: initialData.imagenesIndicadores,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "ImagenIndicadores_id_seq" RESTART WITH ${Number(
      initialData.imagenesIndicadores[
        initialData.imagenesIndicadores.length - 1
      ].id + 1
    )}`
  )

  //* 12. Mapas
  await prisma.mapasUbicacion.deleteMany()
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "MapasUbicacion_id_seq" RESTART WITH ${Number(
      initialData.mapas[0].id
    )}`
  )
  await prisma.mapasUbicacion.createMany({
    data: initialData.mapas,
  })
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "MapasUbicacion_id_seq" RESTART WITH ${Number(
      initialData.mapas[initialData.mapas.length - 1].id + 1
    )}`
  )

  //* 13. Multimedia
  // todo
  // await prisma.multimedia.deleteMany()
  // await prisma.$executeRawUnsafe(
  //   `ALTER SEQUENCE "Multimedia_id_seq" RESTART WITH ${Number(
  //     initialData.medios[0].id - 1
  //   )}`
  // )
  // await prisma.multimedia.createMany({
  //   data: initialData.medios,
  // })
  // await prisma.$executeRawUnsafe(
  //   `ALTER SEQUENCE "Multimedia_id_seq" RESTART WITH ${Number(
  //     initialData.medios[initialData.medios.length - 1].id + 1
  //   )}`
  // )

  

  console.log('Seed ejecutado correctamente')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
})()
