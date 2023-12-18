import { OrbitControls, Stage } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useContext, useEffect, useMemo } from "react";
import AppContext from "./AppContext";
import GLOBAL from "../configs/Global";
import { Vector3 } from "three";
import { useControls } from "leva";
import * as THREE from "three";

export default function Environment() {
  const {
    state: { mode },
    dispatch,
  } = useContext(AppContext);

  const { enableViewMode } = useControls("camera", {
    enableViewMode: false
  });

  const { camera } = useThree();

  // useEffect(() => {
  //   camera.position.x = position[0];
  //   camera.position.y = position[1];
  //   camera.position.z = position[2];

  //   camera.rotation.x = THREE.MathUtils.degToRad(rotation[0]);
  //   camera.rotation.y = THREE.MathUtils.degToRad(rotation[1]);
  //   camera.rotation.z = THREE.MathUtils.degToRad(rotation[2]);

  //   camera.updateProjectionMatrix();
  // }, [position, rotation]);

  useEffect(() => {
    if (enableViewMode) {
      if (mode === GLOBAL.CONST.MODE_FLY) {
        camera.position.x = GLOBAL.CONST.CAMERA_POSITION_FLY[0];
        camera.position.y = GLOBAL.CONST.CAMERA_POSITION_FLY[1];
        camera.position.z = GLOBAL.CONST.CAMERA_POSITION_FLY[2];
        camera.lookAt(new Vector3(0, 0, 0));
      } else {
        camera.position.x = GLOBAL.CONST.CAMERA_POSITION_FIRST_PERSON[0];
        camera.position.y = GLOBAL.CONST.CAMERA_POSITION_FIRST_PERSON[1];
        camera.position.z = GLOBAL.CONST.CAMERA_POSITION_FIRST_PERSON[2];
  
        camera.rotation.x = THREE.MathUtils.degToRad(
          GLOBAL.CONST.CAMERA_ROTATION_FIRST_PERSON[0],
        );
        camera.rotation.y = THREE.MathUtils.degToRad(
          GLOBAL.CONST.CAMERA_ROTATION_FIRST_PERSON[1],
        );
        camera.rotation.z = THREE.MathUtils.degToRad(
          GLOBAL.CONST.CAMERA_ROTATION_FIRST_PERSON[2],
        );
      }
      camera.updateProjectionMatrix();
    }
  }, [mode]);

  return (
    <Stage>
      <Perf position="bottom-right" />

      <OrbitControls makeDefault />

      {/* Helpers */}
      <axesHelper args={[10]} />
    </Stage>
  );
}
