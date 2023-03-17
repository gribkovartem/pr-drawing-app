import { useState } from "react";
import { Color } from "../entities/color";
import {
  Circle,
  Drawing,
  Figure,
  FigurePosition,
  FigureThickness,
  FigureType,
  Line,
  Rectangle,
} from "../entities/figure";
import { FigureSizeParams } from "../views";

export function useCanvas() {
  const [color, setColor] = useState<Color>(Color.Black);
  const [figures, setFigures] = useState<Figure[]>([]);
  const [isDrawable, setIsDrawable] = useState(false);
  const [thickness, setThickness] = useState(FigureThickness.Light);

  function createFigure(type: FigureType, position: FigurePosition) {
    switch (type) {
      case FigureType.Circle:
        setFigures((prev) => [
          ...prev,
          new Circle(color, thickness, position, 50),
        ]);
        break;
      case FigureType.Rectangle:
        setFigures((prev) => [
          ...prev,
          new Rectangle(color, thickness, position, 50, 50),
        ]);
        break;
      case FigureType.Line:
        setFigures((prev) => [
          ...prev,
          new Line(color, thickness, position, [50, 0], [100, 50], 50, 50),
        ]);
        break;
      default:
        throw new Error("Wrong figure type");
    }
  }

  function addDrawing(drawing: Drawing) {
    setFigures((prev) => [...prev, drawing]);
  }

  function changeFigurePosition(figure: Figure, position: FigurePosition) {
    figure.changePosition(position);
  }

  function changeFigureSize(
    figure: Figure,
    { position, width, height, from, to, radius }: FigureSizeParams
  ) {
    if (figure instanceof Rectangle && width && height) {
      figure.changeSize(width, height);
    } else if (figure instanceof Line && from && to) {
      figure.changeCoordinates(from, to);
    } else if (figure instanceof Circle && radius) {
      figure.changeRadius(radius);
    }

    figure.changePosition(position);
  }

  function changeColor(color: Color) {
    setColor(color);
  }

  return {
    figures,
    isDrawable,
    thickness,
    color,
    createFigure,
    changeFigurePosition,
    changeFigureSize,
    changeColor,
    setIsDrawable,
    addDrawing,
    setThickness,
    setColor,
  };
}
