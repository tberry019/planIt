<template>
  <div class="col-md-2 d-flex flex-column">
    <button
      class="btn btn-info my-2 col-5"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasLeft"
      aria-controls="offcanvasLeft"
      @click="OpenProjectCanvas"
    >
      My Projects
    </button>
    <button class="btn btn-info col-5">Edit</button>
  </div>

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasLeft"
    aria-labelledby="offcanvasLeftLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasLeftLabel">Projects</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p class="fs-5">For {{ account.name }}</p>
      <div>
        <div
          class="d-flex border-bottom justify-content-between text-info fw-bold"
        >
          <p>NAME</p>
          <p>STARTED</p>
        </div>
        <div>
          <ol v-for="p in projects" :key="p.id" :project="p">
            <router-link :to="{ name: 'Project', params: { id: p.id } }">
              <li>
                {{ p.name }}
              </li>
            </router-link>
            <!-- FIXME v-for p in projects and router-link -->
            <!-- <li>project</li> -->
          </ol>
          <div class="d-flex justify-content-center">
            <button
              class="
                btn btn-white
                border border-info border-3
                text-info
                fs-2
                text-center
              "
              data-bs-toggle="modal"
              data-bs-target="#create-project"
              v-if="account.id"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal id="create-project">
    <template #modal-title>
      <h4>Create Project</h4>
    </template>
    <template #modal-body>
      <ProjectForm />
    </template>
  </Modal>
</template>




<script>
import { logger } from "../utils/Logger"
import { projectsService } from "../services/ProjectsService"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import Pop from "../utils/Pop"
import ProjectForm from "./ProjectForm.vue"
export default {
  components: { ProjectForm },
  setup() {
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>