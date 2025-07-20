import { useAtomValue } from "jotai";
import {
  normalizedJoystickOffsetX,
  normalizedJoystickOffsetY,
} from "../../state/immutable";

export default function JoystickInner() {
  const joystickX = useAtomValue(normalizedJoystickOffsetX);
  const joystickY = useAtomValue(normalizedJoystickOffsetY);

  return (
    <div
      id="joystick-inner"
      style={{
        top: `calc(var(--half-outer) - var(--half-inner) - (var(--half-outer) * ${joystickY}))`,
        left: `calc(var(--half-outer) - var(--half-inner) + (var(--half-outer) * ${joystickX}))`,
      }}
    />
  );
}
