import { _ as __nuxt_component_0 } from './nuxt-link-xjMrTn-4.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BbwPNOMF.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const getStatusLabel = (status) => {
      const labels = {
        NEW: "Новые",
        IN_PROGRESS: "В процессе",
        PAUSED: "На паузе",
        WAITING: "Ожидание",
        COMPLETED: "Завершено",
        CANCELLED: "Отменено",
        ARCHIVED: "Архив"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        NEW: "bg-blue-500",
        IN_PROGRESS: "bg-yellow-500",
        PAUSED: "bg-gray-500",
        WAITING: "bg-purple-500",
        COMPLETED: "bg-green-500",
        CANCELLED: "bg-red-500",
        ARCHIVED: "bg-gray-400"
      };
      return colors[status] || "bg-gray-500";
    };
    const getPriorityLabel = (priority) => {
      const labels = {
        CRITICAL: "Критичный",
        HIGH: "Высокий",
        MEDIUM: "Средний",
        LOW: "Низкий",
        NONE: "Без приоритета"
      };
      return labels[priority] || priority;
    };
    const getPriorityColor = (priority) => {
      const colors = {
        CRITICAL: "bg-red-600",
        HIGH: "bg-red-500",
        MEDIUM: "bg-yellow-500",
        LOW: "bg-green-500",
        NONE: "bg-gray-400"
      };
      return colors[priority] || "bg-gray-500";
    };
    const getPercentage = (value, total) => {
      if (!total) return 0;
      return Math.round(value / total * 100);
    };
    const getBarHeight = (count) => {
      const maxCount = Math.max(...props.stats?.tasksCompletedByDay?.map((d) => d.count) || [1]);
      if (!maxCount) return 0;
      return Math.max(10, count / maxCount * 100);
    };
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      if (hours > 0) {
        return `${hours}ч ${minutes}м`;
      }
      return `${minutes}м`;
    };
    const getMaxTime = () => {
      const estimated = props.stats?.estimatedVsActual?.estimated || 0;
      const actual = props.stats?.estimatedVsActual?.actual || 0;
      return Math.max(estimated, actual, 1);
    };
    const getEstimatedPercentage = () => {
      const max = getMaxTime();
      const estimated = props.stats?.estimatedVsActual?.estimated || 0;
      return `${estimated / max * 100}%`;
    };
    const getActualPercentage = () => {
      const max = getMaxTime();
      const actual = props.stats?.estimatedVsActual?.actual || 0;
      return `${actual / max * 100}%`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="card"><div class="text-sm text-gray-500 mb-1">Всего задач</div><div class="text-3xl font-bold text-gray-900">${ssrInterpolate(__props.stats?.totalTasks || 0)}</div></div><div class="card"><div class="text-sm text-gray-500 mb-1">Завершено</div><div class="text-3xl font-bold text-green-600">${ssrInterpolate(__props.stats?.completedTasks || 0)}</div></div><div class="card"><div class="text-sm text-gray-500 mb-1">Процент завершения</div><div class="text-3xl font-bold text-blue-600">${ssrInterpolate(__props.stats?.completionRate || 0)}%</div></div><div class="card"><div class="text-sm text-gray-500 mb-1">Ср. время выполнения</div><div class="text-3xl font-bold text-purple-600">${ssrInterpolate(__props.stats?.avgCompletionTime || 0)}ч</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">Задачи по статусам</h3><div class="space-y-3"><!--[-->`);
      ssrRenderList(__props.stats?.tasksByStatus, (count, status) => {
        _push(`<div class="flex items-center justify-between"><span class="text-sm text-gray-600">${ssrInterpolate(getStatusLabel(status))}</span><div class="flex items-center gap-3"><div class="w-32 bg-gray-200 rounded-full h-2"><div class="${ssrRenderClass([getStatusColor(status), "h-2 rounded-full"])}" style="${ssrRenderStyle({ width: `${getPercentage(count, __props.stats?.totalTasks)}%` })}"></div></div><span class="text-sm font-medium text-gray-900 w-8 text-right">${ssrInterpolate(count)}</span></div></div>`);
      });
      _push(`<!--]--></div></div><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">Задачи по приоритетам</h3><div class="space-y-3"><!--[-->`);
      ssrRenderList(__props.stats?.tasksByPriority, (count, priority) => {
        _push(`<div class="flex items-center justify-between"><span class="text-sm text-gray-600">${ssrInterpolate(getPriorityLabel(priority))}</span><div class="flex items-center gap-3"><div class="w-32 bg-gray-200 rounded-full h-2"><div class="${ssrRenderClass([getPriorityColor(priority), "h-2 rounded-full"])}" style="${ssrRenderStyle({ width: `${getPercentage(count, __props.stats?.totalTasks)}%` })}"></div></div><span class="text-sm font-medium text-gray-900 w-8 text-right">${ssrInterpolate(count)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">Завершено задач за последние 7 дней</h3><div class="h-48 flex items-end justify-between gap-2"><!--[-->`);
      ssrRenderList(__props.stats?.tasksCompletedByDay, (day, index) => {
        _push(`<div class="flex-1 flex flex-col items-center gap-2"><div class="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600" style="${ssrRenderStyle({ height: `${getBarHeight(day.count)}%` })}"></div><span class="text-xs text-gray-600">${ssrInterpolate(day.date)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">Учёт времени</h3><div class="text-center py-8"><div class="text-4xl font-bold text-blue-600 mb-2">${ssrInterpolate(formatTime(__props.stats?.timeTracked || 0))}</div><p class="text-sm text-gray-500">всего отслежено за 30 дней</p></div></div><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-4">План vs Факт</h3><div class="space-y-4"><div><div class="flex justify-between text-sm mb-1"><span class="text-gray-600">Оценено</span><span class="font-medium">${ssrInterpolate(formatTime(__props.stats?.estimatedVsActual?.estimated || 0))}</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-blue-500 h-3 rounded-full" style="${ssrRenderStyle({ width: getEstimatedPercentage() })}"></div></div></div><div><div class="flex justify-between text-sm mb-1"><span class="text-gray-600">Фактически</span><span class="font-medium">${ssrInterpolate(formatTime(__props.stats?.estimatedVsActual?.actual || 0))}</span></div><div class="w-full bg-gray-200 rounded-full h-3"><div class="bg-green-500 h-3 rounded-full" style="${ssrRenderStyle({ width: getActualPercentage() })}"></div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/analytics/Dashboard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Dashboard = Object.assign(_sfc_main$1, { __name: "AnalyticsDashboard" });
const useAnalyticsStore = defineStore("analytics", {
  state: () => ({
    stats: null,
    loading: false,
    error: null
  }),
  getters: {
    productivityStats: (state) => state.stats
  },
  actions: {
    async fetchStats() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const data = await $fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        this.stats = data.data;
      } catch (error) {
        this.error = error.message || "Failed to fetch analytics";
      } finally {
        this.loading = false;
      }
    }
  }
});
function useAnalytics() {
  const analyticsStore = useAnalyticsStore();
  const fetchStats = async () => {
    return analyticsStore.fetchStats();
  };
  return {
    stats: computed(() => analyticsStore.stats),
    loading: computed(() => analyticsStore.loading),
    error: computed(() => analyticsStore.error),
    fetchStats
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { stats, loading } = useAnalytics();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
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
      _push(`<h1 class="text-xl font-bold text-gray-900">Аналитика</h1></div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<span class="text-sm text-gray-600">${ssrInterpolate(unref(user).name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="text-sm text-gray-600 hover:text-gray-900"> Выйти </button></div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(ssrRenderComponent(Dashboard, { stats: unref(stats) }, null, _parent));
      }
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/analytics/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Ifz0Hb9C.mjs.map
