import { CurveFactory } from 'd3';

import { View } from '../chart/index.js';
import { LegendItem, AreaParams } from '../components/index.js';

import { Percentage } from './helpers.js';
import { TooltipContext, TooltipContextItem } from './tooltip.js';

export enum ScaleType {
  TIME = 'time',
  LINEAR = 'linear',
  ORDINAL = 'ordinal',
}

export type ChartType = 'area' | 'bar' | 'line' | 'pie' | 'scatter';

export type ChartSeriesOption =
  | AreaSeriesOption
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterOption;

// 提供setOptions
export interface Options {
  width?: number;
  height?: number;
  offset?: { x?: number; y?: number };
  grid?: { top?: number };
  container: HTMLElement | string;
  type?: ChartType;
  data?: ChartData[]; // 数据源
  title?: TitleOption;
  legend?: LegendOption;
  xAxis?: AxisOption;
  yAxis?: AxisOption;
  tooltip?: TooltipOption;
  rotated?: boolean; // x y 轴旋转
  colors?: string[]; // 根据数组中循环展示颜色
  seriesOption?: ChartSeriesOption;
  zoom?: ZoomOption;
  contextCallbackFunction?: (view: View) => void;
  yPlotLine?: YPlotLineOptions;
  xPlotLine?: XPlotLineOptions;
}

export interface XPlotLineOptions {
  hide?: boolean;
  value?: number;
  text?: string;
  color?: string;
  dashType?: 'dash' | 'solid';
}

export interface YPlotLineOptions {
  hide?: boolean;
  value?: TooltipContext;
  text?: string;
  dashType?: 'dash' | 'solid';
  textFormatter?: string | ((text: string) => string);
}
export interface ZoomOption {
  enabled: boolean;

  onzoomStart?(d: AreaParams): void;

  onzoom?(d: AreaParams): void;

  onzoomEnd?(d: AreaParams): void;
}

export interface TitleOption {
  text?: string;
  offsetX?: number;
  offsetY?: number;
  hide?: boolean;
  formatter?: string | ((text: string) => string);
}

export interface LegendOption {
  hide?: boolean;
  // template: string => 'legend {name}'  fn => custom  插入 dom
  formatter?: string | ((d: LegendItem[]) => string);
  itemFormatter?: string | ((name: string) => string);
  offsetX?: number;
  offsetY?: number;
  isMount?: boolean;
  // textStyle?: {} // TODO
  onClick?: () => void; // chart.on TODO
}

// <Function|string|undefined> undefined
export interface AxisOption {
  offsetX?: number;
  offsetY?: number;
  tickFormatter?: string | ((value?: any) => string | ((value: any) => string)); // 'xxx {value}'
  type?: ScaleType;
  min?: number;
  max?: number;
  minStep?: number; // axis 最小步宽，例如整数可以设置为 1
  tickCount?: number; // 设置 坐标 tick 总数
  ticks?: unknown; // 完全控制的d3.ticks，如果要传递多个参数，可以使用数组形式，参见 https://observablehq.com/@d3/axis-ticks?collection=@d3/d3-axis
}

export interface TooltipOption {
  hideTitle?: boolean;
  titleFormatter?: string | ((value: TooltipContext) => string);
  itemFormatter?: (value: TooltipContextItem[]) => string;
  nameFormatter?: string | ((value: TooltipContextItem) => string);
  valueFormatter?: string | ((value: TooltipContextItem) => string); // 添加 行 formatter
  sort?: (a: Data<XData>, b: Data<XData>) => number; // 支持 sort 函数
  disabled?: boolean;
  trigger?: 'axis' | 'item' | 'none';
}

export interface LineSeriesOption {
  // https://d3js.org.cn/document/d3-shape/#curves
  curveType?: CurveFactory; // export d3 curve 业务使用 curve
  lineWidth?: number;
  activeLineWidth?: number;
}

export interface AreaSeriesOption {
  curveType?: CurveFactory;
  lineWidth?: number;
  activeLineWidth?: number;
  startOpacity?: number;
  endOpacity?: number;
}

export interface BarSeriesOption {
  stack?: boolean;
  rotated?: boolean; // x y 轴旋转
  barWidth?: number;
  padding?: number; // bar 相邻 padding
  radius?: number; // 圆角
  bandwidth?: number; // bar 宽度
  closeRadiusLadder?: boolean; // 关闭叠加 bar 圆角是否阶阶梯优化
  isGroup?: boolean; // 是否分组 [{name: 'xxx1'}, {name: 'xxx2'}]
  columnClick?: (data: BarColumnParams) => void;
  minHeight?: number; // 单个柱状的高度，如果 isGroup 为 true 时不生效
}

export interface BarColumnParams {
  name: string | number | Date;
  value: number;
  color?: string;
}

export interface PieSeriesOption {
  innerRadius?: number | Percentage;
  outerRadius?: number | Percentage;
  startAngle?: number;
  endAngle?: number;
  label?: {
    text?: string;
    position?: {
      x?: string;
      y?: string;
    };
  };
  // 指定总量
  total?: number;
  backgroundColor?: string;
  itemStyle?: {
    borderRadius?: number;
    borderWidth?: number;
  };
  innerDisc?: boolean;
}

export interface ScatterOption {
  size?: number; // 圆大小  默认 5
  minSize?: number; // 默认 5
  maxSize?: number; // 默认 20
  type?: 'bubble'; // 设置 bubble 会默认使用 气泡样式渲染
  opacity?: number; // bubble 透明度 默认 0.2
}

export interface ChartData {
  name: string;
  color?: string;
  value?: number;
  values?: Array<Data<XData>>;
}

export type Data<T extends object = object> = T &
  (
    | {
        value?: number;
      }
    | {
        x: Date | number | string;
        y: number;
        color?: string;
      }
  );

export interface XData {
  x: Date | number | string;
  y: number;
  name?: string;
  size?: number;
  color?: string;
}

export interface Point {
  x: number;
  y: number;
}
