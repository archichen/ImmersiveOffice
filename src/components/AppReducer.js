import GLOBAL from "../configs/Global";

function switchFloorReducer(_, floor) {
  return {
    curFloor: floor,
  };
}

function updateCamera(_, position, rotation) {
  return {
    cameraPosition: position,
    cameraRotation: rotation,
  };
}

function switchMode(_, mode) {
  return {
    mode,
  };
}
export default function appReducer(state, action) {
  switch (action.type) {
    case GLOBAL.ACTIONS.SWITCH_FLOOR:
      return switchFloorReducer(state, action.value);
    case GLOBAL.ACTIONS.SWITCH_MODE:
      return switchMode(state, action.value);
    case GLOBAL.ACTIONS.UPDATE_CAMERA:
      return updateCamera(state, action.position, action.rotation);
    default:
      break;
  }
  return state;
}

export function initAppState() {
  return {
    curFloor: GLOBAL.CONST.HM3F,
    mode: GLOBAL.CONST.MODE_FLY,
    cameraPosition: GLOBAL.CONST.CAMERA_POSITION_FLY,
    cameraRotation: [0, 0, 0],
  };
}
