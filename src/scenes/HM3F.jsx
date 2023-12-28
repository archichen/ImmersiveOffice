import { useGLTF } from "@react-three/drei";

export default function HM3F() {
  const hm3f = useGLTF("/models/hm3f_walls.glb");

  return (
    <primitive object={hm3f.scene} />
  );
}

useGLTF.preload("/models/hm3f_walls.glb")