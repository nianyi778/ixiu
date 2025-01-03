export default {
  upDown: {
    from: { transform: 'translateY(-100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(-100%)' },
    config: { tension: 300, friction: 20 }
  },
  rightToLeft: {
    from: { transform: 'translateX(100%)' }, // 从屏幕右侧开始
    enter: { transform: 'translateX(0%)' }, // 移动到屏幕中间
    leave: { transform: 'translateX(100%)' }, // 离开到屏幕右侧
    config: { tension: 200, friction: 20 } // 添加弹性动画效果
  },
  defaultConfig: {
    from: {
      opacity: 0.6
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0.6
    },
    config: { duration: 50 }
  },
  scale: {
    from: {
      opacity: 0,
      transform: 'scale(1.5)'
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 0,
      transform: 'scale(1.5)'
    },
    config: { duration: 700 }
  }
}
