import { select } from 'd3';

function getElementSize(ele: Element | HTMLElement) {
  return {
    width: ele.clientWidth,
    height: ele.clientHeight,
  };
}

export function getChartSize(
  ele: Element | HTMLElement,
  width = 0,
  height = 0,
) {
  let w = width || 0;
  let h = height || 0;
  if (!w && !h && ele) {
    const size = getElementSize(ele);

    w = size.width || w;
    h = size.height || h;
  }
  return {
    width: w,
    height: h,
  };
}

export function getElement(container: HTMLElement | string) {
  return typeof container === 'string'
    ? document.querySelector(container)
    : container;
}

export function transformD3El(dom: HTMLElement) {
  return select(dom);
}

export function getPixel(value: string | number) {
  return typeof +value === 'number' && !isNaN(+value) ? `${value}px` : value;
}
