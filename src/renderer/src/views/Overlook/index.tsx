import { useState, useEffect } from 'react'
import { RightCircleOutlined } from '@ant-design/icons'
import { useLayoutContext } from '@renderer/components/Layout/LayoutContext'

const BreakTime: React.FC = () => {
  const [time, setTime] = useState(20) // 倒计时起始时间
  const { toggleFade } = useLayoutContext()

  // 倒计时逻辑
  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
      return (): void => clearInterval(timer)
    } else {
      toggleFade(false)
    }
    return (): void => {}
  }, [time])

  return (
    <div className="text-white pt-[15%] pb-[10%] w-screen h-screen flex items-center flex-col justify-center">
      <div className="  w-full h-full z-[2] flex flex-col items-center justify-center">
        <div className="text-6xl font-bold ">{`00:${time.toString().padStart(2, '0')}`}</div>

        <p className="text-[64px] font-bold mt-4">请眺望远方</p>

        <div className="flex-1">loading...</div>
        <RightCircleOutlined
          onClick={() => toggleFade(false)}
          className="transition-all text-[24px] opacity-70 hover:opacity-100 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default BreakTime
