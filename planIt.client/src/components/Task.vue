<template>
  <div class="col-12">
    <div class="d-flex p-3 px-3">
      <div class="d-flex">
        <div class="form-check" @click="taskComplete">
          <input
            class="form-check-input border border-info fs-5"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="task.isComplete"
            @change="saveTask"
          />
          <label class="form-check-label" for="flexCheckDefault"> </label>
        </div>
        <div class="d-flex">
          <p class="fs-5 ms-2 font-monospace">{{ task.name }}</p>
          <i
            class="mdi mdi-delete selectable ms-4 text-danger fs-5"
            title="delete Task"
            @click="deleteTask"
          ></i>
        </div>
      </div>
      <div class="d-flex ms-5 fs-5">
        <i class="mdi mdi-weight text-secondary me-2"></i>
        <p class="me-5">{{ task.weight }}</p>
      </div>
      <div class="dropdown">
        <button
          class="
            btn btn-secondary
            dropdown-toggle
            ms-3
            bg-info
            text-light
            ms-5
            font-monospace
            col-12
          "
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Move Sprint
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <!-- FIXME v-for s in sprints -->
          <!-- @click="moveToSprint(s.id)" -->
          <li v-for="s in sprints" :key="s.id">
            <p class="dropdown-item" @click="moveToSprint(s.id)">
              {{ s.name }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <form @submit.prevent="createNote" class="d-flex m-2">
      <div class="row">
        <div class="input-group mb-4">
          <input type="text" placeholder="Note" v-model="note.body" />
          <i
            @click="createNote"
            class="btn btn-info text-white mdi mdi-plus"
            title="add note"
          ></i>
        </div>
      </div>
    </form>
    <div v-for="n in notes" :key="n.id">
      <div class="d-flex p-3 border border primary m-2 align-items-center">
        <img
          class="rounded-pill me-3"
          :src="n.creator.picture"
          height="50"
          alt=""
        />
        <p class="text-uppercase font-monospace fw-bold fs-4 me-5">
          {{ n.creator.name }}
        </p>
        <div class="ms-4 d-flex">
          <p class="me-4 font-monospace fs-5">
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
      sprints: computed(() => AppState.sprints),
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
        try {
          await tasksService.editTask(props.task)
        } catch (error) {

        }
      },
      async moveToSprint(sprintId) {
        // FIXME call to service to Move task
        try {
          await tasksService.moveTask(props.task, sprintId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
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
          if (await Pop.confirm()) {
            await notesService.deleteNote(note)
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