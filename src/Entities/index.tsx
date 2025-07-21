import { useMemo } from "react";
import { useAtomValue } from "jotai";

import Spawner from "./Spawner";
import Monitor from "./Monitor";
import Spawnable from "./Spawnable";
import { activeEntities, entityMap } from "../state/immutable";

export default function Entities() {
  const active = useAtomValue(activeEntities);
  const map = useAtomValue(entityMap);

  const spawned = useMemo(
    () =>
      active.map((id) => (
        <Spawnable
          key={id}
          entity={map[id]!}
        />
      )),
    [active, map],
  );

  return (
    <>
      {spawned}
      <Monitor />
      <Spawner />
    </>
  );
}
