const GLOBAL = {
  CONST: {
    // Floors
    HM3F: "HM3F",
    HM17F: "HM17F",
    ZJ6F: "ZJ6F",

    // MODE
    MODE_FLY: "MODE_FLY",
    MODE_FIRST_PERSON: "MODE_FIRST_PERSON",

    KEY_FORWARD: 'FORWARD',
    KEY_BACK: 'BACK',
    KEY_LEFT: 'LEFT',
    KEY_RIGHT: 'RIGHT',
    KEY_JUMP: 'JUMP'
  },
  ACTIONS: {
    SWITCH_FLOOR: "SWITCH_FLOOR",
    PROGRESS_UPDATE: "PROGRESS_UPDATE",
    LOAD_DONE: "LOAD_DONE",
    SWITCH_MODE: "SWITCH_MODE",
    UPDATE_CAMERA: "UPDATE_CAMERA",
  },
  CONFIG: {
  },
};

const CONFIG = {
    KEYBOARD_CONTROLS: {
        MAP: [
          { name: GLOBAL.CONST.KEY_FORWARD, keys: ["ArrowUp", "KeyW"] },
          { name: GLOBAL.CONST.KEY_BACK, keys: ["ArrowDown", "KeyS"] },
          { name: GLOBAL.CONST.KEY_LEFT, keys: ["ArrowLeft", "KeyA"] },
          { name: GLOBAL.CONST.KEY_RIGHT, keys: ["ArrowRight", "KeyD"] },
          { name: GLOBAL.CONST.KEY_JUMP, keys: ["Space"] },
        ],
      },
    MODE_FIRST_PERSON: {
        SPEED: 7,
        INITIAL_CAMERA_POSITION: { x: -4.6, y: 0.5, z: 5.0 },
        INITIAL_CAMERA_ROTATION: { x: 0, y: 0, z: 0 },
    },
    MODE_FLY: {
        INITIAL_CAMERA_POSITION: { x: -4, y: 15, z: 20 }
    }
    
}

export default {
    ...GLOBAL,
    CONFIG: CONFIG
};