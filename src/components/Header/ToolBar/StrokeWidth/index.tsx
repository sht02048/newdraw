import { ChangeEvent } from "react";
import { changeStrokeWidth } from "../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";

export default function StrokeWidth() {
  const strokeWidth = useAppSelector((state) => state.paint.strokeWidth);
  const dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const strokeWidth = e.target.value;

    dispatch(changeStrokeWidth({ strokeWidth }));
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    let strokeWidth = e.target.value;

    if (Number(strokeWidth) < 5) {
      strokeWidth = "5";
    } else if (Number(strokeWidth) > 20) {
      strokeWidth = "20";
    }

    dispatch(changeStrokeWidth({ strokeWidth }));
  }

  return (
    <div className="flex items-center justify-between w-24 px-2 bg-gray-100 border border-gray-300 rounded-md">
      <img
        src="/src/assets/lineWidth.svg"
        alt="Line Width Icon"
        className="w-6 h-6"
      />
      <input
        type="number"
        min="5"
        max="40"
        value={strokeWidth}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-12 text-sm text-center bg-gray-100 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
