import { _ as __nuxt_component_0 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { defineStore } from 'pinia';
import { b as useAuthStore } from './server.mjs';
import { u as useAuth } from './useAuth-BbwPNOMF.mjs';
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
import 'vue-router';

const useAutomationStore = defineStore("automation", {
  state: () => ({
    automations: [],
    loading: false,
    error: null
  }),
  getters: {
    activeAutomations: (state) => state.automations.filter((a) => a.isActive)
  },
  actions: {
    async fetchAutomations() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const data = await $fetch("/api/automations", {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        this.automations = data.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async createAutomation(data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const result = await $fetch("/api/automations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            "Content-Type": "application/json"
          },
          body: data
        });
        this.automations.push(result.data);
        return result.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deleteAutomation(id) {
      try {
        const authStore = useAuthStore();
        await $fetch(`/api/automations/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        this.automations = this.automations.filter((a) => a.id !== id);
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },
    async toggleAutomation(id, isActive) {
      const authStore = useAuthStore();
      const result = await $fetch(`/api/automations/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json"
        },
        body: { isActive }
      });
      const index = this.automations.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.automations[index] = result.data;
      }
      return result.data;
    }
  }
});
function useAutomation() {
  const automationStore = useAutomationStore();
  const fetchAutomations = async () => automationStore.fetchAutomations();
  const createAutomation = async (data) => automationStore.createAutomation(data);
  const deleteAutomation = async (id) => automationStore.deleteAutomation(id);
  const toggleAutomation = async (id, isActive) => automationStore.toggleAutomation(id, isActive);
  return {
    automations: computed(() => automationStore.automations),
    activeAutomations: computed(() => automationStore.activeAutomations),
    loading: computed(() => automationStore.loading),
    error: computed(() => automationStore.error),
    fetchAutomations,
    createAutomation,
    deleteAutomation,
    toggleAutomation
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AutomationList",
  __ssrInlineRender: true,
  setup(__props) {
    const { automations, loading } = useAutomation();
    const showCreate = ref(false);
    const newAutomation = ref({
      name: "",
      description: "",
      triggerType: "task.created",
      actions: [{ type: "task.updateStatus" }]
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex justify-between items-center"><h3 class="text-lg font-semibold text-gray-900">Автоматизация</h3><button class="btn-primary text-sm"> + Новое правило </button></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div></div>`);
      } else if (unref(automations).length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"> Нет правил автоматизации. Создайте первое правило! </div>`);
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(automations), (automation) => {
          _push(`<div class="card flex items-center justify-between"><div class="flex-1"><div class="flex items-center gap-2 mb-1"><h4 class="font-semibold text-gray-900">${ssrInterpolate(automation.name)}</h4><span class="${ssrRenderClass([
            "px-2 py-0.5 rounded text-xs",
            automation.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          ])}">${ssrInterpolate(automation.isActive ? "Активно" : "Неактивно")}</span></div>`);
          if (automation.description) {
            _push(`<p class="text-sm text-gray-600 mb-2">${ssrInterpolate(automation.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-xs text-gray-500"> Триггер: <code class="bg-gray-100 px-1 rounded">${ssrInterpolate(automation.trigger?.type)}</code> • Действий: ${ssrInterpolate(automation.actions?.length || 0)} `);
          if (automation.lastRun) {
            _push(`<span class="ml-2"> • Последнее выполнение: ${ssrInterpolate(formatDate(automation.lastRun))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center gap-2"><button class="${ssrRenderClass([
            "px-3 py-1 rounded text-sm",
            automation.isActive ? "btn-secondary" : "btn-primary"
          ])}">${ssrInterpolate(automation.isActive ? "Отключить" : "Включить")}</button><button class="text-gray-400 hover:text-red-600 p-2"> 🗑️ </button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(showCreate)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-lg"><h3 class="text-lg font-semibold mb-4">Новое правило автоматизации</h3><form><input${ssrRenderAttr("value", unref(newAutomation).name)} type="text" placeholder="Название правила" class="input-base mb-4" required><textarea placeholder="Описание" class="input-base mb-4" rows="2">${ssrInterpolate(unref(newAutomation).description)}</textarea><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Триггер</label><select class="input-base mb-2"><option value="task.created"${ssrIncludeBooleanAttr(Array.isArray(unref(newAutomation).triggerType) ? ssrLooseContain(unref(newAutomation).triggerType, "task.created") : ssrLooseEqual(unref(newAutomation).triggerType, "task.created")) ? " selected" : ""}>При создании задачи</option><option value="task.completed"${ssrIncludeBooleanAttr(Array.isArray(unref(newAutomation).triggerType) ? ssrLooseContain(unref(newAutomation).triggerType, "task.completed") : ssrLooseEqual(unref(newAutomation).triggerType, "task.completed")) ? " selected" : ""}>При завершении задачи</option><option value="task.dueSoon"${ssrIncludeBooleanAttr(Array.isArray(unref(newAutomation).triggerType) ? ssrLooseContain(unref(newAutomation).triggerType, "task.dueSoon") : ssrLooseEqual(unref(newAutomation).triggerType, "task.dueSoon")) ? " selected" : ""}>Когда задача скоро должна быть выполнена</option></select></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Действия</label><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(newAutomation).actions, (action, index) => {
          _push(`<div class="flex gap-2"><select class="input-base text-sm flex-1"><option value="task.updateStatus"${ssrIncludeBooleanAttr(Array.isArray(action.type) ? ssrLooseContain(action.type, "task.updateStatus") : ssrLooseEqual(action.type, "task.updateStatus")) ? " selected" : ""}>Изменить статус задачи</option><option value="task.addTag"${ssrIncludeBooleanAttr(Array.isArray(action.type) ? ssrLooseContain(action.type, "task.addTag") : ssrLooseEqual(action.type, "task.addTag")) ? " selected" : ""}>Добавить тег</option><option value="notification.send"${ssrIncludeBooleanAttr(Array.isArray(action.type) ? ssrLooseContain(action.type, "notification.send") : ssrLooseEqual(action.type, "notification.send")) ? " selected" : ""}>Отправить уведомление</option></select><button type="button" class="text-red-600 hover:text-red-800"> ✕ </button></div>`);
        });
        _push(`<!--]--><button type="button" class="text-blue-600 hover:text-blue-800 text-sm"> + Добавить действие </button></div></div><div class="flex justify-end gap-2"><button type="button" class="btn-secondary">Отмена</button><button type="submit" class="btn-primary">Создать</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/automation/AutomationList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AutomationList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AutomationList = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-blue-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Назад`);
          } else {
            return [
              createTextVNode("← Назад")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-xl font-bold text-gray-900">Автоматизация</h1></div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-600">${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm text-gray-600 hover:text-gray-900"> Выйти </button></div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      _push(ssrRenderComponent(_component_AutomationList, null, null, _parent));
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/automations/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BB9aikaz.mjs.map
