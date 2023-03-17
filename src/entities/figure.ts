import { Color } from "./color";

type Point = {
  x: number;
  y: number;
  type: string;
};

export enum FigureType {
  Circle,
  Rectangle,
  Line,
  Drawing,
}

export enum FigureThickness {
  Light = 1,
  Medium = 2,
  Bold = 3,
}

export type FigurePosition = [number, number];

export abstract class Figure {
  public type: FigureType;
  public color: Color;
  public position: FigurePosition;
  public thickness: FigureThickness;

  constructor(
    type: FigureType,
    color: Color,
    thickness: FigureThickness,
    position: FigurePosition
  ) {
    this.type = type;
    this.color = color;
    this.thickness = thickness;
    this.position = position;
  }

  public changePosition(position: FigurePosition) {
    this.position = position;
  }

  public changeThickness(thickness: FigureThickness) {
    this.thickness = thickness;
  }
}

export class Circle extends Figure {
  public radius: number;

  constructor(
    color: Color,
    thickness: FigureThickness,
    position: FigurePosition,
    radius: number
  ) {
    super(FigureType.Circle, color, thickness, position);
    this.radius = radius;
  }

  public changeRadius(radius: number) {
    this.radius = radius;
  }
}

export class Rectangle extends Figure {
  public width: number;
  public height: number;

  constructor(
    color: Color,
    thickness: FigureThickness,
    position: FigurePosition,
    width: number,
    height: number
  ) {
    super(FigureType.Rectangle, color, thickness, position);
    this.width = width;
    this.height = height;
  }

  public changeSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export class Line extends Figure {
  public from: FigurePosition;
  public to: FigurePosition;
  public width: number;
  public height: number;

  constructor(
    color: Color,
    thickness: FigureThickness,
    position: FigurePosition,
    from: FigurePosition,
    to: FigurePosition,
    width: number,
    height: number
  ) {
    super(FigureType.Rectangle, color, thickness, position);
    this.from = from;
    this.to = to;
    this.width = width;
    this.height = height;
  }

  public changeCoordinates(from: FigurePosition, to: FigurePosition) {
    this.from = from;
    this.to = to;
  }

  public changeSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export class Drawing extends Figure {
  public path: Point[];

  constructor(
    color: Color,
    thickness: FigureThickness,
    position: FigurePosition,
    path: Point[]
  ) {
    super(FigureType.Drawing, color, thickness, position);
    this.path = path;
  }
}
