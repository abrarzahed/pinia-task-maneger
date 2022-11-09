<template>
  <main>
    <!-- header -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form  -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter navigation -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite tasks</button>
    </nav>

    <!-- loading status -->
    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} total tasks left to do</p>
      <div v-for="(task, i) in taskStore?.tasks" :key="i">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favsCount }} favorite tasks left to do</p>
      <div v-for="(task, i) in taskStore?.favs" :key="i">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset</button>
  </main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, isLoading, favs, favsCount, totalCount } =
      storeToRefs(taskStore);

    // fetch the tasks from json server
    taskStore.getTasks();

    const filter = ref("all");
    return { taskStore, filter, tasks, isLoading, favs, favsCount, totalCount };
  },
};
</script>
