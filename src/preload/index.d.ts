import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    timer: {
      reset: () => void
      getRemainingTime: () => Promise<number>
      onUpdate: (callback: (remainingTime: number) => void) => void
    }
    versions: {
      node(): string
      ping: () => Promise<string>
    }
  }
}
