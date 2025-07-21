import { Mesh } from "three";
import { useEffect, useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";

type Props = {
  readonly spin: number;
  takeRef?(mesh: Mesh | null): void;
} & ThreeElements["mesh"];

export default function Cube({ takeRef, spin, ...props }: Props) {
  const meshRef = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * spin;
    meshRef.current.rotation.z += (delta / 2) * spin;
    meshRef.current.rotation.y += delta * 2 * spin;
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
