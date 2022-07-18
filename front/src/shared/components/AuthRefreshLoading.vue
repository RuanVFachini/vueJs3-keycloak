<template>
  <n-space vertical>
    <n-space>
      <n-skeleton v-if="loading" :width="146" :sharp="false" size="medium" />
      <!-- <n-button v-else>
        Won't you fly high
      </n-button> -->
    </n-space>
  </n-space>
</template>

<script lang="ts">

export default {
  data () {
    return {
      loading: false
    }
  }
})
</script>