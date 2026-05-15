# 视频调速 · Video Speed

在网页 `<video>` 上通过鼠标滚轮与快捷键快速调节播放速度与进度，适用于 B 站、YouTube 等常见视频网站。

## 功能

- **调速**：鼠标悬停在视频上时，`Shift` + 滚轮以 0.1 为步长调节倍速（0.25x～16x）
- **快进 / 快退**：`Ctrl` + 滚轮以 5 秒为步长跳转进度
- **恢复倍速**：`Shift` + 点击视频恢复 1 倍速
- **倍速记忆**：当前倍速保存在页面 `localStorage`，新加载或 SPA 路由切换后的视频会自动应用
- **视觉反馈**：调速与跳转时在视频右上角显示浮层提示

## 快捷键

| 操作 | 快捷键 |
|------|--------|
| 加快播放 | 悬停视频 + `Shift` + 向上滚轮 |
| 减慢播放 | 悬停视频 + `Shift` + 向下滚轮 |
| 快进 5 秒 | 悬停视频 + `Ctrl` + 向上滚轮 |
| 快退 5 秒 | 悬停视频 + `Ctrl` + 向下滚轮 |
| 恢复 1 倍速 | 悬停视频 + `Shift` + 点击 |

> 需将鼠标指针置于视频画面内，扩展才会响应操作。

## 技术栈

- [Plasmo](https://docs.plasmo.com/) — Chrome 扩展框架
- React 18 + TypeScript
- Sass

## 项目结构

```
src/
├── contents/
│   └── video-control/            # Content Script 与核心逻辑
│       ├── index.ts              # 入口（config + 启动）
│       ├── init.ts               # 初始化与生命周期
│       ├── core/                 # 常量、扩展上下文
│       ├── video/                # 视频操作、工具、浮层
│       ├── speed/                # 倍速存储与应用
│       └── listeners/            # 事件与 URL 变化监听
├── popup.tsx                     # 扩展弹窗（用法说明）
├── options.tsx                   # 选项页
└── background.ts
```

## 开发

### 环境要求

- Node.js 18+
- [pnpm](https://pnpm.io/)（推荐）

### 安装依赖

```bash
pnpm install
```

### 本地调试

```bash
pnpm dev
```

在 Chrome 中打开 `chrome://extensions`，开启「开发者模式」，选择「加载已解压的扩展程序」，指向 `build/chrome-mv3-dev` 目录。修改源码后会自动热更新。

### 生产构建

```bash
pnpm build
```

产物位于 `build/chrome-mv3-prod`，可用于打包发布。

### 打包为 zip

```bash
pnpm package
```

## 权限说明

扩展在 `http://*/*` 与 `https://*/*` 页面注入 Content Script，用于检测并控制页面内的 `<video>` 元素。倍速数据仅保存在各站点自身的 `localStorage` 中，不会上传到服务器。

## 反馈

如有功能建议或问题，请联系：[401765060@qq.com](mailto:401765060@qq.com)

## 许可证

MIT
