const GLOBAL = {
  CONST: {
    // Floors
    HM3F: "HM3F",
    HM17F: "HM17F",
    ZJ6F: "ZJ6F",
    TEST_SCENE:"TEST_SCENE",

    // MODE
    MODE_FLY: "MODE_FLY",
    MODE_FIRST_PERSON: "MODE_FIRST_PERSON",

    KEY_FORWARD: 'FORWARD',
    KEY_BACKWARD: 'BACKWARD',
    KEY_LEFT: 'LEFT',
    KEY_RIGHT: 'RIGHT',
    KEY_JUMP: 'JUMP',

    MOTION: {
      MOVING: 'MOVING',
      STOP: 'STOP'
    }
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
          { name: GLOBAL.CONST.KEY_BACKWARD, keys: ["ArrowDown", "KeyS"] },
          { name: GLOBAL.CONST.KEY_LEFT, keys: ["ArrowLeft", "KeyA"] },
          { name: GLOBAL.CONST.KEY_RIGHT, keys: ["ArrowRight", "KeyD"] },
          { name: GLOBAL.CONST.KEY_JUMP, keys: ["Space"] },
        ],
        KEY_PRESSED_STATUS: {
          [GLOBAL.CONST.KEY_FORWARD]: false,
          [GLOBAL.CONST.KEY_BACKWARD]: false,
          [GLOBAL.CONST.KEY_LEFT]: false,
          [GLOBAL.CONST.KEY_RIGHT]: false,
          [GLOBAL.CONST.KEY_JUMP]: false,
        }
      },
    MODE_FIRST_PERSON: {
        MOTION_SPEED: 0.01,
        ROTATION_SPEED: 0.01,
        INITIAL_CAMERA_POSITION: { x: -4.6, y: 0.5, z: 5.0 },
        INITIAL_CAMERA_ROTATION: { x: 0, y: 0, z: 0 },
        PLAYER_POSITION: [],
        PLAYER_ROTATION: [],
    },
    MODE_FLY: {
        INITIAL_CAMERA_POSITION: { x: -4, y: 15, z: 20 }
    },
    MOTION: {
      MOVING_THRESHOLD: 0.02
    }   
}

export default {
    ...GLOBAL,
    CONFIG: CONFIG
};