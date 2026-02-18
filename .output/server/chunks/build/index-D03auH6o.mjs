import { _ as __nuxt_component_0 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { T as TaskForm } from './TaskForm-DhapqX5t.mjs';
import { C as ConfirmDialog } from './ConfirmDialog-D2KLWkR_.mjs';
import { u as useAuth } from './useAuth-BbwPNOMF.mjs';
import { u as useTask } from './useTask-C5buKm0s.mjs';
import { u as useProject } from './useProject-BhyhUoFh.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './task-6PAKZffB.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { tasks, pendingTasks, completedTasks, importantTasks, loading, fetchTasks, updateTask, deleteTask } = useTask();
    const { projects } = useProject();
    const showQuickAdd = ref(false);
    const editingTask = ref(null);
    const newTaskTitle = ref("");
    const newTaskDescription = ref("");
    const newTaskPriority = ref("MEDIUM");
    const newTaskProjectId = ref("");
    const taskToDelete = ref(null);
    const showDeleteConfirm = ref(false);
    const saveTask = async (data) => {
      await updateTask(data);
      editingTask.value = null;
      await fetchTasks();
    };
    const handleTaskDeleteRequest = (taskId) => {
      taskToDelete.value = taskId;
      showDeleteConfirm.value = true;
    };
    const confirmDeleteTask = async () => {
      if (taskToDelete.value) {
        await deleteTask(taskToDelete.value);
        if (editingTask.value?.id === taskToDelete.value) {
          editingTask.value = null;
        }
        taskToDelete.value = null;
        showDeleteConfirm.value = false;
        await fetchTasks();
      }
    };
    const getStatusLabel = (status) => {
      const labels = {
        NEW: "Новая",
        IN_PROGRESS: "В процессе",
        PAUSED: "На паузе",
        WAITING: "Ожидание",
        COMPLETED: "Завершено",
        CANCELLED: "Отменено",
        ARCHIVED: "Архив"
      };
      return labels[status] || status;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center"><h1 class="text-xl font-bold text-blue-600">Enterprise TodoList</h1></div><nav class="flex space-x-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Задачи `);
          } else {
            return [
              createTextVNode(" Задачи ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/projects",
        class: "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Проекты `);
          } else {
            return [
              createTextVNode(" Проекты ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/kanban",
        class: "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Канбан `);
          } else {
            return [
              createTextVNode(" Канбан ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/calendar",
        class: "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Календарь `);
          } else {
            return [
              createTextVNode(" Календарь ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/analytics",
        class: "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Аналитика `);
          } else {
            return [
              createTextVNode(" Аналитика ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/pomodoro",
        class: "px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Помодоро `);
          } else {
            return [
              createTextVNode(" Помодоро ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-600">${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm text-gray-600 hover:text-gray-900"> Выйти </button></div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="bg-white rounded-lg shadow-md p-6 mb-8"><h2 class="text-2xl font-bold text-gray-900 mb-2"> Добро пожаловать! 👋 </h2><p class="text-gray-600"> Это ваше рабочее пространство для управления задачами. </p></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"><div class="bg-white rounded-lg shadow p-4"><div class="text-sm text-gray-500">Всего задач</div><div class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(tasks).length)}</div></div><div class="bg-white rounded-lg shadow p-4"><div class="text-sm text-gray-500">В процессе</div><div class="text-2xl font-bold text-blue-600">${ssrInterpolate(unref(pendingTasks).length)}</div></div><div class="bg-white rounded-lg shadow p-4"><div class="text-sm text-gray-500">Завершено</div><div class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(completedTasks).length)}</div></div><div class="bg-white rounded-lg shadow p-4"><div class="text-sm text-gray-500">Важные</div><div class="text-2xl font-bold text-red-600">${ssrInterpolate(unref(importantTasks).length)}</div></div></div><div class="bg-white rounded-lg shadow"><div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"><h3 class="text-lg font-semibold text-gray-900">Задачи</h3><button class="btn-primary"> + Новая задача </button></div>`);
      if (unref(loading)) {
        _push(`<div class="px-6 py-8 text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>`);
      } else if (unref(tasks).length === 0) {
        _push(`<div class="px-6 py-8 text-center text-gray-500"> Нет задач. Создайте первую задачу! </div>`);
      } else {
        _push(`<div class="divide-y"><!--[-->`);
        ssrRenderList(unref(tasks), (task) => {
          _push(`<div class="px-6 py-4 hover:bg-gray-50 flex items-center justify-between"><div class="flex items-center space-x-3 flex-1"><input type="checkbox"${ssrIncludeBooleanAttr(task.status === "COMPLETED") ? " checked" : ""} class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"><div class="flex-1 cursor-pointer"><div class="flex items-center gap-2 mb-1 flex-wrap"><p class="${ssrRenderClass([
            "font-medium",
            task.status === "COMPLETED" ? "line-through text-gray-400" : "text-gray-900"
          ])}">${ssrInterpolate(task.title)}</p><span class="${ssrRenderClass([
            "px-2 py-0.5 text-xs rounded",
            task.status === "COMPLETED" ? "bg-green-100 text-green-800" : task.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
          ])}"${ssrRenderAttr("title", getStatusLabel(task.status))}>${ssrInterpolate(getStatusLabel(task.status))}</span>`);
          if (task.project) {
            _push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium" style="${ssrRenderStyle({
              backgroundColor: task.project.color + "20",
              color: task.project.color || "#3B82F6"
            })}"${ssrRenderAttr("title", task.project.name)}>`);
            if (task.project.color) {
              _push(`<span class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ backgroundColor: task.project.color })}"></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(` ${ssrInterpolate(task.project.name)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (task.description) {
            _push(`<p class="text-sm text-gray-500 truncate max-w-md mb-2">${ssrInterpolate(task.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center gap-3 flex-wrap"><span class="${ssrRenderClass([
            "px-2 py-0.5 text-xs rounded",
            task.priority === "CRITICAL" ? "bg-red-600 text-white" : task.priority === "HIGH" ? "bg-red-100 text-red-800" : task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : task.priority === "LOW" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          ])}">${ssrInterpolate(task.priority)}</span>`);
          if (task.isImportant) {
            _push(`<span class="text-red-500 text-xs" title="Важное">🔴 Важное</span>`);
          } else {
            _push(`<!---->`);
          }
          if (task.isUrgent) {
            _push(`<span class="text-orange-500 text-xs" title="Срочное">⚡ Срочное</span>`);
          } else {
            _push(`<!---->`);
          }
          if (task.dueDate) {
            _push(`<span class="text-xs text-gray-500" title="Срок"> 📅 ${ssrInterpolate(formatDate(task.dueDate))}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (task.estimatedTime) {
            _push(`<span class="text-xs text-gray-500" title="Оценка времени"> ⏱️ ${ssrInterpolate(task.estimatedTime)}м </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div><div class="flex items-center space-x-2"><button class="text-gray-400 hover:text-blue-600" title="Редактировать"> ✏️ </button><button class="text-gray-400 hover:text-red-600" title="Удалить"> 🗑️ </button></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></main>`);
      if (unref(showQuickAdd)) {
        _push(`<div class="fixed inset-0 bg-[linear-gradient(145deg,rgba(0,0,0,0.5)_0%,rgb(107,19,188,0.4)_100%)] backdrop-blur-[1px] bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h3 class="text-lg font-semibold mb-4">Новая задача</h3><form><input${ssrRenderAttr("value", unref(newTaskTitle))} type="text" placeholder="Название задачи" class="input-base mb-4" autofocus><textarea placeholder="Описание (необязательно)" class="input-base mb-4" rows="3">${ssrInterpolate(unref(newTaskDescription))}</textarea><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Проект</label><select class="input-base"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskProjectId)) ? ssrLooseContain(unref(newTaskProjectId), "") : ssrLooseEqual(unref(newTaskProjectId), "")) ? " selected" : ""}>Без проекта</option><!--[-->`);
        ssrRenderList(unref(projects), (project) => {
          _push(`<option${ssrRenderAttr("value", project.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskProjectId)) ? ssrLooseContain(unref(newTaskProjectId), project.id) : ssrLooseEqual(unref(newTaskProjectId), project.id)) ? " selected" : ""}>${ssrInterpolate(project.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Приоритет</label><select class="input-base"><option value="NONE"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "NONE") : ssrLooseEqual(unref(newTaskPriority), "NONE")) ? " selected" : ""}>Без приоритета</option><option value="LOW"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "LOW") : ssrLooseEqual(unref(newTaskPriority), "LOW")) ? " selected" : ""}>Низкий</option><option value="MEDIUM" selected>Средний</option><option value="HIGH"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "HIGH") : ssrLooseEqual(unref(newTaskPriority), "HIGH")) ? " selected" : ""}>Высокий</option><option value="CRITICAL"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "CRITICAL") : ssrLooseEqual(unref(newTaskPriority), "CRITICAL")) ? " selected" : ""}>Критичный</option></select></div><div class="flex justify-end space-x-2"><button type="button" class="btn-secondary"> Отмена </button><button type="submit" class="btn-primary">Создать</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(editingTask)) {
        _push(ssrRenderComponent(TaskForm, {
          task: unref(editingTask),
          projects: unref(projects),
          onClose: ($event) => editingTask.value = null,
          onSave: saveTask,
          onDelete: handleTaskDeleteRequest
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D03auH6o.mjs.map
