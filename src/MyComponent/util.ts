import { App, Plugin } from 'vue'
import dayjs from 'dayjs'
import ch from 'dayjs/locale/zh-cn'
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat'
dayjs.extend(LocalizedFormat)
dayjs.locale(ch)

export const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }
  return comp as T & Plugin
}

export const getDate = (): string => dayjs().format('YYYY-MM-DD dddd')
export const getTime = (): string => dayjs().format('LTS')

export const toRGB = (c: string, opacity = 1): string => {
  let color = c.toLowerCase()
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  if (!color || !reg.test(color)) {
    console.error('toRGB转换的颜色需要是十六进制颜色值')
    return color
  }
  if (color.length === 4) {
    let newColor = '#'
    for (let i = 1; i < 4; i++) {
      newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1))
    }
    color = newColor
  }
  const result = []
  for (let i = 1; i < 7; i += 2) {
    result.push(parseInt(`0x${color.slice(i, i + 2)}`))
  }
  return `rgba(${result.join(',')}, ${opacity})`
}
