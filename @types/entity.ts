type SharedEntityProps = {
  readonly position: [number, number, number];
  readonly color: string;
  onLight?(light: import("three").PointLight): void;
  onCube?(mesh: import("three").Mesh): void;
};

type Entity = {
  meshType: keyof typeof import("../src/util/entityTypeMap").default;
} & SharedEntityProps;
