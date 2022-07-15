<template>
  <div class="home">
    <MainGrid />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";

import MainGrid from "./components/grids/MainGrid.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainGrid,
  },
});
</script>
