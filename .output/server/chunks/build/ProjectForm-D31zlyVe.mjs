import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectForm",
  __ssrInlineRender: true,
  props: {
    project: {}
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const colors = ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#6B7280"];
    const form = ref({
      name: props.project?.name || "",
      description: props.project?.description || "",
      color: props.project?.color || colors[0],
      status: props.project?.status || "ACTIVE"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-lg p-6 w-full max-w-md"><h3 class="text-lg font-semibold mb-4">${ssrInterpolate(__props.project ? "Редактировать проект" : "Новый проект")}</h3><form><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Название</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="input-base" placeholder="Например: Работа"></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Описание</label><textarea class="input-base" rows="3" placeholder="Описание проекта">${ssrInterpolate(unref(form).description)}</textarea></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Цвет</label><div class="flex space-x-2"><!--[-->`);
      ssrRenderList(colors, (color) => {
        _push(`<button type="button" class="${ssrRenderClass([unref(form).color === color ? "border-gray-900" : "border-transparent", "w-8 h-8 rounded-full border-2"])}" style="${ssrRenderStyle({ backgroundColor: color })}"></button>`);
      });
      _push(`<!--]--></div></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Статус</label><select class="input-base"><option value="ACTIVE"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "ACTIVE") : ssrLooseEqual(unref(form).status, "ACTIVE")) ? " selected" : ""}>Активный</option><option value="ON_HOLD"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "ON_HOLD") : ssrLooseEqual(unref(form).status, "ON_HOLD")) ? " selected" : ""}>На паузе</option><option value="COMPLETED"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "COMPLETED") : ssrLooseEqual(unref(form).status, "COMPLETED")) ? " selected" : ""}>Завершен</option><option value="ARCHIVED"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "ARCHIVED") : ssrLooseEqual(unref(form).status, "ARCHIVED")) ? " selected" : ""}>Архив</option></select></div><div class="flex justify-end space-x-2"><button type="button" class="btn-secondary"> Отмена </button><button type="submit" class="btn-primary">${ssrInterpolate(__props.project ? "Сохранить" : "Создать")}</button></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/project/ProjectForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "ProjectForm" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ProjectForm-D31zlyVe.mjs.map
