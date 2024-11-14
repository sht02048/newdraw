import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  Circle,
  Curve,
  Diagram,
  Line,
  Path,
  Polygon,
  Rectangle,
} from "../types/shape";
import type {
  History,
  InitialState,
  LocationData,
  ToolType,
} from "../types/slice.paint";
import { LineCap, LineJoin } from "konva/lib/Shape";
import { DEFAULT_VALUE, SESSION_KEY, TOOL_TYPE } from "../constant";

const initialState: InitialState = {
  historyStep: 0,
  history: [],
  toolType: TOOL_TYPE.RECTANGLE,
  color: DEFAULT_VALUE.COLOR,
  stroke: DEFAULT_VALUE.STROKE,
  strokeWidth: DEFAULT_VALUE.STROKE_WIDTH,
  vertex: DEFAULT_VALUE.VERTEX,
  lines: [],
  curves: [],
  circles: [],
  rects: [],
  polygons: [],
};

const paintSlice = createSlice({
  name: "paint",
  initialState,
  reducers: {
    undo: (state) => {
      if (state.historyStep === 1) return;
      state.historyStep -= 1;

      const preHistory = state.history[state.historyStep - 1];
      const { x, y, id, shape, points, action } = preHistory;

      if (action === "create") {
        switch (shape) {
          case TOOL_TYPE.LINE: {
            const filteredLines = state.lines.filter((line) => line.id !== id);
            state.lines = filteredLines;
            return;
          }
          case TOOL_TYPE.CURVE: {
            const filteredCurves = state.curves.filter(
              (curve) => curve.id !== id,
            );
            state.curves = filteredCurves;
            return;
          }
          case TOOL_TYPE.CIRCLE: {
            const filteredCircles = state.circles.filter(
              (circle) => circle.id !== id,
            );
            state.circles = filteredCircles;
            return;
          }
          case TOOL_TYPE.RECTANGLE: {
            const filteredRects = state.rects.filter((rect) => rect.id !== id);
            state.rects = filteredRects;
            return;
          }
          case TOOL_TYPE.POLYGON: {
            const filteredPolygons = state.polygons.filter(
              (polygon) => polygon.id !== id,
            );
            state.polygons = filteredPolygons;
            return;
          }
        }
      }

      switch (shape) {
        case TOOL_TYPE.CIRCLE:
        case TOOL_TYPE.RECTANGLE:
        case TOOL_TYPE.POLYGON: {
          const shapeStorage = {
            [TOOL_TYPE.CIRCLE]: state.circles,
            [TOOL_TYPE.RECTANGLE]: state.rects,
            [TOOL_TYPE.POLYGON]: state.polygons,
          };

          const selectedShape = shapeStorage[shape];
          const currentShape: Diagram | undefined = selectedShape.find(
            (shape) => shape.id === id,
          );

          if (!currentShape || !x || !y) return;

          currentShape.x = x;
          currentShape.y = y;
          return;
        }
        case TOOL_TYPE.LINE:
        case TOOL_TYPE.CURVE: {
          const pathStorage = {
            [TOOL_TYPE.LINE]: state.lines,
            [TOOL_TYPE.CURVE]: state.curves,
          };

          const selectedPath = pathStorage[shape];
          const currentPath: Path | undefined = selectedPath.find(
            (shape) => shape.id === id,
          );

          if (!currentPath || !points) return;

          currentPath.points = points;
          return;
        }
      }
    },
    redo: (state) => {
      if (state.history.length - 1 === state.historyStep) return;

      state.historyStep += 1;
    },
    clearPaint: () => {
      sessionStorage.clear();

      return initialState;
    },
    changeTool: (state, action: PayloadAction<{ toolType: ToolType }>) => {
      state.toolType = action.payload.toolType;
    },
    changeColor: (state, action: PayloadAction<{ color: string }>) => {
      state.color = action.payload.color;
    },
    changeStrokeWidth: (
      state,
      action: PayloadAction<{ strokeWidth: string }>,
    ) => {
      state.strokeWidth = action.payload.strokeWidth;
    },
    changeVertex: (state, action: PayloadAction<{ vertex: string }>) => {
      state.vertex = action.payload.vertex;
    },
    moveDiagram: (state, action: PayloadAction<History>) => {
      const history = action.payload;
      const { x, y, id, shape } = history;
      const shapeStorage = {
        [TOOL_TYPE.CIRCLE]: state.circles,
        [TOOL_TYPE.RECTANGLE]: state.rects,
        [TOOL_TYPE.POLYGON]: state.polygons,
      };

      if (
        shape === TOOL_TYPE.SELECT ||
        shape === TOOL_TYPE.LINE ||
        shape === TOOL_TYPE.CURVE
      )
        return;

      const shapes = shapeStorage[shape];
      const currentShape: Diagram | undefined = shapes.find(
        (shape) => shape.id === id,
      );

      if (!currentShape || !x || !y) return;

      currentShape.x = x;
      currentShape.y = y;

      const appState = { paint: state };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(appState));
    },
    createShape: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      const history: History = {
        id,
        shape: state.toolType,
        action: "create",
      };

      state.history.push(history);
    },
    saveDiagram: (
      state,
      action: PayloadAction<{ id: string; shape: ToolType }>,
    ) => {
      const { id, shape } = action.payload;
      const shapeStorage = {
        [TOOL_TYPE.CIRCLE]: state.circles,
        [TOOL_TYPE.RECTANGLE]: state.rects,
        [TOOL_TYPE.POLYGON]: state.polygons,
      };

      if (
        shape === TOOL_TYPE.SELECT ||
        shape === TOOL_TYPE.LINE ||
        shape === TOOL_TYPE.CURVE
      )
        return;

      const selectedShape = shapeStorage[shape];
      const currentShape = selectedShape.find((shape) => shape.id === id);

      if (!currentShape) return;

      const history: History = {
        id,
        shape,
        x: currentShape.x,
        y: currentShape.y,
        action: "move",
      };

      state.historyStep += 1;
      state.history.push(history);
    },
    moveLine: (state, action: PayloadAction<History>) => {
      const history = action.payload;
      const { x, y, id, shape } = history;
      const pathStorage = {
        [TOOL_TYPE.LINE]: state.lines,
        [TOOL_TYPE.CURVE]: state.curves,
      };

      if (
        shape === TOOL_TYPE.SELECT ||
        shape === TOOL_TYPE.CIRCLE ||
        shape === TOOL_TYPE.RECTANGLE ||
        shape === TOOL_TYPE.POLYGON
      )
        return;

      const path = pathStorage[shape];
      const currentPath: Path | undefined = path.find((line) => line.id === id);

      if (!currentPath || !x || !y) return;

      const movedPoint = currentPath.points.map((point, index) => {
        if (index % 2 === 0) {
          return point + x;
        }

        return point + y;
      });

      currentPath.points = movedPoint;

      const appState = { paint: state };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(appState));
    },
    saveLine: (
      state,
      action: PayloadAction<{ id: string; shape: ToolType }>,
    ) => {
      const { id, shape } = action.payload;

      const pathStorage = {
        [TOOL_TYPE.LINE]: state.lines,
        [TOOL_TYPE.CURVE]: state.curves,
      };

      if (
        shape === TOOL_TYPE.SELECT ||
        shape === TOOL_TYPE.CIRCLE ||
        shape === TOOL_TYPE.RECTANGLE ||
        shape === TOOL_TYPE.POLYGON
      )
        return;

      const path = pathStorage[shape];
      const currentPath: Path | undefined = path.find((line) => line.id === id);

      if (!currentPath) return;

      const history: History = {
        id,
        shape,
        points: currentPath.points,
        action: "move",
      };

      state.historyStep += 1;
      state.history.push(history);
    },
    setRects: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth } = state;
      const newRect: Rectangle = {
        x: Number(x),
        y: Number(y),
        width: 0,
        height: 0,
        fill: color,
        stroke,
        strokeWidth: Number(strokeWidth),
        id,
      };

      state.rects.push(newRect);
    },
    updateRect: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentRect: Rectangle | undefined = state.rects.find(
        (rect) => rect.id === id,
      );

      if (!currentRect) return;

      const moveToX = x - currentRect.x;
      const moveToY = y - currentRect.y;

      currentRect.width = moveToX;
      currentRect.height = moveToY;
    },
    setCircles: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth } = state;
      const newCircle: Circle = {
        x: Number(x),
        y: Number(y),
        radius: 1,
        fill: color,
        stroke,
        strokeWidth: Number(strokeWidth),
        id,
      };

      state.circles.push(newCircle);
    },
    updateCircle: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentCircle: Circle | undefined = state.circles.find(
        (circle) => circle.id === id,
      );

      if (!currentCircle) return;

      currentCircle.radius =
        ((x - currentCircle.x) ** 2 + (y - currentCircle.y) ** 2) ** 0.5;
    },
    setLines: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { stroke, strokeWidth } = state;
      const intX = Number(x);
      const intY = Number(y);
      const newLine: Line = {
        id,
        points: [intX, intY, intX, intY],
        stroke,
        strokeWidth: Number(strokeWidth),
        lineCap: DEFAULT_VALUE.LINE_CAP as LineCap,
        lineJoin: DEFAULT_VALUE.LINE_JOIN as LineJoin,
      };

      state.lines.push(newLine);
    },
    updateLine: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentLine: Line | undefined = state.lines.find(
        (line) => line.id === id,
      );

      if (!currentLine) return;

      currentLine.points[2] = Number(x);
      currentLine.points[3] = Number(y);
    },
    setCurves: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { stroke, strokeWidth } = state;
      const intX = Number(x);
      const intY = Number(y);
      const newCurve: Curve = {
        id,
        points: [intX, intY, intX, intY, intX, intY],
        stroke,
        strokeWidth: Number(strokeWidth),
        lineCap: DEFAULT_VALUE.LINE_CAP as LineCap,
        lineJoin: DEFAULT_VALUE.LINE_JOIN as LineJoin,
        tension: DEFAULT_VALUE.TENSION,
      };

      state.curves.push(newCurve);
    },
    updateCurve: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentCurve: Curve | undefined = state.curves.find(
        (curve) => curve.id === id,
      );

      if (!currentCurve) return;

      currentCurve.points[2] = (x + currentCurve.points[0]) / 2;
      currentCurve.points[3] = y - 50;
      currentCurve.points[4] = Number(x);
      currentCurve.points[5] = Number(y);
    },
    setPolygons: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const { color, stroke, strokeWidth, vertex } = state;
      const intX = Number(x);
      const intY = Number(y);
      const intVertex = Number(vertex);
      const newPolygon: Polygon = {
        x: intX,
        y: intY,
        sides: intVertex,
        radius: 1,
        fill: color,
        stroke,
        strokeWidth: Number(strokeWidth),
        id,
      };

      state.polygons.push(newPolygon);
    },
    updatePolygon: (state, action: PayloadAction<LocationData>) => {
      const { x, y, id } = action.payload;
      const currentPolygon: Polygon | undefined = state.polygons.find(
        (polygon) => polygon.id === id,
      );

      if (!currentPolygon) return;

      currentPolygon.radius =
        ((x - currentPolygon.x) ** 2 + (y - currentPolygon.y) ** 2) ** 0.5;
    },
  },
});

export const {
  undo,
  redo,
  clearPaint,
  changeTool,
  changeColor,
  changeStrokeWidth,
  changeVertex,
  createShape,
  moveDiagram,
  saveDiagram,
  moveLine,
  saveLine,
  setLines,
  updateLine,
  setCurves,
  updateCurve,
  setCircles,
  updateCircle,
  setRects,
  updateRect,
  setPolygons,
  updatePolygon,
} = paintSlice.actions;

export default paintSlice.reducer;
