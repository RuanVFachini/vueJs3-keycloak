import {
  AccessTokenCodeErrorResponse,
  AccessTokenCodeResponse,
} from "@/plugins/auth-keycloak/auth.entities";
import {
  extractAuthParams,
  hasValues,
} from "@/plugins/auth-keycloak/auth.utils";
import { instance, mock, when } from "ts-mockito";
import { RouteLocationNormalized } from "vue-router";

describe("auth-plugin: utils", () => {
  describe("hasValues: false", () => {
    it("objeto vazio", () => {
      const value = {};
      expect(hasValues(value)).toBe(false);
    });
    it("lista vazia", () => {
      const value = [] as any[];
      expect(hasValues(value)).toBe(false);
    });
    it("string vazia", () => {
      const value = "";
      expect(hasValues(value)).toBe(false);
    });
  });
  describe("hasValues: true", () => {
    it("objeto: propriedade string", () => {
      const value = { name: "teste" };
      expect(hasValues(value)).toBe(true);
    });
    it("objeto: propriedade complexa", () => {
      const value = { name: {} };
      expect(hasValues(value)).toBe(true);
    });
    it("array: 1 valor", () => {
      const value = ["teste"];
      expect(hasValues(value)).toBe(true);
    });
    it("array: 1 valor complexo", () => {
      const value = [{}];
      expect(hasValues(value)).toBe(true);
    });
    it("string: 1 caractere", () => {
      const value = "a";
      expect(hasValues(value)).toBe(true);
    });
    it("string: >1 caractere", () => {
      const value = "ab";
      expect(hasValues(value)).toBe(true);
    });
  });
});

describe("auth-plugin: utils", () => {
  describe("extractAuthParams", () => {
    it("auth-code", () => {
      const routeMock = mock<RouteLocationNormalized>();
      when(routeMock.query).thenReturn({
        code: "ab123",
        session_state: "123qwe",
      });
      expect(extractAuthParams(instance(routeMock))).toBeInstanceOf(
        AccessTokenCodeResponse
      );
    });
    it("auth-error", () => {
      const routeMock = mock<RouteLocationNormalized>();
      when(routeMock.query).thenReturn({
        error: "Failure",
        error_description: "Description",
      });
      expect(extractAuthParams(instance(routeMock))).toBeInstanceOf(
        AccessTokenCodeErrorResponse
      );
    });
    it("empty", () => {
      const routeMock = mock<RouteLocationNormalized>();
      expect(extractAuthParams(instance(routeMock))).toBeNull();
    });
  });
});
