// * Actions Reports
export { getAllConvenios, getConvenioById } from './convenios/convenios-report'
export { deleteLinea, getAllLineas, getLineaById, getLineaByProyectoId } from './lineas/lineas-report'
export { getAllInvestigadores, getInvestigadorById} from './investigadores/investigadores-report'
export { getAllProgramas, getProgramaById } from './programas/programas-report'
export { getAllProjects, getProjectsByConvenioId, getProjectsByInvestigadorId , getProjectsByRegionId, getProjectsByTagId, getProyectoById, getProyectosByLineaId, getProyectosByProgramaId} from './proyectos/proyectos-report'
export { getAllTags, getTagById } from './tags/tags-report'
export { getAllRegiones, getRegionById } from './regiones/regiones-report'

// * Actions Forms
export { createUpdateConvenio, deleteConvenioById, getAllConveniosForm, getAllConveniosFormSimple, getConvenioByIdForm, getConveniosByProjectIdForm, updateConveniosByProjectId} from './convenios/convenios-form'
export { createUpdateInvestigador, deleteInvestigador, getAllInvestigadoresForm, getInvestigadorByIdForm } from './investigadores/investigadores-form'
export { createUpdateIndicador, deleteIndicadorById, getIndicadorById, getIndicadoresByProjectId } from './indicadores/indicadores-actions'
export { createUpdateLinea, getAllLineasForm, getLineaByIdForm, getLineaByIdProgramasForm, updateProgramasByLineaId } from './lineas/lineas-form'
export { createUpdateMapa, deleteMapaById, getMapaById, getMapasByProjectId } from './mapas/mapas-actions'
export { createUpdateMedio, deleteMedioById, getMedioById, getMediosByProjectId } from './medios/medios-actions'
export { createUpdatePrograma, deletePrograma, getAllProgramasForm, getAllProgramasSimple, getProgramaByIdForm } from './programas/programas-form'
export { createUpdateProject, deleteProject, getAllProjectsForm, getProyectoByIdSimple } from './proyectos/projects-form'
export { createUpdateRegion, deleteRegionById, getAllRegionsForm, getRegionsByProjectIdForm, updateRegionesByProjectId } from './regiones/regiones-form'
export { createUpdateSello, deleteSelloById, getAllSellosForm, getAllSellosFormSimple, getSelloByIdForm, getSellosByProjectIdForm, updateSellosByProjectId } from './sellos/sellos-actions'
export { createUpdateTag, deleteTagById, getAllTagsForm, getTagsByProjectIdForm, updateTagsByProjectId } from './tags/tags-form'

// * Actions images
export { deleteImage, deleteImageByUrl, deleteProjectImage, getAllImages, uploadImagesFullProcess, uploadImagesToStore } from './images/images-actions'
