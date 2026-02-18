import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Создаем хэш пароля
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Создаем пользователя admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'OWNER',
      settings: {
        create: {
          theme: 'system',
          language: 'ru',
          timezone: 'Europe/Kaliningrad',
        },
      },
    },
    include: {
      settings: true,
    },
  })

  console.log(`✅ Created user: ${admin.email} (${admin.role})`)

  // Создаем тестовые проекты
  const project1 = await prisma.project.create({
    data: {
      name: '🚀 Личные задачи',
      description: 'Мои личные задачи и дела',
      color: '#3B82F6',
      status: 'ACTIVE',
      userId: admin.id,
      sections: {
        create: [
          { name: 'В процессе', order: 0 },
          { name: 'Готово', order: 1 },
        ],
      },
    },
  })

  console.log(`✅ Created project: ${project1.name}`)

  // Создаем тестовые задачи
  await prisma.task.create({
    data: {
      title: 'Добро пожаловать в Enterprise TodoList! 👋',
      description: 'Это ваша первая задача. Попробуйте отредактировать или удалить её.',
      status: 'NEW',
      priority: 'HIGH',
      userId: admin.id,
      projectId: project1.id,
      isImportant: true,
    },
  })

  await prisma.task.create({
    data: {
      title: 'Изучите возможности приложения',
      description: 'Попробуйте различные режимы просмотра: список, календарь, канбан, диаграмма Ганта',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      userId: admin.id,
      projectId: project1.id,
      estimatedTime: 60,
    },
  })

  await prisma.task.create({
    data: {
      title: 'Настройте автоматизацию',
      description: 'Создайте правила автоматизации для повторяющихся действий',
      status: 'NEW',
      priority: 'LOW',
      userId: admin.id,
      projectId: project1.id,
    },
  })

  // Создаем подзадачу
  await prisma.task.create({
    data: {
      title: 'Настроить интеграцию с календарем',
      description: 'Подключить Google Calendar или Outlook',
      status: 'NEW',
      priority: 'MEDIUM',
      userId: admin.id,
      projectId: project1.id,
      parentId: (await prisma.task.findFirst({
        where: { title: 'Настройте автоматизацию', userId: admin.id },
      }))?.id,
    },
  })

  console.log(`✅ Created test tasks`)

  // Создаем теги
  await prisma.tag.createMany({
    data: [
      { name: 'важное', color: '#EF4444', userId: admin.id },
      { name: 'работа', color: '#3B82F6', userId: admin.id },
      { name: 'дом', color: '#10B981', userId: admin.id },
      { name: 'учеба', color: '#8B5CF6', userId: admin.id },
    ],
  })

  console.log(`✅ Created tags`)

  console.log('🎉 Seed completed!')
  console.log('\n📧 Login credentials:')
  console.log('   Email: admin@example.com')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
