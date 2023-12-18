import "./App.css";
import { Canvas } from "@react-three/fiber";
import HM3F from "./scenes/HM3F";
import Environment from "./components/Environment";
import Interface from "./Interface";
import HM17F from "./scenes/HM17F";
import ZJ6F from "./scenes/ZJ6F";
import { Suspense, useReducer, useMemo } from "react";
import Loader from "./components/Loader";
import AppContext from "./components/AppContext";
import appReducer, { initAppState } from "./components/AppReducer";
import GLOBAL from "./configs/Global";
import { KeyboardControls } from "@react-three/drei";

function App() {
  const [state, dispatch] = useReducer(appReducer, initAppState());

  let CurFloor = HM3F;
  switch (state.curFloor) {
    case GLOBAL.CONST.HM17F:
      CurFloor = HM17F;
      break;
    case GLOBAL.CONST.ZJ6F:
      CurFloor = ZJ6F;
      break;
    case GLOBAL.CONST.HM3F:
      CurFloor = HM3F;
      break;
    default:
      CurFloor = HM3F;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Suspense fallback={<Loader />}>
        <KeyboardControls map={GLOBAL.CONFIG.KEYBOARD_CONTROLS.MAP}>
          {/* <Loader /> */}
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
          >
            <Environment />
            
            <CurFloor />
          </Canvas>
        </KeyboardControls>
      </Suspense>
    </AppContext.Provider>
  );
}

export default App;
