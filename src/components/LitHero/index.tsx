import { Mesh, PointLight } from "three";
import Cube from "../Cube";
import { useEffect, useRef } from "react";

type Props = {
  readonly position: [number, number, number];
  readonly color: string;
  onLight?(light: PointLight): void;
  onCube?(mesh: Mesh): void;
};

export default function LitHero({
  position: [posX, posY, posZ],
  color,
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
        takeRef={onCube}
        position={position}
      />
    </>
  );
}
