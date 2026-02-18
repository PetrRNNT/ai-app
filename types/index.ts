// Types for Enterprise TodoList

import type {
  User,
  Task,
  Project,
  Section,
  Tag,
  Comment,
  Attachment,
  Reminder,
  TimeEntry,
  TaskStatus,
  Priority,
  ProjectStatus,
  UserRole,
  TaskTag as PrismaTaskTag,
  Checklist as PrismaChecklist,
  Area as PrismaArea,
} from '@prisma/client'

export type {
  User,
  Task,
  Project,
  Section,
  Tag,
  Comment,
  Attachment,
  Reminder,
  TimeEntry,
  TaskStatus,
  Priority,
  ProjectStatus,
  UserRole,
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ============================================
// Auth Types
// ============================================

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}

export interface JwtPayload {
  userId: string
  email: string
  role: UserRole
  iat?: number
  exp?: number
}

// ============================================
// Task Types
// ============================================

export interface CreateTaskInput {
  title: string
  description?: string
  status?: TaskStatus
  priority?: Priority
  dueDate?: Date | string
  startDate?: Date | string
  estimatedTime?: number
  isImportant?: boolean
  isUrgent?: boolean
  projectId?: string
  sectionId?: string
  assigneeId?: string
  parentId?: string
  tagIds?: string[]
}

export interface UpdateTaskInput extends Partial<Omit<CreateTaskInput, 'tagIds'>> {
  id: string
  completedAt?: Date | string
  tagIds?: string[]
}

export interface TaskWithRelations extends Task {
  project?: Project | null
  section?: Section | null
  parent?: Task | null
  children?: Task[]
  tags?: TaskTag[]
  checklists?: Checklist[]
  comments?: Comment[]
  attachments?: Attachment[]
  reminders?: Reminder[]
  timeEntries?: TimeEntry[]
}

export interface TaskTag {
  taskId: string
  tagId: string
  tag: Tag
}

export interface Checklist {
  id: string
  title: string
  isCompleted: boolean
  order: number
  taskId: string
}

// ============================================
// Project Types
// ============================================

export interface CreateProjectInput {
  name: string
  description?: string
  color?: string
  icon?: string
  status?: ProjectStatus
  startDate?: Date | string
  endDate?: Date | string
  areaId?: string
  parentId?: string
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string
}

export interface ProjectWithRelations extends Project {
  area?: Area | null
  parent?: Project | null
  children?: Project[]
  sections?: Section[]
  tasks?: Task[]
}

export interface Area {
  id: string
  name: string
  description?: string
  color?: string
  icon?: string
  order: number
  userId: string
}

// ============================================
// Filter Types
// ============================================

export interface TaskFilters {
  status?: TaskStatus[]
  priority?: Priority[]
  projectId?: string
  sectionId?: string
  assigneeId?: string
  tagIds?: string[]
  dueDateFrom?: Date | string
  dueDateTo?: Date | string
  search?: string
  isImportant?: boolean
  isUrgent?: boolean
  hasDueDate?: boolean
  sortBy?: 'createdAt' | 'dueDate' | 'priority' | 'order' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface CreateSavedFilterInput {
  name: string
  description?: string
  filters: TaskFilters
  isDefault?: boolean
}

// ============================================
// Calendar Types
// ============================================

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end?: Date
  allDay?: boolean
  type: 'task' | 'event'
  taskId?: string
  projectId?: string
  color?: string
  description?: string
}

export interface CalendarView {
  type: 'month' | 'week' | 'day'
  currentDate: Date
}

// ============================================
// Analytics Types
// ============================================

export interface ProductivityStats {
  totalTasks: number
  completedTasks: number
  completionRate: number
  avgCompletionTime: number
  tasksByStatus: Record<TaskStatus, number>
  tasksByPriority: Record<Priority, number>
  tasksCompletedByDay: { date: string; count: number }[]
  timeTracked: number
  estimatedVsActual: { estimated: number; actual: number }
}

export interface VelocityData {
  week: string
  completed: number
  planned: number
}[]

// ============================================
// Automation Types
// ============================================

export interface AutomationTrigger {
  type: 'task.created' | 'task.updated' | 'task.completed' | 'task.dueSoon'
  conditions?: Record<string, unknown>
}

export interface AutomationAction {
  type: 'task.update' | 'task.create' | 'notification.send' | 'email.send'
  params: Record<string, unknown>
}

export interface CreateAutomationInput {
  name: string
  description?: string
  trigger: AutomationTrigger
  actions: AutomationAction[]
}

// ============================================
// UI Types
// ============================================

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface ModalProps {
  modelValue: boolean
  title?: string
  onClose: () => void
}

// ============================================
// Composable Return Types
// ============================================

export interface UseTaskReturn {
  tasks: Ref<TaskWithRelations[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchTasks: (filters?: TaskFilters) => Promise<void>
  createTask: (data: CreateTaskInput) => Promise<Task>
  updateTask: (data: UpdateTaskInput) => Promise<Task>
  deleteTask: (id: string) => Promise<void>
  completeTask: (id: string) => Promise<Task>
}

export interface UseProjectReturn {
  projects: Ref<ProjectWithRelations[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchProjects: () => Promise<void>
  createProject: (data: CreateProjectInput) => Promise<Project>
  updateProject: (data: UpdateProjectInput) => Promise<Project>
  deleteProject: (id: string) => Promise<void>
}

export interface UseAuthReturn {
  user: Ref<Omit<User, 'password'> | null>
  isAuthenticated: Ref<boolean>
  loading: Ref<boolean>
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}
