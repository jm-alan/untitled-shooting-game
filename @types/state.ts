type ActionSelect = 0 | 1 | 2 | 3;

type State = {
  moveMul: {
    x: number;
    y: number;
  };
  walkSpeed: number;
  actionSelect: ActionSelect;
};
