<template>
  <form @submit.prevent="createProject">
    <div class="form-group">
      <label for="name">Name...</label>
      <input
        placeholder="Name"
        v-model="editable.name"
        type="text"
        class="form-control"
        name="name"
        id="name"
        min="2"
        max="50"
        required
      />
    </div>
    <div class="form-group">
      <label for="description">Description...</label>
      <input
        placeholder="Description"
        v-model="editable.description"
        type="text"
        class="form-control"
        name="description"
        id="description"
        min="2"
        max="50"
        required
      />
    </div>
    <div class="d-flex justify-content-between my-2">
      <button
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        class="btn btn-danger"
      >
        <b>Cancel</b>
      </button>
      <button
        type="Submit"
        aria-label="Create"
        data-bs-dismiss="modal"
        class="btn btn-info"
      >
        <b>Create</b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { Modal } from "bootstrap"
export default {

  setup() {
    const editable = ref({})

    return {
      editable,
      async createProject() {
        try {
          if (editable.value.id) {
            await projectsService.editProject(editable.value)
            Modal.getOrCreateInstance(document.getElementById('edit-modal')).hide()
          } else {
            let newId = await projectsService.createProject(editable.value)
            Modal.getOrCreateInstance(document.getElementById('create-project')).hide()
            // FIXME router.push({name: "Project", params: {id: newId}}) 
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>