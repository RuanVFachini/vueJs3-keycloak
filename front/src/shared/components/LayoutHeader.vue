<template>
  <n-page-header class="page-header">
  <p class="page-title">{{ title?.toUpperCase() }}</p>
  </n-page-header>
</template>

<script lang="ts">
import { NPageHeader } from 'naive-ui'

import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        return {}
    },
    components: {
      NPageHeader
    },
    props: {
      title: {
        type: String,
      }
    }
})
</script>

<style scoped>
.page-header {
  padding: 10px 0px 10px 0px;
  background-color: #fafafc;
  box-shadow: 0px 3px gray;
}
.page-title {
  font-size: 1.5em;
  margin: 0px;
}
</style>