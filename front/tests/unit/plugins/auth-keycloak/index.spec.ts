import authKeycloakPlugin from "@/plugins/auth-keycloak/index";
import authMessages from "@/plugins/auth-keycloak/auth.messages";
import { App, createApp, Plugin } from "vue";
import { createAppStore } from "@/store";
import { AppStorekey } from "@/shared/setup/keys-injection.setup";
import { RouteRecordRaw } from "vue-router";

interface MockAppPlugin {
  plugin: Plugin;
  options: any[];
}

function mockApp(plugins: MockAppPlugin[] = []): App<Element> {
  const app = createApp({});

  plugins.forEach((x) => {
    app.use(x.plugin, ...x.options);
  });

  return app;
}

function mockFullApp(
  routes: RouteRecordRaw[],
  loginRouteName: string
): App<Element> {
  return mockApp([
    { plugin: createAppStore(), options: [AppStorekey] },
    { plugin: authKeycloakPlugin, options: [routes, loginRouteName] },
  ]);
}

describe("auth-plugin: install", () => {
  describe("não deve instalar plugin", () => {
    it("vuex não encontrado", () => {
      expect(() => {
        mockApp([{ plugin: authKeycloakPlugin, options: [] }]);
      }).toThrow(new Error(authMessages.dependsOnVuex));
    });

    it("rota de login inválida", () => {
      const routes = [{ name: "login" }, { name: "home" }] as RouteRecordRaw[];

      const invalidLoginRouteName = "login1";
      const errorMessage = authMessages.invalidLoginRouteName(
        invalidLoginRouteName,
        routes.map((x) => x.name?.toString())
      );

      expect(() => {
        mockFullApp(routes, invalidLoginRouteName);
      }).toThrow(new Error(errorMessage));
    });
  });

  describe("deve instalar plugin", () => {
    const routes = [
      {
        name: "login",
        path: "/login",
        component: { template: "<div>Login</div>" },
      },
      { name: "home", path: "/", component: { template: "<div>Home</div>" } },
    ] as RouteRecordRaw[];

    const routeName = "login";

    it("instalação sem falhas", () => {
      const app = mockFullApp(routes, routeName);

      expect(app.config.globalProperties.$store.state.auth).toBeDefined();
    });
  });
});
