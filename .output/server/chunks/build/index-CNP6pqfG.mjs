import { _ as __nuxt_component_0 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { C as ConfirmDialog } from './ConfirmDialog-D2KLWkR_.mjs';
import { u as useAuth } from './useAuth-BbwPNOMF.mjs';
import { u as useTask } from './useTask-C5buKm0s.mjs';
import { defineStore } from 'pinia';
import { b as useAuthStore } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './task-6PAKZffB.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const useTagStore = defineStore("tag", {
  state: () => ({
    tags: [],
    loading: false,
    error: null
  }),
  getters: {
    allTags: (state) => state.tags
  },
  actions: {
    async fetchTags() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const data = await $fetch("/api/tags", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.tags = data.data;
      } catch (error) {
        this.error = error.message || "Failed to fetch tags";
      } finally {
        this.loading = false;
      }
    },
    async createTag(name, color) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const result = await $fetch("/api/tags", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
            "Content-Type": "application/json"
          },
          body: { name, color }
        });
        this.tags.push(result.data);
        return result.data;
      } catch (error) {
        this.error = error.message || "Failed to create tag";
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deleteTag(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await $fetch(`/api/tags/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.tags = this.tags.filter((t) => t.id !== id);
      } catch (error) {
        this.error = error.message || "Failed to delete tag";
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
function useTag() {
  const tagStore = useTagStore();
  const fetchTags = async () => {
    return tagStore.fetchTags();
  };
  const createTag = async (name, color) => {
    return tagStore.createTag(name, color);
  };
  const deleteTag = async (id) => {
    return tagStore.deleteTag(id);
  };
  return {
    tags: computed(() => tagStore.tags),
    loading: computed(() => tagStore.loading),
    error: computed(() => tagStore.error),
    fetchTags,
    createTag,
    deleteTag
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { filteredTasks, loading, fetchTasks, deleteTask } = useTask();
    const { tags } = useTag();
    const filters = ref({
      status: [],
      priority: [],
      important: false,
      search: ""
    });
    const searchQuery = ref("");
    const selectedTagIds = ref([]);
    const showQuickAdd = ref(false);
    const showTagModal = ref(false);
    const showDeleteConfirm = ref(false);
    const taskToDelete = ref(null);
    const newTaskTitle = ref("");
    const newTaskDescription = ref("");
    const newTagName = ref("");
    const newTagColor = ref("#3B82F6");
    const colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#6B7280"];
    const toggleTag = (tagId) => {
      const index = selectedTagIds.value.indexOf(tagId);
      if (index === -1) {
        selectedTagIds.value.push(tagId);
      } else {
        selectedTagIds.value.splice(index, 1);
      }
    };
    const confirmDeleteTask = async () => {
      if (taskToDelete.value) {
        await deleteTask(taskToDelete.value);
        taskToDelete.value = null;
        showDeleteConfirm.value = false;
        await fetchTasks();
      }
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_TagSelector = resolveComponent("TagSelector");
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
      _push(`<h1 class="text-xl font-bold text-gray-900">Задачи</h1></div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-600">${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm text-gray-600 hover:text-gray-900"> Выйти </button></div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-4 gap-8"><div class="lg:col-span-1"><div class="card"><h3 class="font-semibold text-gray-900 mb-4">Фильтры</h3><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Статус</label><select class="input-base text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "") : ssrLooseEqual(unref(filters).status, "")) ? " selected" : ""}>Все</option><option value="NEW"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "NEW") : ssrLooseEqual(unref(filters).status, "NEW")) ? " selected" : ""}>Новые</option><option value="IN_PROGRESS"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "IN_PROGRESS") : ssrLooseEqual(unref(filters).status, "IN_PROGRESS")) ? " selected" : ""}>В процессе</option><option value="COMPLETED"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "COMPLETED") : ssrLooseEqual(unref(filters).status, "COMPLETED")) ? " selected" : ""}>Завершенные</option><option value="CANCELLED"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "CANCELLED") : ssrLooseEqual(unref(filters).status, "CANCELLED")) ? " selected" : ""}>Отмененные</option></select></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label><select class="input-base text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "") : ssrLooseEqual(unref(filters).priority, "")) ? " selected" : ""}>Все</option><option value="CRITICAL"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "CRITICAL") : ssrLooseEqual(unref(filters).priority, "CRITICAL")) ? " selected" : ""}>Критичный</option><option value="HIGH"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "HIGH") : ssrLooseEqual(unref(filters).priority, "HIGH")) ? " selected" : ""}>Высокий</option><option value="MEDIUM"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "MEDIUM") : ssrLooseEqual(unref(filters).priority, "MEDIUM")) ? " selected" : ""}>Средний</option><option value="LOW"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).priority) ? ssrLooseContain(unref(filters).priority, "LOW") : ssrLooseEqual(unref(filters).priority, "LOW")) ? " selected" : ""}>Низкий</option></select></div><div class="mb-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(filters).important) ? ssrLooseContain(unref(filters).important, null) : unref(filters).important) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 rounded border-gray-300"><span class="ml-2 text-sm text-gray-700">Важные</span></label></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Поиск</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" class="input-base text-sm" placeholder="Поиск задач..."></div><button class="w-full btn-secondary text-sm"> Сбросить фильтры </button></div><div class="card mt-4"><h3 class="font-semibold text-gray-900 mb-4">Теги</h3>`);
      _push(ssrRenderComponent(_component_TagSelector, {
        tags: unref(tags),
        "selected-tags": unref(selectedTagIds),
        "show-count": "",
        "allow-create": "",
        onSelect: toggleTag,
        onCreate: ($event) => showTagModal.value = true
      }, null, _parent));
      _push(`</div></div><div class="lg:col-span-3"><div class="card"><div class="flex justify-between items-center mb-4"><h2 class="text-lg font-semibold text-gray-900"> Задачи (${ssrInterpolate(unref(filteredTasks).length)}) </h2><button class="btn-primary"> + Новая задача </button></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>`);
      } else if (unref(filteredTasks).length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"> Нет задач по выбранным фильтрам </div>`);
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(filteredTasks), (task) => {
          _push(`<div class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"><div class="flex items-start space-x-3 flex-1"><input type="checkbox"${ssrIncludeBooleanAttr(task.status === "COMPLETED") ? " checked" : ""} class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"><div class="flex-1"><p class="${ssrRenderClass([
            "font-medium",
            task.status === "COMPLETED" ? "line-through text-gray-400" : "text-gray-900"
          ])}">${ssrInterpolate(task.title)}</p>`);
          if (task.description) {
            _push(`<p class="text-sm text-gray-600 mt-1">${ssrInterpolate(task.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center gap-2 mt-2"><span class="${ssrRenderClass([
            "px-2 py-0.5 text-xs rounded",
            task.priority === "HIGH" ? "bg-red-100 text-red-800" : task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
          ])}">${ssrInterpolate(task.priority)}</span>`);
          if (task.isImportant) {
            _push(`<span class="text-red-500 text-sm">🔴 Важное</span>`);
          } else {
            _push(`<!---->`);
          }
          if (task.dueDate) {
            _push(`<span class="text-gray-500 text-sm"> 📅 ${ssrInterpolate(formatDate(task.dueDate))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div><button class="text-gray-400 hover:text-red-600 p-2"> 🗑️ </button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div></main>`);
      if (unref(showQuickAdd)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h3 class="text-lg font-semibold mb-4">Новая задача</h3><form><input${ssrRenderAttr("value", unref(newTaskTitle))} type="text" placeholder="Название задачи" class="input-base mb-4" autofocus><textarea placeholder="Описание" class="input-base mb-4" rows="3">${ssrInterpolate(unref(newTaskDescription))}</textarea><div class="flex justify-end space-x-2"><button type="button" class="btn-secondary"> Отмена </button><button type="submit" class="btn-primary">Создать</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showTagModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h3 class="text-lg font-semibold mb-4">Новый тег</h3><form><input${ssrRenderAttr("value", unref(newTagName))} type="text" placeholder="Название тега" class="input-base mb-4" autofocus><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Цвет</label><div class="flex space-x-2"><!--[-->`);
        ssrRenderList(colors, (color) => {
          _push(`<button type="button" class="${ssrRenderClass([unref(newTagColor) === color ? "border-gray-900" : "border-transparent", "w-8 h-8 rounded-full border-2"])}" style="${ssrRenderStyle({ backgroundColor: color })}"></button>`);
        });
        _push(`<!--]--></div></div><div class="flex justify-end space-x-2"><button type="button" class="btn-secondary"> Отмена </button><button type="submit" class="btn-primary">Создать</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteConfirm)) {
        _push(ssrRenderComponent(ConfirmDialog, {
          title: "Удалить задачу?",
          message: "Вы уверены, что хотите удалить эту задачу? Это действие нельзя отменить.",
          type: "danger",
          "confirm-text": "Удалить",
          "cancel-text": "Отмена",
          onConfirm: confirmDeleteTask,
          onCancel: ($event) => showDeleteConfirm.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tasks/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CNP6pqfG.mjs.map
