<template>
  <div class="col-md-2 d-flex flex-column p-3 font-monospace">
    <button
      class="btn btn-info my-2 col-12 border border-dark border-4"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasLeft"
      aria-controls="offcanvasLeft"
      @click="OpenProjectCanvas"
    >
      My Projects
    </button>
  </div>

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasLeft"
    aria-labelledby="offcanvasLeftLabel"
  >
    <div class="offcanvas-header font-monospace">
      <h5 class="fs-4 text-uppercase text-info fw-bold" id="offcanvasLeftLabel">
        Projects
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <p class="fs-5 text-dark pb-5 font-monospace fw-bold text-uppercase">
        {{ account.name }}
      </p>
      <div>
        <div
          class="d-flex border-bottom justify-content-between text-info fw-bold"
        >
          <p>NAME</p>
          <p>STARTED</p>
        </div>
        <div>
          <ul
            v-for="p in projects"
            :key="p.id"
            :project="p"
            class="border-bottom border-2 border-dark py-3"
          >
            <router-link :to="{ name: 'Project', params: { id: p.id } }">
              <li>
                <div class="d-flex justify-content-between">
                  <p class="text-info fw-bold">
                    {{ p.name }}
                  </p>
                  <p class="text-info">
                    {{ new Date(p.createdAt).toLocaleString() }}
                  </p>
                </div>
              </li>
            </router-link>
            <!-- FIXME v-for p in projects and router-link -->
            <!-- <li>project</li> -->
          </ul>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-white border border-info border-3 text-info fs-2"
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