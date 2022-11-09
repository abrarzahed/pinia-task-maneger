import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favsCount() {
      return this.tasks.filter((task) => task.isFav).length;
    },

    totalCount() {
      return this.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      this.tasks = data;
      this.isLoading = false;
    },
    async addTask(taskValue) {
      this.tasks.push(taskValue);

      const res = await fetch("http://localhost:3000/tasks/", {
        method: "POST",
        body: JSON.stringify(taskValue),
        headers: { "Content-type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },

    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });

      if (res.error) {
        console.log(res.error);
      }
    },

    async toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({
          isFav: task.isFav,
        }),
        headers: { "Content-type": "application/json" },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
