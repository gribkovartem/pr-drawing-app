import { fabric } from "fabric";
import { Color } from "../../entities/color";
import {
  Circle,
  Drawing,
  FigureThickness,
  Line,
  Rectangle,
} from "../../entities/figure";

export function mapRectangleToCanvasItem(figure: Rectangle): fabric.Rect {
  return new fabric.Rect({
    width: figure.width,
    height: figure.height,
    fill: undefined,
    stroke: figure.color,
    strokeWidth: figure.thickness,
    left: figure.position[0],
    top: figure.position[1],
    hasRotatingPoint: false,
  });
}

export function mapCircleToCanvasItem(figure: Circle): fabric.Circle {
  return new fabric.Circle({
    width: figure.radius * 2,
    height: figure.radius * 2,
    radius: figure.radius,
    fill: undefined,
    stroke: figure.color,
    strokeWidth: figure.thickness,
    left: figure.position[0],
    top: figure.position[1],
    hasRotatingPoint: false,
  });
}

export function mapLineToCanvasItem(figure: Line): fabric.Line {
  return new fabric.Line([...figure.from, ...figure.to], {
    stroke: figure.color,
    strokeWidth: figure.thickness,
    hasRotatingPoint: false,
    left: figure.position[0],
    top: figure.position[1],
    width: figure.width,
    height: figure.height,
  });
}

export function mapDrawingToCanvasItem(figure: Drawing): fabric.Path {
  console.log(figure.path);

  return new fabric.Path(figure.path as fabric.Point[], {
    stroke: figure.color,
    strokeWidth: figure.thickness,
    left: figure.position[0],
    top: figure.position[1],
    fill: undefined,
    hasRotatingPoint: false,
  });
}

export function mapCanvasPathToDrawing(figure: fabric.Path): Drawing {
  return new Drawing(
    figure.stroke as Color,
    figure.strokeWidth ?? FigureThickness.Light,
    [figure.left ?? 0, figure.top ?? 0],
    figure.path ?? []
  );
}
