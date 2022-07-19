/// <reference types="typed-query-selector/strict.js" />

import { Chart as AChart, View as AView } from './chart/index.js';
import { Options, Theme } from './types/index.js';

export const Chart = (options: Options) => new AChart(options);

export const setTheme = (theme: Theme) => AView.setTheme(theme);

export { Chart as AChart, View as AView } from './chart/index.js';
export * from './components/index.js';
export * from './constant.js';
export * from './service/index.js';
export * from './types/index.js';
export * from './utils/index.js';
