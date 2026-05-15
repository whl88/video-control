import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const pkgPath = join(root, "package.json")

function run(cmd) {
  execSync(cmd, { cwd: root, stdio: "inherit" })
}

function runOutput(cmd) {
  return execSync(cmd, { cwd: root, encoding: "utf8" }).trim()
}

function bumpPatch(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(.*)?$/.exec(version)
  if (!match) {
    throw new Error(`无法解析版本号: ${version}（期望格式 x.y.z）`)
  }
  const patch = Number.parseInt(match[3], 10) + 1
  return `${match[1]}.${match[2]}.${patch}${match[4] ?? ""}`
}

function readPkg() {
  return JSON.parse(readFileSync(pkgPath, "utf8"))
}

function writePkg(pkg) {
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8")
}

const dirty = runOutput("git status --porcelain")
if (dirty) {
  console.error("工作区不干净，请先提交或暂存变更后再运行 pnpm release")
  process.exit(1)
}

const pkg = readPkg()
const currentVersion = pkg.version
const nextVersion = bumpPatch(currentVersion)
const tag = `v${nextVersion}`

console.log(`版本: ${currentVersion} → ${nextVersion}`)
console.log(`标签: ${tag}`)

pkg.version = nextVersion
writePkg(pkg)

try {
  run("git add package.json")
  run(`git commit -m "chore: release ${tag}"`)
  run(`git tag ${tag}`)
  run("git push")
  run(`git push origin ${tag}`)
} catch (error) {
  console.error("\n发布失败。若已提交但未推送，请手动检查 git 状态。")
  process.exit(error.status ?? 1)
}

console.log(`\n已推送 ${tag}，GitHub Actions 将自动构建并提交 Chrome 商店。`)
