import { Mesh, PointLight } from "three";
import { useEffect, useRef } from "react";

import Cube from "../Cube";

type Props = {
  readonly position: readonly [number, number, number];
  readonly color: string;
  readonly spin?: number;
  onLight?(light: PointLight): void;
  onCube?(mesh: Mesh): void;
};

export default function LitHero({
  position: [posX, posY, posZ],
  color,
  spin = 1,
  position,
  onLight,
  onCube,
}: Props) {
  const pointRef = useRef<PointLight>(null);

  useEffect(() => {
    if (pointRef.current) {
      onLight?.(pointRef.current);
    }
  }, [onLight]);

  return (
    <>
      <pointLight
        ref={pointRef}
        position={[posX, posY, posZ + 2]}
        color={color}
        intensity={500}
        decay={5}
      />
      <Cube
        spin={spin}
        takeRef={onCube}
        position={position}
      />
    </>
  );
}
