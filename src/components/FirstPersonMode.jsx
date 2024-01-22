import { PerspectiveCamera } from "@react-three/drei";
import device from "current-device";
import { useModeSwitchStore } from "../store/runtimeStore";
import Global from "../configs/Global";
import Player from "./Player";

export default function FirstPersonMode() {
  const mode = useModeSwitchStore((state) => state.mode);

  return <Player position={[0, 5, 0]} />
}
