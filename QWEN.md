# Enterprise TodoList — QWEN.md

## Project Overview

**Enterprise TodoList** — полнофункциональное приложение для управления задачами корпоративного уровня, построенное на стеке **Nuxt 3 + Vue 3 + TypeScript + Prisma + SQLite**.

### Основные технологии

| Категория | Технологии |
|-----------|------------|
| **Frontend** | Vue 3, Nuxt 3, TypeScript, Pinia (state management) |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Backend** | Nuxt Server API (Nitro), WebSocket |
| **Database** | SQLite + Prisma ORM |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Validation** | Zod |

### Архитектура

```
todo-app/
├── app.vue              # Корневой компонент приложения
├── nuxt.config.ts       # Конфигурация Nuxt
├── pages/               # Страницы приложения (file-based routing)
├── components/          # Vue-компоненты
├── composables/         # Vue composables (useXxx)
├── stores/              # Pinia stores (state management)
├── server/              # Backend API
│   ├── api/             # API endpoints
│   ├── services/        # Бизнес-логика
│   ├── utils/           # Утилиты сервера
│   └── websocket/       # WebSocket обработчики
├── prisma/              # Prisma schema и миграции
├── middleware/          # Nuxt middleware (auth, permissions)
├── plugins/             # Vue/Nuxt plugins
├── types/               # TypeScript типы
└── utils/               # Frontend утилиты
```

### Ключевые возможности

- **Аутентификация и авторизация** — JWT-токены, роли (OWNER, ADMIN, EDITOR, USER, VIEWER)
- **Управление задачами** — задачи, подзадачи, чек-листы, теги, вложения, комментарии
- **Проекты и разделы** — иерархическая структура проектов и секций
- **Зоны ответственности (Areas)** — группировка проектов по областям
- **Повторяющиеся задачи** — CRON-выражения, интервалы, относительные даты
- **Зависимости задач** — Finish-to-Start, Start-to-Start, etc.
- **Учёт времени** — тайм-трекинг с началом/окончанием
- **Напоминания** — по времени, местоположению, условиям
- **Шаблоны** — шаблоны проектов, задач, рабочих процессов
- **Автоматизация** — триггеры и действия
- **Интеграции** — Google Calendar, Slack, Telegram, Webhooks
- **Pomodoro** — встроенный таймер Pomodoro
- **Канбан-доска** — визуальное управление задачами
- **Календарь** — просмотр задач по датам
- **Аналитика** — отчёты и статистика

---

## Building and Running

### Установка зависимостей

```bash
npm install
```

### Настройка базы данных

```bash
# Генерация Prisma клиента
npm run db:generate

# Применение миграций (dev)
npm run db:migrate

# Или push схемы напрямую (для быстрой разработки)
npm run db:push

# Запуск Prisma Studio (GUI для БД)
npm run db:studio

# Сидирование базы данных
npm run db:seed
```

### Запуск приложения

```bash
# Development режим (горячая перезагрузка)
npm run dev

# Production сборка
npm run build

# Предварительный просмотр production сборки
npm run preview

# Генерация статического сайта
npm run generate
```

### Code Quality

```bash
# Линтинг
npm run lint

# Автофикс проблем линтера
npm run lint:fix

# Форматирование кода (Prettier)
npm run format
```

### Переменные окружения

Скопируйте `.env.example` в `.env` и настройте:

