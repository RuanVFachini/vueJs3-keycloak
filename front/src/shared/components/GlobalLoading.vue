<template>
  <div v-if="isLoading" class="n-skeleton">
    <div>
      <n-spin size="large" />
      <p :key="index" v-for="message, index in $loading.queue">
        {{message}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { NSpin } from 'naive-ui';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    NSpin
  },
  computed: {
    isLoading() {
      console.log(this.$loading.queue);
      return this.$loading.queue.length > 0
    }
  }
});
</script>

<style>
.n-skeleton {
  position: absolute;
  background-color: rgba(184, 175, 175, 0.247);
  z-index: 100;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>