<template>
  <table class="table bg-white text-gray-600 border-collapse">
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="`col-${col.key}-${index}`">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
        <td v-for="rCol in columns" :key="`row-${rowIndex}-${rCol.key}`">
          <span v-if="rCol.key === 'actions'">
            <slot name="actions" :row="row"></slot>
          </span>
          <span v-else>{{ row[rCol.key] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: Array,
    rows: Array,
  },
};
</script>

<style>
</style>