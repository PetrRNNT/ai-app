import { p as prisma } from './auth.mjs';

class SettingsService {
  async getUserSettings(userId) {
    let settings = await prisma.userSettings.findUnique({
      where: { userId }
    });
    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          userId,
          theme: "system",
          language: "ru",
          timezone: "Europe/Kaliningrad",
          dateFormat: "DD.MM.YYYY",
          timeFormat: "24h",
          weekStart: 1,
          pomodoroWork: 25,
          pomodoroBreak: 5,
          pomodoroLong: 15
        }
      });
    }
    return settings;
  }
  async updateSettings(userId, data) {
    return prisma.userSettings.update({
      where: { userId },
      data
    });
  }
  async getSettingsValue(userId, key, defaultValue) {
    const settings = await this.getUserSettings(userId);
    return settings[key] ?? defaultValue;
  }
}

export { SettingsService as S };
//# sourceMappingURL=settings.service.mjs.map
