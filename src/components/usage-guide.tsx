import type { ReactNode } from "react"

type UsageGuideProps = {
  idPrefix?: string
  layout?: "compact" | "desktop"
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="popup__kbd">{children}</kbd>
}

function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <span className="popup__keys">
      {keys.map((key, i) => (
        <span key={key}>
          {i > 0 && <span className="popup__kbd-sep">+</span>}
          <Kbd>{key}</Kbd>
        </span>
      ))}
    </span>
  )
}

export function UsageGuide({
  idPrefix = "guide",
  layout = "compact"
}: UsageGuideProps) {
  const shortcutsId = `${idPrefix}-shortcuts-title`
  const featuresId = `${idPrefix}-features-title`
  const rootClass =
    layout === "desktop" ? "popup popup--desktop" : "popup"

  return (
    <div className={rootClass}>
      <header className="popup__header">
        <div className="popup__brand">
          <span className="popup__icon" aria-hidden>
            ▶
          </span>
          <div>
            <h1 className="popup__title">视频调速</h1>
            <p className="popup__subtitle">
              在 B 站、YouTube 等页面的 &lt;video&gt; 上快速调节倍速与进度
            </p>
          </div>
        </div>
      </header>

      <div className="popup__body">
        <div className="popup__alert" role="note">
          <span className="popup__alert-icon" aria-hidden>
            ⓘ
          </span>
          <div>
            <strong>使用前请将鼠标移入视频画面</strong>
            指针在视频区域内时，扩展才会响应滚轮与点击操作。
          </div>
        </div>

        <section aria-labelledby={shortcutsId}>
          <h2 id={shortcutsId} className="popup__section-title">
            快捷键
          </h2>
          <ul className="popup__cards">
            <li className="popup__card popup__card--speed">
              <div className="popup__card-head">
                <span className="popup__card-icon" aria-hidden>
                  ⚡
                </span>
                <span className="popup__card-label">调节播放速度</span>
              </div>
              <ul className="popup__rows">
                <li className="popup__row">
                  <span className="popup__row-action">加快播放</span>
                  <KeyCombo keys={["Shift", "↑"]} />
                </li>
                <li className="popup__row">
                  <span className="popup__row-action">减慢播放</span>
                  <KeyCombo keys={["Shift", "↓"]} />
                </li>
              </ul>
              <p className="popup__meta">
                每次 0.1 倍速，范围 0.25×～16×；右上角显示当前倍速
              </p>
            </li>

            <li className="popup__card popup__card--seek">
              <div className="popup__card-head">
                <span className="popup__card-icon" aria-hidden>
                  ⏩
                </span>
                <span className="popup__card-label">快进 / 快退</span>
              </div>
              <ul className="popup__rows">
                <li className="popup__row">
                  <span className="popup__row-action">快进 5 秒</span>
                  <KeyCombo keys={["Ctrl", "↑"]} />
                </li>
                <li className="popup__row">
                  <span className="popup__row-action">快退 5 秒</span>
                  <KeyCombo keys={["Ctrl", "↓"]} />
                </li>
              </ul>
              <p className="popup__meta">步长 5 秒，跳转时右上角显示提示</p>
            </li>

            <li className="popup__card popup__card--reset">
              <div className="popup__card-head">
                <span className="popup__card-icon" aria-hidden>
                  ↺
                </span>
                <span className="popup__card-label">恢复默认倍速</span>
              </div>
              <ul className="popup__rows">
                <li className="popup__row">
                  <span className="popup__row-action">恢复 1 倍速</span>
                  <KeyCombo keys={["Shift", "点击"]} />
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section aria-labelledby={featuresId}>
          <h2 id={featuresId} className="popup__section-title">
            其他说明
          </h2>
          <ul className="popup__features">
            <li className="popup__feature">
              <strong>倍速记忆</strong>：当前倍速保存在页面 localStorage，新加载或
              SPA 切换后的视频会自动应用
            </li>
            <li className="popup__feature">
              <strong>隐私</strong>：数据仅存于各站点本地，不会上传服务器
            </li>
            <li className="popup__feature">
              <strong>适用站点</strong>：所有含 HTML5 &lt;video&gt; 的网页（需
              http/https）
            </li>
          </ul>
        </section>
      </div>

      <footer className="popup__footer">
        功能建议或问题反馈：
        <a href="mailto:401765060@qq.com">401765060@qq.com</a>
      </footer>
    </div>
  )
}

