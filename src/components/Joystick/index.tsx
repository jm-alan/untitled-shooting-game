import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import JoystickInner from "./JoystickInner";
import {
  joystickSnapLeft,
  joystickSnapTop,
  physicalJoystickRadius,
} from "../../state/immutable";

export default function Joystick() {
  const leftSnap = useAtomValue(joystickSnapLeft);
  const topSnap = useAtomValue(joystickSnapTop);
  const setPhysicalRadius = useSetAtom(physicalJoystickRadius);

  const [outerTop, setOuterTop] = useState<number>();
  const [outerLeft, setOuterLeft] = useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOuterTop(topSnap);
    setOuterLeft(leftSnap);
  }, [topSnap, leftSnap]);

  useEffect(() => {
    const joystickWell = ref.current;
    if (joystickWell) {
      const { width, height } = joystickWell.getBoundingClientRect();
      setPhysicalRadius(Math.max(width, height) / 2);
    }
  }, [setPhysicalRadius]);

  return (
    <div
      id="joystick-outer"
      ref={ref}
      style={{
        top: outerTop && `calc(${outerTop}px - (var(--outer-side) / 2))`,
        left: outerLeft && `calc(${outerLeft}px - (var(--outer-side) / 2))`,
      }}
    >
      <JoystickInner />
    </div>
  );
}
