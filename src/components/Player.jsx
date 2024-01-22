import { usePlayerStore } from "../store/runtimeStore";
import {
  Box,
  PerspectiveCamera,
  useAnimations,
  useFBX,
  useHelper,
  useKeyboardControls,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import nipplejs from "nipplejs";
import device from "current-device";
import Global from "../configs/Global";
import * as THREE from "three";
import { useBox, useRaycastAll, useSphere, useTrimesh } from "@react-three/cannon";
import { useControls } from "leva";
import * as CANNON from "cannon-es";

let touchManager = null;
let touchAngle = "";
let lastTouchAngle = null;

export default function Player(props) {

  const mobileFnMap = (angle) => {
    const mapping = {
      up: (status) => {
        setIsTouchPadUp(status);
      },
      down: (status) => {
        setIsTouchPadDown(status);
      },
      left: (status) => {
        setIsTouchPadLeft(status);
      },
      right: (status) => {
        setIsTouchPadRight(status);
      },
    };

    return mapping[angle];
  };

  const activeAndDisableOtherPadAction = (angle, status) => {
    if (status) {
      ["up", "down", "left", "right"].forEach((key) => {
        if (key !== angle) {
          // console.log(`set ${key} to ${!status}`)
          mobileFnMap(key)(!status);
        }
      });
      // console.log(`set ${angle} to ${status}`)
      mobileFnMap(angle)(status);
    } else {
      // console.log(`stop ${angle}: ${status}`)
      mobileFnMap(angle)(status);
    }
  };

  /**
   * Camera
   */
  const [sub, get] = useKeyboardControls();
  const { camera } = useThree();
  const playerCamera = useRef();

  useHelper(playerCamera, THREE.CameraHelper);

  /**
   * Physics
   */
  const [player, playerApi] = useSphere(() => ({
    mass: 1,
    fixedRotation: true,
    ...props,
    args: [0.1],
  }));
  const { PLAYER_POSITION, PLAYER_ROTATION } = Global.CONFIG.MODE_FIRST_PERSON;

  /**
   * Custom handlers
   */

  // Reset camera to default position
  const cameraInit = () => {
    playerCamera.current.aspect = window.innerWidth / window.innerHeight;
    console.log(camera.aspect)

    playerCamera.current.updateMatrix();
    camera.updateMatrix();

  };

  const playerPosAndRotSub = () => {
    playerApi.position.subscribe((pos) => {
      PLAYER_POSITION[0] = pos[0];
      PLAYER_POSITION[1] = pos[1];
      PLAYER_POSITION[2] = pos[2];
    });

    playerApi.quaternion.subscribe((quat) => {
      PLAYER_ROTATION[0] = quat[0];
      PLAYER_ROTATION[1] = quat[1];
      PLAYER_ROTATION[2] = quat[2];
      PLAYER_ROTATION[3] = quat[3];
    });
  };

  /**
   * Debug
   */
  // const { playerCamPosition, playerCamRotation } = useControls("Camera", {
  //   playerCamPosition: {
  //     value: {
  //       x: 1,
  //       y: 1,
  //       z: 1,
  //     },
  //     step: 0.1,
  //     max: 200,
  //     min: -100,
  //   },
  //   playerCamRotation: {
  //     value: {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //     },
  //     step: 0.1,
  //     max: 100,
  //     min: -100,
  //   },
  // });

  /**
   * Init all
   */
  const commonInit = () => {
    cameraInit();
    playerPosAndRotSub();
  };

  const initDesktop = () => {
    // keyboardHandler();
  };

  /**
   * Mobile touch pad handler
   */
  const [isTouchPadUp, setIsTouchPadUp] = useState(false);
  const [isTouchPadDown, setIsTouchPadDown] = useState(false);
  const [isTouchPadLeft, setIsTouchPadLeft] = useState(false);
  const [isTouchPadRight, setIsTouchPadRight] = useState(false);

  const initMobile = () => {
    touchManager = nipplejs.create({
      zone: document.getElementById("canvas"),
      multitouch: false,
      maxNumberOfNipples: 1,
    });

    /**
     * Detect touch direction
     */
    touchManager.on("dir", (evt, data) => {
      const {
        direction: { angle },
      } = data;
      touchAngle = angle;

      lastTouchAngle = angle;

      activeAndDisableOtherPadAction(angle, true);
    });

    /**
     * User release touch pad
     */
    touchManager.on("end", () => {
      activeAndDisableOtherPadAction(lastTouchAngle, false);
    });
  };

  const handleForward = () => {
    const direction = new THREE.Vector3();
    const nextQuat = new THREE.Quaternion();
    nextQuat.set(
      PLAYER_ROTATION[0],
      PLAYER_ROTATION[1],
      PLAYER_ROTATION[2],
      PLAYER_ROTATION[3],
    );
    const euler = new THREE.Euler();
    euler.setFromQuaternion(nextQuat, "YXZ");
    direction.set(Math.sin(euler.y), 0, Math.cos(euler.y));

    const distance = -Global.CONFIG.MODE_FIRST_PERSON.MOTION_SPEED;

    let nextPosition = new THREE.Vector3();
    nextPosition.set(
      PLAYER_POSITION[0],
      PLAYER_POSITION[1],
      PLAYER_POSITION[2],
    );
    nextPosition.add(direction.multiplyScalar(distance));
    playerApi.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
  };

  const handleBackward = () => {
    const direction = new THREE.Vector3();
    const nextQuat = new THREE.Quaternion();
    nextQuat.set(
      PLAYER_ROTATION[0],
      PLAYER_ROTATION[1],
      PLAYER_ROTATION[2],
      PLAYER_ROTATION[3],
    );
    const euler = new THREE.Euler();
    euler.setFromQuaternion(nextQuat, "YXZ");
    direction.set(Math.sin(euler.y), 0, Math.cos(euler.y));

    const distance = Global.CONFIG.MODE_FIRST_PERSON.MOTION_SPEED;

    let nextPosition = new THREE.Vector3();
    nextPosition.set(
      PLAYER_POSITION[0],
      PLAYER_POSITION[1],
      PLAYER_POSITION[2],
    );
    nextPosition.add(direction.multiplyScalar(distance));
    playerApi.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
  };

  const handleTurnLeft = () => {
    const nextQuat = new THREE.Quaternion();
    nextQuat.set(
      PLAYER_ROTATION[0],
      PLAYER_ROTATION[1],
      PLAYER_ROTATION[2],
      PLAYER_ROTATION[3],
    );
    const euler = new THREE.Euler();
    euler.setFromQuaternion(nextQuat, "YXZ");
    euler.y += Global.CONFIG.MODE_FIRST_PERSON.ROTATION_SPEED;
    nextQuat.setFromEuler(euler);
    playerApi.quaternion.set(nextQuat.x, nextQuat.y, nextQuat.z, nextQuat.w);
  };

  const handleTurnRight = () => {
    const nextQuat = new THREE.Quaternion();
    nextQuat.set(
      PLAYER_ROTATION[0],
      PLAYER_ROTATION[1],
      PLAYER_ROTATION[2],
      PLAYER_ROTATION[3],
    );
    const euler = new THREE.Euler();
    euler.setFromQuaternion(nextQuat, "YXZ");
    euler.y -= Global.CONFIG.MODE_FIRST_PERSON.ROTATION_SPEED;
    nextQuat.setFromEuler(euler);
    playerApi.quaternion.set(nextQuat.x, nextQuat.y, nextQuat.z, nextQuat.w);
  };

  const handleJump = () => {
    playerApi.applyLocalImpulse([0, .5, 0], [0, 0, 0]);
  };

  const keyboardHandler = (state) => {

    if (get()["FORWARD"]) {
      handleForward();
    }
    if (get()["BACKWARD"]) {
      handleBackward();
    }
    if (get()["LEFT"]) {
      handleTurnLeft(state);
    }
    if (get()["RIGHT"]) {
      handleTurnRight(state);
    }
    if (get()["JUMP"]) {
      // handleJump();
    }
  };

  const cameraControls = (state) => {
    const playerPosition = new THREE.Vector3(
      PLAYER_POSITION[0],
      PLAYER_POSITION[1] + 0,
      PLAYER_POSITION[2],
    );

    state.camera.lookAt(playerPosition);
  };

  const commonControls = (state) => {
    cameraControls(state);
  };

  const desktopControls = (state) => {
    keyboardHandler(state);
  };

  const mobileControls = (state) => {
    if (isTouchPadUp) {
      handleForward();
    }
    if (isTouchPadDown) {
      handleBackward();
    }
    if (isTouchPadLeft) {
      handleTurnLeft();
    }
    if (isTouchPadRight) {
      handleTurnRight();
    }
  };

  // Init
  useEffect(() => {
    commonInit();

    if (device.desktop()) initDesktop();
    else initMobile();
  }, []);

  useFrame((state) => {
    commonControls(state);
    if (device.desktop()) {
      // Desktop controls
      desktopControls(state);
    } else {
      // Mobile controls
      mobileControls(state);
    }
  });
  return (
    <group ref={player} {...props}>
      <PerspectiveCamera
        ref={playerCamera}
        manual
        makeDefault
        position={[0, .5, 0]}
        // rotation={[3.3, 0, 3.14]}
        lookAt={() => new THREE.Vector3(0, 0, 0)}
        fov={75}
        near={0.1}
        far={1000}
      />
    </group>
  );
}
