import { create } from "zustand";
import Global from "../configs/Global";

/**
 * @typedef {Object} ModeSwitchStore
 * @property {string} mode
 * @property {function} setFlyMode
 * @property {function} setFirstPersonMode
 */
const useModeSwitchStore = create((set) => ({
  mode: Global.CONST.MODE_FLY,
  setFlyMode: () => set({ mode: Global.CONST.MODE_FLY }),
  setFirstPersonMode: () => set({ mode: Global.CONST.MODE_FIRST_PERSON }),
}));

const usePlayerStore = create((set) => ({
  player: null,
  setPlayer: (player) => set({ player }),
}));

export { useModeSwitchStore , usePlayerStore};