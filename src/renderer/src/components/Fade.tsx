import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { useTransition, animated } from '@react-spring/web'
import fadeAnimation from '@renderer/constant/Fade'
import { useLayoutContext } from './Layout/LayoutContext'
export interface FadeComponentProps {
  children: React.ReactNode
  type?: 'scale' | 'upDown' | 'rightToLeft' | 'none'
}

export interface FadeComponentHandle {
  toggle: (v: boolean) => void
}

const FadeComponent = forwardRef<FadeComponentHandle, FadeComponentProps>(
  ({ children, type = 'scale' }, ref) => {
    const { win, defaultVisible } = useLayoutContext()
    const [shouldRender, setShouldRender] = useState(defaultVisible) // 控制渲染状态

    const ipcHandleWinVisible = (visibility): void =>
      window.electron.ipcRenderer.send('win_visible', { visibility, win })

    const animation = fadeAnimation[type] || fadeAnimation.defaultConfig
    // 定义 useTransition 动画
    const transitions = useTransition(shouldRender, {
      ...animation,
      onRest: () => {
        if (!shouldRender) {
          ipcHandleWinVisible(false)
        } // 动画完成后设置隐藏状态
      }
    })

    // 暴露给外部的 toggle 函数
    useImperativeHandle(ref, () => ({
      toggle: (v): void => {
        if (v) {
          ipcHandleWinVisible(true)
          setShouldRender(true) // 首先确保动画组件可渲染
        } else {
          setShouldRender(false) // 开始触发离开动画
        }
      }
    }))

    return (
      <>
        {transitions((styles, item) => {
          return item ? (
            <animated.div style={styles} className={` h-full w-full`}>
              {children}
            </animated.div>
          ) : null
        })}
      </>
    )
  }
)
FadeComponent.displayName = 'FadeComponent'

export default FadeComponent
