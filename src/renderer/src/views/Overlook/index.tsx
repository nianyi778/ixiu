import { useCallback, useMemo } from 'react'
import { RightCircleOutlined } from '@ant-design/icons'
import { useLayoutContext } from '@renderer/components/Layout/LayoutContext'
import { Statistic } from 'antd'

const BreakTime: React.FC = () => {
  const { toggleFade } = useLayoutContext()
  const time = useMemo(() => {
    return Date.now() + 20 * 1000
  }, [])

  const onFinish = useCallback(() => {
    window.timer.reset()
    toggleFade(false)
  }, [])

  return (
    <div className="text-white pt-[15%] pb-[10%] w-screen h-screen flex items-center flex-col justify-center">
      <div className="  w-full h-full z-[2] flex flex-col items-center justify-center">
        <Statistic.Countdown
          format="mm:ss"
          valueStyle={{ fontSize: '40px', fontWeight: 'bold', color: 'white' }}
          value={time}
          onFinish={onFinish}
        />

        <p className="text-[64px] font-bold mt-4">请眺望远方</p>

        <div className="flex-1">loading...</div>
        <RightCircleOutlined
          onClick={onFinish}
          className="transition-all text-[24px] opacity-70 hover:opacity-100 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default BreakTime
