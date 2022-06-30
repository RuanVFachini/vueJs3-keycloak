<style scoped>
img {
  height: 20%;
  width: 20%;
  border-radius: 10px;
  border: 2px solid gray;
}

img:hover {
  cursor: pointer;
}
</style>

<template>
  <div class="home">
    <div v-if="!tokenIsValid">
      <h1>Login with:</h1>
      <img @click="onKeycloakClick" src="../../assets/keycloak.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { getKeycloakRedirecUri } from "@/plugins/auth-keycloak/auth.config";
import { AccessTokenCodeErrorResponse } from "@/plugins/auth-keycloak/auth.entities";
import { extractAuthParams } from "@/plugins/auth-keycloak/auth.utils";
import { TOKEN_IS_VALID } from "@/plugins/auth-keycloak/store/getters";
import { MessageApiKey } from "@/shared/setup/keys-injection.setup";
import { defineComponent, inject } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      messageApi: inject(MessageApiKey),
    };
  },
  methods: {
    onKeycloakClick() {
      window.location.href = getKeycloakRedirecUri();
    },
  },
  computed: {
    ...mapGetters([TOKEN_IS_VALID]),
  },
  created() {
    const queryParams = extractAuthParams(this.$route);
    
    if (queryParams instanceof AccessTokenCodeErrorResponse) {
      this.messageApi?.error(queryParams.error_description)
    } else {
      if (this.tokenIsValid) {
        const path = this.$store.state.auth.currentUri ? this.$store.state.auth.currentUri : "/";
        this.$router.push({ path: path });
      }
    }
  },
});
</script>
