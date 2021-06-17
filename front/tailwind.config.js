module.exports = {
  mode: 'jit',
  purge: [
    './src/views/Home.vue',
    './src/views/About.vue',
    './src/views/Users.vue',
    './src/components/*.vue',
    './src/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}