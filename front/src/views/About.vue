<template>
  <div>
    <h1 class="t-subtitle">This is Showergel</h1>
    <h2 class="mt-2 t-subtitle">A companion app for your Liquidsoap radio</h2>
    <p class="mt-6">Showergel is still in early development.</p>
    <ul class="list-disc list-outside ml-8 mt-4">
      <li>
        <a href="https://showergel.readthedocs.io/en/latest/" target="_blank">
          Documentation
        </a>
      </li>
      <li>
        <a href="https://www.liquidsoap.info/doc-1.4.4/" target="_blank">
          Liquidsoap documentation
        </a>
      </li>
      <li>
        <a href="https://github.com/martinkirch/showergel" target="_blank">
          Sources and issue tracker
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: ["parameters"],
};
</script>
