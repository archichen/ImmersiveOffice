import "./App.css";
import { Canvas } from "@react-three/fiber";
import Environment from "./components/Environment";
import Interface from "./Interface";
import HM17F from "./scenes/HM17F";
import ZJ6F from "./scenes/ZJ6F";
import { Suspense, useReducer } from "react";
import Loader from "./components/Loader";
import AppContext from "./components/AppContext";
import appReducer, { initAppState } from "./components/AppReducer";
import GLOBAL from "./configs/Global";
import { KeyboardControls } from "@react-three/drei";
import { Model } from "./scenes/HM3F_TEST";
import { Physics, RigidBody } from "@react-three/rapier";
import { Toaster } from "react-hot-toast";

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
        <KeyboardControls map={GLOBAL.CONFIG.KEYBOARD_CONTROLS.MAP}>
          <Interface />
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 50,
              position: GLOBAL.CONST.CAMERA_POSITION_FLY,
            }}
            className="!absolute left-0 top-0"
            id="canvas"
          >
            {/* TODO: remove this when have time to build offline environment. Now it's depend on online resources like hdr map. */}
            <Environment />
            <Physics debug>
                <CurFloor />
            </Physics>
          </Canvas>
          <Toaster
            position="top-right"
          />
        </KeyboardControls>
      </Suspense>
    </AppContext.Provider>
  );
}

export default App;
