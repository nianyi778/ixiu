// 弹窗遮罩win

import { app, BrowserWindow, globalShortcut, screen, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { rendererVisible, windowsMap } from '../index'

export let fullWindow: BrowserWindow | null = null

export const createFullscreen = (): BrowserWindow => {
  const winIsVisible = function (): boolean {
    return !!(fullWindow && fullWindow.isVisible())
  }

  if (fullWindow) {
    rendererVisible({
      visible: !winIsVisible(),
      mainWindow: fullWindow
    })
    return fullWindow
  }

  // 获取主屏幕的完整尺寸（包括信号栏/任务栏区域）
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height, x, y } = primaryDisplay.bounds
  fullWindow = new BrowserWindow({
    resizable: false, // 禁止调整窗口大小
    show: false, // 窗口创建时不显示
    width,
    height,
    x,
    y,
    enableLargerThanScreen: true, // 允许窗口超出屏幕 yyds
    frame: false, // 无边框窗口
    transparent: true, // 背景透明
    alwaysOnTop: true, // 窗口置于最顶层
    skipTaskbar: true, // 隐藏任务栏图标
    vibrancy: 'fullscreen-ui', // 启用毛玻璃效果
    movable: false, // 禁止移动
    minimizable: false,
    maximizable: false,
    webPreferences: {
      sandbox: false,
      preload: join(__dirname, '../preload/index.js'),
      backgroundThrottling: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // 注册快捷键
  app.whenReady().then(() => {
    globalShortcut.register('Escape', () => {
      rendererVisible({ visible: false, mainWindow: fullWindow })
    })
  })

  fullWindow.on('ready-to-show', () => {
    if (fullWindow) {
      windowsMap.set(fullWindow?.id, fullWindow)
      rendererVisible({ visible: true, mainWindow: fullWindow })
      // WIN 系统下设置背景透明
      fullWindow?.setBackgroundColor('#00000000')
      // 设置优先级
      fullWindow?.setAlwaysOnTop(true, 'screen-saver')
    }
  })

  fullWindow.on('blur', () => {
    fullWindow?.hide()
  })

  //   监听屏幕分辨率变化，动态调整窗口大小
  screen.on('display-metrics-changed', () => {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, x, y } = primaryDisplay.bounds

    fullWindow?.setBounds({
      x,
      y,
      width,
      height
    })
  })

  fullWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    fullWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/overlook')
  } else {
    fullWindow.loadFile(join(__dirname, '../renderer/index.html' + '#/overlook'))
  }

  return fullWindow
}
