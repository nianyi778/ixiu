import schedule, { Job } from 'node-schedule'

class Scheduler {
  private jobs: Record<string, Job | undefined> = {}
  private remainingTime: number = 1 * 60 // 默认20分钟倒计时
  private defaultDuration: number = 20 * 60 // 默认倒计时时间（秒）

  constructor() {
    // this.startCountdown() // 自动启动倒计时
  }

  // 开始倒计时
  public startCountdown(onFinish?: () => void): void {
    if (this.jobs['countdown']) {
      console.warn('A countdown is already running!')
      return
    }

    /**
        *    *    *    *    *    *
        ┬    ┬    ┬    ┬    ┬    ┬
        │    │    │    │    │    │
        │    │    │    │    │    └── 星期几 (0 - 7) (星期天为 0 或 7)
        │    │    │    │    └────── 月份 (1 - 12)
        │    │    │    └─────────── 一个月中的第几天 (1 - 31)
        │    │    └─────────────── 小时 (0 - 23)
        │    └──────────────────── 分钟 (0 - 59)
        └──────────────────────── 秒 (0 - 59)
     * */

    this.jobs['countdown'] = schedule.scheduleJob('* * * * * *', () => {
      this.remainingTime--

      if (this.remainingTime <= 0) {
        this.stopCountdown()

        if (onFinish) onFinish()
      }
    })
  }

  // 停止倒计时
  public stopCountdown(): void {
    if (this.jobs['countdown']) {
      this.jobs['countdown'].cancel()
      delete this.jobs['countdown']
    }
  }

  // 重置倒计时
  public resetCountdown(onFinish?: () => void): void {
    this.stopCountdown()
    this.remainingTime = this.defaultDuration
    this.startCountdown(onFinish)
  }

  // 获取剩余时间
  public getRemainingTime(): number {
    return this.remainingTime
  }

  // 设置倒计时时间
  public setDuration(seconds: number, onFinish?: () => void): void {
    this.defaultDuration = seconds
    this.resetCountdown(onFinish)
  }
}

export default new Scheduler()
