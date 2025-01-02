import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Config } from '.'

// 定义上下文数据类型
interface LayoutContextType {
  count: number
  toggleFade: (visible: boolean) => void
  win: number | null
  defaultVisible: boolean
  winConfig?: Config
  increment: () => void
}

// 创建 Context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

// 提供者组件
interface LayoutProviderProps {
  children: ReactNode
  win: number | null
  defaultVisible: boolean
  toggleFade: (visible: boolean) => void
  winConfig?: Config
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  toggleFade,
  defaultVisible,
  winConfig,
  win
}): ReactNode => {
  const [count, setCount] = useState(0)

  const increment = (): void => setCount((prev) => prev + 1)

  return (
    <LayoutContext.Provider
      value={{ count, increment, toggleFade, win, winConfig, defaultVisible }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

// 自定义 Hook
export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
