import { CameraShake, PointerLockControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import GLOBAL from "../configs/Global";
import * as THREE from "three";

export default function FirstPersonMode() {
  const [sub, get] = useKeyboardControls();

  const pointerLockRef = useRef()

  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(
      GLOBAL.CONFIG.MODE_FIRST_PERSON.INITIAL_CAMERA_POSITION.x,
      GLOBAL.CONFIG.MODE_FIRST_PERSON.INITIAL_CAMERA_POSITION.y,
      GLOBAL.CONFIG.MODE_FIRST_PERSON.INITIAL_CAMERA_POSITION.z,
    );

    return sub(
      (state) => state,
      (pressed) => pressed,
    );
  }, []);

  const velocity = new THREE.Vector3()
  const direction = new THREE.Vector3()
  let canJump = true

  useFrame(({ camera }, delta) => {
    const speed = GLOBAL.CONFIG.MODE_FIRST_PERSON.SPEED * delta;
    const { current: controls } = pointerLockRef

    if (controls.isLocked == true) {
        const keyStats = get();

        const moveForward = keyStats[GLOBAL.CONST.KEY_FORWARD]
        const moveBackward = keyStats[GLOBAL.CONST.KEY_BACK]
        const moveLeft = keyStats[GLOBAL.CONST.KEY_LEFT]
        const moveRight = keyStats[GLOBAL.CONST.KEY_RIGHT]
        const moveJump = keyStats[GLOBAL.CONST.KEY_JUMP]
    
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
    
        velocity.y -= 0.1 * 100.0 * delta; // 100.0 = mass
    
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions
        
        if ( moveForward || moveBackward ) velocity.z -= direction.z * speed;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * speed;
        if ( moveJump ) velocity.y = controls.getObject().position.y + 2;

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta );

        if ( controls.getObject().position.y < GLOBAL.CONFIG.MODE_FIRST_PERSON.INITIAL_CAMERA_POSITION.y ) {

            velocity.y = 0;
            controls.getObject().position.y = GLOBAL.CONFIG.MODE_FIRST_PERSON.INITIAL_CAMERA_POSITION.y;

            canJump = true;

        }
    }

    camera.updateMatrix()
  });

  return <PointerLockControls ref={pointerLockRef} />
}
