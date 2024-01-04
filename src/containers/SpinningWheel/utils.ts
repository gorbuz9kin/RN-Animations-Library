import * as d3Shape from 'd3-shape';
import color from 'randomcolor';

export const createWheelPaths = (
  numberOfSegments: number,
  outerRadius: number,
) => {
  const data: any = Array.from({
    length: numberOfSegments,
  }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: 'dark',
    count: numberOfSegments,
  });

  return arcs.map((arc: any, idx: number) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(outerRadius)
      .innerRadius(20);

    return {
      path: instance(arc),
      color: colors[idx],
      value: (idx + 1) * 100,
      centroid: instance.centroid(arc),
    };
  });
};
