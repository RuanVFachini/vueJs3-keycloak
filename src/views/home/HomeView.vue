<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
