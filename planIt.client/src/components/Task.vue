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
            v-model="task.isComplete"
            @change="saveTask"
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
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          change sprint
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <!-- FIXME v-for s in sprints -->
          <!-- @click="moveToSprint(s.id)" -->
          <li><a class="dropdown-item" href="#">Action</a></li>
        </ul>
      </div>
    </div>

    <form @submit.prevent="createNote" class="d-flex m-3">
      <!-- FIXME v-model for note.body -->
      <input type="text" />
      <i
        @click="createNote"
        class="btn btn-success mdi mdi-plus"
        title="add note"
      ></i>
    </form>
    <div>
      <!-- FIXME v-for not in notes -->
      <div class="d-flex p-3 border border primary m-2">
        <img src="//placehold.it/200x200" height="50" alt="" />
        <p>AUTHOR NAME</p>
        <div class="ms-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            cumque necessitatibus assumenda iusto quod! Quasi porro, corrupti
            eveniet modi atque sed reprehenderit vitae nemo! Nostrum voluptate
            quisquam placeat quibusdam hic.
          </p>
        </div>
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
      },
      async saveTask() {
        // FIXME
        // send task to taskService. 
      },
      async moveToSprint() {
        // FIXME call to service to Move task
      },
      async createNote() {
        // FIXME send content of v-model to notesService
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>