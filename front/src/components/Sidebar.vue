<template>
  <div class="bg-white p-2 min-w-max">
    <div class="text-center p-4">
      <p class="text-8xl py-4">🧴</p>
      <h1 class="text-3xl font-bold">{{ title }}</h1>
    </div>
    <aside>
      <ul class="leading-5">
        <li v-for="link in menu" :key="link.key" class="flex">
          <router-link
            class="rounded py-2 px-3 w-full"
            :to="link.url"
            active-class="bg-blue-500 hover:bg-blue-400 transition duration-300 !text-white"
          >
            <Icon :name="link.icon" />
            <span>{{ link.label }}</span>
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  components: {
    Icon,
  },
  props: ["title"],
  data() {
    return {
      menu: [
        {
          key: "home",
          url: "/",
          label: "Home",
          icon: "home",
        },
        {
          key: "users",
          url: "/users",
          label: "Users",
          icon: "account-group",
        },
        {
          key: "playout_history",
          url: "/playout_history",
          label: "Playout history",
          icon: "history",
        },
        {
          key: "about",
          url: "/about",
          label: "About",
          icon: "information",
        },
      ],
    };
  },
};
</script>
