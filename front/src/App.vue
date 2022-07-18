<template>
  <n-space vertical v-if="redirectLogin">
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
  <LoginView v-else/>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import MessageScope from "@/shared/components/MessageScope.vue";
import { NLayout, NMessageProvider, NSpace } from "naive-ui";
import AppSidebar from "@/shared/components/Sidear.vue";
import LayoutHeader from './shared/components/LayoutHeader.vue';
import { authConfig } from './plugins/auth-keycloak/auth.config';
import LoginView from './views/login/LoginView.vue';

export default defineComponent({
  name: "App",
  components: {
    NMessageProvider,
    MessageScope,
    NSpace,
    NLayout,
    AppSidebar,
    LayoutHeader,
    LoginView
},
  computed: {
    pageName(): string  {
      return this.$router.currentRoute.value.name;
    },
    redirectLogin() : boolean {
      return authConfig.redirectLogin;
    }
  }
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
