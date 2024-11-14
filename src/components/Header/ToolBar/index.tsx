import Tool from "./Tool";
import Color from "./Color";
import StrokeWidth from "./StrokeWidth";

import { TOOL_TYPE } from "../../../constant";

export default function ToolBar() {
  return (
    <div className="mx-auto">
      <div className="flex items-center justify-center w-auto gap-2">
        <Tool toolType={TOOL_TYPE.SELECT} src="/src/assets/grab.svg" />
        <Tool toolType={TOOL_TYPE.LINE} src="/src/assets/linear.svg" />
        <Tool toolType={TOOL_TYPE.CURVE} src="/src/assets/curve.svg" />
        <Tool toolType={TOOL_TYPE.CIRCLE} src="/src/assets/circle.svg" />
        <Tool toolType={TOOL_TYPE.RECTANGLE} src="/src/assets/square.svg" />
        <Color />
        <StrokeWidth />
      </div>
    </div>
  );
}
