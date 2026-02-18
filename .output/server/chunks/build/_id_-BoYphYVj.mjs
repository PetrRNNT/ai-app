import { _ as __nuxt_component_0 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_1$1 } from './ProjectForm-D31zlyVe.mjs';
import { u as useAuth } from './useAuth-BbwPNOMF.mjs';
import { u as useProject } from './useProject-BhyhUoFh.mjs';
import { u as useTask } from './useTask-C5buKm0s.mjs';
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
import 'pinia';
import './task-6PAKZffB.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProjectList",
  __ssrInlineRender: true,
  props: {
    projects: {},
    loading: { type: Boolean }
  },
  emits: ["create", "select", "edit"],
  setup(__props, { emit: __emit }) {
    const getStatusLabel = (status) => {
      const labels = {
        ACTIVE: "Активный",
        ARCHIVED: "Архив",
        COMPLETED: "Завершен",
        ON_HOLD: "На паузе"
      };
      return labels[status] || status;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex justify-between items-center"><h2 class="text-lg font-semibold text-gray-900">Проекты</h2><button class="btn-primary text-sm"> + Новый проект </button></div>`);
      if (__props.loading) {
        _push(`<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div></div>`);
      } else if (__props.projects.length === 0) {
        _push(`<div class="text-center py-8 text-gray-500"> Нет проектов. Создайте первый проект! </div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(__props.projects, (project) => {
          _push(`<div class="card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"><div class="h-2 w-full" style="${ssrRenderStyle({ backgroundColor: project.color || "#3B82F6" })}"></div><div class="p-4"><div class="flex items-start justify-between mb-3"><div class="flex items-center gap-2 flex-1">`);
          if (project.icon) {
            _push(`<div class="text-xl">${ssrInterpolate(project.icon)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<h3 class="font-semibold text-gray-900 line-clamp-2">${ssrInterpolate(project.name)}</h3></div><button class="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2" title="Редактировать"> ✏️ </button></div>`);
          if (project.description) {
            _push(`<p class="text-sm text-gray-600 mb-3 line-clamp-3">${ssrInterpolate(project.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center justify-between text-sm"><div class="flex items-center gap-1 text-gray-500"><span>📁</span><span>${ssrInterpolate(project._count?.tasks || 0)} задач</span></div><span class="${ssrRenderClass([
            "px-2 py-1 rounded-full text-xs font-medium",
            project.status === "ACTIVE" ? "bg-green-100 text-green-800" : project.status === "ARCHIVED" ? "bg-gray-100 text-gray-800" : project.status === "COMPLETED" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
          ])}"${ssrRenderAttr("title", getStatusLabel(project.status))}>${ssrInterpolate(getStatusLabel(project.status))}</span></div>`);
          if (project.startDate || project.endDate) {
            _push(`<div class="mt-3 pt-3 border-t text-xs text-gray-500">`);
            if (project.startDate) {
              _push(`<div class="flex items-center gap-1"><span>📅</span><span>Начало: ${ssrInterpolate(formatDate(project.startDate))}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (project.endDate) {
              _push(`<div class="flex items-center gap-1"><span>🏁</span><span>Конец: ${ssrInterpolate(formatDate(project.endDate))}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project/ProjectList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "ProjectList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { projects, loading, fetchProjects, createProject, updateProject } = useProject();
    useTask();
    const currentProject = ref(null);
    const showProjectForm = ref(false);
    const editingProject = ref(null);
    const showTaskForm = ref(false);
    const newTaskTitle = ref("");
    const newTaskDescription = ref("");
    const newTaskPriority = ref("MEDIUM");
    const selectProject = async (project) => {
      try {
        currentProject.value = await fetchProjectById(project.id);
      } catch (error) {
        console.error("Failed to load project:", error);
        currentProject.value = project;
      }
    };
    const fetchProjectById = async (id) => {
      const authStore = useAuthStore();
      try {
        const data = await $fetch(`/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        return data.data;
      } catch (error) {
        console.error("Error fetching project:", error);
        throw error;
      }
    };
    const editProject = (project) => {
      editingProject.value = project;
      showProjectForm.value = true;
    };
    const closeProjectForm = () => {
      showProjectForm.value = false;
      editingProject.value = null;
    };
    const saveProject = async (data) => {
      if (data.id) {
        await updateProject(data);
      } else {
        await createProject(data);
      }
      await fetchProjects();
      closeProjectForm();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProjectList = __nuxt_component_1;
      const _component_ProjectForm = __nuxt_component_1$1;
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
      _push(`<h1 class="text-xl font-bold text-gray-900">Проекты</h1></div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-600">${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm text-gray-600 hover:text-gray-900"> Выйти </button></div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-1">`);
      _push(ssrRenderComponent(_component_ProjectList, {
        projects: unref(projects),
        loading: unref(loading),
        onCreate: ($event) => showProjectForm.value = true,
        onSelect: selectProject,
        onEdit: editProject
      }, null, _parent));
      _push(`</div><div class="lg:col-span-2">`);
      if (unref(currentProject)) {
        _push(`<div class="card"><div class="flex items-start justify-between mb-6"><div><h2 class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(currentProject).name)}</h2>`);
        if (unref(currentProject).description) {
          _push(`<p class="text-gray-600 mt-1">${ssrInterpolate(unref(currentProject).description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="btn-primary"> + Новая задача </button></div>`);
        if (unref(currentProject).sections?.length) {
          _push(`<div class="space-y-6"><!--[-->`);
          ssrRenderList(unref(currentProject).sections, (section) => {
            _push(`<div class="border-t pt-4"><h3 class="font-semibold text-gray-700 mb-3">${ssrInterpolate(section.name)}</h3><div class="space-y-2"><!--[-->`);
            ssrRenderList(unref(currentProject).tasks?.filter((t) => t.sectionId === section.id), (task) => {
              _push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"><div class="flex items-center space-x-3"><input type="checkbox"${ssrIncludeBooleanAttr(task.status === "COMPLETED") ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-blue-600"><span class="${ssrRenderClass({ "line-through text-gray-400": task.status === "COMPLETED" })}">${ssrInterpolate(task.title)}</span></div><span class="${ssrRenderClass([
                "px-2 py-1 text-xs rounded",
                task.priority === "HIGH" ? "bg-red-100 text-red-800" : task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
              ])}">${ssrInterpolate(task.priority)}</span></div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(currentProject).tasks?.filter((t) => !t.sectionId).length) {
          _push(`<div class="border-t pt-4"><h3 class="font-semibold text-gray-700 mb-3">Без раздела</h3><div class="space-y-2"><!--[-->`);
          ssrRenderList(unref(currentProject).tasks?.filter((t) => !t.sectionId), (task) => {
            _push(`<div class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"><div class="flex items-center space-x-3"><input type="checkbox"${ssrIncludeBooleanAttr(task.status === "COMPLETED") ? " checked" : ""} class="h-4 w-4 rounded border-gray-300 text-blue-600"><span class="${ssrRenderClass({ "line-through text-gray-400": task.status === "COMPLETED" })}">${ssrInterpolate(task.title)}</span></div><span class="${ssrRenderClass([
              "px-2 py-1 text-xs rounded",
              task.priority === "HIGH" ? "bg-red-100 text-red-800" : task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
            ])}">${ssrInterpolate(task.priority)}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else if (!unref(currentProject).tasks?.length) {
          _push(`<div class="text-center py-8 text-gray-500"> В этом проекте пока нет задач </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="card text-center py-12 text-gray-500"> Выберите проект для просмотра задач </div>`);
      }
      _push(`</div></div></main>`);
      if (unref(showProjectForm) || unref(editingProject)) {
        _push(ssrRenderComponent(_component_ProjectForm, {
          project: unref(editingProject),
          onClose: closeProjectForm,
          onSave: saveProject
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showTaskForm)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h3 class="text-lg font-semibold mb-4">Новая задача</h3><form><input${ssrRenderAttr("value", unref(newTaskTitle))} type="text" placeholder="Название задачи" class="input-base mb-4" autofocus><textarea placeholder="Описание" class="input-base mb-4" rows="3">${ssrInterpolate(unref(newTaskDescription))}</textarea><select class="input-base mb-4"><option value="NONE"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "NONE") : ssrLooseEqual(unref(newTaskPriority), "NONE")) ? " selected" : ""}>Без приоритета</option><option value="LOW"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "LOW") : ssrLooseEqual(unref(newTaskPriority), "LOW")) ? " selected" : ""}>Низкий</option><option value="MEDIUM"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "MEDIUM") : ssrLooseEqual(unref(newTaskPriority), "MEDIUM")) ? " selected" : ""}>Средний</option><option value="HIGH"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "HIGH") : ssrLooseEqual(unref(newTaskPriority), "HIGH")) ? " selected" : ""}>Высокий</option><option value="CRITICAL"${ssrIncludeBooleanAttr(Array.isArray(unref(newTaskPriority)) ? ssrLooseContain(unref(newTaskPriority), "CRITICAL") : ssrLooseEqual(unref(newTaskPriority), "CRITICAL")) ? " selected" : ""}>Критичный</option></select><div class="flex justify-end space-x-2"><button type="button" class="btn-secondary"> Отмена </button><button type="submit" class="btn-primary">Создать</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BoYphYVj.mjs.map
