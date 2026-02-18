import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmDialog",
  __ssrInlineRender: true,
  props: {
    title: {},
    message: {},
    type: {},
    confirmText: {},
    cancelText: {}
  },
  emits: ["confirm", "cancel"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "confirm-overlay" }, _attrs))} data-v-ef249c9b><div class="confirm-modal" data-v-ef249c9b><div class="confirm-icon" data-v-ef249c9b>`);
      if (__props.type === "danger") {
        _push(`<span data-v-ef249c9b>⚠️</span>`);
      } else if (__props.type === "info") {
        _push(`<span data-v-ef249c9b>ℹ️</span>`);
      } else {
        _push(`<span data-v-ef249c9b>❓</span>`);
      }
      _push(`</div><h3 class="confirm-title" data-v-ef249c9b>${ssrInterpolate(__props.title)}</h3><p class="confirm-message" data-v-ef249c9b>${ssrInterpolate(__props.message)}</p><div class="confirm-actions" data-v-ef249c9b><button type="button" class="btn-cancel" data-v-ef249c9b>${ssrInterpolate(__props.cancelText)}</button><button type="button" class="${ssrRenderClass([`btn-confirm-${__props.type}`, "btn-confirm"])}" data-v-ef249c9b>${ssrInterpolate(__props.confirmText)}</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/ConfirmDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ConfirmDialog = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-ef249c9b"]]), { __name: "CommonConfirmDialog" });

export { ConfirmDialog as C };
//# sourceMappingURL=ConfirmDialog-D2KLWkR_.mjs.map
