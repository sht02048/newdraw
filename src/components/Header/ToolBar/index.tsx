import Tool from "./Tool";
import { TOOL_TYPE } from "../../../constant";

export default function ToolBar() {
  return (
    <div className="mx-auto">
      <div className="flex justify-center w-64">
        <Tool toolType={TOOL_TYPE.SELECT} src="/src/assets/grab.svg" />
        <Tool toolType={TOOL_TYPE.LINE} src="/src/assets/linear.svg" />
        <Tool toolType={TOOL_TYPE.CIRCLE} src="/src/assets/circle.svg" />
        <Tool toolType={TOOL_TYPE.RECTANGLE} src="/src/assets/square.svg" />
        <Tool toolType={TOOL_TYPE.TRIANGLE} src="/src/assets/triangle.svg" />
      </div>
    </div>
  );
}
