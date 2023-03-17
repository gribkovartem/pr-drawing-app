import {
  ActionPanel,
  Action,
  ActionType,
} from "./views/action-panel/action-panel";
import { Canvas } from "./views";
import circle from "./assets/circle.svg";
import square from "./assets/square.svg";
import line from "./assets/line.svg";
import brush from "./assets/brush.svg";
import save from "./assets/save.svg";
import { useCanvas } from "./use-cases/use-canvas";
import { Drawing, FigureThickness, FigureType } from "./entities/figure";
import { Color } from "./entities/color";

function App() {
  const {
    figures,
    isDrawable,
    thickness,
    color,
    createFigure,
    setIsDrawable,
    addDrawing,
    setThickness,
    setColor,
    changeFigurePosition,
    changeFigureSize,
  } = useCanvas();

  const ACTIONS: (saveImage: VoidFunction) => Action[] = (saveImage) => [
    {
      icon: circle,
      name: "Круг",
      type: ActionType.Button,
      onClick: () => createFigure(FigureType.Circle, [0, 0]),
    },
    {
      icon: square,
      name: "Прямоугольник",
      type: ActionType.Button,
      onClick: () => createFigure(FigureType.Rectangle, [0, 0]),
    },
    {
      icon: line,
      name: "Линия",
      type: ActionType.Button,
      onClick: () => createFigure(FigureType.Line, [0, 0]),
    },
    {
      icon: brush,
      name: "Кисть",
      type: ActionType.Button,
      onClick: () => setIsDrawable(!isDrawable),
    },
    {
      name: "Толщина",
      type: ActionType.Dropdown,
      options: [
        { value: FigureThickness.Light, label: "Толщина 1" },
        { value: FigureThickness.Medium, label: "Толщина 2" },
        { value: FigureThickness.Bold, label: "Толщина 3" },
      ],
      onSelect: (thickness) =>
        setThickness(Number(thickness) as FigureThickness),
    },
    {
      name: "Цвет",
      type: ActionType.Dropdown,
      options: [
        { value: Color.Black, label: "Черный" },
        { value: Color.Blue, label: "Синий" },
        { value: Color.Red, label: "Красный" },
        { value: Color.Yellow, label: "Жёлтый" },
      ],
      onSelect: (color) => setColor(color as Color),
    },
    {
      icon: save,
      name: "Сохранить",
      type: ActionType.Button,
      onClick: saveImage,
    },
  ];

  const handleFinishDrawing = (drawing: Drawing) => {
    setIsDrawable(false);
    addDrawing(drawing);
  };

  return (
    <>
      <Canvas
        figures={figures}
        isDrawable={isDrawable}
        thickness={thickness}
        color={color}
        onFinishDrawing={handleFinishDrawing}
        onChangePosition={changeFigurePosition}
        onChangeSize={changeFigureSize}
      >
        {(saveImage) => <ActionPanel actions={ACTIONS(saveImage)} />}
      </Canvas>
    </>
  );
}

export default App;
