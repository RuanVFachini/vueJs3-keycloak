import { App, reactive } from "vue";

import { Loading } from "@/shared/entities/loading.entities";

export default {
  install(
    app: App,
  ): void {
    app.config.globalProperties.$loading = reactive(new Loading());
  }
};