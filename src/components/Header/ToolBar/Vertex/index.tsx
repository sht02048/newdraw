import { ChangeEvent } from "react";

import { VERTEX } from "../../../../constant";
import { changeVertex } from "../../../../slices/paint";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";

export default function Vertex() {
  const vertex = useAppSelector((state) => state.paint.vertex);
  const dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const vertex = e.target.value;

    dispatch(changeVertex({ vertex }));
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    let vertex = e.target.value;

    if (Number(vertex) < VERTEX.MIN) {
      vertex = String(VERTEX.MIN);
    } else if (Number(vertex) > VERTEX.MAX) {
      vertex = String(VERTEX.MAX);
    }

    dispatch(changeVertex({ vertex }));
  }

  return (
    <div className="flex items-center justify-between w-24 px-2 bg-gray-100 border border-gray-300 rounded-md">
      <img
        src="/icons/hexagon.svg"
        alt="select vertex"
        className="w-6 h-6 p-1"
      />
      <input
        type="number"
        min={VERTEX.MIN}
        max={VERTEX.MAX}
        value={vertex}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-12 text-sm text-center bg-gray-100 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
