<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import MessageApi from "../entities/message-api.entities";
import { MessageApiKey } from "../setup/keys-injection.setup";

export default defineComponent({
  name: "MessageScope",
  created() {
    this.$http.interceptors
  },
  setup() {
    provide(MessageApiKey, new MessageApi());
  },
});
</script>
