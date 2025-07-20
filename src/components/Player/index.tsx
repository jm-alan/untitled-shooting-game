import { useRef, useState } from "react";
import { Mesh, PointLight } from "three";
import { useFrame } from "@react-three/fiber";

import Cube from "../Cube";
import mutable from "../../state/mutable";

type Props = {
  readonly position: [number, number, number];
};

export default function Player({
  position: [posX, posY, posZ],
  position,
}: Props) {
  const pointRef = useRef<PointLight>(null);

  const [cubeMesh, setCubeMesh] = useState<Mesh | null>(null);

  useFrame(() => {
    const pointLight = pointRef.current;

    if (!cubeMesh || !pointLight) {
      return;
    }

    cubeMesh.position.x += mutable.moveMul.x * mutable.walkSpeed;
    cubeMesh.position.y += mutable.moveMul.y * mutable.walkSpeed;
    pointLight.position.x += mutable.moveMul.x * mutable.walkSpeed;
    pointLight.position.y += mutable.moveMul.y * mutable.walkSpeed;
  });

  return (
    <>
      <ambientLight
        color="white"
        intensity={0.25}
      />
      <pointLight
        ref={pointRef}
        position={[posX, posY, posZ + 2]}
        color="cyan"
        intensity={500}
        decay={5}
      />
      <Cube
        takeRef={setCubeMesh}
        position={position}
      />
    </>
  );
}
