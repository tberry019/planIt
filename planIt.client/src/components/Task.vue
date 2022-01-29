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
        <i
          class="mdi mdi-delete selectable"
          title="delete Task"
          @click="deleteTask"
        ></i>
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
      <div class="form-group">
        <input type="text" placeholder="Note" v-model="note.body" />
        <i
          @click="createNote"
          class="btn btn-success mdi mdi-plus"
          title="add note"
        ></i>
      </div>
    </form>
    <div v-for="n in notes" :key="n.id">
      <div class="d-flex p-3 border border primary m-2">
        <img class="rounded-pill" :src="n.creator.picture" height="50" alt="" />
        <p>{{ n.creator.name }}</p>
        <div class="ms-4">
          <p>
            {{ n.body }}
          </p>
          <i
            class="mdi mdi-delete selectable"
            title="delete note"
            @click="deleteNote(n)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { notesService } from "../services/NotesService"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const note = ref({ taskId: props.task.id })
    return {
      note,
      notes: computed(() => AppState.notes.filter(n => n.taskId = props.task.id)),
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
        try {
          await notesService.createNote(note.value, props.task.projectId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async deleteNote(note) {
        try {
          await notesService.deleteNote(note)
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