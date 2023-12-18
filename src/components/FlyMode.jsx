import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import Global from "../configs/Global";

export default function FlyMode() {
    const { camera } = useThree()

    useEffect(() => {
        camera.position.set(
            Global.CONFIG.MODE_FLY.INITIAL_CAMERA_POSITION.x,
            Global.CONFIG.MODE_FLY.INITIAL_CAMERA_POSITION.y,
            Global.CONFIG.MODE_FLY.INITIAL_CAMERA_POSITION.z
        )
        camera.lookAt(0, 0, 0)
    }, [])
    return <OrbitControls />
}