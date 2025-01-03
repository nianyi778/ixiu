import { app, BrowserWindow, ipcMain, Tray } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import cloudTemplate from '../../resources/tray/cloudTemplate.png?asset'
import { createHomescreen } from './screen/HomeScreen'
import Scheduler from './tasks/scheduler'
import { createFullscreen } from './screen/Fullscreen'
export const windowsMap = new Map<number, BrowserWindow>()

// Hide the dock icon on macOS
app.dock.hide()

export let tray: Tray | null = null
function createTray(): void {
  tray = new Tray(cloudTemplate)
  // 构建菜单
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'uTools 官网', click: (): void => console.log('打开官网') },
  //   { type: 'separator' }, // 分割线
  //   {
  //     label: '帮助',
  //     submenu: [
  //       { label: '隐私政策', click: (): void => console.log('查看隐私政策') },
  //       { label: '用户协议', click: (): void => console.log('查看用户协议') }
  //     ]
  //   },
  //   { type: 'separator' }, // 分割线
  //   { label: '版本 (V6.0.0)', enabled: false }, // 灰色不可点击项
  //   { label: '检测更新', click: (): void => console.log('检测更新') },
  //   { type: 'separator' }, // 分割线
  //   { label: '设置', click: (): void => console.log('打开设置') },
  //   { label: '显示 / 隐藏', click: (): void => toggleWindow() },
  //   { type: 'separator' }, // 分割线
  //   {
  //     label: '重启',
  //     click: (): void => {
  //       app.relaunch()
  //       app.exit()
  //     }
  //   },
  //   { label: '退出', click: (): void => app.quit() }
  // ])
  // 设置托盘图标的菜单
  // tray.setContextMenu(contextMenu)

  tray.setToolTip('「一咻」一眨眼就过去了🚀') // 鼠标悬浮提示文字
  // tray.setTitle('This is my title') // 会导致tray 不显示
}

export function getWindowPosition({ mainWindow }: { mainWindow: BrowserWindow }): {
  x: number
  y: number
} {
  if (!mainWindow || !tray) {
    return { x: 0, y: 0 }
  }
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2)

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return { x: x, y: y }
}

// 逻辑：显示/隐藏窗口
export function rendererVisible({
  visible,
  mainWindow,
  config
}: {
  visible: boolean
  mainWindow: BrowserWindow | null
  config?: {
    position: {
      x: number
      y: number
    }
  }
}): void {
  const id = mainWindow?.id
  if (id) {
    if (visible) {
      mainWindow?.show()
      mainWindow?.focus()
    }
    mainWindow?.webContents.send('invoke-render-method', { data: visible, win: id, config })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on(
    'win_visible',
    (
      _,
      {
        visibility,
        win
      }: {
        visibility: boolean
        win: number
      }
    ) => {
      const winScreen = windowsMap.get(win)
      if (winScreen) {
        if (!visibility) {
          // 逻辑：显示窗口
          winScreen?.hide()
        } else {
          // 逻辑：隐藏窗口
          winScreen?.show()
        }
      }
    }
  )

  ipcMain.handle('ping', () => 'pong')
  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  createTray()
  createHomescreen()
  tasks()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createHomescreen()
      tasks()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

function tasks(): void {
  const onFinish = (): void => {
    createFullscreen()
  }

  // 自动启动倒计时
  Scheduler.startCountdown(onFinish)

  // 暴露方法：停止倒计时
  ipcMain.handle('stop-countdown', () => {
    Scheduler.stopCountdown()
  })

  // 暴露方法：重置倒计时
  ipcMain.handle('reset-countdown', () => {
    Scheduler.resetCountdown(onFinish)
  })

  // 暴露方法：获取剩余时间
  ipcMain.handle('get-remaining-time', () => {
    return Scheduler.getRemainingTime()
  })

  // 暴露方法：设置倒计时时间
  ipcMain.handle('set-countdown-duration', (_, seconds: number) => {
    Scheduler.setDuration(seconds, onFinish)
  })
}
