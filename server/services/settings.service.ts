import prisma from '../utils/db'

export class SettingsService {
  async getUserSettings(userId: string) {
    let settings = await prisma.userSettings.findUnique({
      where: { userId },
    })

    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          userId,
          theme: 'system',
          language: 'ru',
          timezone: 'Europe/Kaliningrad',
          dateFormat: 'DD.MM.YYYY',
          timeFormat: '24h',
          weekStart: 1,
          pomodoroWork: 25,
          pomodoroBreak: 5,
          pomodoroLong: 15,
        },
      })
    }

    return settings
  }

  async updateSettings(userId: string, data: any) {
    return prisma.userSettings.update({
      where: { userId },
      data,
    })
  }

  async getSettingsValue<T>(userId: string, key: string, defaultValue: T): Promise<T> {
    const settings = await this.getUserSettings(userId)
    return (settings as any)[key] ?? defaultValue
  }
}
