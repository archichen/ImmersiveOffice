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
import { useBox, useSphere, useTrimesh } from "@react-three/cannon";
import { useControls } from "leva";
import * as CANNON from "cannon-es";

let touchManager = null;
let touchAngle = "";
let lastTouchAngle = null;

export default function Player(props) {
  /**
   * Model
   */
  const model = useFBX("./models/player/locomotion-pack/character.fbx");
  useEffect(() => {
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = false;
      }
    });
  }, []);

  /**
   * Animation
   */
  const idleFBX = useFBX("./models/player/locomotion-pack/idle.fbx");
  const idleAnimation = useAnimations(idleFBX.animations, model);
  const backwardFBX = useFBX(
    "./models/player/locomotion-pack/walking-backward-inplace.fbx",
  );
  const backwardAnimation = useAnimations(backwardFBX.animations, model);
  const walkingFBX = useFBX(
    "./models/player/locomotion-pack/walking-inplace.fbx",
  );
  const walkingAnimation = useAnimations(walkingFBX.animations, model);
  const leftTurnFBX = useFBX("./models/player/locomotion-pack/left_turn.fbx");
  const leftTurnAnimation = useAnimations(leftTurnFBX.animations, model);
  const rightTurnFBX = useFBX("./models/player/locomotion-pack/right_turn.fbx");
  const rightTurnAnimation = useAnimations(rightTurnFBX.animations, model);
  const jumpFBX = useFBX("./models/player/locomotion-pack/jump.fbx");
  const jumpAnimation = useAnimations(jumpFBX.animations, model);

  const animations = {
    idle: idleAnimation.actions["mixamo.com"],
    backward: backwardAnimation.actions["mixamo.com"],
    walking: walkingAnimation.actions["mixamo.com"],
    left_turn: leftTurnAnimation.actions["mixamo.com"],
    right_turn: rightTurnAnimation.actions["mixamo.com"],
    jump: jumpAnimation.actions["mixamo.com"],
  };

  const [isIdle, setIsIdle] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [isBackwardWalking, setIsBackwardWalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isTurningLeft, setIsTurningLeft] = useState(false);
  const [isTurningRight, setIsTurningRight] = useState(false);
  const [animationName, setAnimationName] = useState();

  const mobileFnMap = (angle) => {
    const mapping = {
      up: (status) => {
        setIsWalking(status);
        setIsTouchPadUp(status);
      },
      down: (status) => {
        setIsBackwardWalking(status);
        setIsTouchPadDown(status);
      },
      left: (status) => {
        setIsTurningLeft(status);
        setIsTouchPadLeft(status);
      },
      right: (status) => {
        setIsTurningRight(status);
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

  const playAnimation = (animationName) => {
    console.log(`Playing anime: ${animationName}`);
    if (animationName) {
      const action = animations[animationName];
      action.reset().fadeIn(0.5).play();

      return () => {
        action.fadeOut(0.5);
      };
    } 
    return () => {};
  };

  // Play idle animation at start
  useEffect(() => {
    return playAnimation(animationName);
  }, [animationName]);

  useEffect(() => {
    console.log(`isWalking: ${isWalking}`);
    if (isWalking) return setAnimationName("walking");
    else return setAnimationName("idle");
  }, [isWalking]);

  useEffect(() => {
    if (isBackwardWalking) return setAnimationName("backward");
    else return setAnimationName("idle");
  }, [isBackwardWalking]);

  useEffect(() => {
    if (isJumping) return setAnimationName("jump");
    else return setAnimationName("idle");
  }, [isJumping]);

  useEffect(() => {
    if (isTurningLeft) return setAnimationName("left_turn");
    else return setAnimationName("idle");
  }, [isTurningLeft]);

  useEffect(() => {
    if (isTurningRight) return setAnimationName("right_turn");
    else return setAnimationName("idle");
  }, [isTurningRight]);

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
    // position: [PLAYER_POSITION[0], PLAYER_POSITION[1], PLAYER_POSITION[2]]
  }));
  const { PLAYER_POSITION, PLAYER_ROTATION } = Global.CONFIG.MODE_FIRST_PERSON;

  /**
   * Custom handlers
   */

  // Reset camera to default position
  const cameraInit = () => {
    
    // playerCamera.current.fov = 75;
    // playerCamera.current.near = 0.1;
    playerCamera.current.far = 999999;
    // if (device.desktop()) {
    //   playerCamera.current.aspect = window.innerWidth / window.innerHeight;
    //   console.log('desktop: ', playerCamera.current.aspect)
    // } else {
    //   playerCamera.current.aspect = window.innerWidth / window.innerHeight;
    //   console.log('mobile: ', playerCamera.current.aspect)
    // }
    playerCamera.current.aspect = window.innerWidth / window.innerHeight;
    // camera.aspect = playerCamera.current.aspect;
    console.log(camera.aspect)

    playerCamera.current.updateMatrix();
    camera.updateMatrix();

    // camera.position.set({
    //   x: PLAYER_POSITION[0] + 2,
    //   y: PLAYER_POSITION[1] + 2,
    //   z: PLAYER_POSITION[2] + 2
    // })
    // camera.lookAt(new THREE.Vector3(
    //   PLAYER_POSITION[0],
    //   PLAYER_POSITION[1],
    //   PLAYER_POSITION[2]
    // ))
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
    playerApi.applyLocalImpulse([0, 0.4, 0], [0, 0, 0]);
  };

  const judeMotionStatus = (forcePayload) => {
    const force = Math.abs(forcePayload.totalForce.x);
    if (force < Global.CONFIG.MOTION.MOVING_THRESHOLD) {
      setMotionStatus(Global.CONST.MOTION.STOP);
    } else {
      setMotionStatus(Global.CONST.MOTION.MOVING);
    }
  };

  const keyboardHandler = (state) => {
    // if (motionStatus === Global.CONST.MOTION.MOVING) return;

    if (get()["FORWARD"]) {
      setIsWalking(true);
      handleForward();
    } else {
      setIsWalking(false);
    }
    if (get()["BACKWARD"]) {
      setIsBackwardWalking(true);
      handleBackward();
    } else {
      setIsBackwardWalking(false);
    }
    if (get()["LEFT"]) {
      setIsTurningLeft(true);
      handleTurnLeft(state);
    } else {
      setIsTurningLeft(false);
    }
    if (get()["RIGHT"]) {
      setIsTurningRight(true);
      handleTurnRight(state);
    } else {
      setIsTurningRight(false);
    }
    if (get()["JUMP"]) {
      setIsJumping(true);
      handleJump();
    } else {
      setIsJumping(false);
    }
  };

  const cameraControls = (state) => {
    const playerPosition = new THREE.Vector3(
      PLAYER_POSITION[0],
      PLAYER_POSITION[1] + 0,
      PLAYER_POSITION[2],
    );

    state.camera.lookAt(playerPosition);

    // const cameraPosition = new THREE.Vector3();
    // cameraPosition.copy(playerPosition);
    // cameraPosition.z += 2.25;
    // cameraPosition.y += 0.65;

    // const cameraTarget = new THREE.Vector3();
    // cameraTarget.copy(playerPosition);
    // cameraTarget.y += 0.25;

    // smoothedCameraPosition.lerp(cameraPosition, 0.05);
    // smoothedCameraTarget.lerp(cameraTarget, 0.05);

    // state.camera.position.copy(smoothedCameraPosition);
    // state.camera.lookAt(smoothedCameraTarget);
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
      <primitive object={model} position={[0, 0, 0]} />
      <PerspectiveCamera
        ref={playerCamera}
        manual
        makeDefault
        position={[0, 150, -150]}
        rotation={[3.3, 0, 3.14]}
        lookAt={() => new THREE.Vector3(0, 0, 0)}
        fov={75}
        near={0.1}
        far={1000}
      />
    </group>
  );
}
