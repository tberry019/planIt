<template>
  <form @submit.prevent="createSprint">
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
import { sprintsService } from "../services/SprintsService"
import { useRoute } from "vue-router"
import { Modal } from "bootstrap"
export default {

  setup() {
    const route = useRoute()
    const editable = ref({})

    return {
      editable,
      async createSprint() {
        try {
          if (editable.value.projectId) {
            await sprintsService.editSprint(editable.value)
            Modal.getOrCreateInstance(document.getElementById('edit-modal')).hide()
          } else {
            await sprintsService.createSprint(editable.value, route.params.id)
            Modal.getOrCreateInstance(document.getElementById('create-sprint')).hide()
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>