import { FC, ReactNode, useEffect, useState } from "react";
import { fabric } from "fabric";
import {
  Circle,
  Drawing,
  Figure,
  FigurePosition,
  FigureThickness,
  Line,
  Rectangle,
} from "../../entities/figure";
import classes from "./canvas.module.css";
import {
  mapCanvasPathToDrawing,
  mapCircleToCanvasItem,
  mapDrawingToCanvasItem,
  mapLineToCanvasItem,
  mapRectangleToCanvasItem,
} from "./canvas.mappers";
import { Color } from "../../entities/color";

export type FigureSizeParams = {
  position: FigurePosition;
  width?: number;
  height?: number;
  from?: FigurePosition;
  to?: FigurePosition;
  radius?: number;
};

interface Props {
  figures: Figure[];
  isDrawable: boolean;
  thickness: FigureThickness;
  color: Color;
  width?: number;
  height?: number;
  children: (saveImage: VoidFunction) => ReactNode;
  onFinishDrawing: (drawing: Drawing) => void;
  onChangePosition: (figure: Figure, position: FigurePosition) => void;
  onChangeSize: (figure: Figure, size: FigureSizeParams) => void;
}

function getFigureByRendered(
  renderedFigures: Map<Figure, fabric.Object>,
  target: fabric.Object
) {
  return [...renderedFigures].find(([_, rendered]) => target === rendered);
}

export const Canvas: FC<Props> = ({
  figures,
  isDrawable = false,
  thickness,
  color,
  width = 1024,
  height = 768,
  children,
  onFinishDrawing,
  onChangePosition,
  onChangeSize,
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [renderedFigures, setRenderedFigures] =
    useState<Map<Figure, fabric.Object>>();

  const handleSaveImage = () => {
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "picture.png";
    link.href = canvas.toDataURL({ format: "png" });
    link.click();
  };

  const handleMoveFigure = (target: fabric.Object) => {
    if (!renderedFigures) return;

    const foundFigure = getFigureByRendered(renderedFigures, target)?.[0];
    if (!foundFigure) return;

    onChangePosition(foundFigure, [
      target.left ?? foundFigure.position[0],
      target.top ?? foundFigure.position[1],
    ]);
  };

  const handleResizeFigure = (target: fabric.Object) => {
    if (!renderedFigures) return;

    const foundFigure = getFigureByRendered(renderedFigures, target)?.[0];
    if (!foundFigure) return;

    onChangeSize(foundFigure, {
      position: [target.getBoundingRect().left, target.getBoundingRect().top],
      width: target.getScaledWidth(),
      height: target.getScaledHeight(),
      from:
        target instanceof fabric.Line
          ? [target.getCoords()[0].x, target.getCoords()[0].y]
          : undefined,
      to:
        target instanceof fabric.Line
          ? [target.getCoords()[2].x, target.getCoords()[2].y]
          : undefined,
      radius: target instanceof fabric.Circle ? target.getRadiusX() : undefined,
    });
  };

  useEffect(() => {
    const canvasInstance = new fabric.Canvas("canvas", {
      width,
      height,
      isDrawingMode: isDrawable,
      backgroundColor: Color.White,
    });

    setCanvas(canvasInstance);

    canvasInstance.on("mouse:up", ({ currentTarget }) => {
      if (canvasInstance.isDrawingMode && currentTarget) {
        onFinishDrawing(mapCanvasPathToDrawing(currentTarget as fabric.Path));
      }
    });

    return () => {
      canvas?.removeListeners();
      canvas?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    canvas.isDrawingMode = isDrawable;
    canvas.freeDrawingBrush.width = thickness;
    canvas.freeDrawingBrush.color = color;
  }, [isDrawable]);

  useEffect(() => {
    if (!figures.length) return;

    setRenderedFigures(
      figures.reduce<Map<Figure, fabric.Object>>((acc, figure) => {
        if (!acc.has(figure)) {
          if (figure instanceof Rectangle) {
            acc.set(figure, mapRectangleToCanvasItem(figure));
          } else if (figure instanceof Circle) {
            acc.set(figure, mapCircleToCanvasItem(figure));
          } else if (figure instanceof Line) {
            acc.set(figure, mapLineToCanvasItem(figure));
          } else if (figure instanceof Drawing) {
            acc.set(figure, mapDrawingToCanvasItem(figure));
          }
        }

        return acc;
      }, new Map())
    );
  }, [figures]);

  useEffect(() => {
    if (!renderedFigures?.size || !canvas) return;

    canvas.on("object:moving", ({ target }) => {
      if (!target) return;

      handleMoveFigure(target);
    });

    canvas.on("object:scaling", ({ target }) => {
      if (!target) return;

      handleResizeFigure(target);
    });

    canvas.clear();
    renderedFigures?.forEach((figure) => canvas.add(figure));
  }, [renderedFigures]);

  return (
    <>
      {children(handleSaveImage)}
      <canvas id="canvas" className={classes.canvas} />
    </>
  );
};
