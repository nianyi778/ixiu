import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { rendererVisible, windowsMap } from '..'
export let childWindow: BrowserWindow | null = null

export const createSettingMenu = ({ top }: { top: BrowserWindow }): BrowserWindow => {
  // 获取父窗口的坐标和尺寸

  const winIsVisible = function (): boolean {
    return !!(childWindow && childWindow.isVisible())
  }

  if (childWindow) {
    rendererVisible({
      visible: !winIsVisible(),
      mainWindow: childWindow
    })
    return childWindow
  }

  const { x, y, width } = top.getBounds()
  childWindow = new BrowserWindow({
    parent: top,
    resizable: false, // 禁止调整窗口大小
    show: false, // 窗口创建时不显示
    x: x + width - 70, // 偏移到父窗口右上角
    y: y + 50, // 距离顶部 50px
    width: 140,
    height: 190,
    // hasShadow: false,
    frame: false, // 去掉边框
    transparent: true, // 启用透明背景
    backgroundColor: '#00000000',
    // enableLargerThanScreen: true, // 允许窗口超出屏幕 yyds
    // focusable: true, // 确保窗口可聚焦
    // alwaysOnTop: true, // 如果需要检测焦点丢失，避免使用 alwaysOnTop
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
  childWindow.on('ready-to-show', () => {
    if (childWindow) {
      windowsMap.set(childWindow?.id, childWindow)
      rendererVisible({ visible: true, mainWindow: childWindow })
      // WIN 系统下设置背景透明
      childWindow?.setBackgroundColor('#00000000')
    }
  })

  childWindow.on('blur', () => {
    if (BrowserWindow.getFocusedWindow() !== top) {
      rendererVisible({ visible: false, mainWindow: childWindow })
      rendererVisible({ visible: false, mainWindow: top })
    } else {
      rendererVisible({ visible: false, mainWindow: childWindow })
    }
  })

  childWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    childWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#settingmenu')
  } else {
    childWindow.loadFile(join(__dirname, '../renderer/index.html' + '#settingmenu'))
  }

  return childWindow
}
