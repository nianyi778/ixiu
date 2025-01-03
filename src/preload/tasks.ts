import { ipcRenderer } from 'electron'

interface TimerAPI {
  stop: () => Promise<void>
  reset: () => Promise<void>
  getRemainingTime: () => Promise<number>
  setDuration: (seconds: number) => Promise<void>
  onUpdate: (callback: (remainingTime: number) => void) => void
  removeUpdateListener: (callback: (remainingTime: number) => void) => void
  onFinish: (callback: () => void) => void
  removeFinishListener: (callback: () => void) => void
}

const timerAPI: TimerAPI = {
  // 调用主进程方法
  stop: () => ipcRenderer.invoke('stop-countdown'),
  reset: () => ipcRenderer.invoke('reset-countdown'),
  getRemainingTime: () => ipcRenderer.invoke('get-remaining-time'),
  setDuration: (seconds) => ipcRenderer.invoke('set-countdown-duration', seconds),

  // 监听更新事件
  onUpdate: (callback) => {
    ipcRenderer.on('countdown-update', (_, remainingTime) => {
      callback(remainingTime)
    })
  },

  // 移除更新事件监听器
  removeUpdateListener: (callback) => {
    ipcRenderer.removeListener('countdown-update', (_, remainingTime) => {
      callback(remainingTime)
    })
  },

  // 监听完成事件
  onFinish: (callback) => {
    ipcRenderer.on('countdown-finished', () => {
      callback()
    })
  },

  // 移除完成事件监听器
  removeFinishListener: (callback) => {
    ipcRenderer.removeListener('countdown-finished', () => {
      callback()
    })
  }
}

export default timerAPI
