import { useGLTF } from "@react-three/drei";

export default function ZJ6F() {
  const zj6f = useGLTF("/models/zj6f.glb");

  return (
    <primitive object={zj6f.scene} />
  );
}

useGLTF.preload("/models/zj6f.glb")