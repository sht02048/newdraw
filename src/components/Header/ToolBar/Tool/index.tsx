import cn from "../../../../util/cn";
import { changeTool } from "../../../../slices/paint";
import { ToolType } from "../../../../types/slice.paint";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";

type Props = {
  src: string;
  toolType: ToolType;
};

export default function Tool({ src, toolType }: Props) {
  const dispatch = useAppDispatch();
  const currentTool = useAppSelector((state) => state.paint.toolType);
  const isSelected = currentTool === toolType;

  function handleClick() {
    dispatch(changeTool({ toolType }));
  }

  return (
    <button
      className={cn("p-1 hover:bg-gray-100", isSelected && "bg-gray-100")}
      onClick={handleClick}
    >
      <img src={src} className="cursor-pointer" />
    </button>
  );
}
