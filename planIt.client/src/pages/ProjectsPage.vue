<template>
  <div class="projects">
    <div v-if="!user.isAuthenticated">
      <h1>Log in to continue</h1>
    </div>
    <div v-else>
      <div class="container-fluid">
        <div class="row">
          <h2
            class="
              text-uppercase
              p-4
              font-monospace
              fw-bolder
              text-info
              fs-3
              border-bottom border-info border-5
            "
          >
            Your Projects
          </h2>
          <div
            class="col-8 py-3"
            v-for="p in projects"
            :key="p.id"
            @click="getByProjectId(p.id)"
          >
            <div class="card border border-info border-3 py-2 my-3">
              <router-link :to="{ name: 'Project', params: { id: p.id } }">
                <div
                  class="
                    d-flex
                    justify-content-between
                    p-2
                    align-items-center
                    my-2
                  "
                >
                  <div class="card-body text-info fs-2 font-monospace fw-bold">
                    {{ p.name }}
                  </div>
                  <i
                    class="mdi mdi-delete selectable fs-4 text-danger"
                    title="delete Project"
                    @click="deleteProject(p.id)"
                  ></i>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- v-for p in projects -->
      <!-- <li><router-link> {{p.name}} </router-link></li>-->
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
export default {
  name: 'ProjectsPage',
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAllProjects()
      } catch (error) {
        Pop.toast(error.message, "Error")
        logger.log(error)
      }
    })
    return {
      user: computed(() => AppState.user),
      projects: computed(() => AppState.projects),
      //NOTE FIX THIS GARBAGE
      async deleteProject(id) {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(id)
          }
        } catch (error) {
          Pop(error.message, "error")
          logger.log(error.message)
        }
      },
      async getByProjectId(projectId) {
        try {
          await projectsService.getByProjectId(projectId)
        } catch (error) {
          Pop(error.message, "error")
          logger.log(error.message)
        }
      }
    }
  }
}
</script>
