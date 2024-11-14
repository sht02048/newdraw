import Icon from "./Icon";
import { clearPaint, undo } from "../../../slices/paint";
import { useAppDispatch } from "../../../lib/redux/hooks";

export default function HistoryControl() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(clearPaint());
  }

  function handleUndo() {
    dispatch(undo());
  }

  return (
    <div className="mr-10">
      <Icon src="/src/assets/undo.svg" handleClick={handleUndo} />
      <Icon src="/src/assets/redo.svg" />
      <Icon src="/src/assets/trash.svg" handleClick={handleClick} />
    </div>
  );
}
