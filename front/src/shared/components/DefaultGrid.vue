<template>
    <n-data-table
      v-bind="$attrs"
    />
</template>

<script lang="ts">
import { NDataTable } from "naive-ui"

export default {
    name: "DefaultGrid",
    components: {
        NDataTable
    }
}
</script>

<style scoped>

</style>