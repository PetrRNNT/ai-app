
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AnalyticsDashboard: typeof import("../components/analytics/Dashboard.vue")['default']
export const AutomationList: typeof import("../components/automation/AutomationList.vue")['default']
export const CalendarView: typeof import("../components/calendar/CalendarView.vue")['default']
export const CommonConfirmDialog: typeof import("../components/common/ConfirmDialog.vue")['default']
export const CommonPomodoroTimer: typeof import("../components/common/PomodoroTimer.vue")['default']
export const CommonTagSelector: typeof import("../components/common/TagSelector.vue")['default']
export const KanbanBoard: typeof import("../components/kanban/KanbanBoard.vue")['default']
export const KanbanCard: typeof import("../components/kanban/KanbanCard.vue")['default']
export const KanbanColumn: typeof import("../components/kanban/KanbanColumn.vue")['default']
export const ProjectForm: typeof import("../components/project/ProjectForm.vue")['default']
export const ProjectList: typeof import("../components/project/ProjectList.vue")['default']
export const ReminderList: typeof import("../components/reminder/ReminderList.vue")['default']
export const TaskSubtaskList: typeof import("../components/task/SubtaskList.vue")['default']
export const TaskForm: typeof import("../components/task/TaskForm.vue")['default']
export const TaskHierarchy: typeof import("../components/task/TaskHierarchy.vue")['default']
export const TaskTimer: typeof import("../components/task/TaskTimer.vue")['default']
export const TemplateList: typeof import("../components/template/TemplateList.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAnalyticsDashboard: LazyComponent<typeof import("../components/analytics/Dashboard.vue")['default']>
export const LazyAutomationList: LazyComponent<typeof import("../components/automation/AutomationList.vue")['default']>
export const LazyCalendarView: LazyComponent<typeof import("../components/calendar/CalendarView.vue")['default']>
export const LazyCommonConfirmDialog: LazyComponent<typeof import("../components/common/ConfirmDialog.vue")['default']>
export const LazyCommonPomodoroTimer: LazyComponent<typeof import("../components/common/PomodoroTimer.vue")['default']>
export const LazyCommonTagSelector: LazyComponent<typeof import("../components/common/TagSelector.vue")['default']>
export const LazyKanbanBoard: LazyComponent<typeof import("../components/kanban/KanbanBoard.vue")['default']>
export const LazyKanbanCard: LazyComponent<typeof import("../components/kanban/KanbanCard.vue")['default']>
export const LazyKanbanColumn: LazyComponent<typeof import("../components/kanban/KanbanColumn.vue")['default']>
export const LazyProjectForm: LazyComponent<typeof import("../components/project/ProjectForm.vue")['default']>
export const LazyProjectList: LazyComponent<typeof import("../components/project/ProjectList.vue")['default']>
export const LazyReminderList: LazyComponent<typeof import("../components/reminder/ReminderList.vue")['default']>
export const LazyTaskSubtaskList: LazyComponent<typeof import("../components/task/SubtaskList.vue")['default']>
export const LazyTaskForm: LazyComponent<typeof import("../components/task/TaskForm.vue")['default']>
export const LazyTaskHierarchy: LazyComponent<typeof import("../components/task/TaskHierarchy.vue")['default']>
export const LazyTaskTimer: LazyComponent<typeof import("../components/task/TaskTimer.vue")['default']>
export const LazyTemplateList: LazyComponent<typeof import("../components/template/TemplateList.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
