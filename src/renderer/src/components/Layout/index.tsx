import { useEffect, useRef, useState } from 'react'
import FadeComponent, { FadeComponentHandle, FadeComponentProps } from '../Fade'
import { LayoutProvider } from './LayoutContext'

export interface Config {
  position: {
    x: number
    y: number
  }
}

export default function Layout({
  children,
  type,
  defaultVisible = false
}: {
  children: React.ReactNode
  type?: FadeComponentProps['type']
  defaultVisible?: boolean
}): JSX.Element {
  const [winConfig, setConfig] = useState<Config>()
  // 创建一个 ref 来引用子组件的方法
  const fadeRef = useRef<FadeComponentHandle>(null)
  const [win, setWin] = useState<number | null>(null)

  const toggleFade = (visible: boolean): void => {
    // 调用子组件暴露的 toggle 方法
    fadeRef.current?.toggle(visible)
  }

  useEffect(() => {
    // 监听主线程发送的事件
    function invokeRenderMethod(
      _: unknown,
      {
        data,
        win,
        config
      }: {
        data: boolean
        win: number
        config?: Config
      }
    ): void {
      setConfig(config)
      setWin(win)
      toggleFade(data)
    }

    window.electron.ipcRenderer.on('invoke-render-method', invokeRenderMethod)

    return (): void => {
      window.electron.ipcRenderer.removeListener('invoke-render-method', invokeRenderMethod)
    }
  }, [])

  return (
    <LayoutProvider
      toggleFade={toggleFade}
      win={win}
      winConfig={winConfig}
      defaultVisible={defaultVisible}
    >
      <FadeComponent ref={fadeRef} type={type}>
        {children}
      </FadeComponent>
    </LayoutProvider>
  )
}
