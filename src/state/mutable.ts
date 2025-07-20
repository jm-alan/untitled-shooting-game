type State = {
  moveMul: {
    x: number;
    y: number;
  };
  walkSpeed: number;
};

export default {
  moveMul: {
    x: 0,
    y: 0,
  },
  walkSpeed: 0.25,
} as State;
