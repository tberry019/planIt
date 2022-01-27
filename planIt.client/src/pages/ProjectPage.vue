<template>
  <div class="project">
    {{project}}
    {{sprints}}

  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
export default {
  setup(){
    const route = useRoute()
    onMounted(()=>{
      // TODO getProject by route.params.id
      // await projectsService.getById(route.params.id)
      // TODO getSprints
      // await sprintsService.getAll(route.params.id)
      // TODO getTasks
      // await tasksService.getAll(route.params.id)
    })


    return {
      project: computed(()=> AppState.activeProject),
      sprints: computed(()=> AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>