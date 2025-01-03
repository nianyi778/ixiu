import { useTranslation } from 'react-i18next'
import { Button, Statistic } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'

const { Countdown } = Statistic

export default function Home(): JSX.Element {
  const { t, i18n } = useTranslation()
  const [time, setTime] = useState(0)
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const ipcHandleCreateSettingMenu = (): void =>
    window.electron.ipcRenderer.send('createSettingMenu')
  const ipcHandleCreateFull = (): void => window.electron.ipcRenderer.send('createFullscreen')

  useEffect(() => {
    // 初始化倒计时显示
    window.timer.getRemainingTime().then((remainingTime) => {
      console.log(`Time updated: ${remainingTime}s`)
      setTime(Date.now() + remainingTime * 1000)
    })
  }, [])

  const onFinish = useCallback(() => {
    ipcHandleCreateFull()
  }, [])

  return (
    <div className="flex flex-col px-6 pt-6 pb-10 bg-gradient-to-t from-[#cbcbca] to-[#c0bfbe] h-full w-full rounded-lg  shadow-lg">
      <div className=" flex items-center justify-end">
        <SettingOutlined
          onClick={ipcHandleCreateSettingMenu}
          className="transition-all  opacity-70 hover:opacity-100 cursor-pointer"
        />
      </div>
      <div className=" flex-1 flex items-center justify-center flex-col">
        <div className=" flex-1 flex items-center justify-center">loading...</div>
        <div className="actions hidden">
          <div className=" p-4 rounded-lg ">
            <h1 className="text-2xl font-bold text-red-500">{t('title')}</h1>
          </div>
          <Button
            type="primary"
            onClick={() => {
              i18n.changeLanguage('ja')
            }}
          >
            test
          </Button>
          <div className="action">
            <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
              Send IPC
            </a>
          </div>
        </div>
        <Countdown className=" pt-[20px]" value={time} onFinish={onFinish} format="mm:ss" />
        <p className="pt-[10px]">
          <span>工作结束，休息20秒</span>
        </p>
        <div className=" flex items-center justify-center w-full pt-[40px]">
          <Button className=" w-[36%]" type="default">
            重置
          </Button>
          <div className=" w-[10%]"></div>
          <Button className=" w-[36%]" type="primary" onClick={ipcHandleCreateFull}>
            休息
          </Button>
        </div>
      </div>
    </div>
  )
}
