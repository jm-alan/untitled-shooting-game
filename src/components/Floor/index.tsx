import { ThreeElements } from "@react-three/fiber";
import { DoubleSide } from "three";

type Props = {} & ThreeElements["mesh"];

export default function Floor({ ...props }: Props) {
  return (
    <mesh {...props}>
      <planeGeometry
        args={[16, 27, 1, 1]}
        computeVertexNormals
      />
      <meshStandardMaterial
        side={DoubleSide}
        color="white"
      />
    </mesh>
  );
}
