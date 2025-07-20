import { atom } from "jotai";

export const joystickSnapLeft = atom<number>();
export const joystickSnapTop = atom<number>();
export const joystickInnerLeft = atom<number>();
export const joystickInnerTop = atom<number>();
export const physicalJoystickRadius = atom(0);
export const normalizedJoystickOffsetX = atom(0);
export const normalizedJoystickOffsetY = atom(0);
export const joystickUnlocked = atom((get) => {
  const snapLeft = get(joystickSnapLeft);
  const snapTop = get(joystickSnapTop);

  return !!(snapLeft && snapTop);
});

export const entityMap = atom<Record<string, Entity>>({});
export const activeEntities = atom<string[]>([]);
export const actionMap = atom<Record<string, () => void>>({});
export const actionOnes = atom<string[]>([]);
export const actionTwos = atom<string[]>([]);
export const actionFours = atom<string[]>([]);
