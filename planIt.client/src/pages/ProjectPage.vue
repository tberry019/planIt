<template>
  <div class="d-flex">
    <h2>{{ activeProject.name }}</h2>
    <i class="mdi mdi-delete selectable" @click="deleteProject()"></i>
  </div>
  <!-- FIX add click to open off canvas -->
  <p>{{ activeProject.description }}</p>
  <div class="d-flex justify-content-between">
    <h5 class="text-info fs-5 fw-bold">Sprints</h5>
    <button
      class="
        btn btn-white
        border border-info border-3
        text-info
        fs-5
        text-center
      "
      data-bs-toggle="modal"
      data-bs-target="#create-sprint"
    >
      Add Sprint
    </button>
  </div>
  <p>
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
export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getByProjectId(route.params.id)
        await sprintsService.getSprintsByProject(route.params.id)
        await tasksService.getAll(route.params.id)
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

      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.id)
            router.push({ path: '/' })
          }
        } catch (error) {
          Pop(error.message, "error")
          logger.log(error.message)
        }
      },

      async getSprintsByProject() {
        try {
          await sprintsService.getSprintsByProject()
        } catch (error) {
          Pop(error.message, "error")
          logger.log(error.message)
        }
      },


    }
  }
}
</script>


<style lang="scss" scoped>
</style>