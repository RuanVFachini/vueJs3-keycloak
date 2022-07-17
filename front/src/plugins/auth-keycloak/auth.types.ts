import { RouteRecordRaw } from "vue-router";

export class AuthPluginConfig {
    public routes: Array<RouteRecordRaw>;
    public loginRouteName: string;

    constructor(
        routes: Array<RouteRecordRaw>,
        loginRouteName: string) {
        
        this.routes = routes;
        this.loginRouteName = loginRouteName;
        
    }
}