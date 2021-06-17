<template>
  <div
    :class="`${
      visible ? 'flex' : 'hidden'
    } items-center justify-center flex-col overflow-hidden z-40 fixed inset-0`"
  >
    <div class="bg-gray-500 opacity-80 absolute inset-0"></div>
    <div
      class="flex flex-col max-h-screen overflow-hidden w-2/4 mx-auto relative"
    >
      <header
        class="
          border-b border-gray-300
          flex
          items-center
          justify-start
          flex-shrink-0
          p-5
          relative
          bg-gray-100
          rounded-t-md
        "
      >
        <slot name="header">
          <div class="flex-grow flex-shrink-0 text-2xl mb-4">{{ title }}</div>
        </slot>
        <button @click="$emit('close')">
          <Icon name="close" />
        </button>
      </header>
      <main class="bg-white flex-shrink flex-grow p-5">
        <slot></slot>
      </main>
      <footer
        class="
          flex
          items-center
          justify-start
          flex-shrink-0
          p-5
          relative
          bg-gray-300
        "
      >
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue";
export default {
  components: { Icon },
  props: {
    visible: Boolean,
    title: String,
  },
  // TODO
  // click outside clsoe
};
</script>

<style>
</style>