import { Story, Meta } from '@storybook/html';

import { Chart } from '../src';
import { barData } from './data';
import '../src/theme/default.scss';
import { timeFormat } from 'd3';

export default {
  title: 'Basebar',
} as Meta;

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: Story = () => {
  setTimeout(() => {
    Chart({
      container: '#baseBar',
      type: 'bar',
      // rotated: true,
      title: {
        text: '柱状图',
      },
      tooltip: {
      },
      seriesOption: {
        // stack: true,
        // radius: 5,
        // bandwidth: 10,
      },
      data: barData,
      xAxis: {
        // type: ScaleType.TIME,
        tickFormatter: () => timeFormat('%H:%M'),
      },
    });
  }, 0);
  return `<div style="width: 100%; height: 220px" id="baseBar"></div>`;
};

export const Basebar = Template.bind({});
