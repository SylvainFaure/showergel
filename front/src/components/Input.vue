<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="mb-2 text-gray-700 font-bold">{{
      label
    }}</label>
    <div class="relative mb-5">
      <input
        :id="id"
        :type="type || 'input'"
        class="
          bg-white
          w-full
          rounded-md
          shadow-inner
          text-gray-700
          h-10
          flex
          items-center
          justify-start
          py-2
          px-3
          relative
          border border-gray-200
        "
        :value="modelValue"
        @input="handleInput"
      />
      <p v-show="error" class="absolute text-sm text-red-600 mt-2">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    modelValue: String,
    label: String,
    placeholder: String,
    type: String,
    error: String,
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style>
</style>