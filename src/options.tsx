import { UsageGuide } from "./components/usage-guide"

import "./options.scss"

function IndexOptions() {
  return (
    <div className="options-page">
      <UsageGuide idPrefix="options" layout="desktop" />
    </div>
  )
}

export default IndexOptions
