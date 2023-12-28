import {
  OrbitControls,
  PointerLockControls,
  useKeyboardControls,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import nipplejs from "nipplejs";
import { useFrame } from "@react-three/fiber";
import device from "current-device";

let touchManager = null;
let touchAngle = "";

export default function FirstPersonMode() {
  const [sub, get] = useKeyboardControls();

  const pointerLockRef = useRef();

  useEffect(() => {
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
    });

    /**
     * User release touch pad
     */
    touchManager.on("end", () => {});
  }, []);

  useFrame(() => {
    if (device.type === "mobile") {

    } else {
      
    }
  });

  return <PointerLockControls ref={pointerLockRef} />;
}
