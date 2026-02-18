import { _ as __nuxt_component_0 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BbwPNOMF.mjs';
import { a as useRouter } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    useAuth();
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-100a6cf3><div class="login-container" data-v-100a6cf3><div class="max-w-md w-full space-y-8" data-v-100a6cf3><div class="text-center" data-v-100a6cf3><h1 class="text-4xl font-bold text-gray-900" data-v-100a6cf3>Enterprise TodoList</h1><p class="text-gray-600 mt-2" data-v-100a6cf3>Создайте новый аккаунт</p></div><div class="bg-white rounded-lg shadow-xl p-8" data-v-100a6cf3><form class="space-y-6" data-v-100a6cf3><div data-v-100a6cf3><label for="name" class="block text-sm font-medium text-gray-700 mb-2" data-v-100a6cf3> Имя </label><input id="name"${ssrRenderAttr("value", unref(name))} type="text" required class="input-base" placeholder="Иван Иванов" data-v-100a6cf3></div><div data-v-100a6cf3><label for="email" class="block text-sm font-medium text-gray-700 mb-2" data-v-100a6cf3> Email </label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" required class="input-base" placeholder="you@example.com" data-v-100a6cf3></div><div data-v-100a6cf3><label for="password" class="block text-sm font-medium text-gray-700 mb-2" data-v-100a6cf3> Пароль </label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required minlength="6" class="input-base" placeholder="••••••••" data-v-100a6cf3></div>`);
      if (unref(error)) {
        _push(`<div class="text-red-600 text-sm bg-red-50 p-3 rounded" data-v-100a6cf3>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed" data-v-100a6cf3>${ssrInterpolate(unref(loading) ? "Регистрация..." : "Зарегистрироваться")}</button></form><div class="mt-6 text-center" data-v-100a6cf3><p class="text-sm text-gray-600" data-v-100a6cf3> Уже есть аккаунт? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-blue-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Войти `);
          } else {
            return [
              createTextVNode(" Войти ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-100a6cf3"]]);

export { register as default };
//# sourceMappingURL=register-BrySV7Rz.mjs.map
