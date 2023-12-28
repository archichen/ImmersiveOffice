import FirstPersonMode from "./FirstPersonMode";
import { useContext } from "react";
import AppContext from "./AppContext";
import GLOBAL from "../configs/Global";
import FlyMode from "./FlyMode";

export default function ModeSwitcher() {
  const { state, dispatch } = useContext(AppContext);
  const { mode } = state;

  console.log(mode)
  
  let CurMode = FlyMode
  switch( mode ) {
    case GLOBAL.CONST.MODE_FLY:
      CurMode = FlyMode
      break;
    case GLOBAL.CONST.MODE_FIRST_PERSON:
      CurMode = FirstPersonMode
      break;
    default:
      CurMode = FlyMode
      break;
  }
  return (
    <CurMode />
  );
}
