<template>
  <n-space vertical>
    <GlobalLoading/>
    <n-layout has-sider>
      <AppSidebar />
      <n-layout>
        <n-space vertical>
          <LayoutHeader :title="pageName"/>
          <NMessageProvider>
            <MessageScope>
              <router-view />
            </MessageScope>
          </NMessageProvider>
        </n-space>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NLayout, NMessageProvider, NSpace } from "naive-ui";

import MessageScope from "@/shared/components/MessageScope.vue";
import AppSidebar from "@/shared/components/Sidear.vue";
import LayoutHeader from '@/shared/components/LayoutHeader.vue';
import GlobalLoading from '@/shared/components/GlobalLoading.vue';
import { AuthState } from './plugins/auth-keycloak/auth.entities';

export default defineComponent({
  name: "App",
  components: {
    NMessageProvider,
    MessageScope,
    NSpace,
    NLayout,
    AppSidebar,
    LayoutHeader,
    GlobalLoading,
  },
  computed: {
    pageName(): string  {
      return this.$router.currentRoute.value.name;
    }
  },
  created() {
    this.unwatch = this.$store.watch(
      (state: AuthState) => state.isRefreshToken,
      (newValue, oldValue) => {
        const message = "Recuperando identidade do usuário";
        if (newValue) {
          this.$loading.setMessage(message);
        } else {
          this.$loading.removeMessage(message);
        }
      },
    );
  },
  beforeUnmount() {
    this.unwatch();
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
