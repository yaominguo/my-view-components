import { ComposeOption } from 'echarts/core'

import {
  DatasetComponentOption as DatasetOption,
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption,
  DataZoomComponentOption,
} from 'echarts/components'

import {
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts'

/** Dataset选项参数 */
export type DatasetComponentOption = DatasetOption
/** 附加组件的选项参数（如title、tooltip、legend等） */
export type ComponentsOption = ComposeOption<
  | DatasetComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DataZoomComponentOption
>

/** 所有选项参数  */
export type ECOption = ComposeOption<
  | LineSeriesOption
  | BarSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | ScatterSeriesOption
> &
  ComponentsOption

/** 柱状图选项参数 */
export type BarOption = ComponentsOption &
  ComposeOption<LineSeriesOption | BarSeriesOption>
/** 折线图选项参数 */
export type LineOption = ComponentsOption &
  ComposeOption<LineSeriesOption | BarSeriesOption>
/** 饼图选项参数 */
export type PieOption = ComponentsOption & ComposeOption<PieSeriesOption>
/** 雷达图选项参数 */
export type RadarOption = ComponentsOption & ComposeOption<RadarSeriesOption>
/** 散点图选项参数 */
export type ScatterOption = ComponentsOption &
  ComposeOption<ScatterSeriesOption>
