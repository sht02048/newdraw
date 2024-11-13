import { ChangeEvent } from "react";
import { changeColor } from "../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";

export default function Color() {
  const color = useAppSelector((state) => state.paint.color);
  const dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const color = e.target.value;

    dispatch(changeColor({ color }));
  }

  return (
    <input
      type="color"
      className="bg-white"
      onChange={handleChange}
      value={color}
    />
  );
}
