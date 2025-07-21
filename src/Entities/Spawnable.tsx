import entityTypeMap from "../util/entityTypeMap";

type Props = {
  readonly entity: Entity;
};

export default function Spawnable({ entity }: Props) {
  const JSXEntity = entityTypeMap[entity.meshType];

  return <JSXEntity {...entity} />;
}
