export const hover = 1;
export const floorHeight = -12;
export const justAboveFloor = floorHeight + hover;
export const floorStart = [0, 0, floorHeight] as const;
export const playerStart = [0, 0, justAboveFloor] as [number, number, number];
export const doNothing = () => {};
