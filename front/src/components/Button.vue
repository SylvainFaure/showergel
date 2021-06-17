<template>
  <button
    :submit="submit"
    :form="form"
    :class="classes"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      default: "primary",
      validator(value) {
        return ["primary", "secondary", "danger", "raw"].includes(value);
      },
    },
    rounded: Boolean,
    submit: Boolean,
    form: String,
    iconOnly: Boolean,
  },
  data() {
    const o = {
      default: "py-2 px-5",
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-200",
      danger: "bg-red-500 text-white",
      raw: "",
    };
    const r = this.rounded;
    const icon = this.iconOnly;

    return {
      classes: `${icon ? "px-2" : o.default} ${o[this.type]} ${
        r ? "rounded-3xl" : "rounded-sm"
      }`,
    };
  },
};
</script>

<style>
</style>