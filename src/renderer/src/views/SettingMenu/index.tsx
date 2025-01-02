const SettingMenu: React.FC = () => {
  const menuItems = [
    { label: '关于一休', shortcut: null },
    { label: '设置...', shortcut: '⌘ ,' },
    { label: '应用白名单', shortcut: null },
    { label: '休息统计', shortcut: null },
    { label: '反馈', shortcut: null },
    { label: '为应用评分', shortcut: null },
    { label: '退出', shortcut: '⌘ Q' }
  ]

  return (
    <div className=" shadow-[0px_0px_3px_0px_#545454] border-[1px] border-solid  border-[#959594] absolute right-0 top-0 left-[4px] bottom-[4px] overflow-hidden rounded-lg ">
      <div className=" text-[14px] justify-center h-full flex flex-col p-[6px]  bg-gradient-to-t from-[#cbcbca] to-[#c0bfbe]">
        {menuItems.map((item, index) => (
          <div key={index}>
            <div
              className={`flex items-center justify-between group px-[4px] rounded-sm  hover:bg-[#326ccf] hover:text-white`}
            >
              <div className="flex items-center">
                <span>{item.label}</span>
              </div>
              {item.shortcut && (
                <span className={`text-gray-500 group-hover:text-white`}>{item.shortcut}</span>
              )}
            </div>
            {index === 0 || index === 1 || index === 5 ? (
              <div className="h-[1px] bg-gray-400 my-1" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingMenu
