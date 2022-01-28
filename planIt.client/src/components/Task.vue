<template>
  <div class="col-12">
    <div class="d-flex">
      <div class="d-flex">
        <div class="form-check" @click="taskComplete">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault"> </label>
        </div>
        <p>{{ task.name }}</p>
        <i class="mdi mdi-delete" @click="deleteTask"></i>
      </div>
      <div class="d-flex ms-5">
        <p>{{ task.weight }}</p>
        <i class="mdi mdi-weight"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.deleteTask(props.task.projectId, props.task.id)
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