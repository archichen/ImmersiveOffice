import "./App.css";
import { Canvas } from "@react-three/fiber";
import Environment from "./components/Environment";
import Interface from "./Interface";
import HM17F from "./scenes/HM17F";
import ZJ6F from "./scenes/ZJ6F";
import { Suspense, useReducer, useRef } from "react";
import Loader from "./components/Loader";
import AppContext from "./components/AppContext";
import appReducer, { initAppState } from "./components/AppReducer";
import GLOBAL from "./configs/Global";
import { Box, KeyboardControls } from "@react-three/drei";
import { Model } from "./scenes/HM3F_TEST";
import { Toaster } from "react-hot-toast";
import { Leva } from "leva";
import ModeSwitcher from "./components/ModeSwitcher";
import { usePlayerStore } from "./store/runtimeStore";
import Player from "./components/Player";
import { Debug, Physics } from "@react-three/cannon";

function App() {
  const [state, dispatch] = useReducer(appReducer, initAppState());

  let CurFloor = Model;
  switch (state.curFloor) {
    case GLOBAL.CONST.HM17F:
      CurFloor = HM17F;
      break;
    case GLOBAL.CONST.ZJ6F:
      CurFloor = ZJ6F;
      break;
    case GLOBAL.CONST.HM3F:
      CurFloor = Model;
      break;
    case GLOBAL.CONST.TEST_SCENE:
      CurFloor = Model;
      break;
    default:
      CurFloor = Model;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Suspense fallback={<Loader />}>
        <Interface />
        <KeyboardControls map={GLOBAL.CONFIG.KEYBOARD_CONTROLS.MAP}>
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 1000,
              position: GLOBAL.CONST.CAMERA_POSITION_FLY,
              // manual: true
            }}
            className="!absolute left-0 top-0"
            id="canvas"
          >
            <Environment />
            <Physics>
              <Debug color={"red"}>
                <CurFloor />

                <Player position={[0, 5, 0]} scale={0.003} />
              </Debug>
            </Physics>
          </Canvas>
        </KeyboardControls>

        {/* HTML component controls */}
        <Toaster position="top-right" />
        <Leva hidden={false} />
      </Suspense>
    </AppContext.Provider>
  );
}

export default App;
