import './assets/main.css'
import './common/i18n'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { theme, ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#676764'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
