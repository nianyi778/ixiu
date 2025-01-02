import { useTranslation } from 'react-i18next'
import { Button, Statistic } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useCallback, MouseEvent } from 'react'

const { Countdown } = Statistic

export default function Home(): JSX.Element {
  const { t, i18n } = useTranslation()
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const ipcHandleCreateSettingMenu = ({ x, y }: { x: number; y: number }): void =>
    window.electron.ipcRenderer.send('createSettingMenu', { x, y })

  const deadline = Date.now() + 20 * 60 * 1000 // Dayjs is also OK

  const onCreateSettingMenu = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    const { pageX, pageY } = e
    ipcHandleCreateSettingMenu({ x: pageX, y: pageY })
  }, [])

  return (
    <div className="flex flex-col px-6 pt-6 pb-10 bg-gradient-to-t from-[#cbcbca] to-[#c0bfbe] h-full w-full rounded-lg  shadow-lg">
      <div className=" flex items-center justify-end">
        <SettingOutlined
          onClick={onCreateSettingMenu}
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
        <Countdown className=" pt-[20px]" value={deadline} format="m:s" />
        <p className="pt-[10px]">
          <span>工作结束，休息20秒</span>
        </p>
        <div className=" flex items-center justify-center w-full pt-[40px]">
          <Button className=" w-[36%]" type="default">
            重置
          </Button>
          <div className=" w-[10%]"></div>
          <Button className=" w-[36%]" type="primary">
            休息
          </Button>
        </div>
      </div>
    </div>
  )
}
