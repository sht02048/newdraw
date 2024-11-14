import Icon from "./Icon";
import { clearPaint, redo, undo } from "../../../slices/paint";
import { useAppDispatch } from "../../../lib/redux/hooks";

export default function HistoryControl() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(clearPaint());
  }

  function handleUndo() {
    dispatch(undo());
  }

  function handleRedo() {
    dispatch(redo());
  }

  return (
    <div className="mr-10">
      <Icon src="/icons/undo.svg" handleClick={handleUndo} />
      <Icon src="/icons/redo.svg" handleClick={handleRedo} />
      <Icon src="/icons/trash.svg" handleClick={handleClick} />
    </div>
  );
}
