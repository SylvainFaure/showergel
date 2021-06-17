<template>
  <div id="app" class="md:flex !font-roboto">
    <Sidebar :title="apptitle"></Sidebar>
    <div class="p-12 w-100 h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
import http from "@/http";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Showergel",
  components: {
    Sidebar,
  },
  data() {
    return {
      apptitle: "Showergel",
    };
  },
  methods: {
    onParamsResponse(response) {
      this.apptitle = response.data.name;
    },
  },
  mounted() {
    http
      .get("/params")
      .then(this.onParamsResponse)
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
