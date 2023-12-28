import { useGLTF } from "@react-three/drei";

export default function HM17F() {
  const hm17f = useGLTF("/models/hm17f.glb");

  return (
    <primitive object={hm17f.scene} scale={4} />
  );
}

useGLTF.preload("/models/hm17f.glb")