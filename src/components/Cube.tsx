import { Mesh } from "three";
import { useEffect, useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

type Props = {
  takeRef?(mesh: Mesh | null): void;
} & ThreeElements["mesh"];

export default function Cube({ takeRef, ...props }: Props) {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.z += delta / 2;
    meshRef.current.rotation.y += delta * 2;
  });

  useEffect(() => {
    takeRef?.(meshRef.current);
  }, [takeRef]);

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
