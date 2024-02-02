import { sleep } from '..'
import { proyectosSeed } from '../helpers/dataSeed'

export const getProyectosByLineaId = async (idLinea: number) => {
  await sleep(0.3)
  return proyectosSeed.filter((proyecto) => proyecto.idLinea === idLinea)
}

export const getProyectoById = async (id:number) => {
  await sleep(0.3)
  return proyectosSeed.find(project => project.id === id)
}
