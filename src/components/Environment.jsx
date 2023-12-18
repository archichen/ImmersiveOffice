import { Stage, Environment as Env } from "@react-three/drei";
import { Perf } from "r3f-perf";
import ModeSwitcher from "./ModeSwitcher";
import { Leva, useControls } from "leva";

export default function Environment() {
  const { showEnv, envMapHeight, envMapRadius, envMapScale, envBlur } = useControls(
    "environment map",
    {
      showEnv: true,
      envMapHeight: { value: 0, min: 0, max: 100 },
      envMapRadius: { value: 0, min: 0, max: 1000 },
      envMapScale: { value: 0, min: 0, max: 1000 },
      envBlur: { value: 0, min: 0, max: 1, step: 0.01 },
    }, {
      collapsed: true
    }
  );

  return (
    <Stage>
      <Perf position="bottom-right" />

      <Env
        background={showEnv}
        files={"/canary_wharf_1k.exr"}
        blur={envBlur}
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      />

      <ModeSwitcher />

      {/* Helpers */}
      <axesHelper args={[10]} />
    </Stage>
  );
}
