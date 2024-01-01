import { Stage, Environment as Env, useHelper } from "@react-three/drei";
import { Perf } from "r3f-perf";
import ModeSwitcher from "./ModeSwitcher";
import { useRef } from "react";
import * as THERR from "three";

export default function Environment() {
  const sunShine = useRef();
  useHelper(sunShine, THERR.DirectionalLight, 1);

  return (
    <>
      <Perf position="bottom-right" />

      <Env background={true} files={"/canary_wharf_1k.exr"} blur={0.2} />
      <ModeSwitcher />

      <ambientLight />
      {/* <directionalLight ref={sunShine} position={[1, 2, 3]} intensity={4.5} /> */}

      {/* Helpers */}
      <axesHelper args={[50]} />
    </>
  );
}
