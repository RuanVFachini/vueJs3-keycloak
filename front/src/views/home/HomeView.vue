<template>
  <div class="home">
    <MainGrid />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import StudantService from "./services/studant.service";

import MainGrid from "./components/grids/MainGrid.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainGrid,
  },
  created() {
    provide("domainService", new StudantService(this.$http));
  },
});
</script>
