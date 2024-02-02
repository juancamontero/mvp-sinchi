// 'use server'
import { getProyectoById } from '..'
import { lineasSeed, proyectosSeed } from '../helpers/dataSeed'

export const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const getLineaById = (id: number) => {
  //   await sleep(1)

  return lineasSeed.find((linea) => linea.id === id)
}

export const getAllLineas = async () => {
  sleep(0.15)

  return lineasSeed
}

export const getLineaByProyectoId = async (idProject: number) => {
  const project = await getProyectoById(idProject)
  
  
  return getLineaById(project?.idLinea || 0)
}