```bash
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

---

## Development Conventions

### TypeScript

- **Строгий режим** — `strict: true`, `noImplicitAny`, `strictNullChecks`
- **Модули** — `moduleResolution: "bundler"`, `esModuleInterop`
- **Без эмита** — `noEmit: true` (компиляция через Nuxt/Vite)
- Файлы: `.ts` для логики, `.tsx` для компонентов (если нужно), `.vue` с `<script setup lang="ts">`

### Vue 3 Style Guide

- **Composition API** — только `<script setup>` синтаксис
- **Pinia** — для глобального state management (не Vuex)
- **Composables** — префикс `use` для всех composables (`useAuthStore`, `useTasks`)
- **Props/Emits** — явная типизация через `defineProps<{...}>()` и `defineEmits<{...}>()`

### Структура stores (Pinia)

Каждый store в `stores/` следует паттерну:

```typescript
export const useXxxStore = defineStore('xxx', {
  state: () => ({ ... }),
  getters: { ... },
  actions: { ... },
})
```

### API Endpoints

Серверные API находятся в `server/api/` и следуют REST-конвенциям:

```
server/api/
├── auth/
│   ├── login.post.ts
│   ├── register.post.ts
│   ├── logout.post.ts
│   └── me.get.ts
├── tasks/
│   ├── index.get.ts      # GET /api/tasks
│   ├── index.post.ts     # POST /api/tasks
│   ├── [id].get.ts       # GET /api/tasks/:id
│   ├── [id].patch.ts     # PATCH /api/tasks/:id
│   └── [id].delete.ts    # DELETE /api/tasks/:id
```

### Prisma Conventions

- **ID** — `cuid()` для всех моделей
- **Timestamps** — `createdAt`, `updatedAt` автоматически
- **Soft delete** — поле `deletedAt` где нужно
- **Индексы** — явные `@@index()` на часто используемых полях
- **Отношения** — именованные для рекурсивных связей

### CSS/Tailwind

- **Tailwind CSS v4** — новый синтаксис импорта `@import "tailwindcss"`
- **Слои** — кастомные стили в `@layer base/components/utilities`
- **Классы компонентов** — `.btn-primary`, `.btn-secondary`, `.input-base`, `.card`

### Именование

| Сущность | Convention | Пример |
|----------|------------|--------|
| Компоненты | PascalCase | `TaskList.vue`, `ProjectCard.vue` |
| Composables | camelCase с `use` | `useAuth`, `useTasks` |
| Stores | camelCase с `use` | `useAuthStore`, `useTaskStore` |
| API файлы | kebab-case + HTTP метод | `tasks.get.ts`, `tasks.post.ts` |
| Типы Prisma | PascalCase | `Task`, `Project`, `UserRole` |

---

## Database Schema Overview

### Основные модели

| Модель | Описание |
|--------|----------|
| `User` | Пользователи с ролями и настройками |
| `Area` | Зоны ответственности |
| `Project` | Проекты (иерархические) |
| `Section` | Разделы внутри проектов |
| `Task` | Задачи (с подзадачами, зависимостями) |
| `Tag` | Теги для задач (иерархические) |
| `Comment` | Комментарии с треддингом |
| `Attachment` | Вложения файлов |
| `Reminder` | Напоминания (время, место, условия) |
| `TimeEntry` | Учёт времени |
| `Template` | Шаблоны проектов/задач |
| `Automation` | Автоматизации (триггеры → действия) |
| `Integration` | Внешние интеграции |
| `Activity` | Журнал активности |
| `SavedFilter` | Сохранённые фильтры |
| `UserSettings` | Настройки пользователя |

---

## Pages Structure

| Путь | Файл | Описание |
|------|------|----------|
| `/` | `index.vue` | Главная страница (дашборд) |
| `/login` | `login.vue` | Вход |
| `/register` | `register.vue` | Регистрация |
| `/tasks` | `tasks/` | Список задач |
| `/projects` | `projects/` | Управление проектами |
| `/kanban` | `kanban/` | Канбан-доска |
| `/calendar` | `calendar/` | Календарь задач |
| `/analytics` | `analytics/` | Аналитика и отчёты |
| `/pomodoro` | `pomodoro/` | Pomodoro таймер |
| `/templates` | `templates/` | Шаблоны |
| `/automations` | `automations/` | Автоматизации |
| `/settings` | `settings/` | Настройки |

---

## Key Files Reference

| Файл | Назначение |
|------|------------|
| `nuxt.config.ts` | Конфигурация Nuxt, модули, runtime config |
| `prisma/schema.prisma` | Схема базы данных Prisma |
| `app.vue` | Корневой компонент, инициализация auth |
| `stores/auth.ts` | Аутентификация и состояние пользователя |
| `tailwind.config.ts` | Конфигурация Tailwind CSS |
| `tsconfig.json` | Настройки TypeScript |
| `.env.example` | Шаблон переменных окружения |
