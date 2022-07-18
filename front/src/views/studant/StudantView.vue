<template>
  <div class="home">
    <MainGrid />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MainGrid from "./components/grids/MainGrid.vue";

export default defineComponent({
  name: "StudantView",
  components: {
    MainGrid,
  },
});
</script>
