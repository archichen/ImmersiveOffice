import { Stage, Environment as Env } from "@react-three/drei";
import { Perf } from "r3f-perf";
import ModeSwitcher from "./ModeSwitcher";

export default function Environment() {

  return (
    <Stage>
      <Perf position="bottom-right" />

      <Env
        background={true}
        files={"/canary_wharf_1k.exr"}
        blur={0.2}
      />

      <ModeSwitcher />

      {/* Helpers */}
      <axesHelper args={[50]} />
    </Stage>
  );
}
