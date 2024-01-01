import { PerspectiveCamera } from "@react-three/drei";
import device from "current-device";
import { useModeSwitchStore } from "../store/runtimeStore";
import Global from "../configs/Global";

export default function FirstPersonMode() {
  const mode = useModeSwitchStore((state) => state.mode);

  return device.desktop() ? (
    null
  ) : null;
}
