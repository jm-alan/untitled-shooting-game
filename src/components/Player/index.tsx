import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, PointLight } from "three";

import LitHero from "../LitHero";
import mutable from "../../state/mutable";

type Props = {
  readonly position: [number, number, number];
};

export default function Player({ position }: Props) {
  const [cubeMesh, setCubeMesh] = useState<Mesh | null>(null);
  const [pointLight, setPointLight] = useState<PointLight | null>(null);

  useFrame(() => {
    if (!cubeMesh || !pointLight) {
      return;
    }

    cubeMesh.position.x += mutable.moveMul.x * mutable.walkSpeed;
    cubeMesh.position.y += mutable.moveMul.y * mutable.walkSpeed;
    pointLight.position.x += mutable.moveMul.x * mutable.walkSpeed;
    pointLight.position.y += mutable.moveMul.y * mutable.walkSpeed;
  });

  return (
    <LitHero
      color="cyan"
      position={position}
      onCube={setCubeMesh}
      onLight={setPointLight}
    />
  );
}
