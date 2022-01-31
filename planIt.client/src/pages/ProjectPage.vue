<template>
  <div class="d-flex fs-4 fw-bold text-info p-4 font-monospace">
    <p>{{ activeProject.name }}</p>
    <i
      class="mdi mdi-delete selectable mx-3 text-danger"
      title="delete project"
      @click="deleteProject()"
    ></i>
  </div>
  <div class="d-flex">
    <p class="fw-bold fs-5 px-4 font-monospace">Project Description:</p>
    <p class="px-1 fs-5 font-monospace">{{ activeProject.description }}</p>
  </div>
  <div
    class="
      d-flex
      justify-content-between
      py-2
      border-bottom border-info border-5
    "
  >
    <h5 class="text-info fs-2 fw-bolder m-4 text-uppercase font-monospace">
      Sprints
    </h5>
    <button
      class="
        col-4
        btn btn-white
        border border-dark border-4
        text-white
        fs-3
        text-center
        m-0
        fw-bold
        bg-info
        me-5
        font-monospace
      "
      data-bs-toggle="modal"
      data-bs-target="#create-sprint"
    >
      Add Sprint
    </button>
  </div>
  <p class="p-4 font-monospace">
    Group your task into sprint for over-arching collections for better
    organization.
  </p>
  <div class="row">
    <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
  </div>
  <Modal id="create-sprint">
    <template #modal-title>
      <h4>Create Sprint</h4>
    </template>
    <template #modal-body>
      <SprintForm />
    </template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { router } from "../router"
import { sprintsService } from "../services/SprintsService"
import { tasksService } from "../services/TasksService"
import { notesService } from "../services/NotesService"
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getByProjectId(route.params.id)
        await sprintsService.getSprintsByProject(route.params.id)
        await tasksService.getAll(route.params.id)
        await notesService.getNotesByProject(route.params.id)
        // FIXME get all notes
      } catch (error) {
        logger.error(error)
        Pop.toast('Unable to get project by id', error)
      }
      // TODO getSprints
      // await sprintsService.getAll(route.params.id)
      // TODO getTasks
      // await tasksService.getAll(route.params.id)
    })


    return {
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      task: computed(() => AppState.tasks),
      activeProject: computed(() => AppState.activeProject),
      notes: computed(() => AppState.notes),

      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.id)
            router.push({ path: '/' })
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error.message)
        }
      },

      async getSprintsByProject() {
        try {
          await sprintsService.getSprintsByProject()
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error.message)
        }
      },

      async getNotesByProject() {
        try {
          await notesService.getNotesByProject()
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error.message)
        }
      }


    }
  }
}
</script>


<style lang="scss" scoped>
</style>