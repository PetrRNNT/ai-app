import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { C as ConfirmDialog } from './ConfirmDialog-D2KLWkR_.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TaskForm",
  __ssrInlineRender: true,
  props: {
    task: {},
    projects: {}
  },
  emits: ["close", "save", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showDeleteConfirm = ref(false);
    const isEditing = computed(() => !!props.task?.id);
    const form = ref({
      title: props.task?.title || "",
      description: props.task?.description || "",
      projectId: props.task?.projectId || "",
      status: props.task?.status || "NEW",
      priority: props.task?.priority || "MEDIUM",
      dueDate: props.task?.dueDate ? new Date(props.task.dueDate).toISOString().split("T")[0] : "",
      isImportant: props.task?.isImportant || false,
      isUrgent: props.task?.isUrgent || false,
      estimatedTime: props.task?.estimatedTime || 0
    });
    const handleDeleteConfirm = () => {
      if (props.task?.id) {
        emit("delete", props.task.id);
      }
      showDeleteConfirm.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "task-form-overlay" }, _attrs))} data-v-028bc656><div class="task-form-modal" data-v-028bc656><h3 class="text-lg font-semibold mb-4" data-v-028bc656>${ssrInterpolate(unref(isEditing) ? "Редактировать задачу" : "Новая задача")}</h3><form data-v-028bc656><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Название</label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="input-base" placeholder="Название задачи" data-v-028bc656></div><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Описание</label><textarea class="input-base" rows="3" placeholder="Описание задачи" data-v-028bc656>${ssrInterpolate(unref(form).description)}</textarea></div><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Проект</label><select class="input-base" data-v-028bc656><option value="" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).projectId) ? ssrLooseContain(unref(form).projectId, "") : ssrLooseEqual(unref(form).projectId, "")) ? " selected" : ""}>Без проекта</option><!--[-->`);
      ssrRenderList(__props.projects, (project) => {
        _push(`<option${ssrRenderAttr("value", project.id)} data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).projectId) ? ssrLooseContain(unref(form).projectId, project.id) : ssrLooseEqual(unref(form).projectId, project.id)) ? " selected" : ""}>${ssrInterpolate(project.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Статус</label><select class="input-base" data-v-028bc656><option value="NEW" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "NEW") : ssrLooseEqual(unref(form).status, "NEW")) ? " selected" : ""}>Новая</option><option value="IN_PROGRESS" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "IN_PROGRESS") : ssrLooseEqual(unref(form).status, "IN_PROGRESS")) ? " selected" : ""}>В процессе</option><option value="PAUSED" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "PAUSED") : ssrLooseEqual(unref(form).status, "PAUSED")) ? " selected" : ""}>На паузе</option><option value="WAITING" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "WAITING") : ssrLooseEqual(unref(form).status, "WAITING")) ? " selected" : ""}>Ожидание</option><option value="COMPLETED" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "COMPLETED") : ssrLooseEqual(unref(form).status, "COMPLETED")) ? " selected" : ""}>Завершено</option><option value="CANCELLED" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "CANCELLED") : ssrLooseEqual(unref(form).status, "CANCELLED")) ? " selected" : ""}>Отменено</option></select></div><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Приоритет</label><select class="input-base" data-v-028bc656><option value="NONE" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "NONE") : ssrLooseEqual(unref(form).priority, "NONE")) ? " selected" : ""}>Без приоритета</option><option value="LOW" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "LOW") : ssrLooseEqual(unref(form).priority, "LOW")) ? " selected" : ""}>Низкий</option><option value="MEDIUM" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "MEDIUM") : ssrLooseEqual(unref(form).priority, "MEDIUM")) ? " selected" : ""}>Средний</option><option value="HIGH" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "HIGH") : ssrLooseEqual(unref(form).priority, "HIGH")) ? " selected" : ""}>Высокий</option><option value="CRITICAL" data-v-028bc656${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "CRITICAL") : ssrLooseEqual(unref(form).priority, "CRITICAL")) ? " selected" : ""}>Критичный</option></select></div><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Срок выполнения</label><input${ssrRenderAttr("value", unref(form).dueDate)} type="date" class="input-base" data-v-028bc656></div><div class="mb-4 space-y-2" data-v-028bc656><label class="flex items-center" data-v-028bc656><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isImportant) ? ssrLooseContain(unref(form).isImportant, null) : unref(form).isImportant) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" data-v-028bc656><span class="ml-2 text-sm text-gray-700" data-v-028bc656>Важная</span></label><label class="flex items-center" data-v-028bc656><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).isUrgent) ? ssrLooseContain(unref(form).isUrgent, null) : unref(form).isUrgent) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" data-v-028bc656><span class="ml-2 text-sm text-gray-700" data-v-028bc656>Срочная</span></label></div><div class="mb-4" data-v-028bc656><label class="block text-sm font-medium text-gray-700 mb-2" data-v-028bc656>Оценка времени (минуты)</label><input${ssrRenderAttr("value", unref(form).estimatedTime)} type="number" min="0" class="input-base" data-v-028bc656></div><div class="flex justify-end space-x-2" data-v-028bc656><button type="button" class="btn-secondary" data-v-028bc656> Отмена </button><button type="button" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" data-v-028bc656> Удалить </button><button type="submit" class="btn-primary" data-v-028bc656> Сохранить </button></div></form></div>`);
      if (unref(showDeleteConfirm)) {
        _push(ssrRenderComponent(ConfirmDialog, {
          title: "Удалить задачу?",
          message: "Вы уверены, что хотите удалить эту задачу? Это действие нельзя отменить.",
          type: "danger",
          "confirm-text": "Удалить",
          "cancel-text": "Отмена",
          onConfirm: handleDeleteConfirm,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/task/TaskForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TaskForm = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-028bc656"]]), { __name: "TaskForm" });

export { TaskForm as T };
//# sourceMappingURL=TaskForm-DhapqX5t.mjs.map
