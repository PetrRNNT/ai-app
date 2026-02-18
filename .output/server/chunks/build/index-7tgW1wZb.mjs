import { _ as __nuxt_component_0$2 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { T as TaskForm } from './TaskForm-DhapqX5t.mjs';
import { C as ConfirmDialog } from './ConfirmDialog-D2KLWkR_.mjs';
import { u as useTaskStore } from './task-6PAKZffB.mjs';
import { b as useAuthStore } from './server.mjs';
import { u as useProject } from './useProject-BhyhUoFh.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "KanbanCard",
  __ssrInlineRender: true,
  props: {
    task: {}
  },
  emits: ["click", "edit", "delete"],
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow" }, _attrs))}><div class="flex items-start justify-between mb-2"><h4 class="font-medium text-gray-900 text-sm line-clamp-2">${ssrInterpolate(__props.task.title)}</h4><div class="flex items-center gap-1 flex-shrink-0 ml-2"><button class="text-gray-400 hover:text-blue-600" title="Редактировать"> ✏️ </button><button class="text-gray-400 hover:text-red-600" title="Удалить"> 🗑️ </button></div></div>`);
      if (__props.task.description) {
        _push(`<p class="text-xs text-gray-600 mb-2 line-clamp-2">${ssrInterpolate(__props.task.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.project) {
        _push(`<div class="mb-2"><span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium" style="${ssrRenderStyle({
          backgroundColor: __props.task.project.color + "20",
          color: __props.task.project.color || "#3B82F6"
        })}"${ssrRenderAttr("title", __props.task.project.name)}>`);
        if (__props.task.project.color) {
          _push(`<span class="w-2 h-2 rounded-full" style="${ssrRenderStyle({ backgroundColor: __props.task.project.color })}"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(__props.task.project.name)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-2 flex-wrap"><span class="${ssrRenderClass([
        "px-2 py-0.5 text-xs rounded",
        __props.task.priority === "CRITICAL" ? "bg-red-600 text-white" : __props.task.priority === "HIGH" ? "bg-red-100 text-red-800" : __props.task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : __props.task.priority === "LOW" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      ])}">${ssrInterpolate(__props.task.priority)}</span>`);
      if (__props.task.isImportant) {
        _push(`<span class="text-red-500 text-xs" title="Важное">🔴</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.isUrgent) {
        _push(`<span class="text-orange-500 text-xs" title="Срочное">⚡</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.dueDate) {
        _push(`<span class="text-xs text-gray-500"> 📅 ${ssrInterpolate(formatDate(__props.task.dueDate))}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.task.estimatedTime) {
        _push(`<span class="text-xs text-gray-500"> ⏱️ ${ssrInterpolate(__props.task.estimatedTime)}м </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.task.tags?.length) {
        _push(`<div class="flex gap-1 mt-2 flex-wrap"><!--[-->`);
        ssrRenderList(__props.task.tags, (tagTask) => {
          _push(`<span class="px-2 py-0.5 text-xs rounded text-white" style="${ssrRenderStyle({ backgroundColor: tagTask.tag.color })}">${ssrInterpolate(tagTask.tag.name)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/kanban/KanbanCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$3, { __name: "KanbanCard" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "KanbanColumn",
  __ssrInlineRender: true,
  props: {
    column: {},
    tasks: {}
  },
  emits: ["add-task", "move-task", "click", "delete"],
  setup(__props, { emit: __emit }) {
    const onDragStart = (event, task) => {
      event.dataTransfer?.setData("taskId", task.id);
      event.dataTransfer?.setData("fromStatus", task.status || "");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_KanbanCard = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kanban-column" }, _attrs))} data-v-2924ace7><div class="flex items-center justify-between mb-3" data-v-2924ace7><div class="flex items-center gap-2" data-v-2924ace7><span class="${ssrRenderClass(`w-3 h-3 rounded-full ${__props.column.color}`)}" data-v-2924ace7></span><h3 class="font-semibold text-gray-700" data-v-2924ace7>${ssrInterpolate(__props.column.title)}</h3><span class="text-xs text-gray-500 bg-white/50 px-2 py-0.5 rounded-full" data-v-2924ace7>${ssrInterpolate(__props.tasks.length)}</span></div><button class="text-gray-400 hover:text-gray-600 text-lg" title="Добавить задачу" data-v-2924ace7> + </button></div><div class="space-y-2 min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto p-2" data-v-2924ace7><!--[-->`);
      ssrRenderList(__props.tasks, (task) => {
        _push(ssrRenderComponent(_component_KanbanCard, {
          key: task.id,
          task,
          draggable: "true",
          onClick: ($event) => _ctx.$emit("click", task),
          onDelete: ($event) => _ctx.$emit("delete", $event),
          onDragstart: ($event) => onDragStart($event, task)
        }, null, _parent));
      });
      _push(`<!--]-->`);
      if (__props.tasks.length === 0) {
        _push(`<div class="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm" data-v-2924ace7> Перетащите задачу сюда </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/kanban/KanbanColumn.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-2924ace7"]]), { __name: "KanbanColumn" });
function useKanban() {
  const taskStore = useTaskStore();
  const columns = [
    { id: "NEW", title: "Новые", color: "bg-blue-500" },
    { id: "IN_PROGRESS", title: "В процессе", color: "bg-yellow-500" },
    { id: "PAUSED", title: "На паузе", color: "bg-gray-500" },
    { id: "WAITING", title: "Ожидание", color: "bg-purple-500" },
    { id: "COMPLETED", title: "Завершено", color: "bg-green-500" }
  ];
  const getTasksForColumn = (status) => {
    return taskStore.tasks.filter((task) => task.status === status);
  };
  const fetchTasks = async () => {
    return taskStore.fetchTasks();
  };
  const createTask = async (data) => {
    return taskStore.createTask(data);
  };
  const updateTask = async (data) => {
    return taskStore.updateTask(data);
  };
  const deleteTask = async (id) => {
    return taskStore.deleteTask(id);
  };
  const moveTask = async (taskId, status) => {
    const authStore = useAuthStore();
    try {
      const result = await $fetch("/api/tasks/move", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json"
        },
        body: { taskId, status }
      });
      await fetchTasks();
      return result.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    columns,
    tasks: computed(() => taskStore.tasks),
    loading: computed(() => taskStore.loading),
    error: computed(() => taskStore.error),
    getTasksForColumn,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "KanbanBoard",
  __ssrInlineRender: true,
  setup(__props) {
    const { columns, getTasksForColumn, fetchTasks, updateTask, deleteTask, moveTask } = useKanban();
    const { projects } = useProject();
    const showTaskForm = ref(false);
    const newTaskTitle = ref("");
    const newTaskDescription = ref("");
    const newTaskPriority = ref("MEDIUM");
    const editingTask = ref(null);
    const taskToDelete = ref(null);
    const showDeleteConfirm = ref(false);
    const isInitialized = ref(false);
    const handleMoveTask = async (taskId, status) => {
      await moveTask(taskId, status);
    };
    const handleTaskClick = (task) => {
      editingTask.value = task;
    };
    const handleEditTask = (task) => {
      editingTask.value = task;
    };
    const handleDeleteRequest = (taskId) => {
      taskToDelete.value = taskId;
      showDeleteConfirm.value = true;
    };
    const handleTaskDeleteRequest = (taskId) => {
      taskToDelete.value = taskId;
      showDeleteConfirm.value = true;
    };
    const confirmDeleteTask = async () => {
      if (taskToDelete.value) {
        await deleteTask(taskToDelete.value);
        taskToDelete.value = null;
        showDeleteConfirm.value = false;
        editingTask.value = null;
        await fetchTasks();
      }
    };
    const saveTask = async (data) => {
      await updateTask(data);
      editingTask.value = null;
      await fetchTasks();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_KanbanColumn = __nuxt_component_0;
      _push(`<!--[--><div class="kanban-board" data-v-d85b05b6><div class="flex gap-4 pb-4 w-fit mx-auto" data-v-d85b05b6><!--[-->`);
      ssrRenderList(unref(columns), (column) => {
        _push(ssrRenderComponent(_component_KanbanColumn, {
          key: column.id,
          column,
          tasks: unref(getTasksForColumn)(column.id),
          onAddTask: ($event) => showTaskForm.value = true,
          onMoveTask: handleMoveTask,
          onClick: handleTaskClick,
          onEdit: handleEditTask,
          onDelete: handleDeleteRequest
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
      if (!unref(isInitialized)) {
        _push(`<div class="fixed inset-0 flex items-center justify-center bg-gray-50 z-50" data-v-d85b05b6><div class="text-center" data-v-d85b05b6><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" data-v-d85b05b6></div><p class="text-gray-600" data-v-d85b05b6>Загрузка...</p></div></div>`);
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
      if (unref(showTaskForm)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-d85b05b6><div class="bg-white rounded-lg p-6 w-full max-w-md" data-v-d85b05b6><h3 class="text-lg font-semibold mb-4" data-v-d85b05b6>Новая задача</h3><form data-v-d85b05b6><input${ssrRenderAttr("value", unref(newTaskTitle))} type="text" placeholder="Название задачи" class="input-base mb-4" autofocus data-v-d85b05b6><textarea placeholder="Описание" class="input-base mb-4" rows="3" data-v-d85b05b6>${ssrInterpolate(unref(newTaskDescription))}</textarea><select class="input-base mb-4" data-v-d85b05b6><option value="NONE" data-v-d85b05b6${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "NONE") : ssrLooseEqual(unref(newTaskPriority), "NONE")) ? " selected" : ""}>Без приоритета</option><option value="LOW" data-v-d85b05b6${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "LOW") : ssrLooseEqual(unref(newTaskPriority), "LOW")) ? " selected" : ""}>Низкий</option><option value="MEDIUM" data-v-d85b05b6${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "MEDIUM") : ssrLooseEqual(unref(newTaskPriority), "MEDIUM")) ? " selected" : ""}>Средний</option><option value="HIGH" data-v-d85b05b6${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "HIGH") : ssrLooseEqual(unref(newTaskPriority), "HIGH")) ? " selected" : ""}>Высокий</option><option value="CRITICAL" data-v-d85b05b6${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "CRITICAL") : ssrLooseEqual(unref(newTaskPriority), "CRITICAL")) ? " selected" : ""}>Критичный</option></select><div class="flex justify-end space-x-2" data-v-d85b05b6><button type="button" class="btn-secondary" data-v-d85b05b6> Отмена </button><button type="submit" class="btn-primary" data-v-d85b05b6>Создать</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/kanban/KanbanBoard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-d85b05b6"]]), { __name: "KanbanBoard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_KanbanBoard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kanban-page" }, _attrs))} data-v-e16c0e78><header class="bg-white shadow-sm border-b flex-shrink-0" data-v-e16c0e78><div class="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8" data-v-e16c0e78><div class="flex justify-between items-center h-16" data-v-e16c0e78><div class="flex items-center space-x-4" data-v-e16c0e78>`);
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
      _push(`<h1 class="text-xl font-bold text-gray-900" data-v-e16c0e78>Kanban доска</h1></div><div class="flex items-center space-x-4" data-v-e16c0e78>`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-600" data-v-e16c0e78>${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm text-gray-600 hover:text-gray-900" data-v-e16c0e78> Выйти </button></div></div></div></header><main class="flex-1 overflow-x-auto p-6" data-v-e16c0e78><div class="h-full flex items-start justify-center" data-v-e16c0e78>`);
      _push(ssrRenderComponent(_component_KanbanBoard, null, null, _parent));
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kanban/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e16c0e78"]]);

export { index as default };
//# sourceMappingURL=index-7tgW1wZb.mjs.map
