
# ixiu

**ixiu** 是一个基于 React、Electron 和 Tailwind CSS 开发的 macOS 应用程序，用于提供工作定时提醒功能，帮助用户高效管理时间，提高生产力。

**ixiu** is a macOS application developed using React, Electron, and Tailwind CSS. It provides work timer reminders to help users manage their time effectively and boost productivity.

---
## **Preview Effect | 演示效果**
![截屏2025-01-06 17 44 58](https://github.com/user-attachments/assets/36dc961c-14d9-4b0c-8cba-80aac49cbd44)



https://github.com/user-attachments/assets/878191ee-53ec-46d1-bbd0-ed6673a49085


---

## **Features | 功能**

- **Work Timer Reminders | 工作定时提醒**:
  - Set custom reminders for starting or ending tasks. | 设置自定义任务开始或结束提醒。
  - Designed for focused work and time management. | 为专注工作和时间管理而设计。

- **Cross-Platform Framework | 跨平台框架**:
  - Built with Electron, primarily supporting macOS. | 基于 Electron 构建，目前主要支持 macOS。

- **Modern UI Design | 现代化界面设计**:
  - Responsive and clean design powered by Tailwind CSS. | 使用 Tailwind CSS 实现简洁和响应式设计。

- **Language Switching | 支持中英文切换**:
  - Supports both English and Chinese interface switching. | 支持中英文界面切换。

- **Technology Stack | 技术栈**:
  - **React**: For building user interfaces. | 用于构建用户界面。
  - **Electron**: For creating desktop applications. | 用于创建桌面应用。
  - **Tailwind CSS**: For rapid and flexible UI styling. | 用于快速灵活的界面样式开发。

---

## **Project Structure | 项目结构**

The project is structured as follows: | 项目结构如下：

```
root/
├── public/               # Static files | 静态文件
├── src/                  # Source code | 源代码
│   ├── components/       # Reusable components | 可复用组件
│   ├── hooks/            # Custom hooks | 自定义 Hooks
│   ├── pages/            # Page components | 页面组件
│   ├── utils/            # Utility functions | 工具函数
│   ├── App.js            # Application entry component | 应用入口组件
│   ├── index.js          # React application entry point | React 应用入口
│   └── main/             # Electron main process code | Electron 主进程代码
│       ├── main.js       # Main process entry | 主进程入口
│       ├── preload.js    # Preload script | 预加载脚本
│       └── menu.js       # Custom menu configuration | 自定义菜单配置
├── tailwind.config.js    # Tailwind configuration file | Tailwind 配置文件
├── package.json          # Project dependencies and scripts | 项目依赖及脚本
└── electron-builder.json # Electron build configuration | Electron 打包配置
```

---

## **Getting Started | 快速开始**

1. **Clone the Repository | 克隆仓库**

   ```bash
   git clone https://github.com/nianyi778/ixiu.git
   cd ixiu
   ```

2. **Install Dependencies | 安装依赖**

   ```bash
   npm install
   ```

3. **Run the Development Environment | 启动开发环境**

   ```bash
   npm run dev
   ```

   - This command starts both Electron and the React development server. | 此命令将启动 Electron 和 React 开发服务器。

4. **Build the Application | 构建应用程序**

   ```bash
   npm run build
   ```

   - The generated installation package will be available in the `dist` directory. | 生成的安装包将存放在 `dist` 目录下。

---

## **Key Features | 主要功能**

### **1. Timer Reminders | 定时提醒**
- Set the following types of reminders: | 支持以下类型的提醒：
  - Work start reminders. | 工作开始提醒。
  - Work end reminders. | 工作结束提醒。
  - Custom time reminders. | 自定义时间提醒。

- Users can configure the time and enable/disable reminders through the interface. | 用户可以通过界面配置时间并启用/禁用提醒。

### **2. Notification System | 通知系统**
- Integrated with macOS system notifications to provide timely alerts. | 集成 macOS 系统通知服务，提供及时提醒。
- Includes sound notifications for better user experience. | 包含声音通知，提升用户体验。

### **3. Task Statistics (Optional Feature) | 任务统计（可选功能）**
- Tracks work durations. | 记录工作时长。
- Provides simple time management statistics. | 提供简单的时间管理统计。

### **4. Language Switching | 中英文切换**
- Allows users to switch between English and Chinese interfaces. | 允许用户切换中英文界面。

---

## **Technical Implementation | 技术实现**

### **1. Frontend | 前端**
- **React**:
  - Component-based architecture for UI development. | 基于组件的架构用于开发用户界面。
  - Uses React Hooks for state management. | 使用 React Hooks 进行状态管理。

- **Tailwind CSS**:
  - Utility-first CSS framework for fast and maintainable styling. | 实用性优先的 CSS 框架，用于快速和可维护的样式开发。

### **2. Desktop Application | 桌面应用**
- **Electron**:
  - Enables interaction with the operating system, such as file operations and notifications. | 实现与操作系统的交互，例如文件操作和通知。
  - Manages communication between the main process and renderer process (IPC). | 管理主进程和渲染进程之间的通信（IPC）。

### **3. System Notifications | 系统通知**
- Uses Electron's notification API to integrate with the macOS notification center. | 使用 Electron 的通知 API 与 macOS 通知中心集成。

### **4. Language Management | 语言管理**
- Uses internationalization libraries like `i18next` to enable multi-language support. | 使用 `i18next` 等国际化库实现多语言支持。

---

## **Scripts | 脚本**

| Command             | Description                               | 描述                           |
|---------------------|-------------------------------------------|--------------------------------|
| `npm run dev`       | Start the development environment         | 启动开发环境                   |
| `npm run build`     | Build the production-ready application    | 构建生产环境应用程序            |
| `npm run lint`      | Run code quality checks                   | 运行代码质量检查                |

---

## **Future Improvements | 未来改进**

1. **Cross-Platform Support | 跨平台支持**
   - Extend support for Windows and Linux systems. | 扩展对 Windows 和 Linux 系统的支持。

2. **Dark Mode | 深色模式**
   - Add a dark theme to align with macOS dark mode. | 增加深色主题以适配 macOS 深色模式。

3. **Advanced Time Management | 高级时间管理**
   - Include features like Pomodoro timers and automated reminders. | 增加番茄钟和自动提醒等功能。

4. **Data Sync | 数据同步**
   - Integrate cloud services for syncing reminder settings and statistics across devices. | 集成云服务，实现提醒设置和统计数据的多设备同步。

5. **Enhanced Language Support | 增强语言支持**
   - Add more languages for a global audience. | 增加更多语言以适应全球用户。

---

## **Contributing | 贡献**

Contributions are welcome! Please follow these steps: | 欢迎贡献！请按以下步骤操作：

1. Fork the repository. | Fork 此仓库。
2. Create a new branch: `git checkout -b feature/your-feature-name`. | 创建新分支：`git checkout -b feature/你的功能名称`。
3. Commit your changes: `git commit -m 'Add a new feature'`. | 提交更改：`git commit -m '添加新功能'`。
4. Push to your branch: `git push origin feature/your-feature-name`. | 推送到分支：`git push origin feature/你的功能名称`。
5. Open a Pull Request. | 创建一个 Pull Request。

---

## **License | 许可证**

This project is licensed under the [MIT License](LICENSE). | 本项目基于 [MIT License](LICENSE) 许可。

