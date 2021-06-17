<template>
  <div id="app" class="md:flex !font-roboto">
    <Sidebar :title="parameters.name"></Sidebar>
    <div class="p-12 w-100 h-screen">
      <router-view :parameters="parameters" />
    </div>
  </div>
</template>

<script>
import http from "@/http";
import Sidebar from "@/components/Sidebar.vue";
import { reactive } from "vue";

const parameters_wrapper = reactive({
  parameters: {
    name: "Showergel",
    version: "",
  },
});

export default {
  name: "Showergel",
  components: {
    Sidebar,
  },
  data() {
    return parameters_wrapper;
  },
  methods: {
    onParametersResponse(response) {
      this.parameters = response.data;
    },
  },
  mounted() {
    http
      .get("/parameters")
      .then(this.onParametersResponse)
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

.t-title {
  @apply pt-4 pb-4 text-5xl leading-10 font-semibold;
}
.t-subtitle {
  @apply pt-4 pb-4 text-4xl leading-10 font-semibold;
}
</style>
