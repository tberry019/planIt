<template>
  <form @submit.prevent="createTask">
    <div class="form-group">
      <label for="name">Task Name...</label>
      <input
        type="text"
        placeholder="Name"
        v-model="editable.name"
        class="form-control"
        name="name"
        id="name"
        min="2"
        max="50"
        required
      />
    </div>
    <div class="form-group">
      <label for="name">Weight...</label>
      <input
        type="number"
        placeholder="Weight"
        v-model="editable.weight"
        class="form-control"
        name="weight"
        id="weight"
        min="1"
        max="10"
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
import { useRoute } from "vue-router"
import { ref, watchEffect } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { tasksService } from "../services/TasksService"
import { Modal } from "bootstrap"
export default {
  props: {
    sprint: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = {}
    })
    return {
      editable,
      async createTask() {
        try {
          if (editable.value.projectId) {
            await tasksService.editTask(editable.value)
            Modal.getOrCreateInstance(document.getElementById('edit-modal')).hide()
          } else {
            editable.value.sprintId = props.sprint.id
            await tasksService.createTask(editable.value, route.params.id)
            Modal.getOrCreateInstance(document.getElementById('create-task')).hide()
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>