import { useState } from "react"

import "./style.css"
function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="popup">
      <h1>用法</h1>
      <p>鼠标悬浮在视频上时：</p>
      <p>1.使用 Shift + 滚轮调整播放速度；</p>
      <p>2.使用 Ctrl + 滚轮快进/快退（5 秒步长）；</p>
      <p>3.Shift + 点击视频恢复 1 倍速。</p>
    </div>
  )
}

export default IndexPopup
