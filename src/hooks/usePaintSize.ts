import { useEffect, useState, RefObject } from "react";

type Ref = RefObject<HTMLDivElement> | null;
type Size = { paintWidth: number; paintHeight: number };

export default function usePaintSize(stageRef: Ref): Size {
  const [stageSize, setStageSize] = useState<Size>({
    paintWidth: 0,
    paintHeight: 0,
  });

  useEffect(() => {
    function updateSize() {
      if (!stageRef?.current) return;

      setStageSize({
        paintWidth: stageRef.current.offsetWidth,
        paintHeight: stageRef.current.offsetHeight,
      });
    }

    updateSize();
  }, [stageRef]);

  return stageSize;
}
