import Icon from "./Icon";
import { clearPaint } from "../../../slices/paint";
import { useAppDispatch } from "../../../lib/redux/hooks";

export default function HistoryControl() {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(clearPaint());
  }

  return (
    <div className="mr-10">
      <Icon src="/src/assets/undo.svg" />
      <Icon src="/src/assets/redo.svg" />
      <Icon src="/src/assets/trash.svg" handleClick={handleClick} />
    </div>
  );
}
