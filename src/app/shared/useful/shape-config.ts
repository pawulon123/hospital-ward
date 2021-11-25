import { cos, sin } from "./coordinate-system";

export default {
  scale:{
    x: 0.8,
    y: 0.8
  },
  coordinates: {
    equilateralTriangle: [
      {
        x: -16,
        y: -16

      },
      {
        x: 16,
        y: -16

      },
      {
        x: 0,
        y: 16
      }
    ],
    rect: {
      horizontal: {
        width: 16,
        height: 9
      },
      vertical: {
        width: 9,
        height: 16
      },
      draw: (type: { width: number, height: number }) => {
        return [
          {
            x: -type.width,
            y: -type.height

          },
          {
            x: type.width,
            y: -type.height

          },
          {
            x: type.width,
            y: type.height

          },
          {
            x: -type.width,
            y: type.height
          },
        ]
      }
    },
    circle: {
      r: 16,
      draw: (r: number) => {
        return Array.from(new Array(360), ((_, i) => { return { x: r * cos(i), y: r * sin(i) } }
        ));
      }
    },
    x: [
      {
        x: -15,
        y: -13

      },
      {
        x: -2,
        y: 0

      },
      {
        x: -15,
        y: 13
      },
      {
        x: -12,
        y: 13

      },
      {
        x: 0,
        y: 1

      },
      {
        x: 12,
        y: 13
      },
      {
        x: 15,
        y: 13

      },
      {
        x: 2,
        y: 0

      },
      {
        x: 15,
        y: -13
      },
      {
        x: 12,
        y: -13

      },
      {
        x: 0,
        y: -1

      },
      {
        x: -12,
        y: -13
      },
    ],
  }
};
