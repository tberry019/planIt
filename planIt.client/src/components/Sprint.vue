<template>
  <div class="col-12 py-2">
    <div class="card border border-info">
      <div class="d-flex justify-content-between p-2 align-items-center my-2">
        <div
          class="
            card-body
            py-1
            fw-bold
            fs-4
            d-flex
            justify-content-between
            font-monospace
          "
        >
          <div class="d-flex">
            <p class="me-5 text-uppercase">{{ sprint.name }}</p>
            <i class="mdi mdi-weight text-secondary"></i>
            {{ totalWeight }}
          </div>
          <div class="d-flex">
            <button
              class="
                btn btn-info
                text-light
                bg-info
                border-2
                me-5
                font-monospace
              "
              data-bs-toggle="modal"
              data-bs-target="#create-task"
            >
              Add Task+
            </button>
            <div class="d-flex justify-content-end">
              <div class="d-flex">
                <p class="mx-4 fs-5">Delete Sprint</p>
                <i
                  class="mdi mdi-delete selectable text-danger"
                  title="delete Sprint"
                  @click="deleteSprint()"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card p-3" v-for="t in tasks" :key="t.id">
        <Task :task="t" />
      </div>
    </div>
  </div>
  <Modal id="create-task">
    <template #modal-title>
      <h4>Create Task</h4>
    </template>
    <template #modal-body>
      <TaskForm :sprint="sprint" />
    </template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { sprintsService } from "../services/SprintsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      totalWeight: computed(() => {
        const tasks = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
        let total = 0
        tasks.forEach(t => total += t.weight)
        return total
      }),
      async deleteSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.deleteSprint(props.sprint.id, route.params.id)
          }
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